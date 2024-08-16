import {allTables} from './randomTables'
import {createImages, generateResponseFromPrompt} from '$lib/utils/openAi.js'

const defaultInput = '[item-type][power][flavor][effects]'
const chanceOfAdditionalEffect = 0.4
const chanceOfPersonalCost = 0.4

function randomInput() {
	let input = defaultInput
	if (Math.random() < chanceOfAdditionalEffect) {
		input += '[effects]'
		if (Math.random() < chanceOfAdditionalEffect) {
			input += '[effects]'
		}
	}
	if (Math.random() < chanceOfPersonalCost) {
		input += '[cost]'
	}
	return input
}

function randomFromArray(arr) {
	const randomIndex = Math.floor(Math.random() * arr.length)
	return arr[randomIndex]
}

function unpackString(inputString) {
	// Match bracketed and unbracketed parts of the string
	return inputString.match(/\[([^\]]+)\]|[^\[\]]+/g)
}

function removeBracketsFrom(inputString) {
	return inputString.replace(/[\[\]]/g, '')
}

function transformToPrompt(item) {
	let prompt = ''
	if (item['item-type']) {
		prompt += `The item is of type: ${item['item-type']}\n`
	}
	if (item['power']) {
		prompt += `The power level of the item: ${item['power']}\n`
	}
	if (item['flavor']) {
		prompt += `The item has the following flavor: ${item['flavor']}\n`
	}
	if (item['cost']) {
		prompt += `The personal cost of using the item: ${item['cost']}\n`
	}
	if (item['effects']) {
		prompt += 'The item has the following effects:\n'
		item['effects'].forEach(effect => {
			prompt += ` - ${effect}\n`
		})
	}
	return prompt
}

// item string may contain dot and/or brackets for table lookup
function handleItem(item, returnObject = true) {
	const key = removeBracketsFrom(item)
	if (key.startsWith('effect')) {
		const effects = []
		let effectTableName
		if (key.includes('.')) {
			// If effects table name is specified, use it
			effectTableName = key.split('.')[1] // only support one level of nesting
		} else {
			// Else use a random effect table
			const effects = Object.keys(allTables.effect)
			effectTableName = randomFromArray(effects)
		}
		// Get a random effect from determined table
		const effect = randomFromArray(allTables.effect[effectTableName])

		// effect may require further handling
		if (effect.startsWith('[')) {
			// E.g. "[effect.summoning][effect]"
			const items = unpackString(effect)
			items.forEach(item => {
				effects.push(handleItem(item))
			})
		} else if (effect.includes('[')) {
			// E.g. "Is also a [item-type]"
			let compositeEffect = ''
			const items = unpackString(effect)
			items.forEach(item => {
				compositeEffect += handleItem(item, false)
			})
			effects.push(compositeEffect)
		} else {
			// Effect is just a string
			effects.push(effect)
		}
		return effects
	} else {
		// Not an effect, just get a random entry
		const entry = randomFromArray(allTables[key])
		return returnObject ? {[key]: entry} : entry
	}
}

export async function composeItemFrom(input = randomInput()) {
	let result = {}
	const items = unpackString(input)
	items.forEach(item => {
		let key = removeBracketsFrom(item)
		const handled = handleItem(item)
		if (Array.isArray(handled)) {
			// effects are returned as an array
			key = 'effects' // make it plural
			result[key] = result[key] ? result[key].concat(handled) : handled
			result[key] = result[key].flat()
		} else {
			// any other stuff is returned as an object
			result = Object.assign(result, handled)
		}
	})
	const prompt = transformToPrompt(result)
	const itemAsJson = await generateResponseFromPrompt(prompt)
	const imagePrompt = `${result['item-type']}: ${itemAsJson.description} The image clearly shows the whole item, and nothing else. No background. Muted palette.`
	const imageUrls = await createImages(imagePrompt, 3)
	const data = {
		itemAsKeywords: result,
		prompt,
		itemAsJson,
		imagePrompt,
		imageUrls: imageUrls.map(element => element.url)
	}
	return data
}

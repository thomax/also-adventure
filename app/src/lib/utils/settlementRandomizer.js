import { allTables } from './itemDescriptions'
import { createImages, generateResponseFromPrompt } from '$lib/utils/openAi.server.js'
import { getSettlementTables } from '$lib/utils/sanity.js'

const defaultInput = '[item-type][power][flavor][effects]'
const chanceOfAdditionalEffect = 0.4
const chanceOfPersonalCost = 0.4


const dieRoll = (sides) => {
	return Math.floor(Math.random() * sides) + 1
}

const throwDice = (numDice, sides) => {
	let total = 0
	for (let i = 0; i < numDice; i++) {
		total += dieRoll(sides)
	}
	return total
}

const normalizeTableRows = (rawTableRows) => {
	const normalizedRows = []
	rawTableRows.forEach((row) => {
		const { index, description } = row
		const nums = index.split('-').map((num) => parseInt(num.trim()))
		const first = nums[0]
		const last = nums[nums.length - 1]
		for (let i = first; i <= last; i++) {
			normalizedRows.push({ index: i, description })
		}
	})
	return normalizedRows
}


export const composeSettlementFrom = async () => {
	const rawSettlementTables = await getSettlementTables()
	const result = []
	rawSettlementTables.forEach(settlementTable => {
		const { tableRows, title, description, dieType } = settlementTable
		const normalizedTable = normalizeTableRows(tableRows)
		const [numberOfDice, sides] = dieType.split('d')
		const dieRoll = throwDice(parseInt(numberOfDice || 1), parseInt(sides))
		const selectedRow = normalizedTable.find(row => row.index === dieRoll)
		result.push({ title, description, result: selectedRow.description })
	})
	console.log('normalized', result)
	return { data: result }
}

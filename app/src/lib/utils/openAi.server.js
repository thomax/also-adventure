import OpenAI from 'openai'
import { zodResponseFormat } from 'openai/helpers/zod'
import { z } from 'zod'
import { OPENAI_API_KEY } from '$env/static/private'

// Set up OpenAI client
const openai = new OpenAI({
	apiKey: OPENAI_API_KEY
})
const systemPrompt1 =
	"You are a professional Game Master and an expert in creating unique and engaging magical items. You're response comes in JSON format, with three keys: Name: A short and memorable name of the item. Description: An extremely short description of what the item looks like. Mechanics: A no-nonsense, purely mechanical, breakdown of how the item works."

const MagicItemSchema = z.object({
	name: z.string(),
	description: z.string(),
	mechanics: z.string()
})

export const generateResponseFromPrompt = async prompt => {
	const completion = await openai.chat.completions.create({
		model: 'gpt-4o-mini',
		temperature: 1.1,
		response_format: zodResponseFormat(MagicItemSchema, 'item'),
		messages: [
			{
				role: 'system',
				content: systemPrompt1
			},
			{
				role: 'user',
				content: prompt
			}
		]
	})
	return JSON.parse(completion.choices[0].message.content)
}

export const createImages = async (input, imageCount = 1) => {
	const image = await openai.images.generate(
		{
			model: "dall-e-2",
			prompt: input,
			n: imageCount,
			size: '512x512',
		}
	)
	return image.data
}

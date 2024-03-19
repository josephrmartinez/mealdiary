'use server'

import OpenAI from "openai";

const openai = new OpenAI( {apiKey: process.env.OPENAI_API_KEY} );

export async function AnalyzeImage(imageUrl: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    max_tokens: 4000,
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "You are an expert dietician and you have access to a database with food nutrition information. If this is an image of a meal or food item, please return a complete meal diary entry for the meal pictured in this image. Estimate the volume of each component in the dish and add these together to determine the total nutrition facts data for the dish. If this is a nutrition facts label, use the data on the nutrition facts label. If there are multiple serving sizes, use the biggest serving size. Return your response in JSON format with the following structure: { meal_description: string; protein_grams: number; carbs_grams: number; sugar_grams: number; fat_grams: number; fiber_grams: number; calories: number } DO NOT return ANYTHING other than the JSON response with exactly the requested fields. Your answer should start and end with brackets. Do not include backticks or a type declaration." },
          {
            type: "image_url",
            image_url: {
              "url": imageUrl,
            },
          },
        ],
      },
    ],
  });
  if (response.choices[0].message.content){
    const validatedJSON = await ValidateJSON(response.choices[0].message.content)
    return validatedJSON
  }
}

export async function ValidateJSON(json: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-0125",
    response_format: { type: "json_object"},
    messages: [
      {
        role: "system",
        content:  "You are a JSON validator. The user will pass you a piece of text and you will look carefully to see if there are any errors such as trailing commas, backticks, or other unnacceptable formatting. Return your response in JSON format with the following structure: { meal_description: string; protein_grams: number; carbs_grams: number; sugar_grams: number; fat_grams: number; fiber_grams: number; calories: number } DO NOT return ANYTHING other than the JSON response with exactly the requested fields." },
      {
        role: "user",
        content: json
      }
    ],
  });
  return response.choices[0].message.content;
}
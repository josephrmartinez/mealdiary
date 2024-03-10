import OpenAI from "openai";
import 'dotenv/config'


const openai = new OpenAI( {apiKey: process.env.OPENAI_API_KEY} );

async function main() {
  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    max_tokens: 4000,
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "You are an expert dietician and you have access to a database with food nutrition information. Please return a complete meal diary entry for the meal pictured in this image. Return your response in JSON format with the following structure: {meal_description: string, protein(g): number carbs(g): number, sugar(g): number, fat(g): number, fiber(g): number, calories: number } DO NOT return ANYTHING other than the JSON response with exactly the requested fields." },
          {
            type: "image_url",
            image_url: {
              "url": "https://raw.githubusercontent.com/josephrmartinez/mealdiary/main/public/512foodimg.jpg",
            },
          },
        ],
      },
    ],
  });
  console.log(response.choices[0].message);
  console.log(response.usage);
}
main();
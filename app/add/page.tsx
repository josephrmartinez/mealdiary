'use client'

import { useState } from "react";
import ImageUploader from "@/components/ImageUploader"
import { uploadImageToSupabase } from "./actions"
import { AnalyzeImage } from "@/utils/ai/predictions";
import MealForm from "./MealForm";
import { MealInfo } from "../database.types";
import { logMeal } from "./actions";

const defaultMealInfo = {
    meal_description: '',
    protein_grams: null,
    carbs_grams: null,
    sugar_grams: null,
    fat_grams: null,
    fiber_grams: null,
    calories: null,
    datetime: null,
    image_url: ''
  };


export default function LogMeal() {
    const [mealInfo, setMealInfo] = useState<MealInfo>(defaultMealInfo);

    const handleUpload = async (image: File) => {
        try {
        const imageUrl = await uploadImageToSupabase(image);
        console.log("imageUrl", imageUrl)

        if (imageUrl) {
            setMealInfo(prevMealInfo => ({
                ...prevMealInfo,
                image_url: imageUrl
              }))
        const prediction = await AnalyzeImage(imageUrl)
        console.log("prediction", prediction)

        if (prediction) {
            const predictionObject = JSON.parse(prediction)
            setMealInfo(prevMealInfo => ({
                ...prevMealInfo,
                ...predictionObject
              }))
            
            const now = new Date();
            // Format the date and time to match the datetime-local input format
            const year = now.getFullYear();
            const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
            const day = now.getDate().toString().padStart(2, '0');
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');

            // Combine the date and time
            const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
            setMealInfo(prevMealInfo => ({
                ...prevMealInfo,
                datetime: formattedDateTime
            }));
              
              
        }
        
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      };
    };
    

      const handleSubmitMeal = async () => {
        const createMealEntry = await logMeal(mealInfo)
        console.log("createMealEntry", createMealEntry)
      }

    return (
        <div className="mt-4 grid lg:grid-cols-2 gap-3">
            <ImageUploader onUpload={handleUpload} />
            <MealForm mealInfo={mealInfo} onSubmit={handleSubmitMeal} setMealInfo={setMealInfo}/>
        </div>
    )
}



// const test = 
// {
//   "meal_description": "Scrambled eggs, shredded chicken, avocado, and onions",
//   "protein_grams": 35,
//   "carbs_grams": 17,
//   "sugar_grams": 5,
//   "fat_grams": 28,
//   "fiber_grams": 10,
//   "calories": 450
// }
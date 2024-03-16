'use client'

import React, { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { NutritionInfo } from '../database.types';


interface Props {
    values?: NutritionInfo | null;
    onSubmit: (formData: NutritionInfo) => void;
  }

function MealForm({ values, onSubmit }: Props) {
  const [formData, setFormData] = useState<NutritionInfo>({
    meal_description: '',
    protein_grams: null,
    carbs_grams: null,
    sugar_grams: null,
    fat_grams: null,
    fiber_grams: null,
    calories: null,
  });


  


  const [dateTimeNow, setDateTimeNow] = useState("")

  useEffect(() => {
    console.log("new values detected", values)
    if (values) {
      setFormData(values);

      const now = new Date();

      // Format the date and time to match the datetime-local input format
      const year = now.getFullYear();
      const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
      const day = now.getDate().toString().padStart(2, '0');
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');

      // Combine the date and time
      const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
      setDateTimeNow(formattedDateTime)
    }
  }, [values]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value.trim() === '' ? null : parseFloat(value)
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(formData);

  };

  return (
    <div className=' w-[512px] h-[512px] mx-auto my-4 lg:my-0 rounded-lg'>

    <form onSubmit={handleSubmit} className='flex flex-col items-center h-full'>
      
      <div className='h-fit w-5/6'>
        <label htmlFor="mealDescription" className='sr-only'>Meal Description:</label>
        <div
          className='border h-fit border-gray-200 text-green-900 rounded-md p-2 w-full text-2xl text-center font-bold bg-inherit'
          id="mealDescription"
          contentEditable={true}
          onInput={(e) => {
            const target = e.target as HTMLDivElement;
            const newText = target.textContent || '';
            setFormData({ ...formData, meal_description: newText })
          
            const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(target);
    range.collapse(false); // Collapse the range to the end of the content
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
    }
          
          }}
        >
          {formData.meal_description || ''}
        </div>
      </div>
      <div className='grid grid-cols-2 gap-6 px-6 text-xl font-semibold text-gray-700 my-4 mx-6 '>
        <div>
          <label htmlFor="protein_grams">Protein (g):</label>
          <input
            type="number"
            id="protein_grams"
            value={formData.protein_grams ?? ''}
            onChange={handleChange}
            className='ml-1 w-20 bg-inherit rounded-lg p-2 border border-gray-200'
          />
        </div>
        <div>
          <label htmlFor="carbs_grams">Carbs (g):</label>
          <input
            type="number"
            id="carbs_grams"
            value={formData.carbs_grams ?? ''}
            onChange={handleChange}
            className='ml-1 w-20 bg-inherit border border-gray-200 rounded-lg p-2'
          />
        </div>
        <div>
          <label htmlFor="sugar_grams">Sugar (g):</label>
          <input
            type="number"
            id="sugar_grams"
            value={formData.sugar_grams ?? ''}
            onChange={handleChange}
            className='ml-1 w-20 bg-inherit rounded-lg p-2 border border-gray-200'
          />
        </div>
        <div>
          <label htmlFor="fat_grams">Fat (g):</label>
          <input
            type="number"
            id="fat_grams"
            value={formData.fat_grams ?? ''}
            onChange={handleChange}
            className='ml-1 w-20 bg-inherit rounded-lg p-2 border border-gray-200'
          />
        </div>
        <div>
          <label htmlFor="fiber_grams">Fiber (g):</label>
          <input
            type="number"
            id="fiber_grams"
            value={formData.fiber_grams ?? ''}
            onChange={handleChange}
            className='ml-1 w-20 bg-inherit rounded-lg p-2 border border-gray-200'
          />
        </div>
        <div>
          <label htmlFor="calories">Calories:</label>
          <input
            type="number"
            id="calories"
            value={formData.calories ?? ''}
            onChange={handleChange}
            className='ml-1 w-24 bg-inherit rounded-lg p-2 border border-gray-200'
          />
        </div>
        

      </div>
      <div className='w-5/6'>
          <label htmlFor="date"></label>
          <input
            type="datetime-local"
            id="date"
            value={dateTimeNow}
            className='w-full bg-inherit rounded-lg p-2 border border-gray-200 text-xl font-semibold text-gray-700' 
          />
        </div>

      <div className='w-5/6 mt-auto'>
        {formData.meal_description === '' ? 
        <button 
        
        className='cursor-not-allowed font-semibold mx-auto w-full rounded-lg border border-green-700 text-green-800 text-lg h-12'
        >upload image to log meal</button> 
        : 
        <button 
          type="submit"
          className='mx-auto w-full rounded-lg shadow-lg bg-green-700 hover:bg-green-800 text-white text-lg h-12'
          >log meal</button>}
      </div>
      
      
    </form>

    </div>

  );
}

export default MealForm;
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

  useEffect(() => {
    console.log("new values detected", values)
    if (values) {
      setFormData(values);
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
    <div className='w-full mx-auto my-4'>

    <form onSubmit={handleSubmit} className='flex flex-col'>
      <div>
        <label htmlFor="mealDescription" className='sr-only'>Meal Description:</label>
        <textarea
          className='border rounded-lg p-2 w-full text-2xl text-center font-semibold'
          id="mealDescription"
          value={formData.meal_description || ''}
          onChange={(e) => setFormData({ ...formData, meal_description: e.target.value })}
        />
      </div>
      <div className='grid grid-cols-2 gap-8 text-2xl font-semibold my-4 mx-2'>
        <div>
          <label htmlFor="protein_grams">Protein (g):</label>
          <input
            type="number"
            id="protein_grams"
            value={formData.protein_grams ?? ''}
            onChange={handleChange}
            className='ml-4 w-20 border rounded-lg p-2'
          />
        </div>
        <div>
          <label htmlFor="carbs_grams">Carbs (g):</label>
          <input
            type="number"
            id="carbs_grams"
            value={formData.carbs_grams ?? ''}
            onChange={handleChange}
            className='ml-4 w-20 border rounded-lg p-2'
          />
        </div>
        <div>
          <label htmlFor="sugar_grams">Sugar (g):</label>
          <input
            type="number"
            id="sugar_grams"
            value={formData.sugar_grams ?? ''}
            onChange={handleChange}
            className='ml-4 w-20 border rounded-lg p-2'
          />
        </div>
        <div>
          <label htmlFor="fat_grams">Fat (g):</label>
          <input
            type="number"
            id="fat_grams"
            value={formData.fat_grams ?? ''}
            onChange={handleChange}
            className='ml-4 w-20 border rounded-lg p-2'
          />
        </div>
        <div>
          <label htmlFor="fiber_grams">Fiber (g):</label>
          <input
            type="number"
            id="fiber_grams"
            value={formData.fiber_grams ?? ''}
            onChange={handleChange}
            className='ml-4 w-20 border rounded-lg p-2'
          />
        </div>
        <div>
          <label htmlFor="calories">Calories:</label>
          <input
            type="number"
            id="calories"
            value={formData.calories ?? ''}
            onChange={handleChange}
            className='ml-4 w-20 border rounded-lg p-2'
          />
        </div>

      </div>
      
      <button 
        type="submit"
        className='mx-auto rounded-lg bg-green-700 text-white text-2xl w-48 h-16 my-6'
        >log meal</button>
    </form>

    </div>

  );
}

export default MealForm;
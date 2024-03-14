'use client'

import React, { useState, FormEvent, ChangeEvent, useEffect } from 'react';

interface FormData {
  mealDescription: string;
  protein: number | '';
  carbs: number | '';
  sugar: number | '';
  fat: number | '';
  fiber: number | '';
  calories: number | '';
}

interface Props {
    initialValues: FormData;
    onSubmit: (formData: FormData) => void;
  }

function MealForm({ initialValues, onSubmit }: Props) {
    const [formData, setFormData] = useState<FormData>(initialValues);

    useEffect(() => {
      setFormData(initialValues);
    }, [initialValues]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
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
          value={formData.mealDescription}
          onChange={(e) => setFormData({ ...formData, mealDescription: e.target.value })}
        />
      </div>
      <div className='grid grid-cols-2 gap-8 text-2xl font-semibold my-4 mx-2'>
        <div>
          <label htmlFor="protein">Protein (g):</label>
          <input
            type="number"
            id="protein"
            value={formData.protein}
            onChange={handleChange}
            className='ml-4 w-20 border rounded-lg p-2'
          />
        </div>
        <div>
          <label htmlFor="carbs">Carbs (g):</label>
          <input
            type="number"
            id="carbs"
            value={formData.carbs}
            onChange={handleChange}
            className='ml-4 w-20 border rounded-lg p-2'
          />
        </div>
        <div>
          <label htmlFor="sugar">Sugar (g):</label>
          <input
            type="number"
            id="sugar"
            value={formData.sugar}
            onChange={handleChange}
            className='ml-4 w-20 border rounded-lg p-2'
          />
        </div>
        <div>
          <label htmlFor="fat">Fat (g):</label>
          <input
            type="number"
            id="fat"
            value={formData.fat}
            onChange={handleChange}
            className='ml-4 w-20 border rounded-lg p-2'
          />
        </div>
        <div>
          <label htmlFor="fiber">Fiber (g):</label>
          <input
            type="number"
            id="fiber"
            value={formData.fiber}
            onChange={handleChange}
            className='ml-4 w-20 border rounded-lg p-2'
          />
        </div>
        <div>
          <label htmlFor="calories">Calories:</label>
          <input
            type="number"
            id="calories"
            value={formData.calories}
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
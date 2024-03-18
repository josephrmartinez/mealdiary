'use client'

import React, { FormEvent, ChangeEvent } from 'react';
import { MealInfo } from '../database.types';


interface Props {
    mealInfo: MealInfo;
    onSubmit: () => void;
    setMealInfo: React.Dispatch<React.SetStateAction<MealInfo>>;
  }

const MealForm: React.FC<Props> = ({ mealInfo, onSubmit, setMealInfo }) => {

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setMealInfo(prev => ({
      ...prev,
      [id]: value.trim() === '' ? null : parseFloat(value)
    }));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement| HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setMealInfo(prev => ({
      ...prev,
      [id]: value
    }));
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();

  };

  return (
    <div className=' w-[512px] h-[512px] mx-auto my-4 lg:my-0 rounded-lg'>

    <form onSubmit={handleSubmit} className='flex flex-col items-center h-full'>
      
      <div className='h-fit w-5/6'>
        <label htmlFor="mealDescription" className='sr-only'>Meal Description:</label>
        <textarea
          className='border h-fit border-gray-200 text-green-900 rounded-md p-2 w-full text-2xl text-center font-bold bg-inherit'
          id="meal_description"
          value={mealInfo.meal_description}
          onChange={handleInputChange}
        >
          
        </textarea>
      </div>
      <div className='grid grid-cols-2 gap-6 px-6 text-xl font-semibold text-gray-700 my-4 mx-6 '>
        <div>
          <label htmlFor="protein_grams">Protein (g):</label>
          <input
            type="number"
            id="protein_grams"
            value={mealInfo.protein_grams ?? ''}
            onChange={handleChange}
            className='ml-1 w-20 bg-inherit rounded-lg p-2 border border-gray-200'
          />
        </div>
        <div>
          <label htmlFor="carbs_grams">Carbs (g):</label>
          <input
            type="number"
            id="carbs_grams"
            value={mealInfo.carbs_grams ?? ''}
            onChange={handleChange}
            className='ml-1 w-20 bg-inherit border border-gray-200 rounded-lg p-2'
          />
        </div>
        <div>
          <label htmlFor="sugar_grams">Sugar (g):</label>
          <input
            type="number"
            id="sugar_grams"
            value={mealInfo.sugar_grams ?? ''}
            onChange={handleChange}
            className='ml-1 w-20 bg-inherit rounded-lg p-2 border border-gray-200'
          />
        </div>
        <div>
          <label htmlFor="fat_grams">Fat (g):</label>
          <input
            type="number"
            id="fat_grams"
            value={mealInfo.fat_grams ?? ''}
            onChange={handleChange}
            className='ml-1 w-20 bg-inherit rounded-lg p-2 border border-gray-200'
          />
        </div>
        <div>
          <label htmlFor="fiber_grams">Fiber (g):</label>
          <input
            type="number"
            id="fiber_grams"
            value={mealInfo.fiber_grams ?? ''}
            onChange={handleChange}
            className='ml-1 w-20 bg-inherit rounded-lg p-2 border border-gray-200'
          />
        </div>
        <div>
          <label htmlFor="calories">Calories:</label>
          <input
            type="number"
            id="calories"
            value={mealInfo.calories ?? ''}
            onChange={handleChange}
            className='ml-1 w-24 bg-inherit rounded-lg p-2 border border-gray-200'
          />
        </div>
        

      </div>
      <div className='w-5/6'>
          <label htmlFor="date"></label>
          <input
            type="datetime-local"
            id="datetime"
            value={mealInfo.datetime ?? ''}
            onChange={handleInputChange}
            className='w-full bg-inherit rounded-lg p-2 border border-gray-200 text-xl font-semibold text-gray-700' 
          />
        </div>

      <div className='w-5/6 mt-auto'>
        {mealInfo.meal_description === '' ? 
        <button 
        
        className='cursor-not-allowed font-semibold mx-auto w-full rounded-lg border border-green-700 text-green-800 text-lg h-12'
        >log meal</button> 
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
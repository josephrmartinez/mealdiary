export interface MealInfo {
    meal_description: string;
    protein_grams: number | null;
    carbs_grams: number | null;
    sugar_grams: number | null;
    fat_grams: number | null;
    fiber_grams: number | null;
    calories: number | null;
    datetime: string | null;
    image_url: string | null;
  }
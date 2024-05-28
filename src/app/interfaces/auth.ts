export interface User {
  _id:string;
  fullName: string;
  email: string;
  password: string
  isblocked:Boolean
}

export interface Nutritionist{
  _id:string;
  fullName: string;
  email: string;
  password: string;
  isblocked:Boolean;
}

export interface Bmi{
  _id:string;
  user_id: string;
  age: number;
  height: number;
  weight: number;
  desweight: number
}

export interface Food{
  foodName: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  category: string;
}
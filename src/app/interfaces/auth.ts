import { Time } from "@angular/common";

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
  kcal: number;
  protein: number;
  carbs: number;
  fats: number;
  category: string;
  imageUrl: string
}

export interface Appointment{
  _id: string
  date: string
  time: string
  status: string
}

export interface userAppointment{
  _doc: {
    _id:string;
    date: string;
    nutri_id: string;
    status: string;
    time: string;
  };
  nutritionist: {
    email: string;
    fullName: string;
    isblocked: boolean;
    password: string;
    role: string;
    _id: string;
  }
}
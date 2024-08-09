import { Time } from "@angular/common";

export interface User {
  _id:string;
  fullName: string;
  email: string;
  age: number;
  sex: string;
  phoneNumber: number;
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
  portion: string;
  imageUrl: string
  description: string
}

export interface Appointment{
  _id: string
  date: string
  time: string
  end_time: string
  status: string
  user_id: string
  nutri_id: string
}

export interface userAppointment{
  appointment: {
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

export interface ShowNutritionist{
  _id:string;
  fullName: string;
  email: string;
  experience: string
  specialization: string
}

export interface ChatMessage{
  senderId: string;
  receiverId: string;
  message: string;
  _id: string;
  timestamp: Date;
}

export interface DailyIntake{
  program: string;
  calories: string;
  protein: string;
  fats: string,
  carbs: string
}

export interface TrackProgress{
  currentDate: string;
  currentWeight: string; 
}

export interface UserProfile{
  _id:string;
  fullName: string;
  email: string;
  age: number;
  phoneNumber: number
  sex: string
  password: string
  isblocked:Boolean
}

export interface NutriProfile{
  _id:string;
  fullName: string;
  email: string;
  experience: string
  specialization: string
  password: string
  isblocked:Boolean
}

export interface Prescription{
  appointmentId: string,
  userId: string,
  nutriIdS: string,
  medication: string,
  dosage: string,
  frequency: string,
  details: string
}

export interface Bookings{
  paymentId: string
  userId: string
  date: Date
  appointment_id: string
  fullName: string
  appointmentDate: Date
  appointmentTime: String
  nutritionistName: string
  amount: number
  displayAppointmentId: string
  displayPaymentId: string
  hasPrescription: boolean
}

export interface NutritionistResponse {
  fullName: string
}

export interface UserResponse {
  fullName: string
}

export interface LoginResponse{
  user:User
  token:string
  refreshToken:string
  message:string
}
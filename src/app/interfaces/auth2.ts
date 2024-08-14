import { Food, Nutritionist, User } from "./auth"

export interface Admin{
  email: string
  password: string
}

export interface VerifyOtpResponse{
  message: string
}

export interface ForgotVerifyOtp{
  message: string
}

export interface ForgotPassChangeRes{
  message: string
}

export interface ResendOtpRes{
  message: string;
  email: string
}

export interface AdminLoginRes{
  token: string;
  admin: Admin
}

export interface NutriVerifyOtpRes{
  message: string
}

export interface NutriLoginRes{
  token: string;
  user: User;
  message: string
}

export interface RefreshTokenRes{
  accessToken: string
  message: string
}

export interface GetUserRes{
  message: string;
  user: User
}

export interface GetNutriRes{
  message: string;
  nutritionist: Nutritionist
}

export interface AdminGetUser{
  message: string;
  users: User
  totalcount: number
}

export interface AdminManageUsers{
  message: string;
  updatedUser: User
}

export interface AdminGetNutris{
  message: string;
  users: User
}

export interface AdminManageNutris{
  message: string;
  updatedUser: User
}

export interface SearchEmail{
  message: string;
  user: User
}

export interface AddFood{
  message: string
}

export interface DailyIntake{
  message: string
}

export interface ToogleBreakfast{
  message: string
  food: Food
}

export interface ToogleLunch{
  message: string
  food: Food
}

export interface ToogleDinner{
  message: string
  food: Food
}

export interface UpdateFood{
  message: string
}

export interface ShowBmiRes{
  message: string
  bmiValues: number
  result: number
}
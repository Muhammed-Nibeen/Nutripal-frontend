import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse, User } from '../interfaces/auth';
import { Nutritionist } from '../interfaces/auth'
import { AdminLoginRes, ForgotPassChangeRes, ForgotVerifyOtp, GetUserRes, NutriLoginRes, NutriVerifyOtpRes, RefreshTokenRes, ResendOtpRes, VerifyOtpResponse } from '../interfaces/auth2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  registerUser(userDetails:User){
    return this.http.post(`${this.baseUrl}/user/signup`,userDetails)
  }

  verifyOtp(userData: string, otp: number): Observable<VerifyOtpResponse> {
    const requestBody = { userData: userData, enteredOtp: otp };
    return this.http.post<VerifyOtpResponse>(`${this.baseUrl}/user/signup/verify-otp`, requestBody)
  }

  userLogin(email: string,password: string): Observable<LoginResponse>{
    const requestBody = {email:email,password:password}
    return this.http.post<LoginResponse>(`${this.baseUrl}/user/login`,requestBody)
  }

  forgotPassword(email:string){
    return this.http.post(`${this.baseUrl}/user/forgotpassword`,email)
  }

  forgotverifyOtp(email: string,otp:number):Observable<ForgotVerifyOtp>{
    const requestBody = {otp:otp,email:email}
    return this.http.post<ForgotVerifyOtp>(`${this.baseUrl}/user/forgotpassword/verifyotp`,requestBody)
  }

  forgotpassChange(email: string,password: string):Observable<ForgotPassChangeRes>{
    const requestBody = {email:email,newPassword:password}
    return this.http.post<ForgotPassChangeRes>(`${this.baseUrl}/user/forgotpassword/changepass`,requestBody)
  }

  resendOtp(userDetails:User):Observable<ResendOtpRes>{
    return this.http.post<ResendOtpRes>(`${this.baseUrl}/user/resendotp`,userDetails)
  }

  adminLogin(email: string,password: string):Observable<AdminLoginRes>{
    const requestBody = {email:email,password:password}
    return this.http.post<AdminLoginRes>(`${this.baseUrl}/admin/adminlogin`,requestBody)
  }

  registernutri(nutriDetails:Nutritionist){
    return this.http.post(`${this.baseUrl}/nutri/signup`,nutriDetails)
  }

  nutriverifyOtp(userData: string, otp: number): Observable<NutriVerifyOtpRes> {
    const requestBody = { userData: userData, enteredOtp: otp };
    return this.http.post<NutriVerifyOtpRes>(`${this.baseUrl}/nutri/signup/verify-otp`, requestBody)
  }

  nutriLogin(email: string,password: string): Observable<NutriLoginRes>{
    const requestBody = {email:email,password:password}
    return this.http.post<NutriLoginRes>(`${this.baseUrl}/nutri/login`,requestBody)
  }

  refreshToken(): Observable<RefreshTokenRes>{
    const refreshToken = localStorage.getItem('refreshToken')
    const requestBody = {refreshToken:refreshToken}
    return this.http.post<RefreshTokenRes>(`${this.baseUrl}/user/refreshtoken`, requestBody)
  }

  getUser(userid: string):Observable<GetUserRes>{
    return this.http.get<GetUserRes>(`${this.baseUrl}/user/getuser/${userid}`)
  }

}

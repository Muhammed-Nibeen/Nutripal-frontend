import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/auth';
import { Nutritionist } from '../interfaces/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  registerUser(userDetails:User){
    return this.http.post(`${this.baseUrl}/user/signup`,userDetails)
  }

  verifyOtp(userData: string, otp: number): Observable<any> {
    const requestBody = { userData: userData, enteredOtp: otp };
    return this.http.post(`${this.baseUrl}/user/signup/verify-otp`, requestBody)
  }

  userLogin(email: string,password: string): Observable<any>{
    const requestBody = {email:email,password:password}
    return this.http.post(`${this.baseUrl}/user/login`,requestBody)
  }

  forgotPassword(email:string){
    return this.http.post(`${this.baseUrl}/user/forgotpassword`,email)
  }

  forgotverifyOtp(email: string,otp:number):Observable<any>{
    const requestBody = {otp:otp,email:email}
    return this.http.post(`${this.baseUrl}/user/forgotpassword/verifyotp`,requestBody)
  }

  forgotpassChange(email: string,password: string):Observable<any>{
    const requestBody = {email:email,newPassword:password}
    return this.http.post(`${this.baseUrl}/user/forgotpassword/changepass`,requestBody)
  }

  resendOtp(userDetails:User):Observable<any>{
    return this.http.post(`${this.baseUrl}/user/resendotp`,userDetails)
  }

  adminLogin(email: string,password: string):Observable<any>{
    const requestBody = {email:email,password:password}
    return this.http.post(`${this.baseUrl}/admin/adminlogin`,requestBody)
  }

  registernutri(nutriDetails:Nutritionist){
    return this.http.post(`${this.baseUrl}/nutri/signup`,nutriDetails)
  }

  nutriverifyOtp(userData: string, otp: number): Observable<any> {
    const requestBody = { userData: userData, enteredOtp: otp };
    return this.http.post(`${this.baseUrl}/nutri/signup/verify-otp`, requestBody)
  }

  nutriLogin(email: string,password: string): Observable<any>{
    const requestBody = {email:email,password:password}
    return this.http.post(`${this.baseUrl}/nutri/login`,requestBody)
  }

  refreshToken(): Observable<any>{
    const refreshToken = localStorage.getItem('refreshToken')
    const requestBody = {refreshToken:refreshToken}
    return this.http.post(`${this.baseUrl}/user/refreshtoken`, requestBody)
  }

  getUser(userid: string):Observable<any>{
    return this.http.get(`${this.baseUrl}/user/getuser/${userid}`)
  }

}

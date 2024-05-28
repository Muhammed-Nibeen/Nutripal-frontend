import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/auth';
import { Nutritionist } from '../interfaces/auth'
import {Bmi} from '../interfaces/auth'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  bmiCalculator(bmiDetails: Bmi,userData: User){
    const requestBody = {bmiDetails: bmiDetails,userData: userData}
    return this.http.post(`${this.baseUrl}/user/bmicalculation`,requestBody)
  }

  showBmi(userData:User):Observable<any>{
    return this.http.post(`${this.baseUrl}/user/showbmi`,userData)
  }

  displayFood(bmiResult:number):Observable<any>{
    return this.http.post(`${this.baseUrl}`,bmiResult)
  } 
}

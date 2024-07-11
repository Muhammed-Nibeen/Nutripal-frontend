import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment, User } from '../interfaces/auth';
import { Nutritionist } from '../interfaces/auth'
import {Bmi} from '../interfaces/auth'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NutritionistService {
  private baseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient,
    private router: Router) { }

  scheduleAppointment(data:Appointment,nutri_id:any):Observable<any>{
    const requestBody = {data:data,nutri_id:nutri_id}
    return this.http.post(`${this.baseUrl}/nutri/scheduleappointment`,requestBody)
  }

  getAppointment(nutriData:any):Observable<any>{
    return this.http.post(`${this.baseUrl}/nutri/getappointment`,nutriData)
  }

  showUserApp(id: string):Observable<any>{
    console.log('id in service',id);
    const body = {id}
    return this.http.post(`${this.baseUrl}/nutri/showuserapp`,body)
  }

  getCount(user_id: string,nutri_id: string):Observable<any>{
    return this.http.post(`${this.baseUrl}/nutri/getcount`,{user_id,nutri_id})
  }
}

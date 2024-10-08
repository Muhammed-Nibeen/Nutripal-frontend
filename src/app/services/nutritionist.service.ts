import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment, NutritionistResponse, Prescription, RevenueRecord, User, UserResponse } from '../interfaces/auth';
import { Nutritionist } from '../interfaces/auth'
import { Router } from '@angular/router';
import { enviroment } from '../../enviroment/enviroment'

@Injectable({
  providedIn: 'root'
})
export class NutritionistService {
  baseUrl = enviroment.baseUrl
  constructor(private http: HttpClient,
  ) { }

  scheduleAppointment(data:Appointment,nutri_id:Nutritionist,slots:string[]):Observable<any>{
    const requestBody = {data:data,nutri_id:nutri_id,slots:slots}
    console.log(data,nutri_id,slots);
    console.log(requestBody);
    return this.http.post(`${this.baseUrl}/nutri/scheduleappointment`,requestBody)
  }

  getAppointment(nutriData:any,page:number,limit:number):Observable<any>{
    return this.http.post(`${this.baseUrl}/nutri/getappointment`,{nutriData,page,limit})
  }

  showUserApp(id: string):Observable<any>{
    console.log('id in service',id);
    const body = {id}
    return this.http.post(`${this.baseUrl}/nutri/showuserapp`,body)
  }

  getCount(user_id: string,nutri_id: string):Observable<any>{
    return this.http.post(`${this.baseUrl}/nutri/getcount`,{user_id,nutri_id})
  }

  deleteAppointment(appointmentId: string,nutriData: Nutritionist):Observable<any>{
    console.log('Thiss is a service',appointmentId);
    return this.http.post(`${this.baseUrl}/nutri/deleteappointment`,{appointmentId,nutriData})
  }

  updateAppointment(appointment: Appointment){
    return this.http.post(`${this.baseUrl}/nutri/updateappointment`,{appointment})
  }

  savePrescription(prescriptionData:Prescription):Observable<any>{
    return this.http.post(`${this.baseUrl}/nutri/saveprescription`,prescriptionData)
  }

  getNameNutri(nutriId: string):Observable<NutritionistResponse> {
    return this.http.post<NutritionistResponse>(`${this.baseUrl}/nutri/getnamenutri`,{nutriId})
  }

  getNameUser(userId: string):Observable<UserResponse> {
    console.log('This is the userid service',userId); 
    return this.http.post<NutritionistResponse>(`${this.baseUrl}/nutri/getnameuser`,{userId})
  }
  
  getUnbookedAppointment(nutriData:any,page:number,limit:number):Observable<any>{
    return this.http.post(`${this.baseUrl}/nutri/getunbookedappointment`,{nutriData,page,limit})
  }

  getRevenue(nutriData:any,page:number,limit:number):Observable<RevenueRecord>{
    return this.http.post<RevenueRecord>(`${this.baseUrl}/nutri/getrevenue`,{nutriData,page,limit})
  }

  getProfile(nutriData:Nutritionist):Observable<Nutritionist>{
    return this.http.post<Nutritionist>(`${this.baseUrl}/nutri/getprofile`,{nutriData})
  }

  saveProfile(nutriData:Nutritionist,nutriProfile:Nutritionist):Observable<Nutritionist>{
    return this.http.post<Nutritionist>(`${this.baseUrl}/nutri/saveprofile`,{nutriData,nutriProfile})
  }

}

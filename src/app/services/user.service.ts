import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment, TrackProgress, User } from '../interfaces/auth';
import {Bmi} from '../interfaces/auth'
import { Router } from '@angular/router';
import { ShowBmiRes } from '../interfaces/auth2';
import { enviroment } from '../../enviroment/enviroment'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = enviroment.baseUrl

  constructor(private http: HttpClient,
    private router: Router) { }

  bmiCalculator(bmiDetails: Bmi,userData: User){
    const requestBody = {bmiDetails: bmiDetails,userData: userData}
    return this.http.post(`${this.baseUrl}/user/bmicalculation`,requestBody)
  }

  showBmi(userData:User):Observable<ShowBmiRes>{
    return this.http.post<ShowBmiRes>(`${this.baseUrl}/user/showbmi`,userData)
  }

  displayFood(bmiResult:number):Observable<any>{
    return this.http.post(`${this.baseUrl}/user/displayfood`,{bmiResult})
  } 

  displayLunch(bmiResult:number):Observable<any>{
    return this.http.post(`${this.baseUrl}/user/displaylunch`,{bmiResult})
  } 

  displayDinner(bmiResult:number):Observable<any>{
    return this.http.post(`${this.baseUrl}/user/displaydinner`,{bmiResult})
  } 

  logout(){
    localStorage.removeItem('user_token');
    this.router.navigate(['userLogin'])
  }

  getNutris(page:number,limit:number):Observable<any>{
    return this.http.post(`${this.baseUrl}/user/getnutris`,{page,limit})
  }

  bookAppointment(id: string,userId:User):Observable<any>{
    const requestBody = {id:id,userId:userId}
    return this.http.post(`${this.baseUrl}/user/bookappointment`,requestBody)
  }

  getProfile(userData:User):Observable<any>{
    return this.http.post(`${this.baseUrl}/user/getprofile`,{userData})
  }

  getNutriProfile(nutriId: string):Observable<any>{
    return this.http.post(`${this.baseUrl}/user/getnutriprofile`,{nutriId})
  }

  getbookedNutris(userData:User):Observable<any>{
    return this.http.post(`${this.baseUrl}/user/getbookednutris`,{userData})
  }

  saveProfile(userData:User,userProfile:User):Observable<any>{
    return this.http.post(`${this.baseUrl}/user/saveprofile`,{userData,userProfile})
  }
  
  startDiet(userData:User):Observable<any>{
    return this.http.post(`${this.baseUrl}/user/startdiet`,{userData})
  }


  userProgress(userData: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/userprogress`, { userData });
  }

  trackProgress(trackprogress:TrackProgress,userData: User):Observable<any>{
    console.log('THis is the service file',trackprogress)
    return this.http.post(`${this.baseUrl}/user/trackprogress`,{trackprogress,userData})
  }

  getBookings(userData: User,page:number,limit:number): Observable<any>{
    return this.http.post(`${this.baseUrl}/user/getbookings`,{userData,page,limit})
  }

  downloadPdf(appointmentId: string): Observable<Blob>{
    return this.http.post(`${this.baseUrl}/user/generatepdf`,{appointmentId}, { responseType: 'blob' })
  }

  getAvailableSlots(nutritionistId: string){
    return this.http.post(`${this.baseUrl}/user/getavailableslots`,{nutritionistId})
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/auth';
import { Nutritionist } from '../interfaces/auth'

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  paymentSuccess(paymentId: string,userId: User, amount: number,appointmentid: string):Observable<any>{
    const requestBody = {paymentId:paymentId,userId:userId,amount:amount,appointmentid:appointmentid}
    console.log("This is pay service",requestBody)
    return this.http.post(`${this.baseUrl}/payment/paymentsuccess`,requestBody)
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/auth';
import { Nutritionist } from '../interfaces/auth'
import { enviroment } from '../../enviroment/enviroment'

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  baseUrl = enviroment.baseUrl

  constructor(private http: HttpClient) { }

  paymentSuccess(paymentId: string,userId: User, amount: number,appointmentid: string,nutriId: string):Observable<any>{
    const requestBody = {paymentId:paymentId,userId:userId,amount:amount,appointmentid:appointmentid,nutriId:nutriId}
    console.log("This is pay service",requestBody)
    return this.http.post(`${this.baseUrl}/payment/paymentsuccess`,requestBody)
  }

}

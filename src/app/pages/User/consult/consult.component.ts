import { Component, OnInit,ChangeDetectorRef  } from '@angular/core';
import {  FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { MessageService } from 'primeng/api';
import { catchError, throwError } from 'rxjs';


import { Nutritionist, User, userAppointment } from '../../../interfaces/auth';
import { PaymentService } from '../../../services/payment.service';

import { UserService } from '../../../services/user.service';

declare var Razorpay: any


@Component({
  selector: 'app-consult',
  templateUrl: './consult.component.html',
  styleUrl: './consult.component.css'
})
export class ConsultComponent implements OnInit{

  
  visible: boolean = false;
  Appointment:userAppointment[]=[]
  nutri_id!:Nutritionist
  userData!:User
  jwttoken!:string|null
  appbtn:boolean = false
  paymentId: string | null = null
  price:number = 300
  appointmentId!:string
  bookingStarted: boolean = false;

  constructor(private userService: UserService,
    private fb: FormBuilder,
    private messageService:MessageService,
    private router:Router,
    private cdr:ChangeDetectorRef,
    private paymentService:PaymentService
   ){}

  consultOptForm = this.fb.group({
    option:['',[Validators.required]]
  })

  logout(){
    this.userService.logout()
  }
  
  ngOnInit(): void{
    this.getToken()

    this.getNutris()

  }

  getToken(){
    if (typeof window!== 'undefined'){
      this.jwttoken = localStorage.getItem('user_token')
      if(this.jwttoken){
        const decode = jwtDecode(this.jwttoken)
        this.userData = decode as User
      }
    }
  }

  getNutris(){
    this.userService.getNutris().subscribe({
      next: (response: any) => {
        this.Appointment = response.combinedData;
        console.log("Combined data: ",this.Appointment)
        this.cdr.detectChanges();
      },
      error: (error: any) => {
        console.error('Subscription error:', error);
      }
    });
  }



  bookSlot(id:string){
    console.log("This is the appointment id",id)
    this.bookingStarted = true;
    this.visible = true;
    const userId = this.userData
    this.appointmentId = id;
    // this.userService.bookAppointment(id as string,userId).subscribe({
    //   next:(response:any)=>{
    //     this.messageService.add({severity:'success',summary:'Success',detail: response.message})
        
    //   },
    //   error:(error:any)=>{
    //     this.messageService.add({severity:'error',summary:'Error',detail: error.error.error})
    //   }
    // })
  }

  onProceedToPay(){
    const selectedOption = this.consultOptForm.get('option')?.value
    console.log(selectedOption)
    this.visible = false;

    const razorPayOptions = {
      currency: 'INR',
      amount: this.price * 100,
      name: 'Nutripal',
      key: 'rzp_test_jHotBnTKoHrYXJ',
      theme: {
        color: '#3b28fe'
      },
      modal: {
        ondismiss: () => { }
      },
      handler: ((response: any) => {
        if (response) {
          if (response.razorpay_payment_id) {
            this.handlePaymentSucess(response.razorpay_payment_id)
          }
        }
      })
    }

    Razorpay.open(razorPayOptions); 

  
  }

    handlePaymentSucess(paymentId: string){
      
    console.log("htis is payment",paymentId)
    const userId = this.userData
    const appointmentid = this.appointmentId
    
    this.paymentService.paymentSuccess(paymentId, userId,this.price,appointmentid).subscribe({
      next:(response: any)=>{
        this.messageService.add({severity:'success',summary:'Success',detail: response.message})
      },
      error:(error: any)=>{
        this.messageService.add({severity:'error',summary:'Error',detail: error.error.error})
      }
    })
  }
 
 
 
}

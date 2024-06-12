import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { MessageService } from 'primeng/api';

import { Nutritionist, User, userAppointment } from '../../../interfaces/auth';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-consult',
  templateUrl: './consult.component.html',
  styleUrl: './consult.component.css'
})
export class ConsultComponent implements OnInit{

  
  Appointment:userAppointment[]=[]
  nutri_id!:Nutritionist
  userData!:User
  jwttoken!:string|null
  appbtn:boolean = false

  constructor(private userService: UserService,
    private fb: FormBuilder,
    private messageService:MessageService,
    private router:Router){}


  logout(){
    this.userService.logout()
  }
  
  ngOnInit(): void{
    this.userService.getNutris().subscribe({
      next:(response:any)=>{
        this.Appointment = response.combinedData
      },
      error:(error: any)=>{
      }
    })
    this.getToken()
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

  bookSlot(id:string){
    console.log("This is the appointment id",id)
    const userId = this.userData
    this.userService.bookAppointment(id as string,userId).subscribe({
      next:(response:any)=>{
        this.messageService.add({severity:'success',summary:'Success',detail: response.message})
      
      },
      error:(error:any)=>{
        this.messageService.add({severity:'error',summary:'Error',detail: error.error.error})
      }
    })
  }

 
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { response } from 'express';
import { jwtDecode } from 'jwt-decode';
import { MessageService } from 'primeng/api';
import { Appointment, User, userAppointment, UserProfile } from '../../../interfaces/auth';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  jwttoken!:string|null
  userData!:User
  userProfile:UserProfile = {
    _id: '',
    fullName: '',
    email: '',
    age: 0,
    phoneNumber: 0,
    sex: '',
    password: '',
    isblocked: false
  }
  
  age:number = 36
  appointments: userAppointment[] = [];

  constructor(private router:Router,
    private userService:UserService,
    private messageService: MessageService  
  ){}

  ngOnInit(): void {
    this.getToken()

    this.userDetails()

    this.bookedAppointments()

  }

  logout(){
    localStorage.removeItem('user_token');
    localStorage.removeItem('user_id')
    this.router.navigate(['userLogin'])
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

  userDetails(){
    this.userService.getProfile(this.userData).subscribe({
      next:(response: any)=>{
        console.log("This is data",response.user);
        this.userProfile = response.user
        if (!this.userProfile.age) {
          this.userProfile.age = this.age;
        }
      },
      error:(error: any) => {
        this.messageService.add({severity:'error',summary:'Error',detail: error.error.error})
      }
    })
  }

  bookedAppointments(){
    this.userService.getbookedNutris(this.userData).subscribe({
      next:(response: any) => {
        console.log("This is the respone",response)
        this.appointments = response.combinedData
      },
      error:(error: any) =>{
        this.messageService.add({severity:'error',summary:'Error',detail: error.error.error})
      }
    })
  }

  chat(nutri_id: string){
    this.router.navigateByUrl(`/chat/${nutri_id}`)
  }

  videoCall(nutri_id: string){
    this.router.navigateByUrl(`/uservideochat/${nutri_id}`)
  }

  saveProfile(){
    this.userService.saveProfile(this.userData,this.userProfile).subscribe({
      next:(respone:any) => {
        this.messageService.add({severity:'success',summary:'Success',detail: respone.message})
      },
      error:(error: any)=>{
        this.messageService.add({severity:'error',summary:'Error',detail: error.error.error})
      }
    })
  }

}

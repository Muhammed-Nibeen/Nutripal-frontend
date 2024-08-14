import { Component, OnInit } from '@angular/core';
import { Nutritionist, User } from '../../../interfaces/auth';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserService } from '../../../services/user.service';
import { jwtDecode } from 'jwt-decode';
import { NutritionistService } from '../../../services/nutritionist.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  jwttoken!:string|null
  nutriData!:Nutritionist
  nutritionistProfile:Nutritionist = {
    fullName: '',
    email: '',
    experience: '',
    specialization: '',
    _id: '',
    password: '',
    isblocked: false
  };

  isSaveEnabled = false;

  constructor(private router:Router,
    private nutriService:NutritionistService,
    private messageService: MessageService  
  ){}

  // Enable save button when any field is changed
  enableSave() {
    this.isSaveEnabled = true;
  }

  ngOnInit(): void {
    this.getToken()
    this.nutriDetails()
  }

  getToken(){
    if (typeof window!== 'undefined'){
      this.jwttoken = localStorage.getItem('nutri_token')
      if(this.jwttoken){
        const decode = jwtDecode(this.jwttoken)
        this.nutriData = decode as Nutritionist
      }
    }
  }

  nutriDetails(){
    this.nutriService.getProfile(this.nutriData).subscribe({
      next:(response: any)=>{
        console.log('This is the response',response.nutritionist);
        this.nutritionistProfile = response.nutritionist
      },
      error:(error: any) => {
        this.messageService.add({severity:'error',summary:'Error',detail: error.error.error})
      }
    })
  }

  // Save profile function (this would typically involve sending the data to a backend service)
  saveProfile() {
    this.nutriService.saveProfile(this.nutriData,this.nutritionistProfile).subscribe({
      next:(response:any) => {
        this.messageService.add({severity:'success',summary:'Success',detail: response.message})
        this.isSaveEnabled = false;
      },
      error:(error:any) => {
        this.messageService.add({severity:'error',summary:'Error',detail: error.error.error})
      }
    })
     // Disable the button after saving
  }
}

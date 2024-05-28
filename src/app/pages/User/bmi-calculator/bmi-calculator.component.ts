import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { MessageService } from 'primeng/api';
import { Bmi, User } from '../../../interfaces/auth';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-bmi-calculator',
  templateUrl: './bmi-calculator.component.html',
  styleUrl: './bmi-calculator.component.css'
})
export class BmiCalculatorComponent  {
  constructor(private router:Router,
    private fb: FormBuilder,
    private userService: UserService,
    private messageService:MessageService){}

  userData!:User
  jwttoken!:string|null

  logout(){
    localStorage.removeItem('user_token');
    this.router.navigate(['userLogin'])
  }

  bmiForm = this.fb.group({
    age:['',[Validators.required,Validators.pattern(/^\d+$/)]],
    height:['',[Validators.required,Validators.pattern(/^\d+(?:\.\d+)?$/)]],
    weight:['',[Validators.required,Validators.pattern(/^\d+(?:\.\d+)?$/)]],
    desweight:['',[Validators.required,Validators.pattern(/^\d+(?:\.\d+)?$/)]]
  })

  get age(){
    return  this.bmiForm.controls['age'];
  }  

  get weight(){
    return this.bmiForm.controls['weight']

  }

  get height(){
    return this.bmiForm.controls['height']
  }

  get desweight(){
    return this.bmiForm.controls['desweight']
  }

  bmiDetails(){
    const {age,height,weight,desweight} = this.bmiForm.value;
    this.jwttoken = localStorage.getItem('user_token')
    if(this.jwttoken){
      const decode = jwtDecode(this.jwttoken)
      this.userData = decode as User
    }

    const bmiData: Partial<Bmi> = {
      age: Number(age),
      height: Number(height),
      weight: Number(weight),
      desweight: Number(desweight)
    };
  
    this.userService.bmiCalculator(bmiData as Bmi,this.userData as User).subscribe({
      next:(response:any)=>{
        this.messageService.add({severity:'success',summary:'Success',detail: response.message})
        this.router.navigate(['showfood'])
      },
    error:(error: any)=>{
      this.messageService.add({severity:'error',summary:'Error',detail: error.error.error})
    }
    
  })
  }

}

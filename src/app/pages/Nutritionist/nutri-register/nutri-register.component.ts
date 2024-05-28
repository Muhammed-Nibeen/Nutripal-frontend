import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../services/auth.service';
import { passwordMatchValidator } from '../../../shared/password-match-directive';
import { Nutritionist } from '../../../interfaces/auth';
@Component({
  selector: 'app-nutri-register',
  templateUrl: './nutri-register.component.html',
  styleUrl: './nutri-register.component.css'
})
export class NutriRegisterComponent {
  nutriregisterForm = this.fb.group({
    fullName: ['',[Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    email: ['',[Validators.required,Validators.email]],
    password: ['',Validators.required],
    confirmPassword: ['',Validators.required]
  },{
    validators: passwordMatchValidator
  })

  constructor(private fb:FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router){}

    get fullName(){
      return this.nutriregisterForm.controls['fullName'];
    }
  
    get email(){
      return  this.nutriregisterForm.controls['email'];
    }
  
    get password(){
      return  this.nutriregisterForm.controls['password'];
    }
  
    get confirmPassword(){
      return  this.nutriregisterForm.controls['confirmPassword'];
    }
   
    submitDetails(){
      const postData = {...this.nutriregisterForm.value}
      delete postData.confirmPassword;
      localStorage.setItem('userData', JSON.stringify(postData));
      this.authService.registernutri(postData as Nutritionist).subscribe(
        (response: any) => {
          console.log(response)
            this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message });
            this.router.navigate(['nutriRegister/verify-otp'])
        },
        (error:any) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.error });
        }
      )
    }

}

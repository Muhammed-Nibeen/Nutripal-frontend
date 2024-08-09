import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApiResponse } from '../../../interfaces/apiResponse';

import { User } from '../../../interfaces/auth';
import { AuthService } from '../../../services/auth.service';
import { passwordMatchValidator } from '../../../shared/password-match-directive';

@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrl: './registeration.component.css'
})
export class RegisterationComponent {
  
  registerForm = this.fb.group({
    fullName: ['',[Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    email: ['',[Validators.required,Validators.email]],
    age: ['', [Validators.required, Validators.min(0)]],
    sex: ['', Validators.required],
    phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)]],
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
    return this.registerForm.controls['fullName'];
  }

  get email(){
    return  this.registerForm.controls['email'];
  }

  get password(){
    return  this.registerForm.controls['password'];
  }

  get confirmPassword(){
    return  this.registerForm.controls['confirmPassword'];
  }

  get age() {
    return this.registerForm.controls['age'];
  }

  get sex() {
    return this.registerForm.controls['sex'];
  }

  get phoneNumber() {
    return this.registerForm.controls['phoneNumber'];
  }

  submitDetails(){
    const postData = {...this.registerForm.value}
    delete postData.confirmPassword;
    localStorage.setItem('userData', JSON.stringify(postData));
    this.authService.registerUser(postData as unknown as User).subscribe(
      (response: any) => {
        console.log(response)
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message });
          this.router.navigate(['userRegister/verify-otp'])
      },
      (error:any) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.error });
      }
    )
    }
  }



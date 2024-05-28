import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-forgotpassotp',
  templateUrl: './forgotpassotp.component.html',
  styleUrl: './forgotpassotp.component.css'
})
export class ForgotpassotpComponent {
  forgotpassotpForm = this.fb.group({
    otp: ['',[Validators.required]], 
  })
  

  get otp(){
    return this.forgotpassotpForm.controls['otp'];
  }

  constructor(private fb:FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router:Router){}

  submit(){
    const email: any  = localStorage.getItem('email_id')
    const enteredOtp: any =  this.forgotpassotpForm.get('otp')?.value;
    this.authService.forgotverifyOtp(email as string,enteredOtp).subscribe(
      (response: any)=>{
        this.messageService.add({ severity:'success',summary:'Success',detail: response.message})
        this.router.navigate(['setpassword'])
      },
      error=>{
        this.messageService.add({severity:'error',summary:'Error',detail: error.error.error})
      }
    )
  }


}

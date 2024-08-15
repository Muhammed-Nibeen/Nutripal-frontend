import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrl: './forgotpass.component.css'
})
export class ForgotpassComponent {
  forgotpassForm = this.fb.group({
    email: ['',[Validators.required,Validators.email]]
  })

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService){}

  get email(){
    return this.forgotpassForm.controls['email']
  }

  forgotPass(){
    const email = this.forgotpassForm.value
    localStorage.setItem('email_id',JSON.stringify(email))
    this.authService.forgotPassword(email as string).subscribe(
      (response:any) => {
        this.router.navigate(['forgotpassotp'])
        this.messageService.add({severity:'success',summary:'Success',detail: response.message})
      },
      (error:any)=>{
        this.messageService.add({severity:'error',summary:'Error',detail: error.error.error})
      }
    )
  }

}

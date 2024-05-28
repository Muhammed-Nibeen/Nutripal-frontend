import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Nutritionist } from '../../../interfaces/auth';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-nutriverify-otp',
  templateUrl: './nutriverify-otp.component.html',
  styleUrl: './nutriverify-otp.component.css'
})
export class NutriverifyOtpComponent {
  constructor(private fb:FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router){}

    otpForm = this.fb.group({
      otp: ['',[Validators.required]], 
    })
    
    get otp(){
      return this.otpForm.controls['otp'];
    }

    submitOtp(){
      const userDataString: string | null = localStorage.getItem('userData')
      const userData: Nutritionist | null = userDataString ? JSON.parse(userDataString) as Nutritionist : null;
      const enteredOtp: any =  this.otpForm.get('otp')?.value;
      this.authService.nutriverifyOtp(JSON.stringify(userData), enteredOtp).subscribe(
        (response: any) =>{
          console.log(response)
          this.messageService.add({ severity: 'success',summary: 'Success',detail: response.message})
          this.router.navigate(['nutriLogin'])
          localStorage.removeItem('userData');
        },
        error=>{
          this.messageService.add({severity:'error',summary:'Error',detail: error.error.error})
        }
      
  
      )
    }

}

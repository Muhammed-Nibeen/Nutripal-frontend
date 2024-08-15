import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from '../../../interfaces/auth';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-otp-verify',
  templateUrl: './otp-verify.component.html',
  styleUrl: './otp-verify.component.css'
})
export class OtpVerifyComponent {

  value!: number
  remainingTime: number = 0;
  private timer: any;

  ngOnInit(): void{
    const expiresInSeconds = 60
    this.startTimer(expiresInSeconds)
  }

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
    const userData: User | null = userDataString ? JSON.parse(userDataString) as User : null;
    const enteredOtp: any =  this.otpForm.get('otp')?.value;
    this.authService.verifyOtp(JSON.stringify(userData), enteredOtp).subscribe(
      (response: any) =>{
        console.log(response)
        this.messageService.add({ severity: 'success',summary: 'Success',detail: response.message})
        this.router.navigate(['userLogin'])
        localStorage.removeItem('userData');
      },
      error=>{
        this.messageService.add({severity:'error',summary:'Error',detail: error.error.error})
      }

    )
  }

  startTimer(expiresInSeconds: number):void{
    this.remainingTime = expiresInSeconds
    this.timer = setInterval(()=>{
      if(this.remainingTime > 0){
        this.remainingTime--;
      }else{
        this.stopTimer()
      }
    },1000)
  }

  stopTimer():void{
    clearInterval(this.timer)
  }

  resendOtp(){
    const userData: string| null = localStorage.getItem('userData');
    if(userData !== null){
      const parsedUserData = JSON.parse(userData)
      this.authService.resendOtp(parsedUserData).subscribe(
        (response: any) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response.message });
        },
          (error: any)=>{
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.error });
          }
        
      )
    }
  }

}

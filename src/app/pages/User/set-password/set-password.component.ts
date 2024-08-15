import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../services/auth.service';
import { passwordMatchValidator } from '../../../shared/password-match-directive';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrl: './set-password.component.css'
})
export class SetPasswordComponent {

  changepassForm = this.fb.group({
    password:['',Validators.required],
    confirmPassword:['',Validators.required]
  },{
    validators: passwordMatchValidator
  })

  get password(){
    return  this.changepassForm.controls['password'];
  }

  get confirmPassword(){
    return  this.changepassForm.controls['confirmPassword'];
  }


  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router){}

  submitPassword(){
    const email: any = localStorage.getItem('email_id')
    const newPassword: any = this.changepassForm.value.confirmPassword
    this.authService.forgotpassChange(email as string,newPassword as string).subscribe(
      (response:any)=>{
        this.router.navigate(['userLogin'])
        this.messageService.add({severity:'success',summary:'Success',detail: response.message})
        localStorage.removeItem('email_id')
      },
      (error: any)=>{
        this.messageService.add({severity:'error',summary:'Error',detail: error.error.error})
      }
    )
  }

}

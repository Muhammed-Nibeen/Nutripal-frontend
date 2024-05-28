import { Component } from '@angular/core';
import { Form, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrl: './adminlogin.component.css'
})
export class AdminloginComponent {

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService){}

  adminloginForm = this.fb.group({
    email: ['',[Validators.required,Validators.email]],
    password:['',Validators.required]
  })

  get email(){
    return this.adminloginForm.controls['email']
  }
  
  get password(){
    return this.adminloginForm.controls['password']
  }

  adminloginDetails(){
    const {email,password} = this.adminloginForm.value
    this.authService.adminLogin(email as string,password as string).subscribe(
      (response: any) =>{
        sessionStorage.setItem('admin_token',response.token)
        localStorage.setItem('admin_token',response.token)
        // localStorage.setItem('admin',JSON.stringify(response.admin))
        this.router.navigate(['admindash'])
      },
      (error:any) =>{
        this.messageService.add({severity: 'error', summary: 'Error', detail:  error.error.error})
      }
    )
  }


}

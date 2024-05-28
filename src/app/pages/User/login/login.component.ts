import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { runInThisContext } from 'vm';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['',[Validators.required,Validators.email]],
    password:['',Validators.required]
  })

  get email(){
   return  this.loginForm.controls['email'];
  }

  get password(){
    return this.loginForm.controls['password']
  }

  

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService ) {}

    loginDetails() {
      const { email, password } = this.loginForm.value;
      this.authService.userLogin(email as string, password as string).subscribe(
        (response: any) => {
          console.log(response);
          if (response.message) {
            if (typeof localStorage !== 'undefined') {
              sessionStorage.setItem('user_token', response.token);
              localStorage.setItem('user_token', response.token);
              const data = localStorage.getItem('user_token')
              console.log("localStorage storage",data)
              localStorage.setItem('user', JSON.stringify(response.user));

              this.router.navigate(['userHome']);
            } else {
              console.error('localStorage is not available');
              
            }
          }
        },
        (error: any) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.error });
        }
      );
    }
    
}
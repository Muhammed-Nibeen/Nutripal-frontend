import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { runInThisContext } from 'vm';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-nutri-login',
  templateUrl: './nutri-login.component.html',
  styleUrl: './nutri-login.component.css'
})
export class NutriLoginComponent {
  nutriloginForm = this.fb.group({
    email: ['',[Validators.required,Validators.email]],
    password:['',Validators.required]
  })

  get email(){
    return  this.nutriloginForm.controls['email'];
   }
 
   get password(){
     return this.nutriloginForm.controls['password']
   }

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService ) {}

    loginDetails() {
      const { email, password } = this.nutriloginForm.value;
      this.authService.nutriLogin(email as string, password as string).subscribe(
        (response: any) => {
          console.log('This is res',response);
          if (response.message) {
            if (typeof localStorage !== 'undefined') {
              sessionStorage.setItem('nutri_token', response.token);
              localStorage.setItem('nutri_token', response.token);
              localStorage.setItem('nutri_id',response.user._id)
              
              
              const data = localStorage.getItem('nutri_token')
              console.log("localStorage storage",data)

              localStorage.setItem('user', JSON.stringify(response.user));

              this.router.navigate(['nutrihome']);
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

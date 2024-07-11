import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DailyIntake } from '../../../interfaces/auth';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-daily-intake',
  templateUrl: './daily-intake.component.html',
  styleUrl: './daily-intake.component.css'
})
export class DailyIntakeComponent {
  constructor(private router:Router,
    private fb: FormBuilder,
    private adminservice: AdminService,
    private messageService:MessageService) {}

    logout() {
      localStorage.removeItem('admin_token');
      this.router.navigate(['adminlogin'])
    }

    dailyintakeForm = this.fb.group({
      program:['',[Validators.required]],
      calories: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      protein: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      carbs: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      fats: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    })

    get program() {
      return this.dailyintakeForm.controls['program'];
    }
    get calories() {
      return this.dailyintakeForm.controls['calories'];
    }
    get protein() {
      return this.dailyintakeForm.controls['protein'];
    }
    get carbs() {
      return this.dailyintakeForm.controls['carbs'];
    }
    get fats() {
      return this.dailyintakeForm.controls['fats'];
    }

    onSubmit(){
      if(this.dailyintakeForm){
        this.adminservice.dailyIntake(this.dailyintakeForm.value as DailyIntake).subscribe({
          next: (response: any) => {
            if(response.message){
              this.dailyintakeForm.reset()
              this.messageService.add({severity:'success',summary:'Success',detail: response.message})
            }
          },
          error:(error: any)=>{
            this.messageService.add({severity:'error',summary:'Error',detail: error.error.error})
          }

        })
      }
    }

}

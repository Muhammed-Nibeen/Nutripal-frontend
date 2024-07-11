import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { MessageService } from 'primeng/api';
import { Appointment, Nutritionist } from '../../../interfaces/auth';
import { NutritionistService } from '../../../services/nutritionist.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-nutri-dashboard',
  templateUrl: './nutri-dashboard.component.html',
  styleUrl: './nutri-dashboard.component.css'
})
export class NutriDashboardComponent implements OnInit{

  jwttoken!: string|null
  nutriData!: Nutritionist

  logout(){
    localStorage.removeItem('nutri_token');
    localStorage.removeItem('nutri_id');
    this.router.navigate(['nutriLogin'])
  }
  
  ngOnInit(): void {
    this.getToken()
  }

  getToken() {
    if (typeof window!== 'undefined') {
      this.jwttoken = localStorage.getItem('nutri_token');
      if (this.jwttoken) {
        const decode = jwtDecode(this.jwttoken);
        this.nutriData = decode as Nutritionist;
      }
    }
  }
  

  constructor(private fb: FormBuilder,
    private messageService:MessageService,
    private router:Router,
    private nutritionistservice:NutritionistService){}

    appointmentForm = this.fb.group({
      date: ['', Validators.required],
      time: ['', [Validators.required,this.timeRangeValidator]]
    });
  
    timeRangeValidator(control: AbstractControl): { [key: string]: any } | null {
      const time = control.value;
      if (time) {
        const [hours, minutes] = time.split(':').map(Number);
        if (hours < 16 || hours > 22 || (hours === 22 && minutes > 0)) {
          return { 'timeRange': true };
        }
      }
      return null;
    }
    
    get date(){
      return this.appointmentForm.controls['date']
    }
    
    get time(){
      return this.appointmentForm.controls['time']
    }

    Onsubmit(){
      const data = this.appointmentForm.value
      const nutri_id = this.nutriData
      this.appointmentForm.reset()
      this.nutritionistservice.scheduleAppointment(data as Appointment,nutri_id as any).subscribe({
        next:(response:any)=>{
          this.messageService.add({severity: 'success', summary: 'Success', detail: response.message})
        },
        error:(error:any)=>{
          this.messageService.add({severity: 'error', summary: 'Error', detail:  error.error.error})
        }
      })
    }


} 

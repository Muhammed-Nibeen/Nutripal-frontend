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
  slots: string[]=[]

  logout(){
    localStorage.removeItem('nutri_token');
    localStorage.removeItem('nutri_id');
    this.router.navigate(['nutriLogin'])
  }
  
  ngOnInit(): void {
    this.getToken()
    
  }

  deleteSlot(index: number) {
    this.slots.splice(index, 1);
  }

  generateSlots() {
    const startTime = this.appointmentForm.controls['startTime'].value;
    const endTime = this.appointmentForm.controls['endTime'].value;
  
    if (startTime && endTime) {
      const start = this.parseTime(startTime);
      const end = this.parseTime(endTime);
  
      if (start && end && start < end) {
        this.slots = this.createSlots(start, end);
      } else {
        this.slots = [];
      }
    }
  }

  parseTime(time: string): Date | null {
    const [hours, minutes] = time.split(':').map(Number);
    if (!isNaN(hours) && !isNaN(minutes)) {
      const date = new Date();
      date.setHours(hours, minutes, 0, 0);
      return date;
    }
    return null;
  }
  
  createSlots(start: Date, end: Date): string[] {
    const slots: string[] = [];
    const slotDuration = 30 * 60 * 1000; // 30 minutes in milliseconds
  
    let currentTime = new Date(start);
  
    while (currentTime < end) {
      const nextTime = new Date(currentTime.getTime() + slotDuration);
      if (nextTime > end) break;
  
      const startSlot = this.formatTime(currentTime);
      const endSlot = this.formatTime(nextTime);
  
      slots.push(`${startSlot} - ${endSlot}`);
      currentTime = nextTime;
    }
  
    return slots;
  }

  formatTime(date: Date): string {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
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
      startTime: ['', Validators.required],
      endTime:['',Validators.required]
    });
  

    
    get date(){
      return this.appointmentForm.controls['date']
    }
    
    get startTime(){
      return this.appointmentForm.controls['startTime']
    }

    get endTime(){
      return this.appointmentForm.controls['endTime']
    }

    Onsubmit(){
      console.log('This is the slots',this.slots);
      
      const data = this.appointmentForm.value
      console.log(data);
      
      const nutri_id = this.nutriData
      this.nutritionistservice.scheduleAppointment(data as Appointment,nutri_id as Nutritionist,this.slots as string[]).subscribe({
        next:(response:any)=>{
          this.messageService.add({severity: 'success', summary: 'Success', detail: response.message})
          this.appointmentForm.reset()
        },
        error:(error:any)=>{
          this.messageService.add({severity: 'error', summary: 'Error', detail:  error.error.error})
        }
      })
    }


} 

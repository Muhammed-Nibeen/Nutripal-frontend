import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { Appointment, Nutritionist } from '../../../interfaces/auth';
import { NutritionistService } from '../../../services/nutritionist.service';
import { ConfirmationService,MessageService } from 'primeng/api';

@Component({
  selector: 'app-booked-slots',
  templateUrl: './booked-slots.component.html',
  styleUrl: './booked-slots.component.css'
})
export class BookedSlotsComponent implements OnInit{

  jwttoken!: string|null
  nutriData!: Nutritionist
  Appointments:Appointment[]=[]
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 0;
  visible: boolean = false;
  selectedAppointment: Appointment = {
    _id: '',
    user_id: '',
    nutri_id: '',
    date: '',
    time: '',
    end_time: '',
    status: '',
    // add other properties if needed
  };

  ngOnInit(): void {
    if(typeof window!== 'undefined'){
      this.jwttoken = localStorage.getItem('nutri_token')
      
      if(this.jwttoken){
        const decode = jwtDecode(this.jwttoken)
        this.nutriData = decode as Nutritionist
      }
    }
    this.getAppointment()
  }

  constructor(private nutritionistservice:NutritionistService,
    private messageService:MessageService,
    ){}

  getAppointment(){
    this.nutritionistservice.getUnbookedAppointment(this.nutriData,this.currentPage,this.itemsPerPage).subscribe({
        next: (response: any) => {
          this.Appointments = response.appoinments;
          this.totalPages = Math.ceil(response.totalcount / this.itemsPerPage)
          console.log('Appointments fetched:', this.Appointments);
        },
        error: (error: any) => {
         console.error('Error fetching appointments:', error);
         this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.error });
        }
      })
   }
 
   nextPage() {
     if (this.currentPage < this.totalPages) {
       this.currentPage++;
       this.getAppointment();
     }
   }
 
   prevPage() {
     if (this.currentPage > 1) {
       this.currentPage--;
       this.getAppointment();
     }
   }
 
   editAppointment(appointment:any){
    console.log('This is the appointemnt',appointment);
    const formattedDate = new Date(appointment.date).toISOString().split('T')[0];
    this.selectedAppointment = {...appointment,date: formattedDate}
    this.visible = true;
  }

  saveAppointment(){
    this.visible = false;
    const updatedAppointment: Appointment = {
      ...this.selectedAppointment,
      date: new Date(this.selectedAppointment.date).toISOString(), // Convert date back to ISO string
    };

  this.nutritionistservice.updateAppointment(updatedAppointment).subscribe({
      next:(response:any)=>{
        // this.Appointments = response.Appointment
        this.getAppointment()
        this.messageService.add({severity: 'success', summary: 'Success', detail: response.message})
      },
      error:(error)=>{
        this.messageService.add({severity: 'error', summary: 'Error', detail:  error.error.error})
      }
    })
  }
  
  deleteAppointment(appointmentId:any){
      console.log('This is a show',appointmentId);
      
      this.nutritionistservice.deleteAppointment(appointmentId,this.nutriData).subscribe({
        next:(response:any)=>{
          // this.Appointments = response.appointment
          this.getAppointment()
          this.messageService.add({severity: 'success', summary: 'Success', detail: response.message})
        },
        error:(error)=>{
          this.messageService.add({severity: 'error', summary: 'Error', detail:  error.error.error})
        }
      })
    }

}




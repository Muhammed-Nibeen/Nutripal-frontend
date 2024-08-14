import { Component, OnInit,ChangeDetectorRef  } from '@angular/core';
import {  FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { MessageService } from 'primeng/api';
import { catchError, throwError } from 'rxjs';


import { Nutritionist, ShowNutritionist, User, userAppointment } from '../../../interfaces/auth';
import { PaymentService } from '../../../services/payment.service';

import { UserService } from '../../../services/user.service';

declare var Razorpay: any


@Component({
  selector: 'app-consult',
  templateUrl: './consult.component.html',
  styleUrl: './consult.component.css'
})
export class ConsultComponent implements OnInit{
  
  visible: boolean = false;
  originalAppointments: ShowNutritionist[] = [];
  Appointment:ShowNutritionist[]=[]
  filteredAppointments: ShowNutritionist[] = [];
  nutri_id!:Nutritionist
  userData!:User
  jwttoken!:string|null
  appbtn:boolean = false
  paymentId: string | null = null
  price:number = 300
  appointmentId!:string
  bookingStarted: boolean = false;
  loading: boolean = false;
  availableSlots: any[] = [];
  selectedSlot: any = null;
  searchQuery: string = '';
  selectedSpecialization: string = '';
  currentPage = 1;
  itemsPerPage = 2;
  totalPages = 0;
  nutriId!: string

  constructor(private userService: UserService,
    private fb: FormBuilder,
    private messageService:MessageService,
    private router:Router,
    private paymentService:PaymentService,
   ){}

  consultOptForm = this.fb.group({
    option:['',[Validators.required]]
  })

  tableColumns = [
    { field: 'no', header: 'No' },
    { field: 'fullName', header: 'Nutritionist' },
    { field: 'email', header: 'Email' },
    { field: 'specialization', header: 'Specialization' },
    { field: 'experience', header: 'Experience' }
  ];
  

  tableActions = [
    {
      label: 'Show Slots',
      action: (row:   { _id: string }) => this.bookSlot(row._id),
      class: 'show-slots-btn'
    },
    {
      label: 'Show Profile',
      action: (row:   { _id: string }) => this.showProfile(row._id),
      class: 'show-profile-btn'
    }
  ];
  

  logout(){
    this.userService.logout()
  }
  
  ngOnInit(): void{
    this.getToken()
    this.getNutris()
  }


  getToken(){
    if (typeof window!== 'undefined'){
      this.jwttoken = localStorage.getItem('user_token')
      if(this.jwttoken){
        const decode = jwtDecode(this.jwttoken)
        this.userData = decode as User
      }
    }
  }

  getNutris(){
    this.userService.getNutris(this.currentPage,this.itemsPerPage).subscribe({
      next: (response: any) => {
        console.log(response.nutritionist);
        this.Appointment = response.nutritionist.map((item: any, index: number) => ({
          no: index + 1,
          ...item 
        }));
        this.totalPages = Math.ceil(response.totalcount / this.itemsPerPage)
        console.log("Combined data: ",this.Appointment)
        this.originalAppointments = [...this.Appointment]; // Copy original data
      },
      error: (error: any) => {
        console.error('Subscription error:', error);
      }
    });
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getNutris();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getNutris();
    }
  }

  onSearch(event: Event) {
    console.log('onSearch triggered'); // Check if the method is being called
    const keyboardEvent = event as KeyboardEvent;
    if (keyboardEvent.key === 'Enter') {
      console.log('Enter key pressed'); // Confirm Enter key detection
      const searchTerm = this.searchQuery.trim();
      console.log(`Searching for: ${searchTerm}`); // Log the search term
      if (searchTerm) {
        this.filteredAppointments = this.Appointment.filter((appointment) =>
          appointment.fullName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        console.log('Filtered appointments:', this.filteredAppointments); // Log filtered appointments
        this.Appointment = [...this.filteredAppointments]; // Update the Appointment array
      } else {
        this.getNutris(); // Reset to all nutritionists if no search term
      }
    }
  }
  
  filterBySpecialization(): void {
    if (this.selectedSpecialization) {
      this.Appointment = this.originalAppointments.filter(appointment =>
        appointment.specialization.trim().toLowerCase() === this.selectedSpecialization.trim().toLowerCase()
      );
    } else {
      this.Appointment = [...this.originalAppointments]; // Reset to original data
    }
  }
  
  

  showProfile(nutritionistId: string){
    this.router.navigateByUrl(`/nutriprofile/${nutritionistId}`)
  }

  bookSlot(nutritionistId:string){
    this.nutriId = nutritionistId
    console.log("This is the appointment id",nutritionistId)
    this.visible = true;
    const userId = this.userData
    this.userService.getAvailableSlots(nutritionistId).subscribe({
      next:(response:any)=>{
          console.log('this is slots',response.slots,this.availableSlots);          
          this.availableSlots = response.slots;
          this.messageService.add({severity:'success',summary:'Success',detail: response.message})
      },
      error:(error:any)=>{
        // this.messageService.add({severity:'error',summary:'Error',detail: error.error.error})
      }
    })
  }

  selectSlot(slot: any) {
    this.selectedSlot = slot;
  }

  onProceedToPay(slotId:string){
    console.log('Proceeding to pay for slot:', slotId);
    this.appointmentId = slotId
    const selectedOption = this.consultOptForm.get('option')?.value
    console.log(selectedOption)
    this.visible = false;

    const razorPayOptions = {
      currency: 'INR',
      amount: this.price * 100,
      name: 'Nutripal',
      key: 'rzp_test_jHotBnTKoHrYXJ',
      theme: {
        color: '#3b28fe'
      },
      modal: {
        ondismiss: () => { }
      },
      handler: ((response: any) => {
        if (response) {
          if (response.razorpay_payment_id) {
            this.handlePaymentSucess(response.razorpay_payment_id)
          }
        }
      })
    }

    Razorpay.open(razorPayOptions); 

  
  }

    handlePaymentSucess(paymentId: string){
      
    console.log("htis is payment",paymentId)
    const userId = this.userData
    const appointmentid = this.appointmentId
    
    this.loading = true;

    this.paymentService.paymentSuccess(paymentId, userId,this.price,appointmentid,this.nutriId).subscribe({
      next: (response: any) => {
        this.messageService.add({severity:'success',summary:'Success',detail: response.message})
        console.log('Response from backend', response); // Debug log for response
        this.Appointment = response.nutritionist.map((item: any, index: number) => ({
          no: index + 1,
          ...item
        }));
      },
      error:(error: any)=>{
        this.messageService.add({severity:'error',summary:'Error',detail: error.error.error})
      }
    })
  }
 
 
 
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bookings, User } from '../../../interfaces/auth';
import { MessageService } from 'primeng/api';
import { jwtDecode } from 'jwt-decode';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent implements OnInit{

  jwttoken!:string|null
  userData!:User
  Appointment:Bookings[]=[]
  currentPage = 1;
  itemsPerPage = 2;
  totalPages = 0;
  
  constructor(private router:Router,
    private messageService:MessageService,
    private userService: UserService){}
  ngOnInit(): void {
    this.getToken()

    this.getBookings()


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

  getBookings(){
    this.userService.getBookings(this.userData,this.currentPage,this.itemsPerPage).subscribe({
      next: (response: any) => {
      this.Appointment = response.transformedAppointments
      this.totalPages = Math.ceil(response.totalcount / this.itemsPerPage)
      console.log('bookings',this.Appointment);
      }
    });
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getBookings();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getBookings();
    }
  }

  logout(){
    localStorage.removeItem('user_token');
    localStorage.removeItem('user_id')
    localStorage.removeItem('user_refreshToken')
    this.router.navigate(['userLogin'])
  }

  downloadPrescription(appointmentId: string) {
    this.userService.downloadPdf(appointmentId).subscribe({
      next: (response: Blob) => {
      const url = window.URL.createObjectURL(response);
      const link = document.createElement('a');
      link.href = url;
      link.download = `prescription-${appointmentId}.pdf`;
      link.click();
      window.URL.revokeObjectURL(url);
      console.log('bookings',this.Appointment);
      },
      error: (error: any) => {
        console.error('Subscription error:', error);
      }
    });
  }

}

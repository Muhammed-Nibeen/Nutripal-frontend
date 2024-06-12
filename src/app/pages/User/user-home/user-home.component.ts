import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { PaymentService } from '../../../services/payment.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent {
  constructor(private router:Router,
    ){}
  logout(){
    localStorage.removeItem('user_token');
    this.router.navigate(['userLogin'])
  }

  // bookSlot(){
  //   this.paymentService.paymentPay().subscribe({
  //     next:(response:any)=>{
  //       if (response && response.url) {
  //         window.location.href = response.url; // Redirect to PayPal
  //       } else {
  //         console.error('Error creating PayPal payment');
  //       }
  //     }
  //   })
  // }

}

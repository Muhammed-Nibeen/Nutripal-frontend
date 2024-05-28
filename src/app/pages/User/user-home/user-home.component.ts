import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent {
  constructor(private router:Router){}
  logout(){
    localStorage.removeItem('user_token');
    this.router.navigate(['userLogin'])
  }
}

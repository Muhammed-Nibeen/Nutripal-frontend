import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nutri-dashboard',
  templateUrl: './nutri-dashboard.component.html',
  styleUrl: './nutri-dashboard.component.css'
})
export class NutriDashboardComponent {
  logout(){
    localStorage.removeItem('nutri_token');
    this.router.navigate(['nutriLogin'])
  }
  constructor(private router:Router){}
}

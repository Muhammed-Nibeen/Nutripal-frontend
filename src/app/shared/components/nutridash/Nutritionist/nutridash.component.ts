import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nutridash',
  templateUrl: './nutridash.component.html',
  styleUrl: './nutridash.component.css'
})
export class NutridashComponent {
  logout(){
    localStorage.removeItem('nutri_token');
    this.router.navigate(['nutriLogin'])
  }
  constructor(private router:Router){}
  
}

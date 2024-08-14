import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { MessageService } from 'primeng/api';
import { Nutritionist, RevenueRecord } from '../../../interfaces/auth';
import { NutritionistService } from '../../../services/nutritionist.service';

@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrl: './revenue.component.css'
})
export class RevenueComponent implements OnInit{

  revenueData: RevenueRecord[] = []
  jwttoken!: string|null
  nutriData!: Nutritionist
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 0;

  ngOnInit():void{
    if(typeof window!== 'undefined'){
      this.jwttoken = localStorage.getItem('nutri_token')
      
      if(this.jwttoken){
        const decode = jwtDecode(this.jwttoken)
        this.nutriData = decode as Nutritionist
      }
    }
    this.getRevenue()
  }
  
  constructor(private nutritionistservice:NutritionistService,
    private messageService:MessageService,
    ){}

  getRevenue(){
    this.nutritionistservice.getRevenue(this.nutriData,this.currentPage,this.itemsPerPage).subscribe({
      next: (response: any) => {
        this.revenueData = response.revenue;
        this.totalPages = Math.ceil(response.totalcount / this.itemsPerPage)
        console.log('Appointments fetched:', this.revenueData);
      },
      error: (error: any) => {
       this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.error });
      }
    })
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getRevenue();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getRevenue();
    }
  }

}

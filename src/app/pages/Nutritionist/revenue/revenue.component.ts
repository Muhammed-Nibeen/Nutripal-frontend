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
  filteredRevenueData: RevenueRecord[] = [];
  jwttoken!: string|null
  nutriData!: Nutritionist
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 0;
  startDate!: string | null;
  endDate!: string | null;
  isFiltered = false;

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

  filterRevenue() {
    if (this.startDate && this.endDate) {
      const start = new Date(this.startDate).getTime();
      const end = new Date(this.endDate).getTime();
      console.log('Start and end',start,end)
      this.filteredRevenueData = this.revenueData.filter((record) => {
        const recordDate = new Date(record.date).getTime();
        return recordDate >= start && recordDate <= end;
      });
      this.isFiltered = true; 
      console.log('Filtered record',this.filteredRevenueData)
    } else {
      this.isFiltered = false;
      this.filteredRevenueData = [...this.revenueData]; // Reset to all data if no date range selected
    }
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

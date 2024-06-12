import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';


import { AdminDashboardComponent } from '../../pages/Admin/admin-dashboard/admin-dashboard.component';
import { ViewNutritionistComponent } from '../../pages/Admin/view-nutritionist/view-nutritionist.component';
import { AddFoodComponent } from '../../pages/Admin/add-food/add-food.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card'; 
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

import { DialogModule } from 'primeng/dialog';
import { AdminloginComponent } from '../../pages/Admin/adminlogin/adminlogin.component';


@NgModule({
  declarations: [
    
    AdminDashboardComponent,
    ViewNutritionistComponent,
    AddFoodComponent,
    AdminloginComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ButtonModule,
    CardModule,
    ReactiveFormsModule,
    DialogModule,
  ]
})
export class AdminModule { }

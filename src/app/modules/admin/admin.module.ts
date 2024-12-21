import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';


import { AdminDashboardComponent } from '../../pages/Admin/admin-dashboard/admin-dashboard.component';
import { ViewNutritionistComponent } from '../../pages/Admin/view-nutritionist/view-nutritionist.component';
import { AddFoodComponent } from '../../pages/Admin/add-food/add-food.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card'; 
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

import { DialogModule } from 'primeng/dialog';
import { AdminloginComponent } from '../../pages/Admin/adminlogin/adminlogin.component';
import { DailyIntakeComponent } from '../../pages/Admin/daily-intake/daily-intake.component';
import { FoodViewComponent } from '../../pages/Admin/food-view/food-view.component';

import { ConfirmPopupModule } from 'primeng/confirmpopup';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    ViewNutritionistComponent,
    AddFoodComponent,
    AdminloginComponent,
    DailyIntakeComponent,
    FoodViewComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ButtonModule,
    CardModule,
    ReactiveFormsModule,
    DialogModule,
    BrowserAnimationsModule, 
    ConfirmDialogModule,    
    ToastModule,
    ConfirmPopupModule  
  ]
})
export class AdminModule { }

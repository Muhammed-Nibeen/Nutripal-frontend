import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NutritionistRoutingModule } from './nutritionist-routing.module';
import { NutritionistComponent } from './nutritionist.component';
import { NutriRegisterComponent } from '../../pages/Nutritionist/nutri-register/nutri-register.component';
import { NutriverifyOtpComponent } from '../../pages/Nutritionist/nutriverify-otp/nutriverify-otp.component';
import { NutriLoginComponent } from '../../pages/Nutritionist/nutri-login/nutri-login.component';

import { ShowAppointmentsComponent } from '../../pages/Nutritionist/show-appointments/show-appointments.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card'; 
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

import { DialogModule } from 'primeng/dialog';
import { NutridashComponent } from '../../shared/components/nutridash/Nutritionist/nutridash.component';
import { NutriDashboardComponent } from '../../pages/Nutritionist/nutri-dashboard/nutri-dashboard.component';
import { ChatComponent } from '../../pages/Nutritionist/chat/chat.component';
import { VideoCallComponent } from '../../pages/Nutritionist/video-call/video-call.component';
import { BookedSlotsComponent } from '../../pages/Nutritionist/booked-slots/booked-slots.component';
import { VideocallEndComponent } from '../../pages/User/videocall-end/videocall-end.component';


@NgModule({
  declarations: [
    NutritionistComponent,
    NutriRegisterComponent,
    NutriverifyOtpComponent,
    NutriLoginComponent,
    NutridashComponent,
    NutriDashboardComponent,
    ShowAppointmentsComponent,
    ChatComponent,
    VideoCallComponent,
    BookedSlotsComponent,
  ],
  imports: [
    CommonModule,
    NutritionistRoutingModule,
    FormsModule,
    ButtonModule,
    CardModule,
    ReactiveFormsModule,
   
    DialogModule,
    
  ]
})
export class NutritionistModule { }

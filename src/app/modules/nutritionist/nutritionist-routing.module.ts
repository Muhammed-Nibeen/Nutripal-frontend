import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from '../../pages/Nutritionist/chat/chat.component';
import { NutriDashboardComponent } from '../../pages/Nutritionist/nutri-dashboard/nutri-dashboard.component';
import { NutriLoginComponent } from '../../pages/Nutritionist/nutri-login/nutri-login.component';
import { NutriRegisterComponent } from '../../pages/Nutritionist/nutri-register/nutri-register.component';
import { NutriverifyOtpComponent } from '../../pages/Nutritionist/nutriverify-otp/nutriverify-otp.component';
import { ShowAppointmentsComponent } from '../../pages/Nutritionist/show-appointments/show-appointments.component';
import { NutritionistComponent } from './nutritionist.component';

const routes: Routes = [{path:'nutriregister',component:NutriRegisterComponent},
{path:'nutriRegister/verify-otp',component:NutriverifyOtpComponent},
{path:'nutriLogin',component:NutriLoginComponent},
{path:'nutrihome',component:NutriDashboardComponent},
{path:'showappointment',component:ShowAppointmentsComponent},
{path:'nutrichat/:id',component:ChatComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NutritionistRoutingModule { }

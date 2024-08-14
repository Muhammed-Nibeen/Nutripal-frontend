import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuardForLoggedNutritionist, nutritionistblockGuard } from '../../guards/nutritionist.guard';
import { BookedSlotsComponent } from '../../pages/Nutritionist/booked-slots/booked-slots.component';
import { ChatComponent } from '../../pages/Nutritionist/chat/chat.component';
import { NutriDashboardComponent } from '../../pages/Nutritionist/nutri-dashboard/nutri-dashboard.component';
import { NutriLoginComponent } from '../../pages/Nutritionist/nutri-login/nutri-login.component';
import { NutriRegisterComponent } from '../../pages/Nutritionist/nutri-register/nutri-register.component';
import { NutriverifyOtpComponent } from '../../pages/Nutritionist/nutriverify-otp/nutriverify-otp.component';
import { ProfileComponent } from '../../pages/Nutritionist/profile/profile.component';
import { RevenueComponent } from '../../pages/Nutritionist/revenue/revenue.component';
import { ShowAppointmentsComponent } from '../../pages/Nutritionist/show-appointments/show-appointments.component';
import { VideoCallComponent } from '../../pages/Nutritionist/video-call/video-call.component';


const routes: Routes = [{path:'nutriregister',component:NutriRegisterComponent},
{path:'nutriRegister/verify-otp',component:NutriverifyOtpComponent},
{path:'nutriLogin',component:NutriLoginComponent,canActivate:[authGuardForLoggedNutritionist]},
{path:'nutrihome',component:NutriDashboardComponent,canActivate:[nutritionistblockGuard]},
{path:'showappointment',component:ShowAppointmentsComponent},
{path:'nutrichat/:id',component:ChatComponent},
{path:'videocall/:id',component:VideoCallComponent},
{path:'bookedslots',component:BookedSlotsComponent},
{path:'nutriprofile',component:ProfileComponent},
{path:'revenue',component:RevenueComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NutritionistRoutingModule { }

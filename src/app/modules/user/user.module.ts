import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { RegisterationComponent } from '../../pages/User/registeration/registeration.component';
import { LoginComponent } from '../../pages/User/login/login.component';
import { OtpVerifyComponent } from '../../pages/User/otp-verify/otp-verify.component';
import { UserHomeComponent } from '../../pages/User/user-home/user-home.component';
import { ForgotpassComponent } from '../../pages/User/forgotpass/forgotpass.component';
import { ForgotpassotpComponent } from '../../pages/User/forgotpassotp/forgotpassotp.component';
import { SetPasswordComponent } from '../../pages/User/set-password/set-password.component';
import { BmiCalculatorComponent } from '../../pages/User/bmi-calculator/bmi-calculator.component';
import { ShowfoodComponent } from '../../pages/User/showfood/showfood.component';
import { ConsultComponent } from '../../pages/User/consult/consult.component';
import { Beef, Croissant, LucideAngularModule, Utensils } from 'lucide-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card'; 
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ChatComponent } from '../../pages/User/chat/chat.component';
import { AboutUsComponent } from '../../pages/User/about-us/about-us.component';
import { ProfileComponent } from '../../pages/User/profile/profile.component';
import { UserProgressComponent } from '../../pages/User/user-progress/user-progress.component';
import { ShareButton } from 'ngx-sharebuttons/button';
import { ShareButtonDirective } from 'ngx-sharebuttons';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { VideochatComponent } from '../../pages/User/videochat/videochat.component';
import { BookingComponent } from '../../pages/User/booking/booking.component';
import { ReusableTableComponent } from '../../shared/components/reusable-table/reusable-table.component';
import { VideocallEndComponent } from '../../pages/User/videocall-end/videocall-end.component';
import { NutriProfileComponent } from '../../pages/User/nutri-profile/nutri-profile.component';


@NgModule({
  declarations: [
    UserComponent,
    RegisterationComponent,
    LoginComponent,
    OtpVerifyComponent,
    UserHomeComponent,
    ForgotpassComponent,
    ForgotpassotpComponent,
    SetPasswordComponent,
    BmiCalculatorComponent,
    ShowfoodComponent,
    ConsultComponent,
    ChatComponent,
    AboutUsComponent,
    ProfileComponent,
    UserProgressComponent,
    VideochatComponent,
    BookingComponent,
    ReusableTableComponent,
    VideocallEndComponent,
    NutriProfileComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    LucideAngularModule.pick({Utensils, Beef,Croissant}),
    FormsModule,
    ButtonModule,
    CardModule,
    ReactiveFormsModule,
    DialogModule,
    ShareButton,
    ShareButtonDirective,
    FaIconComponent,
    
  ],
  
})
export class UserModule { }

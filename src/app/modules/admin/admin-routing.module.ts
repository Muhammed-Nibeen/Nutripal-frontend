import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminAuthGuardGuard, authGuardForLoggedAdmin } from '../../guards/admin-auth-guard.guard';
import { AddFoodComponent } from '../../pages/Admin/add-food/add-food.component';
import { AdminDashboardComponent } from '../../pages/Admin/admin-dashboard/admin-dashboard.component';
import { AdminloginComponent } from '../../pages/Admin/adminlogin/adminlogin.component';
import { DailyIntakeComponent } from '../../pages/Admin/daily-intake/daily-intake.component';
import { FoodViewComponent } from '../../pages/Admin/food-view/food-view.component';
import { ViewNutritionistComponent } from '../../pages/Admin/view-nutritionist/view-nutritionist.component';
import { AdminComponent } from './admin.component';

const routes: Routes = [ {path:'adminlogin',component:AdminloginComponent,canActivate:[authGuardForLoggedAdmin]},
{path:'admindash',component:AdminDashboardComponent,canActivate:[adminAuthGuardGuard]},
{path:'viewnutritionist',component:ViewNutritionistComponent,canActivate:[adminAuthGuardGuard]},
{path:'addfood',component:AddFoodComponent,canActivate:[adminAuthGuardGuard]},
{path:'dailyintake',component:DailyIntakeComponent},
{path:'viewfood',component:FoodViewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

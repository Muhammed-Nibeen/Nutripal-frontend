import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DailyIntake, Food, User } from '../interfaces/auth';
import { HttpClient } from '@angular/common/http';
import { AddFood, AdminGetNutris, AdminGetUser, AdminManageNutris, AdminManageUsers, SearchEmail, ToogleBreakfast, ToogleDinner, ToogleLunch, UpdateFood } from '../interfaces/auth2';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  getUsers(page:number,limit:number):Observable<AdminGetUser>{
    return this.http.get<AdminGetUser>(`${this.baseUrl}/admin/getUsers?page=${page}&limit=${limit}`)
  }

  manageUsers(userid: string):Observable<AdminManageUsers>{
    return this.http.put<AdminManageUsers>(`${this.baseUrl}/admin/manageUsers/${userid}`,{})
  }

  getnutris():Observable<AdminGetNutris>{
    return this.http.get<AdminGetNutris>(`${this.baseUrl}/admin/getNutris`)
  }

  managenutri(userid: string):Observable<AdminManageNutris>{
    return this.http.put<AdminManageNutris>(`${this.baseUrl}/admin/managenutri/${userid}`,{})
  }

  searchbyEmail(Email: string): Observable<any>{
    return this.http.post(`${this.baseUrl}/admin/searchUser`,{Email})
  }  

  addFood(formdata:FormData):Observable<AddFood>{
    return this.http.post<AddFood>(`${this.baseUrl}/admin/addfood`, formdata)
  }
  
  dailyIntake(dailyIntake:DailyIntake):Observable<DailyIntake>{
    return this.http.post<DailyIntake>(`${this.baseUrl}/admin/dailyintake`,dailyIntake)
  }

  toogleBreakfast():Observable<ToogleBreakfast>{
    return this.http.get<ToogleBreakfast>(`${this.baseUrl}/admin/tooglebreakfast`)
  }

  toogleLunch():Observable<ToogleLunch>{ 
    return this.http.get<ToogleLunch>(`${this.baseUrl}/admin/tooglelunch`)
  }

  toogleDinner():Observable<ToogleDinner>{
    return this.http.get<ToogleDinner>(`${this.baseUrl}/admin/toogledinner`)
  }

  updateFood(foodId: string,foodData: any):Observable<UpdateFood>{
    return this.http.post<UpdateFood>(`${this.baseUrl}/admin/updatefood/${foodId}`,{foodData})
  }

}
                                          
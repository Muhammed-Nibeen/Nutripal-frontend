import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Food, User } from '../interfaces/auth';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  getUsers(page:number,limit:number):Observable<any>{
    return this.http.get(`${this.baseUrl}/admin/getUsers?page=${page}&limit=${limit}`)
  }

  manageUsers(userid: string):Observable<any>{
    return this.http.put(`${this.baseUrl}/admin/manageUsers/${userid}`,{})
  }

  getnutris():Observable<any>{
    return this.http.get(`${this.baseUrl}/admin/getNutris`)
  }

  managenutri(userid: string):Observable<any>{
    return this.http.put(`${this.baseUrl}/admin/managenutri/${userid}`,{})
  }

  searchbyEmail(Email: string): Observable<any>{
    return this.http.post(`${this.baseUrl}/admin/searchUser`,{Email})
  }  

  addFood(formdata:FormData):Observable<any>{
 
    return this.http.post(`${this.baseUrl}/admin/addfood`, formdata)
  }

}
                                          
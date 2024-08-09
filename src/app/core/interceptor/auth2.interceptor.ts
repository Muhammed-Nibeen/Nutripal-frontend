import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, iif } from 'rxjs';
import { catchError, switchMap, filter, take, finalize } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private authService: AuthService,@Inject(PLATFORM_ID)private platformId: Object) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    let userData: string | null = null;

    // Check if we're in the browser environment
    if (isPlatformBrowser(this.platformId)) {
      userData = localStorage.getItem('user_token');
      console.log("This is userdata", userData);
    }
    if(userData){
      req =this.addToken(req,userData)
    }
    return next.handle(req).pipe(
      catchError((error:any)=>{
        if(error instanceof HttpErrorResponse && error.status === 401){
          return this.handle401Error(req,next)
        }
        return throwError(error)
      })
    );
  }

  private addToken(req: HttpRequest<any>,userData: string){
    return req.clone({
      setHeaders:{
        Authorization:`Bearer ${userData}`
      }
    })
  }

  private handle401Error(req:HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>>{
    alert('Session over!Stll want to continue?')
    if(!this.isRefreshing){
      this.isRefreshing = true
      this.refreshTokenSubject.next(null);
      
      return this.authService.refreshToken().pipe(
        switchMap((res:any)=>{
          localStorage.setItem('user_token', res.accessToken)
          this.isRefreshing =false
          alert(res.message)
          this.refreshTokenSubject.next(res.accessToken)
          return next.handle(this.addToken(req,res.accessToken))
        }),
        catchError((error)=>{
          this.isRefreshing = false;
          return throwError(()=>error)
        }),
        finalize(()=>{
          this.isRefreshing = false; 
        })
      );
    }
    else{
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.addToken(req,jwt))
        })
      )
    }
  }
}
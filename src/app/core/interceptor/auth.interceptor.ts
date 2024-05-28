// import { Injectable } from '@angular/core';
// import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {

//   constructor() {}

//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const userData = localStorage.getItem('user_token');
//     console.log("This is userdata",userData)
//     if (userData) {
//       request = request.clone({
//         setHeaders: {
//           Authorization: `Bearer ${userData}`
//         }
//       });
//     }
//     return next.handle(request);
//   }
// }

// import { Injectable } from '@angular/core';
// import { tap, delay } from 'rxjs/operators';
// import { environment }                             from "../environments/environment";
// import { Http, Headers, Response, RequestOptions} from '@angular/http';
// import { Observable} from 'rxjs';
// import { map } from 'rxjs/operators';
// import {HttpClient, HttpHeaders} from '@angular/common/http';

// @Injectable()
// export class AuthService {
//   isLoggedIn = false;
//   private env: any = environment;
//   private authorities: string[] = []; 
//   private username: string;
//   private token: string;
  
  

//   // store the URL so we can redirect after logging in
//   redirectUrl: string;

//   constructor(public http: Http) {
//     // var currentUser = JSON.parse(localStorage.getItem('CurrentUser'));
//     //     this.token = currentUser && currentUser.token;
//     //     this.authorities = currentUser && currentUser.authorities;
//     //     this.username = currentUser && currentUser.username;
//   }


//   /*
//   login(): Observable<boolean> {
//     return of(true).pipe(
//       delay(1000),
//       tap(val => this.isLoggedIn = true)
//     );
//   }*/

//   login(user){
//     let headers = new Headers;
//     headers.append('Content-Type','application/json');
//     let options = new RequestOptions({ headers: headers });
//     return this.http.post(this.env.api + "/auth", user, options).pipe(map(response => 
//             {
//             this.token = response.json() && response.json().token;
//             if (this.token) {
//                 // Set to LocalStorage of CurrentUser
//                 localStorage.setItem('CurrentUser', JSON.stringify({token: this.token}));
//                 return true;
//             }
//             return false;
//         } 
//     ));
//   }

//   getMenu(username, token){
    
//     let headers = new Headers;
//     headers.append('Content-Type','application/json');
//     headers.append('Authorization','Bearer ' + token+'');
//     let options = new RequestOptions({ headers: headers });
    
//     return this.http.get(this.env.api + "/user", options).pipe(map(response => {
      
//       console.log('Response User Service', response);

//       // Get user info
//       this.authorities = response.json() && response.json().authorities;
//       this.username = response.json() && response.json().username;

//       // Set to CurrentUser values
//       localStorage.setItem('CurrentUser', JSON.stringify({ username: this.username, token: token, authorities: this.authorities}));

//       console.log('Response User Service values:', " Token: "+token+" Username: "+this.username+" Authorities: "+this.authorities);
//       return true;

//     }));
//   }

//   logout(): void {
//     this.isLoggedIn = false;
//   }
// }

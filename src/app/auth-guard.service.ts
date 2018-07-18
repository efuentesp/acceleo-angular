import { Injectable }       from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  NavigationExtras,
  CanLoad, Route
}                           from '@angular/router';
//import { AuthService }      from './auth.service';
import { AuthenticationService } from './authentication.component.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  
  //private anchor: string ='';
  
  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    console.log('Usuario:', localStorage.getItem('currentUser'));

        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page
        this.router.navigate(['/login']);
        return false;
        
    // let url: string = state.url;
    // console.log ("Entra canActivate url:", url);
    // return this.checkLogin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): boolean {
    let url = `/${route.path}`;
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {

    if (this.authService.loading) { return true; }
    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;
    // Create a dummy session id
    let sessionId = 123456789;

    //if (localStorage.getItem('currentUser')) {
      //return true;
      //console.log('LocalStorage',localStorage);
      //this.anchor = localStorage.getItem('token');
      //console.log("Valor de anchor", this.anchor);
    //}

    // Set our navigation extras object
    // that contains our global query params and fragment
     let navigationExtras: NavigationExtras = {
       queryParams: { 'session_id': sessionId },
       fragment: 'token'
    //   //fragment: this.authService.token
    };

    // Navigate to the login page with extras
    this.router.navigate(['/login'], navigationExtras);
    //this.router.navigate(['/login']);
    return false;
  }
}

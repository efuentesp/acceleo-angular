import { Component } from '@angular/core';
import { User } from './user/user.component.model';
import { AuthenticationService } from '../authentication.component.service';
import { Router, NavigationExtras } from '@angular/router';
import { Authority } from '../user/authorities.component.model';

@Component({
  templateUrl: 'admin.components.html'
})
export class AdminComponent {

  public userAdmin: User;
  public valueName: string;
  public token: string;
  public authorityList: Authority [];
  public username: string;

// Menu activation
// Menu
  private menu_mgmnt: boolean = false;
  private menu: boolean = false;
// Application
  private application_mgmnt: boolean = false;
  private application: boolean = false;
// Functionalservice
  private functionalservice_mgmnt: boolean = false;
  private functionalservice: boolean = false;
// Module
  private module_mgmnt: boolean = false;
  private module: boolean = false;


  // Admin
  private manage: boolean = false;
  // Authority
  private authority: boolean = false;
  private authority_mgmnt: boolean = false;
  // User
  private user: boolean = false;
  private user_mgmnt: boolean = false;


  constructor(public authService: AuthenticationService, public router: Router) {
  }

  ngOnInit() {

    
    // Get token from user object
    this.userAdmin = JSON.parse(localStorage.getItem('currentUser'));
    

    this.authService.getMenu(this.userAdmin.token).subscribe(result => {
    // Fill the user object
    this.userAdmin = JSON.parse(localStorage.getItem('currentUser'));
    this.valueName = this.userAdmin.firstname + " " + this.userAdmin.lastname ;
    this.enabledLinks(this.userAdmin);

    this.buildMenu(this.userAdmin.authorities);

    });
  }

  enabledLinks(user){
  }

  buildMenu(authorities){
    authorities.forEach(element => {

      if (element.authority == 'ROLE_MENUSEARCH'){
        this.menu_mgmnt = true;
      }
      if (element.authority == 'ROLE_MENUCREATE'){
        this.menu = true;
      }

      if (element.authority == 'ROLE_APPLICATIONSEARCH'){
        this.application_mgmnt = true;
      }
      if (element.authority == 'ROLE_APPLICATIONCREATE'){
        this.application = true;
      }

      if (element.authority == 'ROLE_FUNCTIONALSERVICESEARCH'){
        this.functionalservice_mgmnt = true;
      }
      if (element.authority == 'ROLE_FUNCTIONALSERVICECREATE'){
        this.functionalservice = true;
      }

      if (element.authority == 'ROLE_MODULESEARCH'){
        this.module_mgmnt = true;
      }
      if (element.authority == 'ROLE_MODULECREATE'){
        this.module = true;
      }

 
      // Manage  --> (6)
      if (element.authority == 'ROLE_MANAGESEARCH'){
      this.manage = true;
      }

      // authority  --> (6)
      if (element.authority == 'ROLE_AUTHORITYSEARCH'){
        this.authority_mgmnt = true;
      }
      if (element.authority == 'ROLE_AUTHORITYCREATE'){
        this.authority = true;
      }

      // user  --> (5)
      if (element.authority == 'ROLE_USERSEARCH'){
        this.user_mgmnt = true;
      }
      if (element.authority == 'ROLE_USERCREATE'){
        this.user = true;
      }

    });

  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('currentUser');
    this.router.navigate( ['login' ]); 
}


}

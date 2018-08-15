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
// Tasadeinteres
  private tasadeinteres_mgmnt: boolean = false;
  private tasadeinteres: boolean = false;
// Planta
  private planta_mgmnt: boolean = false;
  private planta: boolean = false;
// Cuentadeahorro
  private cuentadeahorro_mgmnt: boolean = false;
  private cuentadeahorro: boolean = false;
// Empresa
  private empresa_mgmnt: boolean = false;
  private empresa: boolean = false;
// Departamento
  private departamento_mgmnt: boolean = false;
  private departamento: boolean = false;
// Aportacion
  private aportacion_mgmnt: boolean = false;
  private aportacion: boolean = false;


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

      if (element.authority == 'ROLE_TASADEINTERESSEARCH'){
        this.tasadeinteres_mgmnt = true;
      }
      if (element.authority == 'ROLE_TASADEINTERESCREATE'){
        this.tasadeinteres = true;
      }

      if (element.authority == 'ROLE_PLANTASEARCH'){
        this.planta_mgmnt = true;
      }
      if (element.authority == 'ROLE_PLANTACREATE'){
        this.planta = true;
      }

      if (element.authority == 'ROLE_CUENTADEAHORROSEARCH'){
        this.cuentadeahorro_mgmnt = true;
      }
      if (element.authority == 'ROLE_CUENTADEAHORROCREATE'){
        this.cuentadeahorro = true;
      }

      if (element.authority == 'ROLE_EMPRESASEARCH'){
        this.empresa_mgmnt = true;
      }
      if (element.authority == 'ROLE_EMPRESACREATE'){
        this.empresa = true;
      }

      if (element.authority == 'ROLE_DEPARTAMENTOSEARCH'){
        this.departamento_mgmnt = true;
      }
      if (element.authority == 'ROLE_DEPARTAMENTOCREATE'){
        this.departamento = true;
      }

      if (element.authority == 'ROLE_APORTACIONSEARCH'){
        this.aportacion_mgmnt = true;
      }
      if (element.authority == 'ROLE_APORTACIONCREATE'){
        this.aportacion = true;
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

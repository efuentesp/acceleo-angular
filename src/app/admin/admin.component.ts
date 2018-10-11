import { Component } from '@angular/core';
import { User } from './user/user.component.model';
import { AuthenticationService } from '../authentication.component.service';
import { Router, NavigationExtras } from '@angular/router';
import { Authority } from '../user/authorities.component.model';

@Component({
  templateUrl: 'admin.components.html',
	styleUrls: ['./admin.component.css']

})
export class AdminComponent {

  public userAdmin: User;
  public valueName: string;
  public token: string;
  public authorityList: Authority [];
  public username: string;

// Menu activation
// Operadorproduccion
  private operadorproduccion_mgmnt: boolean = false;
  private operadorproduccion: boolean = false;
// Ordensimplificada
  private ordensimplificada_mgmnt: boolean = false;
  private ordensimplificada: boolean = false;
// Etiquetaasignada
  private etiquetaasignada_mgmnt: boolean = false;
  private etiquetaasignada: boolean = false;
// Cliente
  private cliente_mgmnt: boolean = false;
  private cliente: boolean = false;


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

      if (element.authority == 'ROLE_OPERADORPRODUCCIONSEARCH'){
        this.operadorproduccion_mgmnt = true;
      }
      if (element.authority == 'ROLE_OPERADORPRODUCCIONCREATE'){
        this.operadorproduccion = true;
      }

      if (element.authority == 'ROLE_ORDENSIMPLIFICADASEARCH'){
        this.ordensimplificada_mgmnt = true;
      }
      if (element.authority == 'ROLE_ORDENSIMPLIFICADACREATE'){
        this.ordensimplificada = true;
      }

      if (element.authority == 'ROLE_ETIQUETAASIGNADASEARCH'){
        this.etiquetaasignada_mgmnt = true;
      }
      if (element.authority == 'ROLE_ETIQUETAASIGNADACREATE'){
        this.etiquetaasignada = true;
      }

      if (element.authority == 'ROLE_CLIENTESEARCH'){
        this.cliente_mgmnt = true;
      }
      if (element.authority == 'ROLE_CLIENTECREATE'){
        this.cliente = true;
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

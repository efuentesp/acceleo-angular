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

// Wizard cliente
private cliente_mgmnt: boolean = false;
private cliente: boolean = false;
// Planta
  private planta_mgmnt: boolean = false;
  private planta: boolean = false;
// Aportacion
  private aportacion_mgmnt: boolean = false;
  private aportacion: boolean = false;
// Interes
  private interes_mgmnt: boolean = false;
  private interes: boolean = false;
// Empresa
  private empresa_mgmnt: boolean = false;
  private empresa: boolean = false;
// Departamento
  private departamento_mgmnt: boolean = false;
  private departamento: boolean = false;
// Cuentadeahorro
  private cuentadeahorro_mgmnt: boolean = false;
  private cuentadeahorro: boolean = false;
// Beneficiario
  private beneficiario_mgmnt: boolean = false;
  private beneficiario: boolean = false;
// Tasadeinteres
  private tasadeinteres_mgmnt: boolean = false;
  private tasadeinteres: boolean = false;
// Socio
  private socio_mgmnt: boolean = false;
  private socio: boolean = false;
// Domicilio
  private domicilio_mgmnt: boolean = false;
  private domicilio: boolean = false;
// Perfil
  private perfil_mgmnt: boolean = false;
  private perfil: boolean = false;
// Cuentabancaria
  private cuentabancaria_mgmnt: boolean = false;
  private cuentabancaria: boolean = false;


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

      // Wizard
      this.cliente = true;
      this.cliente_mgmnt = true;

      if (element.authority == 'ROLE_PLANTASEARCH'){
        this.planta_mgmnt = true;
      }
      if (element.authority == 'ROLE_PLANTACREATE'){
        this.planta = true;
      }

      if (element.authority == 'ROLE_APORTACIONSEARCH'){
        this.aportacion_mgmnt = true;
      }
      if (element.authority == 'ROLE_APORTACIONCREATE'){
        this.aportacion = true;
      }

      if (element.authority == 'ROLE_INTERESSEARCH'){
        this.interes_mgmnt = true;
      }
      if (element.authority == 'ROLE_INTERESCREATE'){
        this.interes = true;
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

      if (element.authority == 'ROLE_CUENTADEAHORROSEARCH'){
        this.cuentadeahorro_mgmnt = true;
      }
      if (element.authority == 'ROLE_CUENTADEAHORROCREATE'){
        this.cuentadeahorro = true;
      }

      if (element.authority == 'ROLE_BENEFICIARIOSEARCH'){
        this.beneficiario_mgmnt = true;
      }
      if (element.authority == 'ROLE_BENEFICIARIOCREATE'){
        this.beneficiario = true;
      }

      if (element.authority == 'ROLE_TASADEINTERESSEARCH'){
        this.tasadeinteres_mgmnt = true;
      }
      if (element.authority == 'ROLE_TASADEINTERESCREATE'){
        this.tasadeinteres = true;
      }

      if (element.authority == 'ROLE_SOCIOSEARCH'){
        this.socio_mgmnt = true;
      }
      if (element.authority == 'ROLE_SOCIOCREATE'){
        this.socio = true;
      }

      if (element.authority == 'ROLE_DOMICILIOSEARCH'){
        this.domicilio_mgmnt = true;
      }
      if (element.authority == 'ROLE_DOMICILIOCREATE'){
        this.domicilio = true;
      }

      if (element.authority == 'ROLE_PERFILSEARCH'){
        this.perfil_mgmnt = true;
      }
      if (element.authority == 'ROLE_PERFILCREATE'){
        this.perfil = true;
      }

      if (element.authority == 'ROLE_CUENTABANCARIASEARCH'){
        this.cuentabancaria_mgmnt = true;
      }
      if (element.authority == 'ROLE_CUENTABANCARIACREATE'){
        this.cuentabancaria = true;
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

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
// Documento
  private documento_mgmnt: boolean = false;
  private documento: boolean = false;
// Evento
  private evento_mgmnt: boolean = false;
  private evento: boolean = false;
// Posicion
  private posicion_mgmnt: boolean = false;
  private posicion: boolean = false;
// Reclutador
  private reclutador_mgmnt: boolean = false;
  private reclutador: boolean = false;
// Filial
  private filial_mgmnt: boolean = false;
  private filial: boolean = false;
// Direccion
  private direccion_mgmnt: boolean = false;
  private direccion: boolean = false;
// Usuario
  private usuario_mgmnt: boolean = false;
  private usuario: boolean = false;
// Permiso
  private permiso_mgmnt: boolean = false;
  private permiso: boolean = false;
// Puesto
  private puesto_mgmnt: boolean = false;
  private puesto: boolean = false;
// Rol
  private rol_mgmnt: boolean = false;
  private rol: boolean = false;
// Trayectoria
  private trayectoria_mgmnt: boolean = false;
  private trayectoria: boolean = false;
// Candidato
  private candidato_mgmnt: boolean = false;
  private candidato: boolean = false;
// Solicitud
  private solicitud_mgmnt: boolean = false;
  private solicitud: boolean = false;


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

      if (element.authority == 'ROLE_DOCUMENTOSEARCH'){
        this.documento_mgmnt = true;
      }
      if (element.authority == 'ROLE_DOCUMENTOCREATE'){
        this.documento = true;
      }

      if (element.authority == 'ROLE_EVENTOSEARCH'){
        this.evento_mgmnt = true;
      }
      if (element.authority == 'ROLE_EVENTOCREATE'){
        this.evento = true;
      }

      if (element.authority == 'ROLE_POSICIONSEARCH'){
        this.posicion_mgmnt = true;
      }
      if (element.authority == 'ROLE_POSICIONCREATE'){
        this.posicion = true;
      }

      if (element.authority == 'ROLE_RECLUTADORSEARCH'){
        this.reclutador_mgmnt = true;
      }
      if (element.authority == 'ROLE_RECLUTADORCREATE'){
        this.reclutador = true;
      }

      if (element.authority == 'ROLE_FILIALSEARCH'){
        this.filial_mgmnt = true;
      }
      if (element.authority == 'ROLE_FILIALCREATE'){
        this.filial = true;
      }

      if (element.authority == 'ROLE_DIRECCIONSEARCH'){
        this.direccion_mgmnt = true;
      }
      if (element.authority == 'ROLE_DIRECCIONCREATE'){
        this.direccion = true;
      }

      if (element.authority == 'ROLE_USUARIOSEARCH'){
        this.usuario_mgmnt = true;
      }
      if (element.authority == 'ROLE_USUARIOCREATE'){
        this.usuario = true;
      }

      if (element.authority == 'ROLE_PERMISOSEARCH'){
        this.permiso_mgmnt = true;
      }
      if (element.authority == 'ROLE_PERMISOCREATE'){
        this.permiso = true;
      }

      if (element.authority == 'ROLE_PUESTOSEARCH'){
        this.puesto_mgmnt = true;
      }
      if (element.authority == 'ROLE_PUESTOCREATE'){
        this.puesto = true;
      }

      if (element.authority == 'ROLE_ROLSEARCH'){
        this.rol_mgmnt = true;
      }
      if (element.authority == 'ROLE_ROLCREATE'){
        this.rol = true;
      }

      if (element.authority == 'ROLE_TRAYECTORIASEARCH'){
        this.trayectoria_mgmnt = true;
      }
      if (element.authority == 'ROLE_TRAYECTORIACREATE'){
        this.trayectoria = true;
      }

      if (element.authority == 'ROLE_CANDIDATOSEARCH'){
        this.candidato_mgmnt = true;
      }
      if (element.authority == 'ROLE_CANDIDATOCREATE'){
        this.candidato = true;
      }

      if (element.authority == 'ROLE_SOLICITUDSEARCH'){
        this.solicitud_mgmnt = true;
      }
      if (element.authority == 'ROLE_SOLICITUDCREATE'){
        this.solicitud = true;
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

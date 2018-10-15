import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { HttpModule, Http }   from '@angular/http'; 
import { ReactiveFormsModule, FormsModule }    from '@angular/forms';
import { NgxPaginationModule}  from 'ngx-pagination';

import { AdminComponent }           from './admin.component';
import { AdminDashboardComponent }  from './admin-dashboard.component';

import { AdminRoutingModule }       from './admin-routing.module';
import { HttpClientModule} from '@angular/common/http';
import { ManagePrivilegeComponent } from './manage/manage-privilege.component';
import { ManagePrivilegeService } from './manage/manage-privilege.component.service';
import { UserService } from './user/user.component.service';
import { SearchUserPipe } from './pipe/user.filter.pipe';
import { AuthorityService } from './authority/authority.component.service';
import { SearchAuthorityPipe } from './pipe/authority.filter.pipe';
import { UserManageComponent } from './user/manageUser/user-managecomponent';
import { UserEditComponent } from './user/editUser/user-edit.component';
import { UserCreateComponent } from './user/createUser/user-create.component';
import { AuthorityCreateComponent } from './authority/createAuthority/authority-create.component';
import { AuthorityManageComponent } from './authority/manageAuthority/manage-authority.component';
import { AuthorityEditComponent } from './authority/editAuthority/authority-edit.component';

import { CandidatoManageComponent } from './candidato/managecandidato/candidato-manage.component';
import { CandidatoCreateComponent } from './candidato/createcandidato/candidato-create.component';
import {CandidatoEditComponent } from './candidato/editcandidato/candidato-edit.component';
import { SearchCandidatoPipe } from './pipe/candidato.filter.pipe';
import { CandidatoService } from './candidato/candidato.component.service';
import { DireccionManageComponent } from './direccion/managedireccion/direccion-manage.component';
import { DireccionCreateComponent } from './direccion/createdireccion/direccion-create.component';
import {DireccionEditComponent } from './direccion/editdireccion/direccion-edit.component';
import { SearchDireccionPipe } from './pipe/direccion.filter.pipe';
import { DireccionService } from './direccion/direccion.component.service';
import { DocumentoManageComponent } from './documento/managedocumento/documento-manage.component';
import { DocumentoCreateComponent } from './documento/createdocumento/documento-create.component';
import {DocumentoEditComponent } from './documento/editdocumento/documento-edit.component';
import { SearchDocumentoPipe } from './pipe/documento.filter.pipe';
import { DocumentoService } from './documento/documento.component.service';
import { SolicitudManageComponent } from './solicitud/managesolicitud/solicitud-manage.component';
import { SolicitudCreateComponent } from './solicitud/createsolicitud/solicitud-create.component';
import {SolicitudEditComponent } from './solicitud/editsolicitud/solicitud-edit.component';
import { SearchSolicitudPipe } from './pipe/solicitud.filter.pipe';
import { SolicitudService } from './solicitud/solicitud.component.service';
import { EventoManageComponent } from './evento/manageevento/evento-manage.component';
import { EventoCreateComponent } from './evento/createevento/evento-create.component';
import {EventoEditComponent } from './evento/editevento/evento-edit.component';
import { SearchEventoPipe } from './pipe/evento.filter.pipe';
import { EventoService } from './evento/evento.component.service';
import { FilialManageComponent } from './filial/managefilial/filial-manage.component';
import { FilialCreateComponent } from './filial/createfilial/filial-create.component';
import {FilialEditComponent } from './filial/editfilial/filial-edit.component';
import { SearchFilialPipe } from './pipe/filial.filter.pipe';
import { FilialService } from './filial/filial.component.service';
import { PosicionManageComponent } from './posicion/manageposicion/posicion-manage.component';
import { PosicionCreateComponent } from './posicion/createposicion/posicion-create.component';
import {PosicionEditComponent } from './posicion/editposicion/posicion-edit.component';
import { SearchPosicionPipe } from './pipe/posicion.filter.pipe';
import { PosicionService } from './posicion/posicion.component.service';
import { PuestoManageComponent } from './puesto/managepuesto/puesto-manage.component';
import { PuestoCreateComponent } from './puesto/createpuesto/puesto-create.component';
import {PuestoEditComponent } from './puesto/editpuesto/puesto-edit.component';
import { SearchPuestoPipe } from './pipe/puesto.filter.pipe';
import { PuestoService } from './puesto/puesto.component.service';
import { ReclutadorManageComponent } from './reclutador/managereclutador/reclutador-manage.component';
import { ReclutadorCreateComponent } from './reclutador/createreclutador/reclutador-create.component';
import {ReclutadorEditComponent } from './reclutador/editreclutador/reclutador-edit.component';
import { SearchReclutadorPipe } from './pipe/reclutador.filter.pipe';
import { ReclutadorService } from './reclutador/reclutador.component.service';
import { RolManageComponent } from './rol/managerol/rol-manage.component';
import { RolCreateComponent } from './rol/createrol/rol-create.component';
import {RolEditComponent } from './rol/editrol/rol-edit.component';
import { SearchRolPipe } from './pipe/rol.filter.pipe';
import { RolService } from './rol/rol.component.service';
import { TrayectoriaManageComponent } from './trayectoria/managetrayectoria/trayectoria-manage.component';
import { TrayectoriaCreateComponent } from './trayectoria/createtrayectoria/trayectoria-create.component';
import {TrayectoriaEditComponent } from './trayectoria/edittrayectoria/trayectoria-edit.component';
import { SearchTrayectoriaPipe } from './pipe/trayectoria.filter.pipe';
import { TrayectoriaService } from './trayectoria/trayectoria.component.service';
import { UsuarioManageComponent } from './usuario/manageusuario/usuario-manage.component';
import { UsuarioCreateComponent } from './usuario/createusuario/usuario-create.component';
import {UsuarioEditComponent } from './usuario/editusuario/usuario-edit.component';
import { SearchUsuarioPipe } from './pipe/usuario.filter.pipe';
import { UsuarioService } from './usuario/usuario.component.service';
import { PermisoManageComponent } from './permiso/managepermiso/permiso-manage.component';
import { PermisoCreateComponent } from './permiso/createpermiso/permiso-create.component';
import {PermisoEditComponent } from './permiso/editpermiso/permiso-edit.component';
import { SearchPermisoPipe } from './pipe/permiso.filter.pipe';
import { PermisoService } from './permiso/permiso.component.service';  

import { NgbModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { CustomNgbDateParserFormatter } from '../dateformat';


@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpModule,
    CommonModule,
	ReactiveFormsModule,
	FormsModule,
    NgxPaginationModule,
    HttpClientModule,
    NgbModule
  ],
  declarations: [
    CandidatoCreateComponent,
	      CandidatoManageComponent,
	      CandidatoEditComponent,  
  	SearchCandidatoPipe,
  	DireccionCreateComponent,
	      DireccionManageComponent,
	      DireccionEditComponent,  
  	SearchDireccionPipe,
  	DocumentoCreateComponent,
	      DocumentoManageComponent,
	      DocumentoEditComponent,  
  	SearchDocumentoPipe,
  	SolicitudCreateComponent,
	      SolicitudManageComponent,
	      SolicitudEditComponent,  
  	SearchSolicitudPipe,
  	EventoCreateComponent,
	      EventoManageComponent,
	      EventoEditComponent,  
  	SearchEventoPipe,
  	FilialCreateComponent,
	      FilialManageComponent,
	      FilialEditComponent,  
  	SearchFilialPipe,
  	PosicionCreateComponent,
	      PosicionManageComponent,
	      PosicionEditComponent,  
  	SearchPosicionPipe,
  	PuestoCreateComponent,
	      PuestoManageComponent,
	      PuestoEditComponent,  
  	SearchPuestoPipe,
  	ReclutadorCreateComponent,
	      ReclutadorManageComponent,
	      ReclutadorEditComponent,  
  	SearchReclutadorPipe,
  	RolCreateComponent,
	      RolManageComponent,
	      RolEditComponent,  
  	SearchRolPipe,
  	TrayectoriaCreateComponent,
	      TrayectoriaManageComponent,
	      TrayectoriaEditComponent,  
  	SearchTrayectoriaPipe,
  	UsuarioCreateComponent,
	      UsuarioManageComponent,
	      UsuarioEditComponent,  
  	SearchUsuarioPipe,
  	PermisoCreateComponent,
	      PermisoManageComponent,
	      PermisoEditComponent,  
      SearchPermisoPipe,
      
    AdminComponent,
    AdminDashboardComponent,
    ManagePrivilegeComponent,
    UserManageComponent,
    AuthorityCreateComponent, 
    AuthorityManageComponent,
    AuthorityEditComponent,
    SearchAuthorityPipe,
    SearchUserPipe,
    UserEditComponent,
    UserCreateComponent
  ],
  providers: [ 
    CandidatoService,
    DireccionService,
    DocumentoService,
    SolicitudService,
    EventoService,
    FilialService,
    PosicionService,
    PuestoService,
    ReclutadorService,
    RolService,
    TrayectoriaService,
    UsuarioService,
    PermisoService,
    
    ManagePrivilegeService,
    UserService,
    AuthorityService,
    {provide: NgbDateParserFormatter, useFactory: () => new CustomNgbDateParserFormatter('dd/MM/yyyy')}
]
})
export class AdminModule {}


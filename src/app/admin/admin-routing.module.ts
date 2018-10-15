
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent }           from './admin.component';
import { AdminDashboardComponent }  from './admin-dashboard.component';

import { AuthGuard }                from '../auth-guard.service';
import { ManagePrivilegeComponent } from './manage/manage-privilege.component';

import { UserManageComponent } from './user/manageUser/user-managecomponent';
import { UserEditComponent } from './user/editUser/user-edit.component';
import { UserCreateComponent } from './user/createUser/user-create.component';

import { AuthorityManageComponent } from './authority/manageAuthority/manage-authority.component';
import { AuthorityCreateComponent } from './authority/createAuthority/authority-create.component';
import { AuthorityEditComponent } from './authority/editAuthority/authority-edit.component';

// Candidato
import { CandidatoManageComponent}       from './candidato/managecandidato/candidato-manage.component';
import { CandidatoCreateComponent}       from './candidato/createcandidato/candidato-create.component';
import { CandidatoEditComponent}         from './candidato/editcandidato/candidato-edit.component';
// Direccion
import { DireccionManageComponent}       from './direccion/managedireccion/direccion-manage.component';
import { DireccionCreateComponent}       from './direccion/createdireccion/direccion-create.component';
import { DireccionEditComponent}         from './direccion/editdireccion/direccion-edit.component';
// Documento
import { DocumentoManageComponent}       from './documento/managedocumento/documento-manage.component';
import { DocumentoCreateComponent}       from './documento/createdocumento/documento-create.component';
import { DocumentoEditComponent}         from './documento/editdocumento/documento-edit.component';
// Solicitud
import { SolicitudManageComponent}       from './solicitud/managesolicitud/solicitud-manage.component';
import { SolicitudCreateComponent}       from './solicitud/createsolicitud/solicitud-create.component';
import { SolicitudEditComponent}         from './solicitud/editsolicitud/solicitud-edit.component';
// Evento
import { EventoManageComponent}       from './evento/manageevento/evento-manage.component';
import { EventoCreateComponent}       from './evento/createevento/evento-create.component';
import { EventoEditComponent}         from './evento/editevento/evento-edit.component';
// Filial
import { FilialManageComponent}       from './filial/managefilial/filial-manage.component';
import { FilialCreateComponent}       from './filial/createfilial/filial-create.component';
import { FilialEditComponent}         from './filial/editfilial/filial-edit.component';
// Posicion
import { PosicionManageComponent}       from './posicion/manageposicion/posicion-manage.component';
import { PosicionCreateComponent}       from './posicion/createposicion/posicion-create.component';
import { PosicionEditComponent}         from './posicion/editposicion/posicion-edit.component';
// Puesto
import { PuestoManageComponent}       from './puesto/managepuesto/puesto-manage.component';
import { PuestoCreateComponent}       from './puesto/createpuesto/puesto-create.component';
import { PuestoEditComponent}         from './puesto/editpuesto/puesto-edit.component';
// Reclutador
import { ReclutadorManageComponent}       from './reclutador/managereclutador/reclutador-manage.component';
import { ReclutadorCreateComponent}       from './reclutador/createreclutador/reclutador-create.component';
import { ReclutadorEditComponent}         from './reclutador/editreclutador/reclutador-edit.component';
// Rol
import { RolManageComponent}       from './rol/managerol/rol-manage.component';
import { RolCreateComponent}       from './rol/createrol/rol-create.component';
import { RolEditComponent}         from './rol/editrol/rol-edit.component';
// Trayectoria
import { TrayectoriaManageComponent}       from './trayectoria/managetrayectoria/trayectoria-manage.component';
import { TrayectoriaCreateComponent}       from './trayectoria/createtrayectoria/trayectoria-create.component';
import { TrayectoriaEditComponent}         from './trayectoria/edittrayectoria/trayectoria-edit.component';
// Usuario
import { UsuarioManageComponent}       from './usuario/manageusuario/usuario-manage.component';
import { UsuarioCreateComponent}       from './usuario/createusuario/usuario-create.component';
import { UsuarioEditComponent}         from './usuario/editusuario/usuario-edit.component';
// Permiso
import { PermisoManageComponent}       from './permiso/managepermiso/permiso-manage.component';
import { PermisoCreateComponent}       from './permiso/createpermiso/permiso-create.component';
import { PermisoEditComponent}         from './permiso/editpermiso/permiso-edit.component';


const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
        
          { path: 'createcandidato',  component: CandidatoCreateComponent},  
          { path: 'managecandidato',  component: CandidatoManageComponent},  
          { path: 'editcandidato',  component: CandidatoEditComponent},  
          { path: 'createdireccion',  component: DireccionCreateComponent},  
          { path: 'managedireccion',  component: DireccionManageComponent},  
          { path: 'editdireccion',  component: DireccionEditComponent},  
          { path: 'createdocumento',  component: DocumentoCreateComponent},  
          { path: 'managedocumento',  component: DocumentoManageComponent},  
          { path: 'editdocumento',  component: DocumentoEditComponent},  
          { path: 'createsolicitud',  component: SolicitudCreateComponent},  
          { path: 'managesolicitud',  component: SolicitudManageComponent},  
          { path: 'editsolicitud',  component: SolicitudEditComponent},  
          { path: 'createevento',  component: EventoCreateComponent},  
          { path: 'manageevento',  component: EventoManageComponent},  
          { path: 'editevento',  component: EventoEditComponent},  
          { path: 'createfilial',  component: FilialCreateComponent},  
          { path: 'managefilial',  component: FilialManageComponent},  
          { path: 'editfilial',  component: FilialEditComponent},  
          { path: 'createposicion',  component: PosicionCreateComponent},  
          { path: 'manageposicion',  component: PosicionManageComponent},  
          { path: 'editposicion',  component: PosicionEditComponent},  
          { path: 'createpuesto',  component: PuestoCreateComponent},  
          { path: 'managepuesto',  component: PuestoManageComponent},  
          { path: 'editpuesto',  component: PuestoEditComponent},  
          { path: 'createreclutador',  component: ReclutadorCreateComponent},  
          { path: 'managereclutador',  component: ReclutadorManageComponent},  
          { path: 'editreclutador',  component: ReclutadorEditComponent},  
          { path: 'createrol',  component: RolCreateComponent},  
          { path: 'managerol',  component: RolManageComponent},  
          { path: 'editrol',  component: RolEditComponent},  
          { path: 'createtrayectoria',  component: TrayectoriaCreateComponent},  
          { path: 'managetrayectoria',  component: TrayectoriaManageComponent},  
          { path: 'edittrayectoria',  component: TrayectoriaEditComponent},  
          { path: 'createusuario',  component: UsuarioCreateComponent},  
          { path: 'manageusuario',  component: UsuarioManageComponent},  
          { path: 'editusuario',  component: UsuarioEditComponent},  
          { path: 'createpermiso',  component: PermisoCreateComponent},  
          { path: 'managepermiso',  component: PermisoManageComponent},  
          { path: 'editpermiso',  component: PermisoEditComponent},  

		  // Manage
          { path: 'manage', component: ManagePrivilegeComponent },
          
          // User
          { path: 'editUser', component: UserEditComponent},
          { path: 'createUser', component: UserCreateComponent},
          { path: 'manageUser', component: UserManageComponent },
          
          // Authority
          { path: 'createAuthority', component: AuthorityCreateComponent },
          { path: 'manageAuthority', component: AuthorityManageComponent },
          { path: 'editAuthority',   component: AuthorityEditComponent },
          { path: '', component: AdminDashboardComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule {}


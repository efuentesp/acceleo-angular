
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

// Operadorproduccion
import { OperadorproduccionManageComponent}       from './operadorproduccion/manageoperadorproduccion/operadorproduccion-manage.component';
import { OperadorproduccionCreateComponent}       from './operadorproduccion/createoperadorproduccion/operadorproduccion-create.component';
import { OperadorproduccionEditComponent}         from './operadorproduccion/editoperadorproduccion/operadorproduccion-edit.component';

// Ordensimplificada
import { OrdensimplificadaManageComponent}       from './ordensimplificada/manageordensimplificada/ordensimplificada-manage.component';
import { OrdensimplificadaCreateComponent}       from './ordensimplificada/createordensimplificada/ordensimplificada-create.component';
import { OrdensimplificadaEditComponent}         from './ordensimplificada/editordensimplificada/ordensimplificada-edit.component';

// Etiquetaasignada
import { EtiquetaasignadaManageComponent}       from './etiquetaasignada/manageetiquetaasignada/etiquetaasignada-manage.component';
import { EtiquetaasignadaCreateComponent}       from './etiquetaasignada/createetiquetaasignada/etiquetaasignada-create.component';
import { EtiquetaasignadaEditComponent}         from './etiquetaasignada/editetiquetaasignada/etiquetaasignada-edit.component';

// Cliente
import { ClienteManageComponent}       from './cliente/managecliente/cliente-manage.component';
import { ClienteCreateComponent}       from './cliente/createcliente/cliente-create.component';
import { ClienteEditComponent}         from './cliente/editcliente/cliente-edit.component';


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
        
		// Com.softtek.acceleo.demo
		{ path: 'createoperadorproduccion',  component: OperadorproduccionCreateComponent},  
		{ path: 'manageoperadorproduccion',  component: OperadorproduccionManageComponent},  
		{ path: 'editoperadorproduccion',  component: OperadorproduccionEditComponent},  
			
		{ path: 'createordensimplificada',  component: OrdensimplificadaCreateComponent},  
		{ path: 'manageordensimplificada',  component: OrdensimplificadaManageComponent},  
		{ path: 'editordensimplificada',  component: OrdensimplificadaEditComponent},  
			
		{ path: 'createetiquetaasignada',  component: EtiquetaasignadaCreateComponent},  
		{ path: 'manageetiquetaasignada',  component: EtiquetaasignadaManageComponent},  
		{ path: 'editetiquetaasignada',  component: EtiquetaasignadaEditComponent},  
			
		{ path: 'createcliente',  component: ClienteCreateComponent},  
		{ path: 'managecliente',  component: ClienteManageComponent},  
		{ path: 'editcliente',  component: ClienteEditComponent},  
			

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


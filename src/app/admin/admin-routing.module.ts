
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

// Tasadeinteres
import { TasadeinteresManageComponent}       from './tasadeinteres/managetasadeinteres/tasadeinteres-manage.component';
import { TasadeinteresCreateComponent}       from './tasadeinteres/createtasadeinteres/tasadeinteres-create.component';
import { TasadeinteresEditComponent}         from './tasadeinteres/edittasadeinteres/tasadeinteres-edit.component';

// Planta
import { PlantaManageComponent}       from './planta/manageplanta/planta-manage.component';
import { PlantaCreateComponent}       from './planta/createplanta/planta-create.component';
import { PlantaEditComponent}         from './planta/editplanta/planta-edit.component';

// Cuentadeahorro
import { CuentadeahorroManageComponent}       from './cuentadeahorro/managecuentadeahorro/cuentadeahorro-manage.component';
import { CuentadeahorroCreateComponent}       from './cuentadeahorro/createcuentadeahorro/cuentadeahorro-create.component';
import { CuentadeahorroEditComponent}         from './cuentadeahorro/editcuentadeahorro/cuentadeahorro-edit.component';

// Empresa
import { EmpresaManageComponent}       from './empresa/manageempresa/empresa-manage.component';
import { EmpresaCreateComponent}       from './empresa/createempresa/empresa-create.component';
import { EmpresaEditComponent}         from './empresa/editempresa/empresa-edit.component';

// Departamento
import { DepartamentoManageComponent}       from './departamento/managedepartamento/departamento-manage.component';
import { DepartamentoCreateComponent}       from './departamento/createdepartamento/departamento-create.component';
import { DepartamentoEditComponent}         from './departamento/editdepartamento/departamento-edit.component';

// Aportacion
import { AportacionManageComponent}       from './aportacion/manageaportacion/aportacion-manage.component';
import { AportacionCreateComponent}       from './aportacion/createaportacion/aportacion-create.component';
import { AportacionEditComponent}         from './aportacion/editaportacion/aportacion-edit.component';


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
		{ path: 'createtasadeinteres',  component: TasadeinteresCreateComponent},  
		{ path: 'managetasadeinteres',  component: TasadeinteresManageComponent},  
		{ path: 'edittasadeinteres',  component: TasadeinteresEditComponent},  
			
		{ path: 'createplanta',  component: PlantaCreateComponent},  
		{ path: 'manageplanta',  component: PlantaManageComponent},  
		{ path: 'editplanta',  component: PlantaEditComponent},  
			
		{ path: 'createcuentadeahorro',  component: CuentadeahorroCreateComponent},  
		{ path: 'managecuentadeahorro',  component: CuentadeahorroManageComponent},  
		{ path: 'editcuentadeahorro',  component: CuentadeahorroEditComponent},  
			
		{ path: 'createempresa',  component: EmpresaCreateComponent},  
		{ path: 'manageempresa',  component: EmpresaManageComponent},  
		{ path: 'editempresa',  component: EmpresaEditComponent},  
			
		{ path: 'createdepartamento',  component: DepartamentoCreateComponent},  
		{ path: 'managedepartamento',  component: DepartamentoManageComponent},  
		{ path: 'editdepartamento',  component: DepartamentoEditComponent},  
			
		{ path: 'createaportacion',  component: AportacionCreateComponent},  
		{ path: 'manageaportacion',  component: AportacionManageComponent},  
		{ path: 'editaportacion',  component: AportacionEditComponent},  
			

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



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

// Planta
import { PlantaManageComponent}       from './planta/manageplanta/planta-manage.component';
import { PlantaCreateComponent}       from './planta/createplanta/planta-create.component';
import { PlantaEditComponent}         from './planta/editplanta/planta-edit.component';

// Aportacion
import { AportacionManageComponent}       from './aportacion/manageaportacion/aportacion-manage.component';
import { AportacionCreateComponent}       from './aportacion/createaportacion/aportacion-create.component';
import { AportacionEditComponent}         from './aportacion/editaportacion/aportacion-edit.component';

// Interes
import { InteresManageComponent}       from './interes/manageinteres/interes-manage.component';
import { InteresCreateComponent}       from './interes/createinteres/interes-create.component';
import { InteresEditComponent}         from './interes/editinteres/interes-edit.component';

// Empresa
import { EmpresaManageComponent}       from './empresa/manageempresa/empresa-manage.component';
import { EmpresaCreateComponent}       from './empresa/createempresa/empresa-create.component';
import { EmpresaEditComponent}         from './empresa/editempresa/empresa-edit.component';

// Departamento
import { DepartamentoManageComponent}       from './departamento/managedepartamento/departamento-manage.component';
import { DepartamentoCreateComponent}       from './departamento/createdepartamento/departamento-create.component';
import { DepartamentoEditComponent}         from './departamento/editdepartamento/departamento-edit.component';

// Cuentadeahorro
import { CuentadeahorroManageComponent}       from './cuentadeahorro/managecuentadeahorro/cuentadeahorro-manage.component';
import { CuentadeahorroCreateComponent}       from './cuentadeahorro/createcuentadeahorro/cuentadeahorro-create.component';
import { CuentadeahorroEditComponent}         from './cuentadeahorro/editcuentadeahorro/cuentadeahorro-edit.component';

// Beneficiario
import { BeneficiarioManageComponent}       from './beneficiario/managebeneficiario/beneficiario-manage.component';
import { BeneficiarioCreateComponent}       from './beneficiario/createbeneficiario/beneficiario-create.component';
import { BeneficiarioEditComponent}         from './beneficiario/editbeneficiario/beneficiario-edit.component';

// Tasadeinteres
import { TasadeinteresManageComponent}       from './tasadeinteres/managetasadeinteres/tasadeinteres-manage.component';
import { TasadeinteresCreateComponent}       from './tasadeinteres/createtasadeinteres/tasadeinteres-create.component';
import { TasadeinteresEditComponent}         from './tasadeinteres/edittasadeinteres/tasadeinteres-edit.component';

// Socio
import { SocioManageComponent}       from './socio/managesocio/socio-manage.component';
import { SocioCreateComponent}       from './socio/createsocio/socio-create.component';
import { SocioEditComponent}         from './socio/editsocio/socio-edit.component';

// Domicilio
import { DomicilioManageComponent}       from './domicilio/managedomicilio/domicilio-manage.component';
import { DomicilioCreateComponent}       from './domicilio/createdomicilio/domicilio-create.component';
import { DomicilioEditComponent}         from './domicilio/editdomicilio/domicilio-edit.component';

// Perfil
import { PerfilManageComponent}       from './perfil/manageperfil/perfil-manage.component';
import { PerfilCreateComponent}       from './perfil/createperfil/perfil-create.component';
import { PerfilEditComponent}         from './perfil/editperfil/perfil-edit.component';

// Cuentabancaria
import { CuentabancariaManageComponent}       from './cuentabancaria/managecuentabancaria/cuentabancaria-manage.component';
import { CuentabancariaCreateComponent}       from './cuentabancaria/createcuentabancaria/cuentabancaria-create.component';
import { CuentabancariaEditComponent}         from './cuentabancaria/editcuentabancaria/cuentabancaria-edit.component';

// Wizard
import { ClienteComponent } 					from './wizardcliente/createcliente/cliente.component';
import { ResultComponent } 						from './wizardcliente/result/result.component';
import { AddressComponent } 					from './wizardcliente/address/address.component';
import { WorkComponent } 						from './wizardcliente/work/work.component';
import { PersonalComponent } 					from './wizardcliente/personal/personal.component';
import { ClienteManageComponent } 				from './wizardcliente/managecliente/cliente-manage.component';


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
		// Wizard
		{ path: 'createcliente',  component: ClienteComponent}, 
		{ path: 'managecliente',  component: ClienteManageComponent},
		{ path: 'personal',  component: PersonalComponent},
		{ path: 'work',  component: WorkComponent},
		{ path: 'address',  component: AddressComponent},
		{ path: 'result',  component: ResultComponent},

		// Entities
		{ path: 'createplanta',  component: PlantaCreateComponent},  
		{ path: 'manageplanta',  component: PlantaManageComponent},  
		{ path: 'editplanta',  component: PlantaEditComponent},  
			
		{ path: 'createaportacion',  component: AportacionCreateComponent},  
		{ path: 'manageaportacion',  component: AportacionManageComponent},  
		{ path: 'editaportacion',  component: AportacionEditComponent},  
			
		{ path: 'createinteres',  component: InteresCreateComponent},  
		{ path: 'manageinteres',  component: InteresManageComponent},  
		{ path: 'editinteres',  component: InteresEditComponent},  
			
		{ path: 'createempresa',  component: EmpresaCreateComponent},  
		{ path: 'manageempresa',  component: EmpresaManageComponent},  
		{ path: 'editempresa',  component: EmpresaEditComponent},  
			
		{ path: 'createdepartamento',  component: DepartamentoCreateComponent},  
		{ path: 'managedepartamento',  component: DepartamentoManageComponent},  
		{ path: 'editdepartamento',  component: DepartamentoEditComponent},  
			
		{ path: 'createcuentadeahorro',  component: CuentadeahorroCreateComponent},  
		{ path: 'managecuentadeahorro',  component: CuentadeahorroManageComponent},  
		{ path: 'editcuentadeahorro',  component: CuentadeahorroEditComponent},  
			
		{ path: 'createbeneficiario',  component: BeneficiarioCreateComponent},  
		{ path: 'managebeneficiario',  component: BeneficiarioManageComponent},  
		{ path: 'editbeneficiario',  component: BeneficiarioEditComponent},  
			
		{ path: 'createtasadeinteres',  component: TasadeinteresCreateComponent},  
		{ path: 'managetasadeinteres',  component: TasadeinteresManageComponent},  
		{ path: 'edittasadeinteres',  component: TasadeinteresEditComponent},  
			
		{ path: 'createsocio',  component: SocioCreateComponent},  
		{ path: 'managesocio',  component: SocioManageComponent},  
		{ path: 'editsocio',  component: SocioEditComponent},  
			
		{ path: 'createdomicilio',  component: DomicilioCreateComponent},  
		{ path: 'managedomicilio',  component: DomicilioManageComponent},  
		{ path: 'editdomicilio',  component: DomicilioEditComponent},  
			
		{ path: 'createperfil',  component: PerfilCreateComponent},  
		{ path: 'manageperfil',  component: PerfilManageComponent},  
		{ path: 'editperfil',  component: PerfilEditComponent},  
			
		{ path: 'createcuentabancaria',  component: CuentabancariaCreateComponent},  
		{ path: 'managecuentabancaria',  component: CuentabancariaManageComponent},  
		{ path: 'editcuentabancaria',  component: CuentabancariaEditComponent},  
			

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


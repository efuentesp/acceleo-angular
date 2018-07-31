
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

// Menu
import { MenuManageComponent}       from './menu/managemenu/menu-manage.component';
import { MenuCreateComponent}       from './menu/createmenu/menu-create.component';
import { MenuEditComponent}         from './menu/editmenu/menu-edit.component';

// Application
import { ApplicationManageComponent}       from './application/manageapplication/application-manage.component';
import { ApplicationCreateComponent}       from './application/createapplication/application-create.component';
import { ApplicationEditComponent}         from './application/editapplication/application-edit.component';

// Functionalservice
import { FunctionalserviceManageComponent}       from './functionalservice/managefunctionalservice/functionalservice-manage.component';
import { FunctionalserviceCreateComponent}       from './functionalservice/createfunctionalservice/functionalservice-create.component';
import { FunctionalserviceEditComponent}         from './functionalservice/editfunctionalservice/functionalservice-edit.component';

// Module
import { ModuleManageComponent}       from './module/managemodule/module-manage.component';
import { ModuleCreateComponent}       from './module/createmodule/module-create.component';
import { ModuleEditComponent}         from './module/editmodule/module-edit.component';


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
		{ path: 'createmenu',  component: MenuCreateComponent},  
		{ path: 'managemenu',  component: MenuManageComponent},  
		{ path: 'editmenu',  component: MenuEditComponent},  
			
		{ path: 'createapplication',  component: ApplicationCreateComponent},  
		{ path: 'manageapplication',  component: ApplicationManageComponent},  
		{ path: 'editapplication',  component: ApplicationEditComponent},  
			
		{ path: 'createfunctionalservice',  component: FunctionalserviceCreateComponent},  
		{ path: 'managefunctionalservice',  component: FunctionalserviceManageComponent},  
		{ path: 'editfunctionalservice',  component: FunctionalserviceEditComponent},  
			
		{ path: 'createmodule',  component: ModuleCreateComponent},  
		{ path: 'managemodule',  component: ModuleManageComponent},  
		{ path: 'editmodule',  component: ModuleEditComponent},  
			

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


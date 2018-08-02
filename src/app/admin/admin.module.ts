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

  
import { ModuleManageComponent } from './module/managemodule/module-manage.component';
import { ModuleCreateComponent } from './module/createmodule/module-create.component';
import { ModuleEditComponent } from './module/editmodule/module-edit.component';
import { SearchModulePipe } from './pipe/module.filter.pipe';
import { ModuleService } from './module/module.component.service';

  
import { FunctionalserviceManageComponent } from './functionalservice/managefunctionalservice/functionalservice-manage.component';
import { FunctionalserviceCreateComponent } from './functionalservice/createfunctionalservice/functionalservice-create.component';
import { FunctionalserviceEditComponent } from './functionalservice/editfunctionalservice/functionalservice-edit.component';
import { SearchFunctionalservicePipe } from './pipe/functionalservice.filter.pipe';
import { FunctionalserviceService } from './functionalservice/functionalservice.component.service';

  
import { ApplicationManageComponent } from './application/manageapplication/application-manage.component';
import { ApplicationCreateComponent } from './application/createapplication/application-create.component';
import { ApplicationEditComponent } from './application/editapplication/application-edit.component';
import { SearchApplicationPipe } from './pipe/application.filter.pipe';
import { ApplicationService } from './application/application.component.service';

  
import { MenuManageComponent } from './menu/managemenu/menu-manage.component';
import { MenuCreateComponent } from './menu/createmenu/menu-create.component';
import { MenuEditComponent } from './menu/editmenu/menu-edit.component';
import { SearchMenuPipe } from './pipe/menu.filter.pipe';
import { MenuService } from './menu/menu.component.service';


@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpModule,
    CommonModule,
	ReactiveFormsModule,
	FormsModule,
    NgxPaginationModule,
    HttpClientModule
  ],
  declarations: [
    ModuleCreateComponent,
    ModuleManageComponent,
    ModuleEditComponent,  
	SearchModulePipe,
    FunctionalserviceCreateComponent,
    FunctionalserviceManageComponent,
    FunctionalserviceEditComponent,  
	SearchFunctionalservicePipe,
    ApplicationCreateComponent,
    ApplicationManageComponent,
    ApplicationEditComponent,  
	SearchApplicationPipe,
    MenuCreateComponent,
    MenuManageComponent,
    MenuEditComponent,  
	SearchMenuPipe,
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
    ModuleService,
    FunctionalserviceService,
    ApplicationService,
    MenuService,
    ManagePrivilegeService,
    UserService,
    AuthorityService
]
})
export class AdminModule {}


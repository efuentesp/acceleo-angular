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

  
import { TasadeinteresManageComponent } from './tasadeinteres/managetasadeinteres/tasadeinteres-manage.component';
import { TasadeinteresCreateComponent } from './tasadeinteres/createtasadeinteres/tasadeinteres-create.component';
import { TasadeinteresEditComponent } from './tasadeinteres/edittasadeinteres/tasadeinteres-edit.component';
import { SearchTasadeinteresPipe } from './pipe/tasadeinteres.filter.pipe';
import { TasadeinteresService } from './tasadeinteres/tasadeinteres.component.service';

  
import { PlantaManageComponent } from './planta/manageplanta/planta-manage.component';
import { PlantaCreateComponent } from './planta/createplanta/planta-create.component';
import { PlantaEditComponent } from './planta/editplanta/planta-edit.component';
import { SearchPlantaPipe } from './pipe/planta.filter.pipe';
import { PlantaService } from './planta/planta.component.service';

  
import { CuentadeahorroManageComponent } from './cuentadeahorro/managecuentadeahorro/cuentadeahorro-manage.component';
import { CuentadeahorroCreateComponent } from './cuentadeahorro/createcuentadeahorro/cuentadeahorro-create.component';
import { CuentadeahorroEditComponent } from './cuentadeahorro/editcuentadeahorro/cuentadeahorro-edit.component';
import { SearchCuentadeahorroPipe } from './pipe/cuentadeahorro.filter.pipe';
import { CuentadeahorroService } from './cuentadeahorro/cuentadeahorro.component.service';

  
import { EmpresaManageComponent } from './empresa/manageempresa/empresa-manage.component';
import { EmpresaCreateComponent } from './empresa/createempresa/empresa-create.component';
import { EmpresaEditComponent } from './empresa/editempresa/empresa-edit.component';
import { SearchEmpresaPipe } from './pipe/empresa.filter.pipe';
import { EmpresaService } from './empresa/empresa.component.service';

  
import { DepartamentoManageComponent } from './departamento/managedepartamento/departamento-manage.component';
import { DepartamentoCreateComponent } from './departamento/createdepartamento/departamento-create.component';
import { DepartamentoEditComponent } from './departamento/editdepartamento/departamento-edit.component';
import { SearchDepartamentoPipe } from './pipe/departamento.filter.pipe';
import { DepartamentoService } from './departamento/departamento.component.service';

  
import { AportacionManageComponent } from './aportacion/manageaportacion/aportacion-manage.component';
import { AportacionCreateComponent } from './aportacion/createaportacion/aportacion-create.component';
import { AportacionEditComponent } from './aportacion/editaportacion/aportacion-edit.component';
import { SearchAportacionPipe } from './pipe/aportacion.filter.pipe';
import { AportacionService } from './aportacion/aportacion.component.service';


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
    TasadeinteresCreateComponent,
    TasadeinteresManageComponent,
    TasadeinteresEditComponent,  
	SearchTasadeinteresPipe,
    PlantaCreateComponent,
    PlantaManageComponent,
    PlantaEditComponent,  
	SearchPlantaPipe,
    CuentadeahorroCreateComponent,
    CuentadeahorroManageComponent,
    CuentadeahorroEditComponent,  
	SearchCuentadeahorroPipe,
    EmpresaCreateComponent,
    EmpresaManageComponent,
    EmpresaEditComponent,  
	SearchEmpresaPipe,
    DepartamentoCreateComponent,
    DepartamentoManageComponent,
    DepartamentoEditComponent,  
	SearchDepartamentoPipe,
    AportacionCreateComponent,
    AportacionManageComponent,
    AportacionEditComponent,  
	SearchAportacionPipe,
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
    TasadeinteresService,
    PlantaService,
    CuentadeahorroService,
    EmpresaService,
    DepartamentoService,
    AportacionService,
    ManagePrivilegeService,
    UserService,
    AuthorityService
]
})
export class AdminModule {}


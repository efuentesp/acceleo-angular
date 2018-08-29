import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { HttpModule, Http }   from '@angular/http'; 
import { ReactiveFormsModule, FormsModule }    from '@angular/forms';
import { NgxPaginationModule}  from 'ngx-pagination';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

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

  
import { PlantaManageComponent } from './planta/manageplanta/planta-manage.component';
import { PlantaCreateComponent } from './planta/createplanta/planta-create.component';
import { PlantaEditComponent } from './planta/editplanta/planta-edit.component';
import { SearchPlantaPipe } from './pipe/planta.filter.pipe';
import { PlantaService } from './planta/planta.component.service';

  
import { AportacionManageComponent } from './aportacion/manageaportacion/aportacion-manage.component';
import { AportacionCreateComponent } from './aportacion/createaportacion/aportacion-create.component';
import { AportacionEditComponent } from './aportacion/editaportacion/aportacion-edit.component';
import { SearchAportacionPipe } from './pipe/aportacion.filter.pipe';
import { AportacionService } from './aportacion/aportacion.component.service';

  
import { InteresManageComponent } from './interes/manageinteres/interes-manage.component';
import { InteresCreateComponent } from './interes/createinteres/interes-create.component';
import { InteresEditComponent } from './interes/editinteres/interes-edit.component';
import { SearchInteresPipe } from './pipe/interes.filter.pipe';
import { InteresService } from './interes/interes.component.service';

  
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

  
import { CuentadeahorroManageComponent } from './cuentadeahorro/managecuentadeahorro/cuentadeahorro-manage.component';
import { CuentadeahorroCreateComponent } from './cuentadeahorro/createcuentadeahorro/cuentadeahorro-create.component';
import { CuentadeahorroEditComponent } from './cuentadeahorro/editcuentadeahorro/cuentadeahorro-edit.component';
import { SearchCuentadeahorroPipe } from './pipe/cuentadeahorro.filter.pipe';
import { CuentadeahorroService } from './cuentadeahorro/cuentadeahorro.component.service';

  
import { BeneficiarioManageComponent } from './beneficiario/managebeneficiario/beneficiario-manage.component';
import { BeneficiarioCreateComponent } from './beneficiario/createbeneficiario/beneficiario-create.component';
import { BeneficiarioEditComponent } from './beneficiario/editbeneficiario/beneficiario-edit.component';
import { SearchBeneficiarioPipe } from './pipe/beneficiario.filter.pipe';
import { BeneficiarioService } from './beneficiario/beneficiario.component.service';

  
import { TasadeinteresManageComponent } from './tasadeinteres/managetasadeinteres/tasadeinteres-manage.component';
import { TasadeinteresCreateComponent } from './tasadeinteres/createtasadeinteres/tasadeinteres-create.component';
import { TasadeinteresEditComponent } from './tasadeinteres/edittasadeinteres/tasadeinteres-edit.component';
import { SearchTasadeinteresPipe } from './pipe/tasadeinteres.filter.pipe';
import { TasadeinteresService } from './tasadeinteres/tasadeinteres.component.service';

  
import { SocioManageComponent } from './socio/managesocio/socio-manage.component';
import { SocioCreateComponent } from './socio/createsocio/socio-create.component';
import { SocioEditComponent } from './socio/editsocio/socio-edit.component';
import { SearchSocioPipe } from './pipe/socio.filter.pipe';
import { SocioService } from './socio/socio.component.service';

  
import { DomicilioManageComponent } from './domicilio/managedomicilio/domicilio-manage.component';
import { DomicilioCreateComponent } from './domicilio/createdomicilio/domicilio-create.component';
import { DomicilioEditComponent } from './domicilio/editdomicilio/domicilio-edit.component';
import { SearchDomicilioPipe } from './pipe/domicilio.filter.pipe';
import { DomicilioService } from './domicilio/domicilio.component.service';

  
import { PerfilManageComponent } from './perfil/manageperfil/perfil-manage.component';
import { PerfilCreateComponent } from './perfil/createperfil/perfil-create.component';
import { PerfilEditComponent } from './perfil/editperfil/perfil-edit.component';
import { SearchPerfilPipe } from './pipe/perfil.filter.pipe';
import { PerfilService } from './perfil/perfil.component.service';

  
import { CuentabancariaManageComponent } from './cuentabancaria/managecuentabancaria/cuentabancaria-manage.component';
import { CuentabancariaCreateComponent } from './cuentabancaria/createcuentabancaria/cuentabancaria-create.component';
import { CuentabancariaEditComponent } from './cuentabancaria/editcuentabancaria/cuentabancaria-edit.component';
import { SearchCuentabancariaPipe } from './pipe/cuentabancaria.filter.pipe';
import { CuentabancariaService } from './cuentabancaria/cuentabancaria.component.service';

// Wizard
import { ClienteService }           from './wizardcliente/cliente.component.service';
import { ClienteComponent }         from './wizardcliente/createcliente/cliente.component';
import { ClienteFakeService }       from './wizardcliente/cliente.component.servicefake';
import { NavbarComponent }          from './wizardcliente/navbar/navbar.component';
import { PersonalComponent }        from './wizardcliente/personal/personal.component';
import { WorkComponent }            from './wizardcliente/work/work.component';
import { AddressComponent }         from './wizardcliente/address/address.component';
import { ResultComponent }          from './wizardcliente/result/result.component';
import { SearchClientePipe }        from './wizardcliente/pipe/cliente.filter.pipe';
import { WorkflowService }          from './wizardcliente/workflow/workflow.service';
import { ClienteManageComponent } from './wizardcliente/managecliente/cliente-manage.component';
import { GeneroService } from './wizardcliente/genero/genero.component.service';


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
    SearchClientePipe,  
    NavbarComponent, 
    PersonalComponent, 
    WorkComponent,
    AddressComponent, 
    ResultComponent,
    PlantaCreateComponent,
    PlantaManageComponent,
    PlantaEditComponent,  
	SearchPlantaPipe,
    AportacionCreateComponent,
    AportacionManageComponent,
    AportacionEditComponent,  
	SearchAportacionPipe,
    InteresCreateComponent,
    InteresManageComponent,
    InteresEditComponent,  
	SearchInteresPipe,
    EmpresaCreateComponent,
    EmpresaManageComponent,
    EmpresaEditComponent,  
	SearchEmpresaPipe,
    DepartamentoCreateComponent,
    DepartamentoManageComponent,
    DepartamentoEditComponent,  
	SearchDepartamentoPipe,
    CuentadeahorroCreateComponent,
    CuentadeahorroManageComponent,
    CuentadeahorroEditComponent,  
	SearchCuentadeahorroPipe,
    BeneficiarioCreateComponent,
    BeneficiarioManageComponent,
    BeneficiarioEditComponent,  
	SearchBeneficiarioPipe,
    TasadeinteresCreateComponent,
    TasadeinteresManageComponent,
    TasadeinteresEditComponent,  
	SearchTasadeinteresPipe,
    SocioCreateComponent,
    SocioManageComponent,
    SocioEditComponent,  
	SearchSocioPipe,
    DomicilioCreateComponent,
    DomicilioManageComponent,
    DomicilioEditComponent,  
	SearchDomicilioPipe,
    PerfilCreateComponent,
    PerfilManageComponent,
    PerfilEditComponent,  
	SearchPerfilPipe,
    CuentabancariaCreateComponent,
    CuentabancariaManageComponent,
    CuentabancariaEditComponent,  
	SearchCuentabancariaPipe,
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
    UserCreateComponent,

    ClienteComponent,
    ClienteManageComponent
  ],
  providers: [ 
    PlantaService,
    AportacionService,
    InteresService,
    EmpresaService,
    DepartamentoService,
    CuentadeahorroService,
    BeneficiarioService,
    TasadeinteresService,
    SocioService,
    DomicilioService,
    PerfilService,
    CuentabancariaService,
    ManagePrivilegeService,
    UserService,
    AuthorityService,
    
    ClienteService,
    ClienteFakeService,
    WorkflowService,
    GeneroService
]
})
export class AdminModule {}


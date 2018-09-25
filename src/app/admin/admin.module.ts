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

  
import { OperadorproduccionManageComponent } from './operadorproduccion/manageoperadorproduccion/operadorproduccion-manage.component';
import { OperadorproduccionCreateComponent } from './operadorproduccion/createoperadorproduccion/operadorproduccion-create.component';
import { OperadorproduccionEditComponent } from './operadorproduccion/editoperadorproduccion/operadorproduccion-edit.component';
import { SearchOperadorproduccionPipe } from './pipe/operadorproduccion.filter.pipe';
import { OperadorproduccionService } from './operadorproduccion/operadorproduccion.component.service';

  
import { OrdensimplificadaManageComponent } from './ordensimplificada/manageordensimplificada/ordensimplificada-manage.component';
import { OrdensimplificadaCreateComponent } from './ordensimplificada/createordensimplificada/ordensimplificada-create.component';
import { OrdensimplificadaEditComponent } from './ordensimplificada/editordensimplificada/ordensimplificada-edit.component';
import { SearchOrdensimplificadaPipe } from './pipe/ordensimplificada.filter.pipe';
import { OrdensimplificadaService } from './ordensimplificada/ordensimplificada.component.service';

  
import { EtiquetaasignadaManageComponent } from './etiquetaasignada/manageetiquetaasignada/etiquetaasignada-manage.component';
import { EtiquetaasignadaCreateComponent } from './etiquetaasignada/createetiquetaasignada/etiquetaasignada-create.component';
import { EtiquetaasignadaEditComponent } from './etiquetaasignada/editetiquetaasignada/etiquetaasignada-edit.component';
import { SearchEtiquetaasignadaPipe } from './pipe/etiquetaasignada.filter.pipe';
import { EtiquetaasignadaService } from './etiquetaasignada/etiquetaasignada.component.service';

  
import { ClienteManageComponent } from './cliente/managecliente/cliente-manage.component';
import { ClienteCreateComponent } from './cliente/createcliente/cliente-create.component';
import { ClienteEditComponent } from './cliente/editcliente/cliente-edit.component';
import { SearchClientePipe } from './pipe/cliente.filter.pipe';
import { ClienteService } from './cliente/cliente.component.service';
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
    OperadorproduccionCreateComponent,
    OperadorproduccionManageComponent,
    OperadorproduccionEditComponent,  
	SearchOperadorproduccionPipe,
    OrdensimplificadaCreateComponent,
    OrdensimplificadaManageComponent,
    OrdensimplificadaEditComponent,  
	SearchOrdensimplificadaPipe,
    EtiquetaasignadaCreateComponent,
    EtiquetaasignadaManageComponent,
    EtiquetaasignadaEditComponent,  
	SearchEtiquetaasignadaPipe,
    ClienteCreateComponent,
    ClienteManageComponent,
    ClienteEditComponent,  
	SearchClientePipe,
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
    OperadorproduccionService,
    OrdensimplificadaService,
    EtiquetaasignadaService,
    ClienteService,
    ManagePrivilegeService,
    UserService,
    AuthorityService,
    {provide: NgbDateParserFormatter, useFactory: () => new CustomNgbDateParserFormatter('dd/MM/yyyy')}
]
})
export class AdminModule {}


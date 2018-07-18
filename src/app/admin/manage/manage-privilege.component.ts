import { Component, OnInit } from '@angular/core';
import { User } from '../user/user.component.model';
import { FormControl } from '@angular/forms';
import swal from 'sweetalert2';
import { AdminPermiso } from './manage-privilege.component.model';
import { ManagePrivilegeService } from './manage-privilege.component.service';
import { ConfigAuthority } from './manage-authority.component.model';
import { AuthorityService } from '../authority/authority.component.service';
import { Authority } from '../authority/authority.component.model';

@Component({
  templateUrl: 'manage-privilege.component.html',
  styleUrls: ['manage-privilege.component.css']
})

export class ManagePrivilegeComponent implements OnInit {

  title = 'Nuevo ManagePrivile';
  public flag: boolean;
  public flagDelete: boolean;
  public beneficiarioNombre: string = '';
  public adminPermisoList: AdminPermiso [];
  public configAuthorityList: ConfigAuthority [];
  public configAuthorityListAux: ConfigAuthority;
  public authorityList: Authority;
  form: any;
  public adminPermiso: AdminPermiso;

  public user: User;
  public valueName: string;
  public token: string;

  constructor( private managePrivilegeService:ManagePrivilegeService, private authorityService: AuthorityService) {}

  ngOnInit() {
      this.loadAdminPermiso();  
      this.loadAuthority();    
  }

loadAdminPermiso(){
      this.managePrivilegeService.getAllPrivilege().subscribe(data => {
      if (data) {
        console.log('Los permisos: ', data);
        this.adminPermisoList = data;

        // this.adminPermisoList.forEach(permiso => {

          // console.log("Impresion del admin", permiso.idPrivilege);
          // console.log("Tamaño", permiso.nombrePrivilege);
        
          // console.log("Impresion del admin", permiso.configAuthority.length);
          // this.configAuthorityList = permiso.lstConfigAuthority;

          // permiso.lstConfigAuthority.forEach(authority => {
          //     // console.log("Impresion del admin", authority.enabled);
          //  });
          
          //console.log("Impresion del admin", permiso.activeUser);

        // });

      }
      }, error => {
      swal('Error...', 'An error occurred while calling the beneficiarios.', 'error');
    });
}

loadAuthority(){

  this.authorityService.getAllAuthority().subscribe( data => {
    if (data) {
      this.authorityList = data;
    }}, error => {
      swal('Error...', 'An error occurred while calling the beneficiarios.', 'error');
    });
}

saveData(permiso, authority, type){

  console.log ("Información del permiso: ", permiso+" authority:"+authority +" Tipo: "+ type.target.checked);
  console.log ("Información del grupo: ", permiso.nombrePrivilege);
  console.log ("Información del rol: ", authority.nameAuthority);
  console.log ("Información del rol: ", authority.enabled);

    permiso.activeUser = authority.idAuthority;

    permiso.lstConfigAuthority.forEach(element => {
      console.log ("Objeto Permiso: ", element.idPrivilege); 
      if (element.idAuthority == authority.idAuthority){
        console.log("dato:", element.idAuthority );
        console.log("dato:", element.idAuthority );
        element.enabled = type.target.checked;
      }

    });




  // authority.enabled = type.target.checked;
  // permiso.lstConfigAuthority.

  this.managePrivilegeService.updatePrivilege(permiso).subscribe(data => {
    console.log("OK");

  });

  // // Id Authority
  // if (type == 1){
  //   console.log("Tipo Admin");
  //   console.log("Evento: ", event);
  //   console.log("Checked", c.target.checked);

  //   this.adminPermiso = event;
  //   // this.adminPermiso.admin = c.target.checked;
  //   // this.adminPermiso.activeUser = type;
    
  // }else
  //   if (type == 2){
  //     console.log("Tipo User");
  //     console.log("Evento: ", event);
  //     console.log("Checked", c.target.checked);
  //     this.adminPermiso = event;
  //     // this.adminPermiso.user = c.target.checked;
  //     // this.adminPermiso.activeUser = type;
  //   }else
  //     if(type == 3){
  //       console.log("Tipo Annon");
  //       console.log("Evento: ", event);
  //       console.log("Checked", c.target.checked);
  //       this.adminPermiso = event;
  //       // this.adminPermiso.anonymous = c.target.checked;
  //       // this.adminPermiso.activeUser = type;
  //     }

  //     console.log ("Se va el permiso: ", this.adminPermiso);
      
  //     // this.managePrivilegeService.updatePrivilege(this.adminPermiso).subscribe(data => {
  //     //   console.log("OK");

  //     // });
}

// setClickedRowBeneficiario(index, beneficiario){
//   this.afiliado.beneficiarioId                   = beneficiario.beneficiarioId;
//   this.beneficiarioNombre                        = beneficiario.nombre + " " + beneficiario.apellido_paterno;
// }

}


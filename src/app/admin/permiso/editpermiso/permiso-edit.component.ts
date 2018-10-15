import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { PermisoService }                                  from '../../permiso/permiso.component.service';
import { Permiso }                                         from '../../permiso/permiso.component.model';

import { RolService }                                  from '../../rol/rol.component.service';
import { Rol }                                         from '../../rol/rol.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './permiso-edit.component.html',
	styleUrls: ['./permiso-edit.component.css']
})

export class PermisoEditComponent implements OnInit {

	public title = 'Editar Permiso';
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

	public flag: boolean;
    public flagDelete: boolean;

	public permisoList: Permiso [];
	public permiso: Permiso;
    public permisoAux: Permiso;

	public busquedaPermiso='';
	filterInputPermiso = new FormControl();

public rolList: Rol [];
	    public rol: Rol;
	    public rolAux: Rol;
	    
	    public busquedaRol='';
	    filterInputRol = new FormControl();

    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private parserFormatter: NgbDateParserFormatter,
				private permisoService: PermisoService
				,private rolService: RolService
){
	this.filterInputPermiso.valueChanges.subscribe(busquedaPermiso => {
     	this.busquedaPermiso = busquedaPermiso;
     });
     
	this.filterInputRol.valueChanges.subscribe(busquedaRol => {
		     this.busquedaRol = busquedaRol;
		   });
}

    ngOnInit() {
        
        this.flag = this.permisoService.getEdit();
        this.permiso = this.permisoService.getPermiso();
        this.flagDelete = this.permisoService.getDelete();
    }  

save(){
	

   this.permisoService.savePermiso(this.permiso).subscribe(res => {
     if (res.status == 201 || res.status == 200){
        swal('Success...', 'Permiso save successfully.', 'success');
        this.router.navigate([ '../managepermiso' ], { relativeTo: this.route })
     }else if (res.status == 403){
        swal('Error...', 'Usuario no tiene permiso para guardar Permiso.', 'error');
     }else{
       swal('Error...', 'Permiso save unsuccessfully.', 'error');
     }
   } );
}

delete(){
  swal({
    title: "Are you sure?",
    text: "You will not be able to recover this permiso!",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!"
  }).then((isConfirm) => {
    if (isConfirm.value) {
      this.permisoService.deletePermiso(this.permiso).subscribe(res => {
        if (res.status == 201 || res.status == 200){
          swal('Success...', 'Permiso item has been deleted successfully.', 'success');
          this.router.navigate([ '../managepermiso' ], { relativeTo: this.route })
        }else if (res.status == 403){
          swal('Error...', 'Usuario no tiene permiso para guardar Permiso.', 'error');
        }else{
          swal('Error...', 'Permiso deleted unsuccessfully.', 'error');
        }
      },error =>{
        if (error.status == 500){
          swal('Warning...', 'Permiso no se puede eliminar debido a que esta asociado con otra entidad.', 'warning');
        }
      }
	);
    } else {
      //swal("Cancelled", "Permiso deleted unsuccessfully", "error");
    }
  });
}

return(permiso){
  this.location.back();
}
 
}

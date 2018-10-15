import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { RolService }                                  from '../../rol/rol.component.service';
import { Rol }                                         from '../../rol/rol.component.model';


@Component ({
    selector: 'app-view',
    templateUrl: './rol-edit.component.html',
	styleUrls: ['./rol-edit.component.css']
})

export class RolEditComponent implements OnInit {

	public title = 'Editar Rol';
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

	public flag: boolean;
    public flagDelete: boolean;

	public rolList: Rol [];
	public rol: Rol;
    public rolAux: Rol;

	public busquedaRol='';
	filterInputRol = new FormControl();


    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private parserFormatter: NgbDateParserFormatter,
				private rolService: RolService
){
	this.filterInputRol.valueChanges.subscribe(busquedaRol => {
     	this.busquedaRol = busquedaRol;
     });
     
}

    ngOnInit() {
        
        this.flag = this.rolService.getEdit();
        this.rol = this.rolService.getRol();
        this.flagDelete = this.rolService.getDelete();
    }  

save(){
	

   this.rolService.saveRol(this.rol).subscribe(res => {
     if (res.status == 201 || res.status == 200){
        swal('Success...', 'Rol save successfully.', 'success');
        this.router.navigate([ '../managerol' ], { relativeTo: this.route })
     }else if (res.status == 403){
        swal('Error...', 'Usuario no tiene permiso para guardar Rol.', 'error');
     }else{
       swal('Error...', 'Rol save unsuccessfully.', 'error');
     }
   } );
}

delete(){
  swal({
    title: "Are you sure?",
    text: "You will not be able to recover this rol!",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!"
  }).then((isConfirm) => {
    if (isConfirm.value) {
      this.rolService.deleteRol(this.rol).subscribe(res => {
        if (res.status == 201 || res.status == 200){
          swal('Success...', 'Rol item has been deleted successfully.', 'success');
          this.router.navigate([ '../managerol' ], { relativeTo: this.route })
        }else if (res.status == 403){
          swal('Error...', 'Usuario no tiene permiso para guardar Rol.', 'error');
        }else{
          swal('Error...', 'Rol deleted unsuccessfully.', 'error');
        }
      },error =>{
        if (error.status == 500){
          swal('Warning...', 'Rol no se puede eliminar debido a que esta asociado con otra entidad.', 'warning');
        }
      }
	);
    } else {
      //swal("Cancelled", "Rol deleted unsuccessfully", "error");
    }
  });
}

return(rol){
  this.location.back();
}
 
}


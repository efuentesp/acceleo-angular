import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { OperadorproduccionService }                                  from '../../operadorproduccion/operadorproduccion.component.service';
import { Operadorproduccion }                                         from '../../operadorproduccion/operadorproduccion.component.model';


@Component ({
    selector: 'app-view',
    templateUrl: './operadorproduccion-edit.component.html',
	styleUrls: ['./operadorproduccion-edit.component.css']
})

export class OperadorproduccionEditComponent implements OnInit {

	public title = 'Editar Operadorproduccion';
    public operadorproduccion: Operadorproduccion;
 	public operadorproduccionList: Operadorproduccion;
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

	public flag: boolean;
    public flagDelete: boolean;


    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private parserFormatter: NgbDateParserFormatter,
				private operadorproduccionService: OperadorproduccionService
){


	}	

    ngOnInit() {
        
        this.flag = this.operadorproduccionService.getEdit();
        this.operadorproduccion = this.operadorproduccionService.getOperadorproduccion();
        this.flagDelete = this.operadorproduccionService.getDelete();
        

    }  

save(){
	

   this.operadorproduccionService.saveOperadorproduccion(this.operadorproduccion).subscribe(res => {
     if (res.status == 201 || res.status == 200){
        swal('Success...', 'Operadorproduccion save successfully.', 'success');
        this.router.navigate([ '../manageoperadorproduccion' ], { relativeTo: this.route })
     }else if (res.status == 403){
        swal('Error...', 'Usuario no tiene permiso para guardar Operadorproduccion.', 'error');
     }else{
       swal('Error...', 'Operadorproduccion save unsuccessfully.', 'error');
     }
   } );
}

delete(){
  swal({
    title: "Are you sure?",
    text: "You will not be able to recover this operadorproduccion!",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!"
  }).then((isConfirm) => {
    if (isConfirm.value) {
      this.operadorproduccionService.deleteOperadorproduccion(this.operadorproduccion).subscribe(res => {
        if (res.status == 201 || res.status == 200){
          swal('Success...', 'Operadorproduccion item has been deleted successfully.', 'success');
          this.router.navigate([ '../manageoperadorproduccion' ], { relativeTo: this.route })
        }else if (res.status == 403){
          swal('Error...', 'Usuario no tiene permiso para guardar Operadorproduccion.', 'error');
        }else{
          swal('Error...', 'Operadorproduccion deleted unsuccessfully.', 'error');
        }
      },error =>{
        if (error.status == 500){
          swal('Warning...', 'Operadorproduccion no se puede eliminar debido a que esta asociado con otra entidad.', 'warning');
        }
      }
	);
    } else {
      //swal("Cancelled", "Operadorproduccion deleted unsuccessfully", "error");
    }
  });
}



return(operadorproduccion){
  this.location.back();
}
 
}

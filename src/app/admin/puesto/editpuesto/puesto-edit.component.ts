import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { PuestoService }                                  from '../../puesto/puesto.component.service';
import { Puesto }                                         from '../../puesto/puesto.component.model';


@Component ({
    selector: 'app-view',
    templateUrl: './puesto-edit.component.html',
	styleUrls: ['./puesto-edit.component.css']
})

export class PuestoEditComponent implements OnInit {

	public title = 'Editar Puesto';
    public puesto: Puesto;
 	public puestoList: Puesto;
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
				private puestoService: PuestoService
){


	}	

    ngOnInit() {
        
        this.flag = this.puestoService.getEdit();
        this.puesto = this.puestoService.getPuesto();
        this.flagDelete = this.puestoService.getDelete();
        

    }  

save(){
	

   this.puestoService.savePuesto(this.puesto).subscribe(res => {
     if (res.status == 201 || res.status == 200){
        swal('Success...', 'Puesto save successfully.', 'success');
        this.router.navigate([ '../managepuesto' ], { relativeTo: this.route })
     }else if (res.status == 403){
        swal('Error...', 'Usuario no tiene permiso para guardar Puesto.', 'error');
     }else{
       swal('Error...', 'Puesto save unsuccessfully.', 'error');
     }
   } );
}

delete(){
  swal({
    title: "Are you sure?",
    text: "You will not be able to recover this puesto!",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!"
  }).then((isConfirm) => {
    if (isConfirm.value) {
      this.puestoService.deletePuesto(this.puesto).subscribe(res => {
        if (res.status == 201 || res.status == 200){
          swal('Success...', 'Puesto item has been deleted successfully.', 'success');
          this.router.navigate([ '../managepuesto' ], { relativeTo: this.route })
        }else if (res.status == 403){
          swal('Error...', 'Usuario no tiene permiso para guardar Puesto.', 'error');
        }else{
          swal('Error...', 'Puesto deleted unsuccessfully.', 'error');
        }
      },error =>{
        if (error.status == 500){
          swal('Warning...', 'Puesto no se puede eliminar debido a que esta asociado con otra entidad.', 'warning');
        }
      }
	);
    } else {
      //swal("Cancelled", "Puesto deleted unsuccessfully", "error");
    }
  });
}



return(puesto){
  this.location.back();
}
 
}

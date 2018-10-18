import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { CustomNgbDateParserFormatter } from '../../../dateformat';

import { ReclutadorService }                                  from '../../reclutador/reclutador.component.service';
import { Reclutador }                                         from '../../reclutador/reclutador.component.model';


@Component ({
    selector: 'app-view',
    templateUrl: './reclutador-edit.component.html',
	styleUrls: ['./reclutador-edit.component.css']
})

export class ReclutadorEditComponent implements OnInit {

	public title = 'Editar Reclutador';
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

	public flag: boolean;
    public flagDelete: boolean;
    datePipe = new DatePipe('en-US');

	public reclutadorList: Reclutador [];
	public reclutador: Reclutador;
    public reclutadorAux: Reclutador;

	public busquedaReclutador='';
	filterInputReclutador = new FormControl();


    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private parseFormat: CustomNgbDateParserFormatter,
				private parserFormatter: NgbDateParserFormatter,
				private reclutadorService: ReclutadorService
					
){
	this.filterInputReclutador.valueChanges.subscribe(busquedaReclutador => {
     	this.busquedaReclutador = busquedaReclutador;
     });
     
		
}

    ngOnInit() {
        
        this.flag = this.reclutadorService.getEdit();
        this.reclutador = this.reclutadorService.getReclutador();
        this.flagDelete = this.reclutadorService.getDelete();
    }  

save(){
	if (
	this.reclutador.nombre ==="" || this.reclutador.nombre ===null || 
	this.reclutador.apellidopaterno ==="" || this.reclutador.apellidopaterno ===null || 
	this.reclutador.apellidomaterno ==="" || this.reclutador.apellidomaterno ===null || 
	this.reclutador.generoId ==="" || this.reclutador.generoId ===null || 
		this.reclutador.reclutadorId === null 
	){
		return;
	}else{
	   this.reclutadorService.saveReclutador(this.reclutador).subscribe(res => {
	     if (res.status == 201 || res.status == 200){
	        swal('Success...', 'Reclutador save successfully.', 'success');
	        this.router.navigate([ '../managereclutador' ], { relativeTo: this.route })
	     }else if (res.status == 403){
	        swal('Error...', 'Usuario no tiene permiso para guardar Reclutador.', 'error');
	     }else{
	       swal('Error...', 'Reclutador save unsuccessfully.', 'error');
	     }
	   } );
	}	
}

delete(){
  swal({
    title: "Are you sure?",
    text: "You will not be able to recover this reclutador!",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!"
  }).then((isConfirm) => {
    if (isConfirm.value) {
      this.reclutadorService.deleteReclutador(this.reclutador).subscribe(res => {
        if (res.status == 201 || res.status == 200){
          swal('Success...', 'Reclutador item has been deleted successfully.', 'success');
          this.router.navigate([ '../managereclutador' ], { relativeTo: this.route })
        }else if (res.status == 403){
          swal('Error...', 'Usuario no tiene permiso para guardar Reclutador.', 'error');
        }else{
          swal('Error...', 'Reclutador deleted unsuccessfully.', 'error');
        }
      },error =>{
        if (error.status == 500){
          swal('Warning...', 'Reclutador no se puede eliminar debido a que esta asociado con otra entidad.', 'warning');
        }
      }
	);
    } else {
      //swal("Cancelled", "Reclutador deleted unsuccessfully", "error");
    }
  });
}

return(reclutador){
  this.location.back();
}
 
 
isNumber(value: any): boolean {
	return !isNaN(this.toInteger(value));
}

toInteger(value: any): number {
	return parseInt(`${value}`, 10);
}

parse(value: string): string {
    if (value) {
        const dateParts = value.trim().split('/');
        if (dateParts.length === 3 && this.isNumber(dateParts[0]) && this.isNumber(dateParts[1]) && this.isNumber(dateParts[2])) {
			return this.datePipe.transform(new Date(this.toInteger(dateParts[2]), this.toInteger(dateParts[1]), this.toInteger(dateParts[0])), 'yyyy-MM-dd');
        }
    }
    return null;
} 
 
}


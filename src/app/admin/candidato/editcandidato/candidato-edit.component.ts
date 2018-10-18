import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { CustomNgbDateParserFormatter } from '../../../dateformat';

import { CandidatoService }                                  from '../../candidato/candidato.component.service';
import { Candidato }                                         from '../../candidato/candidato.component.model';


@Component ({
    selector: 'app-view',
    templateUrl: './candidato-edit.component.html',
	styleUrls: ['./candidato-edit.component.css']
})

export class CandidatoEditComponent implements OnInit {

	public title = 'Editar Candidato';
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;
public changeFormatFecha: boolean = false;

	public flag: boolean;
    public flagDelete: boolean;
    datePipe = new DatePipe('en-US');

	public candidatoList: Candidato [];
	public candidato: Candidato;
    public candidatoAux: Candidato;

	public busquedaCandidato='';
	filterInputCandidato = new FormControl();


    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private parseFormat: CustomNgbDateParserFormatter,
				private parserFormatter: NgbDateParserFormatter,
				private candidatoService: CandidatoService
					
					
){
	this.filterInputCandidato.valueChanges.subscribe(busquedaCandidato => {
     	this.busquedaCandidato = busquedaCandidato;
     });
     
		
		
}

    ngOnInit() {
        
        this.flag = this.candidatoService.getEdit();
        this.candidato = this.candidatoService.getCandidato();
    		this.candidato.fechaAux = this.parserFormatter.parse(this.candidato.fecha);
        this.flagDelete = this.candidatoService.getDelete();
    }  

save(){
	if (
	this.candidato.nombre ==="" || this.candidato.nombre ===null || 
	this.candidato.apellidopaterno ==="" || this.candidato.apellidopaterno ===null || 
	this.candidato.apellidomaterno ==="" || this.candidato.apellidomaterno ===null || 
	this.candidato.fechaAux ===null || 
	this.candidato.generoId ==="" || this.candidato.generoId ===null || 
	this.candidato.estatuscandidatoId ==="" || this.candidato.estatuscandidatoId ===null || 
		this.candidato.candidatoId === null 
	){
		return;
	}else{
	   if (this.changeFormatFecha){
	   	this.candidato.fecha = this.parse((this.candidato.fechaAux)+"");
	   }else{
	   	this.candidato.fecha = this.parseFormat.format(this.candidato.fechaAux);
	   }
	   this.candidatoService.saveCandidato(this.candidato).subscribe(res => {
	     if (res.status == 201 || res.status == 200){
	        swal('Success...', 'Candidato save successfully.', 'success');
	        this.router.navigate([ '../managecandidato' ], { relativeTo: this.route })
	     }else if (res.status == 403){
	        swal('Error...', 'Usuario no tiene permiso para guardar Candidato.', 'error');
	     }else{
	       swal('Error...', 'Candidato save unsuccessfully.', 'error');
	     }
	   } );
	}	
}

delete(){
  swal({
    title: "Are you sure?",
    text: "You will not be able to recover this candidato!",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!"
  }).then((isConfirm) => {
    if (isConfirm.value) {
      this.candidatoService.deleteCandidato(this.candidato).subscribe(res => {
        if (res.status == 201 || res.status == 200){
          swal('Success...', 'Candidato item has been deleted successfully.', 'success');
          this.router.navigate([ '../managecandidato' ], { relativeTo: this.route })
        }else if (res.status == 403){
          swal('Error...', 'Usuario no tiene permiso para guardar Candidato.', 'error');
        }else{
          swal('Error...', 'Candidato deleted unsuccessfully.', 'error');
        }
      },error =>{
        if (error.status == 500){
          swal('Warning...', 'Candidato no se puede eliminar debido a que esta asociado con otra entidad.', 'warning');
        }
      }
	);
    } else {
      //swal("Cancelled", "Candidato deleted unsuccessfully", "error");
    }
  });
}

return(candidato){
  this.location.back();
}
 
changeFecha(value){
	this.changeFormatFecha = value;
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


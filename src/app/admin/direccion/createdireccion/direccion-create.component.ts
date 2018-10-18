import { Component, OnInit, ViewChild}                                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl }                 from '@angular/forms';
import swal from 'sweetalert2';
import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CustomNgbDateParserFormatter } from '../../../dateformat';

import { DireccionService }                                  from '../../direccion/direccion.component.service';
import { Direccion }                                         from '../../direccion/direccion.component.model';

import { CandidatoService }                                  from '../../candidato/candidato.component.service';
import { Candidato }                                         from '../../candidato/candidato.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './direccion-create.component.html',
	styleUrls: ['./direccion-create.component.css']
})

export class DireccionCreateComponent implements OnInit {

   public title = 'Nuevo Direccion';
   public direccionform: any;
   public user: User;
   public valueName: string;
   public token: string;

public direccionList: Direccion [];
public direccion: Direccion;
public direccionAux: Direccion;

public busquedaDireccion='';
filterInputDireccion = new FormControl();
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
			private direccionService: DireccionService
			,private candidatoService: CandidatoService
){
  	 this.filterInputDireccion.valueChanges.subscribe(busquedaDireccion => {
  	  	this.busquedaDireccion = busquedaDireccion;
  	  });
	this.filterInputCandidato.valueChanges.subscribe(busquedaCandidato => {
	    this.busquedaCandidato = busquedaCandidato;
	  });
}

ngOnInit() {
	this.direccionService.clear();
	      this.direccion = new Direccion;
	this.loadCandidato();
} 

save(){
	if (
	this.direccion.candidatoId === null ||
	this.direccion.calle ==="" || this.direccion.calle ===null || 
	this.direccion.cp ==="" || this.direccion.cp ===null || 
	this.direccion.ciudad ==="" || this.direccion.ciudad ===null || 
	this.direccion.estado ==="" || this.direccion.estado ===null || 
		this.direccion.direccionId === null 
	){
		return;
	}else{
	   this.direccionService.saveDireccion(this.direccion).subscribe(res => {
	     if (res.status == 201 || res.status == 200){
	        swal('Success...', 'Direccion save successfully.', 'success');
	        this.router.navigate([ '../managedireccion' ], { relativeTo: this.route })
	     }else if (res.status == 403){
	        swal('Error...', 'Usuario no tiene permiso para guardar direccion.', 'error');
	     }else{
	       swal('Error...', 'direccion save unsuccessfully.', 'error');
	     }
	   } );
	}
}

loadCandidato(){
	this.candidatoService.getAllCandidato().subscribe(data => {
   		if (data) {
 		this.candidatoList = data;
 		this.candidatoList.forEach(element => {
 		      	if (element.generoId == 'mas'){
 		      	    element.generoItem = "Masculino";
 		      	}		
 		      	if (element.generoId == 'fem'){
 		      	    element.generoItem = "Femenino";
 		      	}		
 		});
 		this.candidatoList.forEach(element => {
 		      	if (element.estatuscandidatoId == 'e1'){
 		      	    element.estatuscandidatoItem = "Contactado";
 		      	}		
 		      	if (element.estatuscandidatoId == 'e2'){
 		      	    element.estatuscandidatoItem = "En proceso de evaluación";
 		      	}		
 		      	if (element.estatuscandidatoId == 'e3'){
 		      	    element.estatuscandidatoItem = "Ofertado";
 		      	}		
 		      	if (element.estatuscandidatoId == 'e4'){
 		      	    element.estatuscandidatoItem = "En proceso de contratación";
 		      	}		
 		      	if (element.estatuscandidatoId == 'e5'){
 		      	    element.estatuscandidatoItem = "Contratado";
 		      	}		
 		      	if (element.estatuscandidatoId == 'e6'){
 		      	    element.estatuscandidatoItem = "Rechazado";
 		      	}		
 		      	if (element.estatuscandidatoId == 'e7'){
 		      	    element.estatuscandidatoItem = "Declinó";
 		      	}		
 		});
 		}
	}, error => {
		swal('Error...', 'An error occurred while calling the Candidatos.', 'error');
	});
 }

 setClickedRowCandidato(index,candidato){
 	  candidato.checked = !candidato.checked;
 	  if (candidato.checked){
	 	  this.candidatoService.setCandidato(candidato);
this.direccion.candidatoId = candidato.candidatoId;
this.direccion.candidatoItem = candidato.nombre;
 	  }else{
 	      this.candidatoService.clear();
this.direccion.candidatoId = "";
this.direccion.candidatoItem = "";
 	   }
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

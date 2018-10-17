import { Component, OnInit, ViewChild}                                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl }                 from '@angular/forms';
import swal from 'sweetalert2';
import { Location } from '@angular/common';
import { User } from '../../user/user.component.model';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CustomNgbDateParserFormatter } from '../../../dateformat';

import { SolicitudService }                                  from '../../solicitud/solicitud.component.service';
import { Solicitud }                                         from '../../solicitud/solicitud.component.model';

import { PosicionService }                                  from '../../posicion/posicion.component.service';
import { Posicion }                                         from '../../posicion/posicion.component.model';
import { CandidatoService }                                  from '../../candidato/candidato.component.service';
import { Candidato }                                         from '../../candidato/candidato.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './solicitud-create.component.html',
	styleUrls: ['./solicitud-create.component.css']
})

export class SolicitudCreateComponent implements OnInit {

   public title = 'Nuevo Solicitud';
   public solicitudform: any;
   public user: User;
   public valueName: string;
   public token: string;

public solicitudList: Solicitud [];
public solicitud: Solicitud;
public solicitudAux: Solicitud;

public busquedaSolicitud='';
filterInputSolicitud = new FormControl();

public posicionList: Posicion [];
public posicion: Posicion;
public posicionAux: Posicion;

public busquedaPosicion='';
filterInputPosicion = new FormControl();
public candidatoList: Candidato [];
public candidato: Candidato;
public candidatoAux: Candidato;

public busquedaCandidato='';
filterInputCandidato = new FormControl();

constructor(private router: Router,  
			private route: ActivatedRoute, 
			private location: Location,
			private parseFormat: CustomNgbDateParserFormatter,
			private solicitudService: SolicitudService
			,private posicionService: PosicionService
			,private candidatoService: CandidatoService
){
  	 this.filterInputSolicitud.valueChanges.subscribe(busquedaSolicitud => {
  	  	this.busquedaSolicitud = busquedaSolicitud;
  	  });
	this.filterInputPosicion.valueChanges.subscribe(busquedaPosicion => {
	    this.busquedaPosicion = busquedaPosicion;
	  });
	this.filterInputCandidato.valueChanges.subscribe(busquedaCandidato => {
	    this.busquedaCandidato = busquedaCandidato;
	  });
}

ngOnInit() {
	this.solicitudService.clear();
	      this.solicitud = new Solicitud;
	this.loadPosicion();
	this.loadCandidato();
} 

save(){
	if (
	this.solicitud.posicionId === null ||
	this.solicitud.salario ===null || 
	this.solicitud.correo ==="" || this.solicitud.correo ===null || 
	this.solicitud.telefono ==="" || this.solicitud.telefono ===null || 
	this.solicitud.estatussolicitudId ==="" || this.solicitud.estatussolicitudId ===null || 
		this.solicitud.solicitudId === null 
	){
		return;
	}else{
	   this.solicitud.fecha = this.parseFormat.format(this.solicitud.fechaAux);
	   this.solicitudService.saveSolicitud(this.solicitud).subscribe(res => {
	     if (res.status == 201 || res.status == 200){
	        swal('Success...', 'Solicitud save successfully.', 'success');
	        this.router.navigate([ '../managesolicitud' ], { relativeTo: this.route })
	     }else if (res.status == 403){
	        swal('Error...', 'Usuario no tiene permiso para guardar solicitud.', 'error');
	     }else{
	       swal('Error...', 'solicitud save unsuccessfully.', 'error');
	     }
	   } );
	}
}

loadPosicion(){
	this.posicionService.getAllPosicion().subscribe(data => {
   		if (data) {
 		this.posicionList = data;
 		this.posicionList.forEach(element => {
 		      	if (element.tiponominaId == 'a'){
 		      	    element.tiponominaItem = "Externo";
 		      	}		
 		      	if (element.tiponominaId == 'b'){
 		      	    element.tiponominaItem = "Interno";
 		      	}		
 		      	if (element.tiponominaId == 'c'){
 		      	    element.tiponominaItem = "Sindicalizado";
 		      	}		
 		});
 		this.posicionList.forEach(element => {
 		      	if (element.estatusposicionId == 'e1'){
 		      	    element.estatusposicionItem = "Abierta";
 		      	}		
 		      	if (element.estatusposicionId == 'e2'){
 		      	    element.estatusposicionItem = "Cerrada";
 		      	}		
 		      	if (element.estatusposicionId == 'e3'){
 		      	    element.estatusposicionItem = "Cancelada";
 		      	}		
 		      	if (element.estatusposicionId == 'e4'){
 		      	    element.estatusposicionItem = "En pausa";
 		      	}		
 		});
 		}
	}, error => {
		swal('Error...', 'An error occurred while calling the Posicions.', 'error');
	});
 }

 setClickedRowPosicion(index,posicion){
 	  posicion.checked = !posicion.checked;
 	  if (posicion.checked){
	 	  this.posicionService.setPosicion(posicion);
this.solicitud.posicionId = posicion.posicionId;
this.solicitud.posicionItem = posicion.nombre;
 	  }else{
 	      this.posicionService.clear();
this.solicitud.posicionId = "";
this.solicitud.posicionItem = "";
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
this.solicitud.candidatoId = candidato.candidatoId;
this.solicitud.candidatoItem = candidato.nombre;
 	  }else{
 	      this.candidatoService.clear();
this.solicitud.candidatoId = "";
this.solicitud.candidatoItem = "";
 	   }
 }

}

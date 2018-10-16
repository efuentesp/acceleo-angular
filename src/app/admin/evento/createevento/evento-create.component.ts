import { Component, OnInit, ViewChild}                                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl }                 from '@angular/forms';
import swal from 'sweetalert2';
import { Location } from '@angular/common';
import { User } from '../../user/user.component.model';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { EventoService }                                  from '../../evento/evento.component.service';
import { Evento }                                         from '../../evento/evento.component.model';

import { PosicionService }                                  from '../../posicion/posicion.component.service';
import { Posicion }                                         from '../../posicion/posicion.component.model';
import { CandidatoService }                                  from '../../candidato/candidato.component.service';
import { Candidato }                                         from '../../candidato/candidato.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './evento-create.component.html',
	styleUrls: ['./evento-create.component.css']
})

export class EventoCreateComponent implements OnInit {

    public title = 'Nuevo Evento';
    public eventoform: any;
    public user: User;
    public valueName: string;
    public token: string;

public eventoList: Evento [];
public evento: Evento;
    public eventoAux: Evento;

public busquedaEvento='';
filterInputEvento = new FormControl();

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
			private parserFormatter: NgbDateParserFormatter,
			private eventoService: EventoService
			,private posicionService: PosicionService
			,private candidatoService: CandidatoService
){
  	 this.filterInputEvento.valueChanges.subscribe(busquedaEvento => {
     	this.busquedaEvento = busquedaEvento;
     });
     
		
	this.filterInputPosicion.valueChanges.subscribe(busquedaPosicion => {
		     this.busquedaPosicion = busquedaPosicion;
		   });
	this.filterInputCandidato.valueChanges.subscribe(busquedaCandidato => {
		     this.busquedaCandidato = busquedaCandidato;
		   });
		
}

    ngOnInit() {
		this.eventoService.clear();
        this.evento = new Evento;

		//this.loadEvento();
		this.loadPosicion();
		this.loadCandidato();
    } 

save(){

	if (
		this.evento.tipoeventoId ==="" || this.evento.tipoeventoId ===null || 
		this.evento.nombre ==="" || this.evento.nombre ===null || 
		this.evento.posicionId ===null ||
		this.evento.fecha ==="" || this.evento.fecha ===null || 
		this.evento.responsable ==="" || this.evento.responsable ===null || 
		this.evento.estatuseventoId ==="" || this.evento.estatuseventoId ===null || 
		this.evento.eventoId !== null 
	){
		return;
	}else{
	   this.eventoService.saveEvento(this.evento).subscribe(res => {
	     if (res.status == 201 || res.status == 200){
	        swal('Success...', 'Evento save successfully.', 'success');
	        this.router.navigate([ '../manageevento' ], { relativeTo: this.route })
	     }else if (res.status == 403){
	        swal('Error...', 'Usuario no tiene permiso para guardar evento.', 'error');
	     }else{
	       swal('Error...', 'evento save unsuccessfully.', 'error');
	     }
	   } );
   }
}

loadevento(){
  		this.eventoService.getAllEvento().subscribe(data => {
    	if (data) {
			this.eventoList = data;
    	}
  		}, error => {
    	swal('Error...', 'An error occurred while calling the Eventos.', 'error');
  		});
}

setClickedRowEvento(index,evento){	      
		  evento.checked = !evento.checked;
		  if (evento.checked){
		  this.eventoService.setEvento(evento);
		  this.evento.eventoId = evento.eventoId;
		  this.evento.eventoItem = evento.nombre;
	    	}else{
            this.eventoService.clear();
			this.evento.eventoId = null;
		    this.evento.eventoItem = "";
		}
 }
 
loadPosicion(){
   		this.posicionService.getAllPosicion().subscribe(data => {
     	if (data) {
      	
 		this.posicionList = data;

     	}
   		}, error => {
     	swal('Error...', 'An error occurred while calling the Posicions.', 'error');
   	});
 }

	  setClickedRowPosicion(index,posicion){
	 		  posicion.checked = !posicion.checked;
	 		  if (posicion.checked){
	 		  this.posicionService.setPosicion(posicion);
	 		  this.evento.posicionId = posicion.posicionId;
	 		  this.evento.posicionItem = posicion.nombre;
	 	    	}else{
	             this.posicionService.clear();
	 			this.evento.posicionId = null;
	 		    this.evento.posicionItem = "";
	 		}
	  }
loadCandidato(){
   		this.candidatoService.getAllCandidato().subscribe(data => {
     	if (data) {
      	
 		this.candidatoList = data;

     	}
   		}, error => {
     	swal('Error...', 'An error occurred while calling the Candidatos.', 'error');
   	});
 }

	  setClickedRowCandidato(index,candidato){
	 		  candidato.checked = !candidato.checked;
	 		  if (candidato.checked){
	 		  this.candidatoService.setCandidato(candidato);
	 		  this.evento.candidatoId = candidato.candidatoId;
	 		  this.evento.candidatoItem = candidato.nombre;
	 	    	}else{
	             this.candidatoService.clear();
	 			this.evento.candidatoId = null;
	 		    this.evento.candidatoItem = "";
	 		}
	  }
 

  return(evento){
      this.location.back();
  }
}

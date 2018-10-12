import { Component, OnInit, ViewChild}                                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl }                 from '@angular/forms';
import swal from 'sweetalert2';

import { Location, DatePipe } from '@angular/common';
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
    public evento: Evento;
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;
	public datePipe = new DatePipe('en-US');

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

		this.loadPosicions();
		this.loadCandidatos();
       
    } 

save(){

	this.evento.fecha = this.parserFormatter.format(this.evento.fechaAux);

   this.eventoService.saveEvento(this.evento).subscribe(res => {
     if (res.status == 201 || res.status == 200){
        swal('Success...', 'Evento save successfully.', 'success');
        this.router.navigate([ '../manageevento' ], { relativeTo: this.route })
     }else if (res.status == 403){
        swal('Error...', 'Usuario no tiene permiso para guardar Evento.', 'error');
     }else{
       swal('Error...', 'Evento save unsuccessfully.', 'error');
     }
   } );
}


	loadPosicions(){
  		this.posicionService.getAllPosicion().subscribe(data => {
    	if (data) {
      	
		this.posicionList = data;
// Cambios por cada modal
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
		  this.evento.posicionItem = posicion.posicionItem;
						// nombre+ "";
						// nombre+ "";
	    	}else{
            this.posicionService.clear();
			this.evento.posicionId = null;
		    this.evento.posicionItem = "";
		}
 }

	loadCandidatos(){
  		this.candidatoService.getAllCandidato().subscribe(data => {
    	if (data) {
      	
		this.candidatoList = data;
// Cambios por cada modal
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
		  this.evento.candidatoItem = candidato.candidatoItem;
						// nombre+ "";
						// nombre+ "";
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

import { Component, OnInit, ViewChild}                                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl }                 from '@angular/forms';
import swal from 'sweetalert2';

import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { CandidatoService }                                  from '../../candidato/candidato.component.service';
import { Candidato }                                         from '../../candidato/candidato.component.model';

import { SolicitudService }                                  from '../../solicitud/solicitud.component.service';
import { Solicitud }                                         from '../../solicitud/solicitud.component.model';
import { EventoService }                                  from '../../evento/evento.component.service';
import { Evento }                                         from '../../evento/evento.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './candidato-create.component.html',
	styleUrls: ['./candidato-create.component.css']
})

export class CandidatoCreateComponent implements OnInit {

    public title = 'Nuevo Candidato';
    public candidato: Candidato;
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;
	public datePipe = new DatePipe('en-US');

	public solicitudList: Solicitud [];
    public solicitud: Solicitud;
    public solicitudAux: Solicitud;

	public busquedaSolicitud='';
	filterInputSolicitud = new FormControl();

	public eventoList: Evento [];
    public evento: Evento;
    public eventoAux: Evento;

	public busquedaEvento='';
	filterInputEvento = new FormControl();


    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private parserFormatter: NgbDateParserFormatter,
				private candidatoService: CandidatoService
	,private solicitudService: SolicitudService
	,private eventoService: EventoService
){
  	 this.filterInputSolicitud.valueChanges.subscribe(busquedaSolicitud => {
     this.busquedaSolicitud = busquedaSolicitud;
   });
  	 this.filterInputEvento.valueChanges.subscribe(busquedaEvento => {
     this.busquedaEvento = busquedaEvento;
   });
	}

    ngOnInit() {
		this.candidatoService.clear();
        this.candidato = new Candidato;

		this.loadSolicituds();
		this.loadEventos();
       
    } 

save(){

	this.candidato.fecha = this.parserFormatter.format(this.candidato.fechaAux);

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


	loadSolicituds(){
  		this.solicitudService.getAllSolicitud().subscribe(data => {
    	if (data) {
      	
		this.solicitudList = data;
// Cambios por cada modal
    	}
  		}, error => {
    	swal('Error...', 'An error occurred while calling the Solicituds.', 'error');
  	});



}

 setClickedRowSolicitud(index,solicitud){
	      
		  solicitud.checked = !solicitud.checked;
		  if (solicitud.checked){
		  this.solicitudService.setSolicitud(solicitud);
		  this.candidato.solicitudId = solicitud.solicitudId;
		  this.candidato.solicitudItem = solicitud.
						correo+ "";
						nombre+ "";
	    	}else{
            this.solicitudService.clear();
			this.candidato.solicitudId = null;
		    this.candidato.solicitudItem = "";
		}
 }

	loadEventos(){
  		this.eventoService.getAllEvento().subscribe(data => {
    	if (data) {
      	
		this.eventoList = data;
// Cambios por cada modal
    	}
  		}, error => {
    	swal('Error...', 'An error occurred while calling the Eventos.', 'error');
  	});



}

 setClickedRowEvento(index,evento){
	      
		  evento.checked = !evento.checked;
		  if (evento.checked){
		  this.eventoService.setEvento(evento);
		  this.candidato.eventoId = evento.eventoId;
		  this.candidato.eventoItem = evento.
						correo+ "";
						nombre+ "";
	    	}else{
            this.eventoService.clear();
			this.candidato.eventoId = null;
		    this.candidato.eventoItem = "";
		}
 }

  return(candidato){
      this.location.back();
  }
}

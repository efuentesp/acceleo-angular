import { Component, OnInit, ViewChild}                                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl }                 from '@angular/forms';
import swal from 'sweetalert2';

import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { PosicionService }                                  from '../../posicion/posicion.component.service';
import { Posicion }                                         from '../../posicion/posicion.component.model';

import { FilialService }                                  from '../../filial/filial.component.service';
import { Filial }                                         from '../../filial/filial.component.model';
import { PuestoService }                                  from '../../puesto/puesto.component.service';
import { Puesto }                                         from '../../puesto/puesto.component.model';
import { ReclutadorService }                                  from '../../reclutador/reclutador.component.service';
import { Reclutador }                                         from '../../reclutador/reclutador.component.model';
import { SolicitudService }                                  from '../../solicitud/solicitud.component.service';
import { Solicitud }                                         from '../../solicitud/solicitud.component.model';
import { EventoService }                                  from '../../evento/evento.component.service';
import { Evento }                                         from '../../evento/evento.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './posicion-create.component.html',
	styleUrls: ['./posicion-create.component.css']
})

export class PosicionCreateComponent implements OnInit {

    public title = 'Nuevo Posicion';
    public posicion: Posicion;
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;
	public datePipe = new DatePipe('en-US');

	public filialList: Filial [];
    public filial: Filial;
    public filialAux: Filial;

	public busquedaFilial='';
	filterInputFilial = new FormControl();

	public puestoList: Puesto [];
    public puesto: Puesto;
    public puestoAux: Puesto;

	public busquedaPuesto='';
	filterInputPuesto = new FormControl();

	public reclutadorList: Reclutador [];
    public reclutador: Reclutador;
    public reclutadorAux: Reclutador;

	public busquedaReclutador='';
	filterInputReclutador = new FormControl();

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
				private posicionService: PosicionService
	,private filialService: FilialService
	,private puestoService: PuestoService
	,private reclutadorService: ReclutadorService
	,private solicitudService: SolicitudService
	,private eventoService: EventoService
){
  	 this.filterInputFilial.valueChanges.subscribe(busquedaFilial => {
     this.busquedaFilial = busquedaFilial;
   });
  	 this.filterInputPuesto.valueChanges.subscribe(busquedaPuesto => {
     this.busquedaPuesto = busquedaPuesto;
   });
  	 this.filterInputReclutador.valueChanges.subscribe(busquedaReclutador => {
     this.busquedaReclutador = busquedaReclutador;
   });
  	 this.filterInputSolicitud.valueChanges.subscribe(busquedaSolicitud => {
     this.busquedaSolicitud = busquedaSolicitud;
   });
  	 this.filterInputEvento.valueChanges.subscribe(busquedaEvento => {
     this.busquedaEvento = busquedaEvento;
   });
	}

    ngOnInit() {
		this.posicionService.clear();
        this.posicion = new Posicion;

		this.loadFilials();
		this.loadPuestos();
		this.loadReclutadors();
		this.loadSolicituds();
		this.loadEventos();
       
    } 

save(){

	this.posicion.fecha = this.parserFormatter.format(this.posicion.fechaAux);

   this.posicionService.savePosicion(this.posicion).subscribe(res => {
     if (res.status == 201 || res.status == 200){
        swal('Success...', 'Posicion save successfully.', 'success');
        this.router.navigate([ '../manageposicion' ], { relativeTo: this.route })
     }else if (res.status == 403){
        swal('Error...', 'Usuario no tiene permiso para guardar Posicion.', 'error');
     }else{
       swal('Error...', 'Posicion save unsuccessfully.', 'error');
     }
   } );
}


	loadFilials(){
  		this.filialService.getAllFilial().subscribe(data => {
    	if (data) {
      	
		this.filialList = data;
// Cambios por cada modal
    	}
  		}, error => {
    	swal('Error...', 'An error occurred while calling the Filials.', 'error');
  	});



}

 setClickedRowFilial(index,filial){
	      
		  filial.checked = !filial.checked;
		  if (filial.checked){
		  this.filialService.setFilial(filial);
		  this.posicion.filialId = filial.filialId;
		  this.posicion.filialItem = filial.
						nombre+ "";
					
	    	}else{
            this.filialService.clear();
			this.posicion.filialId = null;
		    this.posicion.filialItem = "";
		}
 }

	loadPuestos(){
  		this.puestoService.getAllPuesto().subscribe(data => {
    	if (data) {
      	
		this.puestoList = data;
// Cambios por cada modal
    	}
  		}, error => {
    	swal('Error...', 'An error occurred while calling the Puestos.', 'error');
  	});



}

 setClickedRowPuesto(index,puesto){
	      
		  puesto.checked = !puesto.checked;
		  if (puesto.checked){
		  this.puestoService.setPuesto(puesto);
		  this.posicion.puestoId = puesto.puestoId;
		  this.posicion.puestoItem = puesto.
						nombre+ "";
						
	    	}else{
            this.puestoService.clear();
			this.posicion.puestoId = null;
		    this.posicion.puestoItem = "";
		}
 }

	loadReclutadors(){
  		this.reclutadorService.getAllReclutador().subscribe(data => {
    	if (data) {
      	
		this.reclutadorList = data;
// Cambios por cada modal
    	}
  		}, error => {
    	swal('Error...', 'An error occurred while calling the Reclutadors.', 'error');
  	});



}

 setClickedRowReclutador(index,reclutador){
	      
		  reclutador.checked = !reclutador.checked;
		  if (reclutador.checked){
		  this.reclutadorService.setReclutador(reclutador);
		  this.posicion.reclutadorId = reclutador.reclutadorId;
		  this.posicion.reclutadorItem = reclutador.
						nombre+ "";
						
	    	}else{
            this.reclutadorService.clear();
			this.posicion.reclutadorId = null;
		    this.posicion.reclutadorItem = "";
		}
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
		  this.posicion.solicitudId = solicitud.solicitudId;
		  this.posicion.solicitudItem = solicitud.
						nombre+ "";
					
	    	}else{
            this.solicitudService.clear();
			this.posicion.solicitudId = null;
		    this.posicion.solicitudItem = "";
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
		  this.posicion.eventoId = evento.eventoId;
		  this.posicion.eventoItem = evento.
						nombre+ "";
						
	    	}else{
            this.eventoService.clear();
			this.posicion.eventoId = null;
		    this.posicion.eventoItem = "";
		}
 }

  return(posicion){
      this.location.back();
  }
}

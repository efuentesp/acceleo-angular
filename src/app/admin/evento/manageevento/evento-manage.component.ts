import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';

import { EventoService }                                  from '../../evento/evento.component.service';
import { Evento }                                         from '../../evento/evento.component.model';

import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { PosicionService }                                  from '../../posicion/posicion.component.service';
import { Posicion }                                         from '../../posicion/posicion.component.model';
import { CandidatoService }                                  from '../../candidato/candidato.component.service';
import { Candidato }                                         from '../../candidato/candidato.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './evento-manage.component.html',
	styleUrls: ['./evento-manage.component.css']
})

export class EventoManageComponent implements OnInit {

    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

    public title = 'Manage Evento';
    public eventoList: Evento [];
    public evento: Evento;

  	public busquedaEvento='';
    public filterInputEvento = new FormControl();
    datePipe = new DatePipe('en-US');

 	public userAdmin: User = JSON.parse(localStorage.getItem('currentUser'));

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

    // Buttons 
    private searchActive: boolean = false;
    private updateActive: boolean = false;
    private createActive: boolean = false;
    private deleteActive: boolean = false;

    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private eventoService:EventoService
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
      
	  // Get data user
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      this.valueName = this.user.username;
      this.token = this.user.token;

      this.eventoService.setEdit(false);
      this.eventoService.setDelete(false);

      this.loadEvento();
      this.habilita();

    }   
    
loadEvento(){
    this.eventoService.getAllEvento().subscribe(data => {
        if (data) {
            this.eventoList = data;
            
            // Grid Values
this.eventoList.forEach(element => {
      	if (element.tipoeventoId == 'a'){
      	    element.tipoeventoItem = "Llamada telefónica";
      	}		
      	if (element.tipoeventoId == 'b'){
      	    element.tipoeventoItem = "Contacto por eMail";
      	}		
      	if (element.tipoeventoId == 'c'){
      	    element.tipoeventoItem = "Entrevista";
      	}		
      	if (element.tipoeventoId == 'd'){
      	    element.tipoeventoItem = "Examen";
      	}		
      	if (element.tipoeventoId == 'e'){
      	    element.tipoeventoItem = "AutorizaciónNivel 1";
      	}		
      	if (element.tipoeventoId == 'f'){
      	    element.tipoeventoItem = "AutorizaciónNivel 2";
      	}		
      	if (element.tipoeventoId == 'g'){
      	    element.tipoeventoItem = "AutorizaciónNivel 3";
      	}		
      	if (element.tipoeventoId == 'h'){
      	    element.tipoeventoItem = "AutorizaciónNivel 4";
      	}		
      	if (element.tipoeventoId == 'i'){
      	    element.tipoeventoItem = "AutorizaciónNivel 5";
      	}		
});
this.eventoList.forEach(element => {
     this.posicionService.getPosicionById(element.posicionId).subscribe(data => {
         if (data){
         	element.posicionItem = data.nombre;
         }
    });
});
this.eventoList.forEach(element => {
     this.candidatoService.getCandidatoById(element.candidatoId).subscribe(data => {
         if (data){
         	element.candidatoItem = data.nombre;
         }
    });
});
this.eventoList.forEach(element => {
      	if (element.estatuseventoId == 'e1'){
      	    element.estatuseventoItem = "Agendado";
      	}		
      	if (element.estatuseventoId == 'e2'){
      	    element.estatuseventoItem = "Realizado";
      	}		
      	if (element.estatuseventoId == 'e3'){
      	    element.estatuseventoItem = "Pedido por candidato";
      	}		
      	if (element.estatuseventoId == 'e4'){
      	    element.estatuseventoItem = "Perdido por NMP";
      	}		
      	if (element.estatuseventoId == 'e5'){
      	    element.estatuseventoItem = "Cancelado por candidato";
      	}		
      	if (element.estatuseventoId == 'e6'){
      	    element.estatuseventoItem = "Cancelado por NMP";
      	}		
});
        }
    }, error => {
    swal('Error...', 'An error occurred while calling the eventos.', 'error');
    });
}


add(){
	this.eventoService.clear();
	this.router.navigate([ '../createevento' ], { relativeTo: this.route })
}


editar(evento){
	this.eventoService.setEvento(evento);
	this.eventoService.setEdit(true);
	this.eventoService.setDelete(false);
	this.router.navigate([ '../editevento' ], { relativeTo: this.route })
}


eliminar(evento){
	this.eventoService.setEvento(evento);
	this.eventoService.setEdit(false);
	this.eventoService.setDelete(true);
	this.router.navigate([ '../editevento' ], { relativeTo: this.route })
}

  // Select row
  setClickedRowEvento(index, evento){
    this.eventoService.setEvento(evento);
    this.eventoService.setEdit(true);
    this.eventoService.setDelete(false);
    this.router.navigate([ '../editevento' ], { relativeTo: this.route })
  }
  
  habilita(){
    this.userAdmin.authorities.forEach(element => {
if (element.authority == 'ROLE_EVENTODELETE'){
	this.deleteActive = true;
}
if (element.authority == 'ROLE_EVENTOCREATE'){
this.createActive = true;
}
if (element.authority == 'ROLE_EVENTOUPDATE'){
	this.updateActive = true;
}
if (element.authority == 'ROLE_ORDENSIMPLIFICADASEARCH'){
	this.searchActive = true;
}
    });
  }

  // Parse to NgbDateStruct
    isNumber(value: any): boolean {
      return !isNaN(this.toInteger(value));
  }
 
  toInteger(value: any): number {
      return parseInt(`${value}`, 10);
  }
  parse(value: string): NgbDateStruct {
    if (value) {
        const dateParts = value.trim().split('-');
        if (dateParts.length === 1 && this.isNumber(dateParts[0])) {
            return {day: this.toInteger(dateParts[0]), month: null, year: null};
        } else if (dateParts.length === 2 && this.isNumber(dateParts[0]) && this.isNumber(dateParts[1])) {
            return {day: this.toInteger(dateParts[1]), month: this.toInteger(dateParts[0]), year: null};
        } else if (dateParts.length === 3 && this.isNumber(dateParts[0]) && this.isNumber(dateParts[1]) && this.isNumber(dateParts[2])) {
            return {day: this.toInteger(dateParts[2]), month: this.toInteger(dateParts[1]), year: this.toInteger(dateParts[0])};
        }
    }
    return null;
  }
  
  go(value, evento){
      this.router.navigate([ '../'+value+'' ], { relativeTo: this.route })
  }
}

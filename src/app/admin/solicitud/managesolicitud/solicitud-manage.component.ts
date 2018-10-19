import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';

import { SolicitudService }                                  from '../../solicitud/solicitud.component.service';
import { Solicitud }                                         from '../../solicitud/solicitud.component.model';

import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { PosicionService }                                  from '../../posicion/posicion.component.service';
import { Posicion }                                         from '../../posicion/posicion.component.model';
import { CandidatoService }                                  from '../../candidato/candidato.component.service';
import { Candidato }                                         from '../../candidato/candidato.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './solicitud-manage.component.html',
	styleUrls: ['./solicitud-manage.component.css']
})

export class SolicitudManageComponent implements OnInit {

    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

    public title = 'Manage Solicitud';
    public solicitudList: Solicitud [];
    public solicitud: Solicitud;

  	public busquedaSolicitud='';
    public filterInputSolicitud = new FormControl();
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
				private solicitudService:SolicitudService
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
      
	  // Get data user
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      this.valueName = this.user.username;
      this.token = this.user.token;

      this.solicitudService.setEdit(false);
      this.solicitudService.setDelete(false);

      this.loadSolicitud();
      this.habilita();

    }   
    
loadSolicitud(){
    this.solicitudService.getAllSolicitud().subscribe(data => {
        if (data) {
            this.solicitudList = data;
            
            // Grid Values
this.solicitudList.forEach(element => {
     this.posicionService.getPosicionById(element.posicionId).subscribe(data => {
         if (data){
         	element.posicionItem = data.nombre;
         }
    });
});
this.solicitudList.forEach(element => {
     this.candidatoService.getCandidatoById(element.candidatoId).subscribe(data => {
         if (data){
         	element.candidatoItem = data.nombre;
         }
    });
});
this.solicitudList.forEach(element => {
      	if (element.estatussolicitudId == 'e1'){
      	    element.estatussolicitudItem = "Registrada";
      	}		
      	if (element.estatussolicitudId == 'e2'){
      	    element.estatussolicitudItem = "Completada";
      	}		
      	if (element.estatussolicitudId == 'e3'){
      	    element.estatussolicitudItem = "Cancelada x candidato";
      	}		
      	if (element.estatussolicitudId == 'e4'){
      	    element.estatussolicitudItem = "Cancelada x reclutador";
      	}		
});
        }
    }, error => {
    swal('Error...', 'An error occurred while calling the solicituds.', 'error');
    });
}


add(){
	this.solicitudService.clear();
	this.router.navigate([ '../createsolicitud' ], { relativeTo: this.route })
}


editar(solicitud){
	this.solicitudService.setSolicitud(solicitud);
	this.solicitudService.setEdit(true);
	this.solicitudService.setDelete(false);
	this.router.navigate([ '../editsolicitud' ], { relativeTo: this.route })
}


eliminar(solicitud){
	this.solicitudService.setSolicitud(solicitud);
	this.solicitudService.setEdit(false);
	this.solicitudService.setDelete(true);
	this.router.navigate([ '../editsolicitud' ], { relativeTo: this.route })
}

  // Select row
  setClickedRowSolicitud(index, solicitud){
    this.solicitudService.setSolicitud(solicitud);
    this.solicitudService.setEdit(true);
    this.solicitudService.setDelete(false);
    this.router.navigate([ '../editsolicitud' ], { relativeTo: this.route })
  }
  
  habilita(){
    this.userAdmin.authorities.forEach(element => {
if (element.authority == 'ROLE_SOLICITUDDELETE'){
	this.deleteActive = true;
}
if (element.authority == 'ROLE_SOLICITUDCREATE'){
this.createActive = true;
}
if (element.authority == 'ROLE_SOLICITUDUPDATE'){
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
  
  go(value, solicitud){
      this.router.navigate([ '../'+value+'' ], { relativeTo: this.route })
  }
}

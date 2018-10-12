import { Component, OnInit, ViewChild}                                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl }                 from '@angular/forms';
import swal from 'sweetalert2';

import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

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
    public solicitud: Solicitud;
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
				private solicitudService: SolicitudService
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
		this.solicitudService.clear();
        this.solicitud = new Solicitud;

		this.loadPosicions();
		this.loadCandidatos();
       
    } 

save(){


   this.solicitudService.saveSolicitud(this.solicitud).subscribe(res => {
     if (res.status == 201 || res.status == 200){
        swal('Success...', 'Solicitud save successfully.', 'success');
        this.router.navigate([ '../managesolicitud' ], { relativeTo: this.route })
     }else if (res.status == 403){
        swal('Error...', 'Usuario no tiene permiso para guardar Solicitud.', 'error');
     }else{
       swal('Error...', 'Solicitud save unsuccessfully.', 'error');
     }
   } );
}


	loadPosicions(){
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
		  this.solicitud.posicionId = posicion.posicionId;
		  this.solicitud.posicionItem = posicion.
						nombre+ "";
						
	    	}else{
            this.posicionService.clear();
			this.solicitud.posicionId = null;
		    this.solicitud.posicionItem = "";
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
		  this.solicitud.candidatoId = candidato.candidatoId;
		  this.solicitud.candidatoItem = candidato.
						nombre+ "";
						
	    	}else{
            this.candidatoService.clear();
			this.solicitud.candidatoId = null;
		    this.solicitud.candidatoItem = "";
		}
 }

  return(solicitud){
      this.location.back();
  }
}

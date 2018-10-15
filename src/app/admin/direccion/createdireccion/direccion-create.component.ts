import { Component, OnInit, ViewChild}                                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl }                 from '@angular/forms';
import swal from 'sweetalert2';
import { Location } from '@angular/common';
import { User } from '../../user/user.component.model';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

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

public candidatoList: Candidato [];
	    public candidato: Candidato;
	    public candidatoAux: Candidato;
	    
	    public busquedaCandidato='';
	    filterInputCandidato = new FormControl();

constructor(private router: Router,  
			private route: ActivatedRoute, 
			private location: Location,
			private parserFormatter: NgbDateParserFormatter,
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

		//this.loadDireccion();
		this.loadCandidato();
    } 

save(){

	if (
		this.direccion.candidatoId ===null ||
		this.direccion.calle ==="" || this.direccion.calle ===null || 
		this.direccion.cp ==="" || this.direccion.cp ===null || 
		this.direccion.ciudad ==="" || this.direccion.ciudad ===null || 
		this.direccion.estado ==="" || this.direccion.estado ===null || 
		this.direccion.direccionId !== null 
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

loaddireccion(){
  		this.direccionService.getAllDireccion().subscribe(data => {
    	if (data) {
			this.direccionList = data;
    	}
  		}, error => {
    	swal('Error...', 'An error occurred while calling the Direccions.', 'error');
  		});
}

setClickedRowDireccion(index,direccion){	      
		  direccion.checked = !direccion.checked;
		  if (direccion.checked){
		  this.direccionService.setDireccion(direccion);
		  this.direccion.direccionId = direccion.direccionId;
		  this.direccion.direccionItem = direccion.cP;
	    	}else{
            this.direccionService.clear();
			this.direccion.direccionId = null;
		    this.direccion.direccionItem = "";
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
	 		  this.direccion.candidatoId = candidato.candidatoId;
	 		  this.direccion.candidatoItem = candidato.nombre;
	 	    	}else{
	             this.candidatoService.clear();
	 			this.direccion.candidatoId = null;
	 		    this.direccion.candidatoItem = "";
	 		}
	  }
 

  return(direccion){
      this.location.back();
  }
}

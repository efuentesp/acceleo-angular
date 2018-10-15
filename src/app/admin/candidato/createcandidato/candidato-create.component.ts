import { Component, OnInit, ViewChild}                                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl }                 from '@angular/forms';
import swal from 'sweetalert2';
import { Location } from '@angular/common';
import { User } from '../../user/user.component.model';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { CandidatoService }                                  from '../../candidato/candidato.component.service';
import { Candidato }                                         from '../../candidato/candidato.component.model';


@Component ({
    selector: 'app-view',
    templateUrl: './candidato-create.component.html',
	styleUrls: ['./candidato-create.component.css']
})

export class CandidatoCreateComponent implements OnInit {

    public title = 'Nuevo Candidato';
    public candidatoform: any;
    public user: User;
    public valueName: string;
    public token: string;

public candidatoList: Candidato [];
public candidato: Candidato;
    public candidatoAux: Candidato;

public busquedaCandidato='';
filterInputCandidato = new FormControl();


constructor(private router: Router,  
			private route: ActivatedRoute, 
			private location: Location,
			private parserFormatter: NgbDateParserFormatter,
			private candidatoService: CandidatoService
){
  	 this.filterInputCandidato.valueChanges.subscribe(busquedaCandidato => {
     	this.busquedaCandidato = busquedaCandidato;
     });
     
		
		
}

    ngOnInit() {
		this.candidatoService.clear();
        this.candidato = new Candidato;

		//this.loadCandidato();
    } 

save(){

	if (
		this.candidato.nombre ==="" || this.candidato.nombre ===null || 
		this.candidato.apellidopaterno ==="" || this.candidato.apellidopaterno ===null || 
		this.candidato.apellidomaterno ==="" || this.candidato.apellidomaterno ===null || 
		this.candidato.fecha ==="" || this.candidato.fecha ===null || 
		this.candidato.generoId ==="" || this.candidato.generoId ===null || 
		this.candidato.estatuscandidatoId ==="" || this.candidato.estatuscandidatoId ===null || 
		this.candidato.candidatoId !== null 
	){
		return;
	}else{
	   this.candidatoService.saveCandidato(this.candidato).subscribe(res => {
	     if (res.status == 201 || res.status == 200){
	        swal('Success...', 'Candidato save successfully.', 'success');
	        this.router.navigate([ '../managecandidato' ], { relativeTo: this.route })
	     }else if (res.status == 403){
	        swal('Error...', 'Usuario no tiene permiso para guardar candidato.', 'error');
	     }else{
	       swal('Error...', 'candidato save unsuccessfully.', 'error');
	     }
	   } );
   }
}

loadcandidato(){
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
		  this.candidato.candidatoId = candidato.candidatoId;
		  this.candidato.candidatoItem = candidato.nombre;
	    	}else{
            this.candidatoService.clear();
			this.candidato.candidatoId = null;
		    this.candidato.candidatoItem = "";
		}
 }
 
 

  return(candidato){
      this.location.back();
  }
}

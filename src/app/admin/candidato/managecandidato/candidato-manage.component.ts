import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';

import { CandidatoService }                                  from '../../candidato/candidato.component.service';
import { Candidato }                                         from '../../candidato/candidato.component.model';

import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';


@Component ({
    selector: 'app-view',
    templateUrl: './candidato-manage.component.html',
	styleUrls: ['./candidato-manage.component.css']
})

export class CandidatoManageComponent implements OnInit {

    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

    public title = 'Manage Candidato';
    public candidatoList: Candidato [];
    public candidato: Candidato;

  	public busquedaCandidato='';
    public filterInputCandidato = new FormControl();
    datePipe = new DatePipe('en-US');

 	public userAdmin: User = JSON.parse(localStorage.getItem('currentUser'));


    // Buttons 
    private searchActive: boolean = false;
    private updateActive: boolean = false;
    private createActive: boolean = false;
    private deleteActive: boolean = false;

    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private candidatoService:CandidatoService
){
			this.filterInputCandidato.valueChanges.subscribe(busquedaCandidato => {
		  	  	this.busquedaCandidato = busquedaCandidato;
		  	  });
}

    ngOnInit() {
      
	  // Get data user
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      this.valueName = this.user.username;
      this.token = this.user.token;

      this.candidatoService.setEdit(false);
      this.candidatoService.setDelete(false);

      this.loadCandidato();
      this.habilita();

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
    swal('Error...', 'An error occurred while calling the candidatos.', 'error');
    });
}


add(){
	this.candidatoService.clear();
	this.router.navigate([ '../createcandidato' ], { relativeTo: this.route })
}


editar(candidato){
	this.candidatoService.setCandidato(candidato);
	this.candidatoService.setEdit(true);
	this.candidatoService.setDelete(false);
	this.router.navigate([ '../editcandidato' ], { relativeTo: this.route })
}


eliminar(candidato){
	this.candidatoService.setCandidato(candidato);
	this.candidatoService.setEdit(false);
	this.candidatoService.setDelete(true);
	this.router.navigate([ '../editcandidato' ], { relativeTo: this.route })
}

  // Select row
  setClickedRowCandidato(index, candidato){
    this.candidatoService.setCandidato(candidato);
    this.candidatoService.setEdit(true);
    this.candidatoService.setDelete(false);
    this.router.navigate([ '../editcandidato' ], { relativeTo: this.route })
  }
  
  habilita(){
    this.userAdmin.authorities.forEach(element => {
if (element.authority == 'ROLE_CANDIDATODELETE'){
	this.deleteActive = true;
}
if (element.authority == 'ROLE_CANDIDATOCREATE'){
this.createActive = true;
}
if (element.authority == 'ROLE_CANDIDATOUPDATE'){
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
  
  go(value, candidato){
      this.router.navigate([ '../'+value+'' ], { relativeTo: this.route })
  }
}

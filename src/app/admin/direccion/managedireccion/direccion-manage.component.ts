import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute, Params}                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';

import { DireccionService }                                  from '../../direccion/direccion.component.service';
import { Direccion }                                         from '../../direccion/direccion.component.model';

import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { CandidatoService }                                  from '../../candidato/candidato.component.service';
import { Candidato }                                         from '../../candidato/candidato.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './direccion-manage.component.html',
	styleUrls: ['./direccion-manage.component.css']
})

export class DireccionManageComponent implements OnInit {

    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

    public filtro = null;

    public title = 'Manage Direccion';
    public direccionList: Direccion [];
    public direccion: Direccion;

  	public busquedaDireccion='';
    public filterInputDireccion = new FormControl();
    datePipe = new DatePipe('en-US');

 	public userAdmin: User = JSON.parse(localStorage.getItem('currentUser'));

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
    

// data  
public link: string = '';
public candidatoId: string = '';

    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private direccionService:DireccionService
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
      
	  // Get data user
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      this.valueName = this.user.username;
      this.token = this.user.token;

      this.filtro = this.user.authorityname;
      
      
      this.direccionService.setEdit(false);
      this.direccionService.setDelete(false);
    
      this.habilita();
      this.getParams();

    }   
    
loadDireccion(){
    this.direccionService.getAllDireccion().subscribe(data => {
        if (data) {
            this.direccionList = data;
            
            // Grid Values
// this.direccionList.forEach(element => {
//      this.candidatoService.getCandidatoById(element.candidatoId).subscribe(data => {
//          if (data){
//          	element.candidatoItem = data.nombre;
//          }
//     });
// });
        }
    }, error => {
    swal('Error...', 'An error occurred while calling the direccions.', 'error');
    });
}


add(){
	this.direccionService.clear();
	this.router.navigate([ '../createdireccion' ], { relativeTo: this.route })
}


editar(direccion){
	this.direccionService.setDireccion(direccion);
	this.direccionService.setEdit(true);
	this.direccionService.setDelete(false);
	this.router.navigate([ '../editdireccion' ], { relativeTo: this.route })
}


eliminar(direccion){
	this.direccionService.setDireccion(direccion);
	this.direccionService.setEdit(false);
	this.direccionService.setDelete(true);
	this.router.navigate([ '../editdireccion' ], { relativeTo: this.route })
}

  // Select row
  setClickedRowDireccion(index, direccion){
    this.direccionService.setDireccion(direccion);
    this.direccionService.setEdit(true);
    this.direccionService.setDelete(false);
    this.router.navigate([ '../editdireccion' ], { relativeTo: this.route })
  }
  
  habilita(){
    this.userAdmin.authorities.forEach(element => {
if (element.authority == 'ROLE_DIRECCIONDELETE'){
	this.deleteActive = true;
}
if (element.authority == 'ROLE_DIRECCIONCREATE'){
this.createActive = true;
}
if (element.authority == 'ROLE_DIRECCIONUPDATE'){
	this.updateActive = true;
}
if (element.authority == 'ROLE_DIRECCIONSEARCH'){
	this.searchActive = true;
}

 // Children with one to many
	
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

  loadDataCandidato(username){
    this.candidatoService.getAllCandidatoByUserName(username).subscribe(data => {
        if (data) {            
           this.candidato = data;
           this.loadDireccionByCandidato(this.candidato.candidatoId);
        }
    }, error => {
    swal('Error...', 'An error occurred while calling the candidatos.', 'error');
    });
}
  
  	
  	  getParams(){
  	    this.route.params.subscribe((params: Params) => {
  	        this.link = params['link'];
  	        
          	this.candidatoId = params['candidatoId'];
  	
  	        if (!this.link){

                if (this.filtro != 'USER'){
                    this.loadDireccion();
                }else{
                    this.loadDataCandidato(this.user.username);
				} 
  	           
  	        }else{

                if (this.filtro != 'USER'){
                    this.loadDataCandidato(this.user.username);
                }else{
                    this.loadDataCandidato(this.user.username);
				} 
  	        }
  	        
  	    });
  	  }
  	  
  	loadDireccionByCandidato(candidatoId){
  	    this.direccionService.getAllDireccionByCandidato(candidatoId).subscribe(data => {
  	        if (data) {
                if (data.length > 0) {
                    this.createActive = false;
                    this.direccionList = data;
                }else{
                    this.createActive = true;
                }
  	        }    
  	    }, error => {
  	    swal('Error...', 'An error occurred while calling the direccions.', 'error');
  	    });    
  	}
  	
}

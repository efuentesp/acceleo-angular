import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';

import { TrayectoriaService }                                  from '../../trayectoria/trayectoria.component.service';
import { Trayectoria }                                         from '../../trayectoria/trayectoria.component.model';

import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { CandidatoService }                                  from '../../candidato/candidato.component.service';
import { Candidato }                                         from '../../candidato/candidato.component.model';
import { DocumentoService }                                  from '../../documento/documento.component.service';
import { Documento }                                         from '../../documento/documento.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './trayectoria-manage.component.html',
	styleUrls: ['./trayectoria-manage.component.css']
})

export class TrayectoriaManageComponent implements OnInit {

    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

    public title = 'Manage Trayectoria';
    public trayectoriaList: Trayectoria [];
    public trayectoria: Trayectoria;

  	public busquedaTrayectoria='';
    public filterInputTrayectoria = new FormControl();
    datePipe = new DatePipe('en-US');

 	public userAdmin: User = JSON.parse(localStorage.getItem('currentUser'));

	public candidatoList: Candidato [];
	public candidato: Candidato;
	public candidatoAux: Candidato;
	
	public busquedaCandidato='';
	filterInputCandidato = new FormControl();
	public documentoList: Documento [];
	public documento: Documento;
	public documentoAux: Documento;
	
	public busquedaDocumento='';
	filterInputDocumento = new FormControl();

    // Buttons 
    private searchActive: boolean = false;
    private updateActive: boolean = false;
    private createActive: boolean = false;
    private deleteActive: boolean = false;

    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private trayectoriaService:TrayectoriaService
				,private candidatoService: CandidatoService
				,private documentoService: DocumentoService
){
			this.filterInputTrayectoria.valueChanges.subscribe(busquedaTrayectoria => {
		  	  	this.busquedaTrayectoria = busquedaTrayectoria;
		  	  });
			this.filterInputCandidato.valueChanges.subscribe(busquedaCandidato => {
			    this.busquedaCandidato = busquedaCandidato;
			  });
			this.filterInputDocumento.valueChanges.subscribe(busquedaDocumento => {
			    this.busquedaDocumento = busquedaDocumento;
			  });
}

    ngOnInit() {
      
	  // Get data user
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      this.valueName = this.user.username;
      this.token = this.user.token;

      this.trayectoriaService.setEdit(false);
      this.trayectoriaService.setDelete(false);

      this.loadTrayectoria();
      this.habilita();

    }   
    
loadTrayectoria(){
    this.trayectoriaService.getAllTrayectoria().subscribe(data => {
        if (data) {
            this.trayectoriaList = data;
            
            // Grid Values
this.trayectoriaList.forEach(element => {
     this.candidatoService.getCandidatoById(element.candidatoId).subscribe(data => {
         if (data){
         	element.candidatoItem = data.nombre;
         }
    });
});
this.trayectoriaList.forEach(element => {
      	if (element.tipotrayectoriaId == 'a'){
      	    element.tipotrayectoriaItem = "Estudios";
      	}		
      	if (element.tipotrayectoriaId == 'b'){
      	    element.tipotrayectoriaItem = "Certificación";
      	}		
      	if (element.tipotrayectoriaId == 'c'){
      	    element.tipotrayectoriaItem = "Experiencia Laboral";
      	}		
      	if (element.tipotrayectoriaId == 'd'){
      	    element.tipotrayectoriaItem = "Interés";
      	}		
      	if (element.tipotrayectoriaId == 'e'){
      	    element.tipotrayectoriaItem = "Habilidad";
      	}		
      	if (element.tipotrayectoriaId == 'f'){
      	    element.tipotrayectoriaItem = "Recomendación";
      	}		
      	if (element.tipotrayectoriaId == 'g'){
      	    element.tipotrayectoriaItem = "Curso";
      	}		
});
this.trayectoriaList.forEach(element => {
     this.documentoService.getDocumentoById(element.documentoId).subscribe(data => {
         if (data){
         	element.documentoItem = data.nombre;
         }
    });
});
        }
    }, error => {
    swal('Error...', 'An error occurred while calling the trayectorias.', 'error');
    });
}


add(){
	this.trayectoriaService.clear();
	this.router.navigate([ '../createtrayectoria' ], { relativeTo: this.route })
}


editar(trayectoria){
	this.trayectoriaService.setTrayectoria(trayectoria);
	this.trayectoriaService.setEdit(true);
	this.trayectoriaService.setDelete(false);
	this.router.navigate([ '../edittrayectoria' ], { relativeTo: this.route })
}


eliminar(trayectoria){
	this.trayectoriaService.setTrayectoria(trayectoria);
	this.trayectoriaService.setEdit(false);
	this.trayectoriaService.setDelete(true);
	this.router.navigate([ '../edittrayectoria' ], { relativeTo: this.route })
}

  // Select row
  setClickedRowTrayectoria(index, trayectoria){
    this.trayectoriaService.setTrayectoria(trayectoria);
    this.trayectoriaService.setEdit(true);
    this.trayectoriaService.setDelete(false);
    this.router.navigate([ '../edittrayectoria' ], { relativeTo: this.route })
  }
  
  habilita(){
    this.userAdmin.authorities.forEach(element => {
if (element.authority == 'ROLE_TRAYECTORIADELETE'){
	this.deleteActive = true;
}
if (element.authority == 'ROLE_TRAYECTORIACREATE'){
this.createActive = true;
}
if (element.authority == 'ROLE_TRAYECTORIAUPDATE'){
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
  
  go(value, trayectoria){
      this.router.navigate([ '../'+value+'' ], { relativeTo: this.route })
  }
}

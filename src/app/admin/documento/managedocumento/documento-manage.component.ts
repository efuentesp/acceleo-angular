import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute, Params}                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';

import { DocumentoService }                                  from '../../documento/documento.component.service';
import { Documento }                                         from '../../documento/documento.component.model';

import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CandidatoService } from '../../candidato/candidato.component.service';
import { Candidato } from '../../candidato/candidato.component.model';


@Component ({
    selector: 'app-view',
    templateUrl: './documento-manage.component.html',
	styleUrls: ['./documento-manage.component.css']
})

export class DocumentoManageComponent implements OnInit {

    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

    public filtro = null;

    public title = 'Manage Documento';
    public documentoList: Documento [];
    public documento: Documento;

  	public busquedaDocumento='';
    public filterInputDocumento = new FormControl();
    datePipe = new DatePipe('en-US');

 	public userAdmin: User = JSON.parse(localStorage.getItem('currentUser'));
    public candidato: Candidato;

    // Buttons 
    private searchActive: boolean = false;
    private updateActive: boolean = false;
    private createActive: boolean = false;
    private deleteActive: boolean = false;
    

// data  
public link: string = '';

    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
                private documentoService:DocumentoService,
                private candidatoService: CandidatoService
){
			this.filterInputDocumento.valueChanges.subscribe(busquedaDocumento => {
		  	  	this.busquedaDocumento = busquedaDocumento;
		  	  });
}

    ngOnInit() {
      
	  // Get data user
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      this.valueName = this.user.username;
      this.token = this.user.token;

      this.filtro = this.user.authorityname;

      this.documentoService.setEdit(false);
      this.documentoService.setDelete(false);
    
      this.habilita();
      this.getParams();

    }   
    
loadDocumento(){
    this.documentoService.getAllDocumento().subscribe(data => {
        if (data) {
            this.documentoList = data;
            
            // Grid Values
        }
    }, error => {
    swal('Error...', 'An error occurred while calling the documentos.', 'error');
    });
}

loadDocumentoByCandidato(id){
    this.documentoService.getAllDocumentoByCandidato(id).subscribe(data => {
        if (data) {
            this.documentoList = data;
        }
    }, error => {
    swal('Error...', 'An error occurred while calling the documentos.', 'error');
    });
}


add(){
	this.documentoService.clear();
	this.router.navigate([ '../createdocumento' ], { relativeTo: this.route })
}


editar(documento){
	this.documentoService.setDocumento(documento);
	this.documentoService.setEdit(true);
	this.documentoService.setDelete(false);
	this.router.navigate([ '../editdocumento' ], { relativeTo: this.route })
}


eliminar(documento){
	this.documentoService.setDocumento(documento);
	this.documentoService.setEdit(false);
	this.documentoService.setDelete(true);
	this.router.navigate([ '../editdocumento' ], { relativeTo: this.route })
}

  // Select row
  setClickedRowDocumento(index, documento){
    this.documentoService.setDocumento(documento);
    this.documentoService.setEdit(true);
    this.documentoService.setDelete(false);
    this.router.navigate([ '../editdocumento' ], { relativeTo: this.route })
  }
  
  habilita(){
    this.userAdmin.authorities.forEach(element => {
if (element.authority == 'ROLE_DOCUMENTODELETE'){
	this.deleteActive = true;
}
if (element.authority == 'ROLE_DOCUMENTOCREATE'){
this.createActive = true;
}
if (element.authority == 'ROLE_DOCUMENTOUPDATE'){
	this.updateActive = true;
}
if (element.authority == 'ROLE_DOCUMENTOSEARCH'){
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
  
  	
  	  getParams(){
  	    this.route.params.subscribe((params: Params) => {
  	        this.link = params['link'];
  	        
  	
  	        if (!this.link){

                if (this.filtro != 'USER'){
                    this.loadDocumento();
                }else{
                    this.loadDataCandidato(this.user.username);
                } 
  	            
  	        }else{
  	        	
  	        }
  	        
  	    });
  	  }
      
        loadDataCandidato(username){
            this.candidatoService.getAllCandidatoByUserName(username).subscribe(data => {
                if (data) {            
                   this.candidato = data;
                   this.loadDocumentoByCandidato(this.candidato.candidatoId);
                }
            }, error => {
            swal('Error...', 'An error occurred while calling the candidatos.', 'error');
            });
        }
  	
}

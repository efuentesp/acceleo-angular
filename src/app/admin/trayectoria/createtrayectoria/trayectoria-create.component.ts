import { Component, OnInit, ViewChild}                                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl }                 from '@angular/forms';
import swal from 'sweetalert2';

import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { TrayectoriaService }                                  from '../../trayectoria/trayectoria.component.service';
import { Trayectoria }                                         from '../../trayectoria/trayectoria.component.model';

import { CandidatoService }                                  from '../../candidato/candidato.component.service';
import { Candidato }                                         from '../../candidato/candidato.component.model';
import { DocumentoService }                                  from '../../documento/documento.component.service';
import { Documento }                                         from '../../documento/documento.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './trayectoria-create.component.html',
	styleUrls: ['./trayectoria-create.component.css']
})

export class TrayectoriaCreateComponent implements OnInit {

    public title = 'Nuevo Trayectoria';
    public trayectoria: Trayectoria;
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;
	public datePipe = new DatePipe('en-US');

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


    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private parserFormatter: NgbDateParserFormatter,
				private trayectoriaService: TrayectoriaService
	,private candidatoService: CandidatoService
	,private documentoService: DocumentoService
){
  	 this.filterInputCandidato.valueChanges.subscribe(busquedaCandidato => {
     this.busquedaCandidato = busquedaCandidato;
   });
  	 this.filterInputDocumento.valueChanges.subscribe(busquedaDocumento => {
     this.busquedaDocumento = busquedaDocumento;
   });
	}

    ngOnInit() {
		this.trayectoriaService.clear();
        this.trayectoria = new Trayectoria;

		this.loadCandidatos();
		this.loadDocumentos();
       
    } 

save(){


   this.trayectoriaService.saveTrayectoria(this.trayectoria).subscribe(res => {
     if (res.status == 201 || res.status == 200){
        swal('Success...', 'Trayectoria save successfully.', 'success');
        this.router.navigate([ '../managetrayectoria' ], { relativeTo: this.route })
     }else if (res.status == 403){
        swal('Error...', 'Usuario no tiene permiso para guardar Trayectoria.', 'error');
     }else{
       swal('Error...', 'Trayectoria save unsuccessfully.', 'error');
     }
   } );
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
		  this.trayectoria.candidatoId = candidato.candidatoId;
		  this.trayectoria.candidatoItem = candidato.
						nombre+ "";
						
	    	}else{
            this.candidatoService.clear();
			this.trayectoria.candidatoId = null;
		    this.trayectoria.candidatoItem = "";
		}
 }

	loadDocumentos(){
  		this.documentoService.getAllDocumento().subscribe(data => {
    	if (data) {
      	
		this.documentoList = data;
// Cambios por cada modal
    	}
  		}, error => {
    	swal('Error...', 'An error occurred while calling the Documentos.', 'error');
  	});



}

 setClickedRowDocumento(index,documento){
	      
		  documento.checked = !documento.checked;
		  if (documento.checked){
		  this.documentoService.setDocumento(documento);
		  this.trayectoria.documentoId = documento.documentoId;
		  this.trayectoria.documentoItem = documento.
						nombre+ "";
						
	    	}else{
            this.documentoService.clear();
			this.trayectoria.documentoId = null;
		    this.trayectoria.documentoItem = "";
		}
 }

  return(trayectoria){
      this.location.back();
  }
}

import { Component, OnInit, ViewChild}                                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl }                 from '@angular/forms';
import swal from 'sweetalert2';
import { Location } from '@angular/common';
import { User } from '../../user/user.component.model';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CustomNgbDateParserFormatter } from '../../../dateformat';

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
   public trayectoriaform: any;
   public user: User;
   public valueName: string;
   public token: string;

public trayectoriaList: Trayectoria [];
public trayectoria: Trayectoria;
public trayectoriaAux: Trayectoria;

public busquedaTrayectoria='';
filterInputTrayectoria = new FormControl();

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
			private parseFormat: CustomNgbDateParserFormatter,
			private trayectoriaService: TrayectoriaService
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
	this.trayectoriaService.clear();
	      this.trayectoria = new Trayectoria;
	this.loadCandidato();
	this.loadDocumento();
} 

save(){
	if (
	this.trayectoria.candidatoId === null ||
	this.trayectoria.tipotrayectoriaId ==="" || this.trayectoria.tipotrayectoriaId ===null || 
	this.trayectoria.descripcion ==="" || this.trayectoria.descripcion ===null || 
	this.trayectoria.clave ==="" || this.trayectoria.clave ===null || 
		this.trayectoria.trayectoriaId === null 
	){
		return;
	}else{
	   this.trayectoriaService.saveTrayectoria(this.trayectoria).subscribe(res => {
	     if (res.status == 201 || res.status == 200){
	        swal('Success...', 'Trayectoria save successfully.', 'success');
	        this.router.navigate([ '../managetrayectoria' ], { relativeTo: this.route })
	     }else if (res.status == 403){
	        swal('Error...', 'Usuario no tiene permiso para guardar trayectoria.', 'error');
	     }else{
	       swal('Error...', 'trayectoria save unsuccessfully.', 'error');
	     }
	   } );
	}
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
		swal('Error...', 'An error occurred while calling the Candidatos.', 'error');
	});
 }

 setClickedRowCandidato(index,candidato){
 	  candidato.checked = !candidato.checked;
 	  if (candidato.checked){
	 	  this.candidatoService.setCandidato(candidato);
this.trayectoria.candidatoId = candidato.candidatoId;
this.trayectoria.candidatoItem = candidato.nombre;
 	  }else{
 	      this.candidatoService.clear();
this.trayectoria.candidatoId = "";
this.trayectoria.candidatoItem = "";
 	   }
 }
loadDocumento(){
	this.documentoService.getAllDocumento().subscribe(data => {
   		if (data) {
 		this.documentoList = data;
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
this.trayectoria.documentoItem = documento.nombre;
 	  }else{
 	      this.documentoService.clear();
this.trayectoria.documentoId = "";
this.trayectoria.documentoItem = "";
 	   }
 }

}

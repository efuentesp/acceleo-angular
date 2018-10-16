import { Component, OnInit, ViewChild}                                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl }                 from '@angular/forms';
import swal from 'sweetalert2';
import { Location } from '@angular/common';
import { User } from '../../user/user.component.model';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { DocumentoService }                                  from '../../documento/documento.component.service';
import { Documento }                                         from '../../documento/documento.component.model';


@Component ({
    selector: 'app-view',
    templateUrl: './documento-create.component.html',
	styleUrls: ['./documento-create.component.css']
})

export class DocumentoCreateComponent implements OnInit {

    public title = 'Nuevo Documento';
    public documentoform: any;
    public user: User;
    public valueName: string;
    public token: string;

public documentoList: Documento [];
public documento: Documento;
    public documentoAux: Documento;

public busquedaDocumento='';
filterInputDocumento = new FormControl();


constructor(private router: Router,  
			private route: ActivatedRoute, 
			private location: Location,
			private parserFormatter: NgbDateParserFormatter,
			private documentoService: DocumentoService
){
  	 this.filterInputDocumento.valueChanges.subscribe(busquedaDocumento => {
     	this.busquedaDocumento = busquedaDocumento;
     });
     
}

    ngOnInit() {
		this.documentoService.clear();
        this.documento = new Documento;

		//this.loadDocumento();
    } 

save(){

	if (
		this.documento.nombre ==="" || this.documento.nombre ===null || 
		this.documento.descripcion ==="" || this.documento.descripcion ===null || 
		this.documento.documentoId !== null 
	){
		return;
	}else{
	   this.documentoService.saveDocumento(this.documento).subscribe(res => {
	     if (res.status == 201 || res.status == 200){
	        swal('Success...', 'Documento save successfully.', 'success');
	        this.router.navigate([ '../managedocumento' ], { relativeTo: this.route })
	     }else if (res.status == 403){
	        swal('Error...', 'Usuario no tiene permiso para guardar documento.', 'error');
	     }else{
	       swal('Error...', 'documento save unsuccessfully.', 'error');
	     }
	   } );
   }
}

loaddocumento(){
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
		  this.documento.documentoId = documento.documentoId;
		  this.documento.documentoItem = documento.nombre;
	    	}else{
            this.documentoService.clear();
			this.documento.documentoId = null;
		    this.documento.documentoItem = "";
		}
 }
 
 

  return(documento){
      this.location.back();
  }
}

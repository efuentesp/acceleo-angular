import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { TrayectoriaService }                                  from '../../trayectoria/trayectoria.component.service';
import { Trayectoria }                                         from '../../trayectoria/trayectoria.component.model';

import { CandidatoService }                                  from '../../candidato/candidato.component.service';
import { Candidato }                                         from '../../candidato/candidato.component.model';
import { DocumentoService }                                  from '../../documento/documento.component.service';
import { Documento }                                         from '../../documento/documento.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './trayectoria-edit.component.html',
	styleUrls: ['./trayectoria-edit.component.css']
})

export class TrayectoriaEditComponent implements OnInit {

	public title = 'Editar Trayectoria';
    public trayectoria: Trayectoria;
 	public trayectoriaList: Trayectoria;
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

	public flag: boolean;
    public flagDelete: boolean;

	public candidatoList: Candidato;
    public candidato: Candidato;

	public busquedaCandidato='';
	filterInputCandidato = new FormControl();
	public documentoList: Documento;
    public documento: Documento;

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
        
        this.flag = this.trayectoriaService.getEdit();
        this.trayectoria = this.trayectoriaService.getTrayectoria();
        this.flagDelete = this.trayectoriaService.getDelete();
        
		this.loadCandidatos();
		this.loadItemCandidato(this.trayectoria);
		this.loadDocumentos();
		this.loadItemDocumento(this.trayectoria);

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

delete(){
  swal({
    title: "Are you sure?",
    text: "You will not be able to recover this trayectoria!",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!"
  }).then((isConfirm) => {
    if (isConfirm.value) {
      this.trayectoriaService.deleteTrayectoria(this.trayectoria).subscribe(res => {
        if (res.status == 201 || res.status == 200){
          swal('Success...', 'Trayectoria item has been deleted successfully.', 'success');
          this.router.navigate([ '../managetrayectoria' ], { relativeTo: this.route })
        }else if (res.status == 403){
          swal('Error...', 'Usuario no tiene permiso para guardar Trayectoria.', 'error');
        }else{
          swal('Error...', 'Trayectoria deleted unsuccessfully.', 'error');
        }
      },error =>{
        if (error.status == 500){
          swal('Warning...', 'Trayectoria no se puede eliminar debido a que esta asociado con otra entidad.', 'warning');
        }
      }
	);
    } else {
      //swal("Cancelled", "Trayectoria deleted unsuccessfully", "error");
    }
  });
}

	loadCandidatos(){
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
		  this.trayectoria.candidatoId = candidato.candidatoId;
		  this.trayectoria.candidatoItem = candidato.
						nombre+ "";
						nombre+ "";
	    	}else{
            this.candidatoService.clear();
			this.trayectoria.candidatoId = null;
		    this.trayectoria.candidatoItem = "";
		}
}

loadItemCandidato(trayectoria){
  this.candidatoService.getCandidatoById(trayectoria.candidatoId).subscribe(data => {
    if (data) {
      this.candidato = data;
      this.trayectoria.candidatoItem = this.candidato.
						nombre+ "";
						nombre+ "";
    }
    }, error => {
    swal('Error...', 'An error occurred while calling the candidatos.', 'error');
  });

}

	loadDocumentos(){
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
		  this.trayectoria.documentoItem = documento.
						nombre+ "";
						nombre+ "";
	    	}else{
            this.documentoService.clear();
			this.trayectoria.documentoId = null;
		    this.trayectoria.documentoItem = "";
		}
}

loadItemDocumento(trayectoria){
  this.documentoService.getDocumentoById(trayectoria.documentoId).subscribe(data => {
    if (data) {
      this.documento = data;
      this.trayectoria.documentoItem = this.documento.
						nombre+ "";
						nombre+ "";
    }
    }, error => {
    swal('Error...', 'An error occurred while calling the documentos.', 'error');
  });

}



return(trayectoria){
  this.location.back();
}
 
}

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
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

	public flag: boolean;
    public flagDelete: boolean;

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
				private parserFormatter: NgbDateParserFormatter,
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
        
        this.flag = this.trayectoriaService.getEdit();
        this.trayectoria = this.trayectoriaService.getTrayectoria();
        this.flagDelete = this.trayectoriaService.getDelete();
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

return(trayectoria){
  this.location.back();
}
 
}


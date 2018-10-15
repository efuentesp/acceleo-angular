import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { DocumentoService }                                  from '../../documento/documento.component.service';
import { Documento }                                         from '../../documento/documento.component.model';


@Component ({
    selector: 'app-view',
    templateUrl: './documento-edit.component.html',
	styleUrls: ['./documento-edit.component.css']
})

export class DocumentoEditComponent implements OnInit {

	public title = 'Editar Documento';
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

	public flag: boolean;
    public flagDelete: boolean;

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
        
        this.flag = this.documentoService.getEdit();
        this.documento = this.documentoService.getDocumento();
        this.flagDelete = this.documentoService.getDelete();
    }  

save(){
	

   this.documentoService.saveDocumento(this.documento).subscribe(res => {
     if (res.status == 201 || res.status == 200){
        swal('Success...', 'Documento save successfully.', 'success');
        this.router.navigate([ '../managedocumento' ], { relativeTo: this.route })
     }else if (res.status == 403){
        swal('Error...', 'Usuario no tiene permiso para guardar Documento.', 'error');
     }else{
       swal('Error...', 'Documento save unsuccessfully.', 'error');
     }
   } );
}

delete(){
  swal({
    title: "Are you sure?",
    text: "You will not be able to recover this documento!",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!"
  }).then((isConfirm) => {
    if (isConfirm.value) {
      this.documentoService.deleteDocumento(this.documento).subscribe(res => {
        if (res.status == 201 || res.status == 200){
          swal('Success...', 'Documento item has been deleted successfully.', 'success');
          this.router.navigate([ '../managedocumento' ], { relativeTo: this.route })
        }else if (res.status == 403){
          swal('Error...', 'Usuario no tiene permiso para guardar Documento.', 'error');
        }else{
          swal('Error...', 'Documento deleted unsuccessfully.', 'error');
        }
      },error =>{
        if (error.status == 500){
          swal('Warning...', 'Documento no se puede eliminar debido a que esta asociado con otra entidad.', 'warning');
        }
      }
	);
    } else {
      //swal("Cancelled", "Documento deleted unsuccessfully", "error");
    }
  });
}

return(documento){
  this.location.back();
}
 
}


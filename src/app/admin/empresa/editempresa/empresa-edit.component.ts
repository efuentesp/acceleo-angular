import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { EmpresaService }                                  from '../../empresa/empresa.component.service';
import { Empresa }                                         from '../../empresa/empresa.component.model';


@Component ({
    selector: 'app-view',
    templateUrl: './empresa-edit.component.html',
	styleUrls: ['./empresa-edit.component.css']
})

export class EmpresaEditComponent implements OnInit {

	public title = 'Editar Empresa';
    public empresa: Empresa;
 	public empresaList: Empresa;
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

	public flag: boolean;
    public flagDelete: boolean;


    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private parserFormatter: NgbDateParserFormatter,
				private empresaService: EmpresaService
){


	}	

    ngOnInit() {
        
        this.flag = this.empresaService.getEdit();
        this.empresa = this.empresaService.getEmpresa();
        this.flagDelete = this.empresaService.getDelete();
        

    }  

save(){
	

   this.empresaService.saveEmpresa(this.empresa).subscribe(res => {
     if (res.status == 201 || res.status == 200){
        swal('Success...', 'Empresa save successfully.', 'success');
        this.router.navigate([ '../manageempresa' ], { relativeTo: this.route })
     }else if (res.status == 403){
        swal('Error...', 'Usuario no tiene permiso para guardar Empresa.', 'error');
     }else{
       swal('Error...', 'Empresa save unsuccessfully.', 'error');
     }
   } );
}

delete(){
  swal({
    title: "Are you sure?",
    text: "You will not be able to recover this empresa!",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!"
  }).then((isConfirm) => {
    if (isConfirm.value) {
      this.empresaService.deleteEmpresa(this.empresa).subscribe(res => {
        if (res.status == 201 || res.status == 200){
          swal('Success...', 'Empresa item has been deleted successfully.', 'success');
          this.router.navigate([ '../manageempresa' ], { relativeTo: this.route })
        }else if (res.status == 403){
          swal('Error...', 'Usuario no tiene permiso para guardar Empresa.', 'error');
        }else{
          swal('Error...', 'Empresa deleted unsuccessfully.', 'error');
        }
      },error =>{
        if (error.status == 500){
          swal('Warning...', 'Empresa no se puede eliminar debido a que esta asociado con otra entidad.', 'warning');
        }
      }
	);
    } else {
      //swal("Cancelled", "Empresa deleted unsuccessfully", "error");
    }
  });
}



return(empresa){
  this.location.back();
}
 
}

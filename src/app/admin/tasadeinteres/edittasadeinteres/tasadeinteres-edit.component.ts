import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { TasadeinteresService }                                  from '../../tasadeinteres/tasadeinteres.component.service';
import { Tasadeinteres }                                         from '../../tasadeinteres/tasadeinteres.component.model';

import { EmpresaService }                                  from '../../empresa/empresa.component.service';
import { Empresa }                                         from '../../empresa/empresa.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './tasadeinteres-edit.component.html',
	styleUrls: ['./tasadeinteres-edit.component.css']
})

export class TasadeinteresEditComponent implements OnInit {

	public title = 'Editar Tasadeinteres';
    public tasadeinteres: Tasadeinteres;
 	public tasadeinteresList: Tasadeinteres;
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

	public flag: boolean;
    public flagDelete: boolean;

	public empresaList: Empresa;
    public empresa: Empresa;

	public busquedaEmpresa='';
	filterInputEmpresa = new FormControl();

    constructor(private router: Router,  
				private route: ActivatedRoute, 
        private location: Location,
        private parserFormatter: NgbDateParserFormatter,
				private tasadeinteresService: TasadeinteresService
	,private empresaService: EmpresaService
){

 	 this.filterInputEmpresa.valueChanges.subscribe(busquedaEmpresa => {
     this.busquedaEmpresa = busquedaEmpresa;
   });

	}	

    ngOnInit() {
        
        this.flag = this.tasadeinteresService.getEdit();
        this.tasadeinteres = this.tasadeinteresService.getTasadeinteres();
        this.flagDelete = this.tasadeinteresService.getDelete();
        
		this.loadEmpresas();
		this.loadItemEmpresa(this.tasadeinteres);

    }  

save(){

  this.tasadeinteres.fechainicio = this.parserFormatter.format(this.tasadeinteres.fechainicioAux);
  this.tasadeinteres.fechafin = this.parserFormatter.format(this.tasadeinteres.fechafinAux);
  
   this.tasadeinteresService.saveTasadeinteres(this.tasadeinteres).subscribe(res => {
     if (res.status == 201 || res.status == 200){
        swal('Success...', 'Tasadeinteres save successfully.', 'success');
        this.router.navigate([ '../managetasadeinteres' ], { relativeTo: this.route })
     }else if (res.status == 403){
        swal('Error...', 'Usuario no tiene permiso para guardar Tasadeinteres.', 'error');
     }else{
       swal('Error...', 'Tasadeinteres save unsuccessfully.', 'error');
     }
   } );
}

delete(){
  swal({
    title: "Are you sure?",
    text: "You will not be able to recover this tasadeinteres!",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!"
  }).then((isConfirm) => {
    if (isConfirm.value) {
      this.tasadeinteresService.deleteTasadeinteres(this.tasadeinteres).subscribe(res => {
        if (res.status == 201 || res.status == 200){
          swal('Success...', 'Tasadeinteres item has been deleted successfully.', 'success');
          this.router.navigate([ '../managetasadeinteres' ], { relativeTo: this.route })
        }else if (res.status == 403){
          swal('Error...', 'Usuario no tiene permiso para guardar Tasadeinteres.', 'error');
        }else{
          swal('Error...', 'Tasadeinteres deleted unsuccessfully.', 'error');
        }
      },error =>{
        if (error.status == 500){
          swal('Warning...', 'Tasadeinteres no se puede eliminar debido a que esta asociado con otra entidad.', 'warning');
        }
      }
	);
    } else {
      //swal("Cancelled", "Tasadeinteres deleted unsuccessfully", "error");
    }
  });
}

	loadEmpresas(){
  		this.empresaService.getAllEmpresa().subscribe(data => {
    	if (data) {
      	this.empresaList = data;
    	}
  		}, error => {
    	swal('Error...', 'An error occurred while calling the Empresas.', 'error');
  	});
}

 setClickedRowEmpresa(index,empresa){
	      
		  empresa.checked = !empresa.checked;

		  if (empresa.checked){
		  this.empresaService.setEmpresa(empresa);
		  this.tasadeinteres.empresaId = empresa.paraId;
		  this.tasadeinteres.empresaItem = empresa.clave;

	    	}else{
            this.empresaService.clear();
			this.tasadeinteres.empresaId = null;
		    this.tasadeinteres.empresaItem = "";
		}
}

loadItemEmpresa(tasadeinteres){
  this.empresaService.getEmpresaById(tasadeinteres.empresaId).subscribe(data => {
    if (data) {
      this.empresa = data;
      this.tasadeinteres.empresaItem = this.empresa.clave;

    }
    }, error => {
    swal('Error...', 'An error occurred while calling the empresas.', 'error');
  });

}



return(tasadeinteres){
  this.location.back();
}
 
}

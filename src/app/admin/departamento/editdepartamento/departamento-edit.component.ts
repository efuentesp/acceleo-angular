import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
import { Location } from '@angular/common';
import { User } from '../../user/user.component.model';

import { DepartamentoService }                                  from '../../departamento/departamento.component.service';
import { Departamento }                                         from '../../departamento/departamento.component.model';

import { EmpresaService }                                  from '../../empresa/empresa.component.service';
import { Empresa }                                         from '../../empresa/empresa.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './departamento-edit.component.html',
	styleUrls: ['./departamento-edit.component.css']
})

export class DepartamentoEditComponent implements OnInit {

	public title = 'Editar Departamento';
    public departamento: Departamento;
 	public departamentoList: Departamento;
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
				private departamentoService: DepartamentoService
	,private empresaService: EmpresaService
){

 	 this.filterInputEmpresa.valueChanges.subscribe(busquedaEmpresa => {
     this.busquedaEmpresa = busquedaEmpresa;
   });

	}	

    ngOnInit() {
        
        this.flag = this.departamentoService.getEdit();
        this.departamento = this.departamentoService.getDepartamento();
        this.flagDelete = this.departamentoService.getDelete();
        
		this.loadEmpresas();
		this.loadItemEmpresa(this.departamento);

    }  

save(){
   this.departamentoService.saveDepartamento(this.departamento).subscribe(res => {
     if (res.status == 201 || res.status == 200){
        swal('Success...', 'Departamento save successfully.', 'success');
        this.router.navigate([ '../managedepartamento' ], { relativeTo: this.route })
     }else if (res.status == 403){
        swal('Error...', 'Usuario no tiene permiso para guardar Departamento.', 'error');
     }else{
       swal('Error...', 'Departamento save unsuccessfully.', 'error');
     }
   } );
}

delete(){
  swal({
    title: "Are you sure?",
    text: "You will not be able to recover this departamento!",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!"
  }).then((isConfirm) => {
    if (isConfirm.value) {
      this.departamentoService.deleteDepartamento(this.departamento).subscribe(res => {
        if (res.status == 201 || res.status == 200){
          swal('Success...', 'Departamento item has been deleted successfully.', 'success');
          this.router.navigate([ '../managedepartamento' ], { relativeTo: this.route })
        }else if (res.status == 403){
          swal('Error...', 'Usuario no tiene permiso para guardar Departamento.', 'error');
        }else{
          swal('Error...', 'Departamento deleted unsuccessfully.', 'error');
        }
      },error =>{
        if (error.status == 500){
          swal('Warning...', 'Departamento no se puede eliminar debido a que esta asociado con otra entidad.', 'warning');
        }
      }
	);
    } else {
      //swal("Cancelled", "Departamento deleted unsuccessfully", "error");
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
		  this.departamento.empresaId = empresa.empresaId;
		  this.departamento.empresaItem = empresa.clave;
	    	}else{
            this.empresaService.clear();
			this.departamento.empresaId = null;
		    this.departamento.empresaItem = "";
		}
}

loadItemEmpresa(departamento){
  this.empresaService.getEmpresaById(departamento.empresaId).subscribe(data => {
    if (data) {
      this.empresa = data;
      this.departamento.empresaItem = this.empresa.clave;

    }
    }, error => {
    swal('Error...', 'An error occurred while calling the empresas.', 'error');
  });

}



return(departamento){
  this.location.back();
}
 
}

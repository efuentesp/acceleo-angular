import { Component, OnInit, ViewChild}                                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl }                 from '@angular/forms';
import swal from 'sweetalert2';

import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { DepartamentoService }                                  from '../../departamento/departamento.component.service';
import { Departamento }                                         from '../../departamento/departamento.component.model';

import { EmpresaService }                                  from '../../empresa/empresa.component.service';
import { Empresa }                                         from '../../empresa/empresa.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './departamento-create.component.html',
	styleUrls: ['./departamento-create.component.css']
})

export class DepartamentoCreateComponent implements OnInit {

    public title = 'Nuevo Departamento';
    public departamento: Departamento;
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;
	public datePipe = new DatePipe('en-US');

	public empresaList: Empresa [];
    public empresa: Empresa;
    public empresaAux: Empresa;

	public busquedaEmpresa='';
	filterInputEmpresa = new FormControl();


    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private parserFormatter: NgbDateParserFormatter,
				private departamentoService: DepartamentoService
	,private empresaService: EmpresaService
){
  	 this.filterInputEmpresa.valueChanges.subscribe(busquedaEmpresa => {
     this.busquedaEmpresa = busquedaEmpresa;
   });
	}

    ngOnInit() {
		this.departamentoService.clear();
        this.departamento = new Departamento;

		this.loadEmpresas();
       
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


	loadEmpresas(){
  		this.empresaService.getAllEmpresa().subscribe(data => {
    	if (data) {
      	
		this.empresaList = data;
// Cambios por cada modal
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
		  this.departamento.empresaItem = empresa.
	    	}else{
            this.empresaService.clear();
			this.departamento.empresaId = null;
		    this.departamento.empresaItem = "";
		}
 }

  return(departamento){
      this.location.back();
  }
}

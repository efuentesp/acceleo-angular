import { Component, OnInit, ViewChild}                                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl }                 from '@angular/forms';
import swal from 'sweetalert2';

import { Location } from '@angular/common';
import { User } from '../../user/user.component.model';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { TasadeinteresService }                                  from '../../tasadeinteres/tasadeinteres.component.service';
import { Tasadeinteres }                                         from '../../tasadeinteres/tasadeinteres.component.model';

import { EmpresaService }                                  from '../../empresa/empresa.component.service';
import { Empresa }                                         from '../../empresa/empresa.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './tasadeinteres-create.component.html',
	styleUrls: ['./tasadeinteres-create.component.css']
})

export class TasadeinteresCreateComponent implements OnInit {

    public title = 'Nuevo Tasadeinteres';
    public tasadeinteres: Tasadeinteres;
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

	public empresaList: Empresa [];
    public empresa: Empresa;
    public empresaAux: Empresa;

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
		this.tasadeinteresService.clear();
        this.tasadeinteres = new Tasadeinteres;

		this.loadEmpresas();
       
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
		  this.tasadeinteres.empresaId = empresa.empresaId;
		  this.tasadeinteres.empresaItem = empresa.clave;
		  // NRCM
	    	}else{
            this.empresaService.clear();
			this.tasadeinteres.empresaId = null;
		    this.tasadeinteres.empresaItem = "";
		}
 }

  return(tasadeinteres){
      this.location.back();
  }
}

import { Component, OnInit, ViewChild}                                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl }                 from '@angular/forms';
import swal from 'sweetalert2';

import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { PlantaService }                                  from '../../planta/planta.component.service';
import { Planta }                                         from '../../planta/planta.component.model';

import { EmpresaService }                                  from '../../empresa/empresa.component.service';
import { Empresa }                                         from '../../empresa/empresa.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './planta-create.component.html',
	styleUrls: ['./planta-create.component.css']
})

export class PlantaCreateComponent implements OnInit {

    public title = 'Nuevo Planta';
    public planta: Planta;
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
				private plantaService: PlantaService
	,private empresaService: EmpresaService
){
  	 this.filterInputEmpresa.valueChanges.subscribe(busquedaEmpresa => {
     this.busquedaEmpresa = busquedaEmpresa;
   });
	}

    ngOnInit() {
		this.plantaService.clear();
        this.planta = new Planta;

		this.loadEmpresas();
       
    } 

save(){


   this.plantaService.savePlanta(this.planta).subscribe(res => {
     if (res.status == 201 || res.status == 200){
        swal('Success...', 'Planta save successfully.', 'success');
        this.router.navigate([ '../manageplanta' ], { relativeTo: this.route })
     }else if (res.status == 403){
        swal('Error...', 'Usuario no tiene permiso para guardar Planta.', 'error');
     }else{
       swal('Error...', 'Planta save unsuccessfully.', 'error');
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
		  this.planta.empresaId = empresa.empresaId;
		  this.planta.empresaItem = empresa.
	    	}else{
            this.empresaService.clear();
			this.planta.empresaId = null;
		    this.planta.empresaItem = "";
		}
 }

  return(planta){
      this.location.back();
  }
}

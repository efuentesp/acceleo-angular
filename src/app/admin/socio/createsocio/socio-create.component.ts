import { Component, OnInit, ViewChild}                                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl }                 from '@angular/forms';
import swal from 'sweetalert2';

import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { SocioService }                                  from '../../socio/socio.component.service';
import { Socio }                                         from '../../socio/socio.component.model';

import { DepartamentoService }                                  from '../../departamento/departamento.component.service';
import { Departamento }                                         from '../../departamento/departamento.component.model';
import { PlantaService }                                  from '../../planta/planta.component.service';
import { Planta }                                         from '../../planta/planta.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './socio-create.component.html',
	styleUrls: ['./socio-create.component.css']
})

export class SocioCreateComponent implements OnInit {

    public title = 'Nuevo Socio';
    public socio: Socio;
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;
	public datePipe = new DatePipe('en-US');

	public departamentoList: Departamento [];
    public departamento: Departamento;
    public departamentoAux: Departamento;

	public busquedaDepartamento='';
	filterInputDepartamento = new FormControl();

	public plantaList: Planta [];
    public planta: Planta;
    public plantaAux: Planta;

	public busquedaPlanta='';
	filterInputPlanta = new FormControl();


    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private parserFormatter: NgbDateParserFormatter,
				private socioService: SocioService
	,private departamentoService: DepartamentoService
	,private plantaService: PlantaService
){
  	 this.filterInputDepartamento.valueChanges.subscribe(busquedaDepartamento => {
     this.busquedaDepartamento = busquedaDepartamento;
   });
  	 this.filterInputPlanta.valueChanges.subscribe(busquedaPlanta => {
     this.busquedaPlanta = busquedaPlanta;
   });
	}

    ngOnInit() {
		this.socioService.clear();
        this.socio = new Socio;

		this.loadDepartamentos();
		this.loadPlantas();
       
    } 

save(){


   this.socioService.saveSocio(this.socio).subscribe(res => {
     if (res.status == 201 || res.status == 200){
        swal('Success...', 'Socio save successfully.', 'success');
        this.router.navigate([ '../managesocio' ], { relativeTo: this.route })
     }else if (res.status == 403){
        swal('Error...', 'Usuario no tiene permiso para guardar Socio.', 'error');
     }else{
       swal('Error...', 'Socio save unsuccessfully.', 'error');
     }
   } );
}


	loadDepartamentos(){
  		this.departamentoService.getAllDepartamento().subscribe(data => {
    	if (data) {
      	
		this.departamentoList = data;
// Cambios por cada modal
    	}
  		}, error => {
    	swal('Error...', 'An error occurred while calling the Departamentos.', 'error');
  	});



}

 setClickedRowDepartamento(index,departamento){
	      
		  departamento.checked = !departamento.checked;
		  if (departamento.checked){
		  this.departamentoService.setDepartamento(departamento);
		  this.socio.departamentoId = departamento.departamentoId;
		  this.socio.departamentoItem = departamento.
	    	}else{
            this.departamentoService.clear();
			this.socio.departamentoId = null;
		    this.socio.departamentoItem = "";
		}
 }

	loadPlantas(){
  		this.plantaService.getAllPlanta().subscribe(data => {
    	if (data) {
      	
		this.plantaList = data;
// Cambios por cada modal
    	}
  		}, error => {
    	swal('Error...', 'An error occurred while calling the Plantas.', 'error');
  	});



}

 setClickedRowPlanta(index,planta){
	      
		  planta.checked = !planta.checked;
		  if (planta.checked){
		  this.plantaService.setPlanta(planta);
		  this.socio.plantaId = planta.plantaId;
		  this.socio.plantaItem = planta.
	    	}else{
            this.plantaService.clear();
			this.socio.plantaId = null;
		    this.socio.plantaItem = "";
		}
 }

  return(socio){
      this.location.back();
  }
}

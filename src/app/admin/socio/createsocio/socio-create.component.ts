import { Component, OnInit, ViewChild}                                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl }                 from '@angular/forms';
import swal from 'sweetalert2';

import { Location } from '@angular/common';
import { User } from '../../user/user.component.model';

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

	public perteneceList: Departamento [];
    public pertenece: Departamento;
    public perteneceAux: Departamento;

	public busquedaDepartamento='';
	filterInputDepartamento = new FormControl();

	public laboraList: Planta [];
    public labora: Planta;
    public laboraAux: Planta;

	public busquedaPlanta='';
	filterInputPlanta = new FormControl();


    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private socioService: SocioService
	,private perteneceService: DepartamentoService
	,private laboraService: PlantaService
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

		this.loadPerteneces();
		this.loadLaboras();
       
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


	loadPerteneces(){
  		this.perteneceService.getAllDepartamento().subscribe(data => {
    	if (data) {
      	
		this.perteneceList = data;
// Cambios por cada modal
    	}
  		}, error => {
    	swal('Error...', 'An error occurred while calling the Departamentos.', 'error');
  	});
}

 setClickedRowPertenece(index,pertenece){
	      
		  pertenece.checked = !pertenece.checked;
		  if (pertenece.checked){
		  this.perteneceService.setDepartamento(pertenece);
		  this.socio.perteneceId = pertenece.perteneceId;
		  //this.socio.perteneceItem = pertenece.Item;

	    	}else{
            this.perteneceService.clear();
			this.socio.perteneceId = null;
		    this.socio.perteneceItem = "";
		}
 }

	loadLaboras(){
  		this.laboraService.getAllPlanta().subscribe(data => {
    	if (data) {
      	
		this.laboraList = data;
// Cambios por cada modal
    	}
  		}, error => {
    	swal('Error...', 'An error occurred while calling the Plantas.', 'error');
  	});
}

 setClickedRowLabora(index,labora){
	      
		  labora.checked = !labora.checked;
		  if (labora.checked){
		  this.laboraService.setPlanta(labora);
		  this.socio.laboraId = labora.laboraId;
		  //this.socio.laboraItem = labora.Item;

	    	}else{
            this.laboraService.clear();
			this.socio.laboraId = null;
		    this.socio.laboraItem = "";
		}
 }

  return(socio){
      this.location.back();
  }
}

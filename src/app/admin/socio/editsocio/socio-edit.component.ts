import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
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
    templateUrl: './socio-edit.component.html',
	styleUrls: ['./socio-edit.component.css']
})

export class SocioEditComponent implements OnInit {

	public title = 'Editar Socio';
    public socio: Socio;
 	public socioList: Socio;
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

	public flag: boolean;
    public flagDelete: boolean;

	public departamentoList: Departamento;
    public departamento: Departamento;

	public busquedaDepartamento='';
	filterInputDepartamento = new FormControl();
	public plantaList: Planta;
    public planta: Planta;

	public busquedaPlanta='';
	filterInputPlanta = new FormControl();

    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
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
        
        this.flag = this.socioService.getEdit();
        this.socio = this.socioService.getSocio();
        this.flagDelete = this.socioService.getDelete();
        
		this.loadDepartamentos();
		this.loadItemDepartamento(this.socio);
		this.loadPlantas();
		this.loadItemPlanta(this.socio);

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

delete(){
  swal({
    title: "Are you sure?",
    text: "You will not be able to recover this socio!",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!"
  }).then((isConfirm) => {
    if (isConfirm.value) {
      this.socioService.deleteSocio(this.socio).subscribe(res => {
        if (res.status == 201 || res.status == 200){
          swal('Success...', 'Socio item has been deleted successfully.', 'success');
          this.router.navigate([ '../managesocio' ], { relativeTo: this.route })
        }else if (res.status == 403){
          swal('Error...', 'Usuario no tiene permiso para guardar Socio.', 'error');
        }else{
          swal('Error...', 'Socio deleted unsuccessfully.', 'error');
        }
      },error =>{
        if (error.status == 500){
          swal('Warning...', 'Socio no se puede eliminar debido a que esta asociado con otra entidad.', 'warning');
        }
      }
	);
    } else {
      //swal("Cancelled", "Socio deleted unsuccessfully", "error");
    }
  });
}

	loadDepartamentos(){
  		this.departamentoService.getAllDepartamento().subscribe(data => {
    	if (data) {
      	this.departamentoList = data;
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
		  this.socio.departamentoItem = departamento.nombredepto;
	    	}else{
            this.departamentoService.clear();
			this.socio.departamentoId = null;
		    this.socio.departamentoItem = "";
		}
}

loadItemDepartamento(socio){
  this.departamentoService.getDepartamentoById(socio.departamentoId).subscribe(data => {
    if (data) {
      this.departamento = data;
      this.socio.departamentoItem = this.departamento.nombredepto;
    }
    }, error => {
    swal('Error...', 'An error occurred while calling the departamentos.', 'error');
  });

}

	loadPlantas(){
  		this.plantaService.getAllPlanta().subscribe(data => {
    	if (data) {
      	this.plantaList = data;
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
		  this.socio.plantaItem = planta.nombreplanta;
	    	}else{
            this.plantaService.clear();
			this.socio.plantaId = null;
		    this.socio.plantaItem = "";
		}
}

loadItemPlanta(socio){
  this.plantaService.getPlantaById(socio.plantaId).subscribe(data => {
    if (data) {
      this.planta = data;
      this.socio.plantaItem = this.planta.nombreplanta;
    }
    }, error => {
    swal('Error...', 'An error occurred while calling the plantas.', 'error');
  });

}



return(socio){
  this.location.back();
}
 
}

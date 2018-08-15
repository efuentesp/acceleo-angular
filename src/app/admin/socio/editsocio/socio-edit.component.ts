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

	public perteneceList: Departamento;
    public pertenece: Departamento;

	public busquedaDepartamento='';
	filterInputDepartamento = new FormControl();
	public laboraList: Planta;
    public labora: Planta;

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
        
        this.flag = this.socioService.getEdit();
        this.socio = this.socioService.getSocio();
        this.flagDelete = this.socioService.getDelete();
        
		this.loadPerteneces();
		this.loadItemPertenece(this.socio);
		this.loadLaboras();
		this.loadItemLabora(this.socio);

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

	loadPerteneces(){
  		this.perteneceService.getAllDepartamento().subscribe(data => {
    	if (data) {
      	this.perteneceList = data;
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
		  //this.socio.perteneceItem = pertenece.Iem;
	    	}else{
            this.perteneceService.clear();
			this.socio.perteneceId = null;
		    this.socio.perteneceItem = "";
		}
}

loadItemPertenece(socio){
  this.perteneceService.getDepartamentoById(socio.perteneceId).subscribe(data => {
    if (data) {
      this.pertenece = data;
      //this.socio.perteneceItem = this.pertenece.Item;
    }
    }, error => {
    swal('Error...', 'An error occurred while calling the perteneces.', 'error');
  });

}

	loadLaboras(){
  		this.laboraService.getAllPlanta().subscribe(data => {
    	if (data) {
      	this.laboraList = data;
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
		  //this.socio.laboraItem = labora.Iem;
	    	}else{
            this.laboraService.clear();
			this.socio.laboraId = null;
		    this.socio.laboraItem = "";
		}
}

loadItemLabora(socio){
  this.laboraService.getPlantaById(socio.laboraId).subscribe(data => {
    if (data) {
      this.labora = data;
      //this.socio.laboraItem = this.labora.Item;
    }
    }, error => {
    swal('Error...', 'An error occurred while calling the laboras.', 'error');
  });

}



return(socio){
  this.location.back();
}
 
}

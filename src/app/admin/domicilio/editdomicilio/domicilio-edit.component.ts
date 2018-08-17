import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
import { Location } from '@angular/common';
import { User } from '../../user/user.component.model';

import { DomicilioService }                                  from '../../domicilio/domicilio.component.service';
import { Domicilio }                                         from '../../domicilio/domicilio.component.model';

import { SocioService }                                  from '../../socio/socio.component.service';
import { Socio }                                         from '../../socio/socio.component.model';
import { Departamento } from '../../departamento/departamento.component.model';
import { Planta } from '../../planta/planta.component.model';
import { PlantaService } from '../../planta/planta.component.service';
import { DepartamentoService } from '../../departamento/departamento.component.service';

@Component ({
    selector: 'app-view',
    templateUrl: './domicilio-edit.component.html',
	styleUrls: ['./domicilio-edit.component.css']
})

export class DomicilioEditComponent implements OnInit {

	public title = 'Editar Domicilio';
    public domicilio: Domicilio;
 	public domicilioList: Domicilio;
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

	public flag: boolean;
    public flagDelete: boolean;

	public socioList: Socio [];
    public socio: Socio;

  public departamentoList: Departamento [];
  public departamento: Departamento;
  public departamentoAux: Departamento;
  
  public plantaList: Planta [];
  public planta: Planta;
	public plantaAux: Planta;

	public busquedaSocio='';
	filterInputSocio = new FormControl();

    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
        private domicilioService: DomicilioService,
        private plantaService: PlantaService,
        private departamentoService: DepartamentoService
	,private socioService: SocioService
){

 	 this.filterInputSocio.valueChanges.subscribe(busquedaSocio => {
     this.busquedaSocio = busquedaSocio;
   });

	}	

    ngOnInit() {
        
        this.flag = this.domicilioService.getEdit();
        this.domicilio = this.domicilioService.getDomicilio();
        this.flagDelete = this.domicilioService.getDelete();
        
		this.loadSocios();
		this.loadItemSocio(this.domicilio);

    }  

save(){
   this.domicilioService.saveDomicilio(this.domicilio).subscribe(res => {
     if (res.status == 201 || res.status == 200){
        swal('Success...', 'Domicilio save successfully.', 'success');
        this.router.navigate([ '../managedomicilio' ], { relativeTo: this.route })
     }else if (res.status == 403){
        swal('Error...', 'Usuario no tiene permiso para guardar Domicilio.', 'error');
     }else{
       swal('Error...', 'Domicilio save unsuccessfully.', 'error');
     }
   } );
}

delete(){
  swal({
    title: "Are you sure?",
    text: "You will not be able to recover this domicilio!",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!"
  }).then((isConfirm) => {
    if (isConfirm.value) {
      this.domicilioService.deleteDomicilio(this.domicilio).subscribe(res => {
        if (res.status == 201 || res.status == 200){
          swal('Success...', 'Domicilio item has been deleted successfully.', 'success');
          this.router.navigate([ '../managedomicilio' ], { relativeTo: this.route })
        }else if (res.status == 403){
          swal('Error...', 'Usuario no tiene permiso para guardar Domicilio.', 'error');
        }else{
          swal('Error...', 'Domicilio deleted unsuccessfully.', 'error');
        }
      },error =>{
        if (error.status == 500){
          swal('Warning...', 'Domicilio no se puede eliminar debido a que esta asociado con otra entidad.', 'warning');
        }
      }
	);
    } else {
      //swal("Cancelled", "Domicilio deleted unsuccessfully", "error");
    }
  });
}

	loadSocios(){
  		this.socioService.getAllSocio().subscribe(data => {
    	if (data) {
        this.socioList = data;
      
        this.socioList.forEach(element => {
          this.departamentoService.getDepartamentoById(element.departamentoId).subscribe(dataAux => {
              if (dataAux) {
                  this.departamentoAux = dataAux;
                  element.departamentoItem = this.departamentoAux.nombredepto;


    if (element.generoId == 'mas'){
        element.generoItem = 'Masculino';
    }
    if (element.generoId == 'fem'){
        element.generoItem = 'Femenino';
    }

    if (element.tipoempleadoId == 'p'){
        element.tipoempleadoItem = 'Planta';
    }
    if (element.tipoempleadoId == 'c'){
        element.tipoempleadoItem = 'Confianza';
    }
    if (element.tipoempleadoId == 't'){
        element.tipoempleadoItem = 'Temporal';
    }
    if (element.tipoempleadoId == 'b'){
        element.tipoempleadoItem = 'Becario';
    }

          }	
      });	

      this.socioList.forEach(element => {
          this.plantaService.getPlantaById(element.plantaId).subscribe(dataAux => {
              if (dataAux) {
                  this.plantaAux = dataAux;
                  element.plantaItem = this.plantaAux.nombreplanta;

    if (element.generoId == 'mas'){
        element.generoItem = 'Masculino';
    }
    if (element.generoId == 'fem'){
        element.generoItem = 'Femenino';
    }

    if (element.tipoempleadoId == 'p'){
        element.tipoempleadoItem = 'Planta';
    }
    if (element.tipoempleadoId == 'c'){
        element.tipoempleadoItem = 'Confianza';
    }
    if (element.tipoempleadoId == 't'){
        element.tipoempleadoItem = 'Temporal';
    }
    if (element.tipoempleadoId == 'b'){
        element.tipoempleadoItem = 'Becario';
    }
          }	
      });	
  });

  });

    	}
  		}, error => {
    	swal('Error...', 'An error occurred while calling the Socios.', 'error');
  	});
}

 setClickedRowSocio(index,socio){
	      
		  socio.checked = !socio.checked;

		  if (socio.checked){
		  this.socioService.setSocio(socio);
		  this.domicilio.socioId = socio.socioId;
		  this.domicilio.socioItem = socio.numero+"";
	    	}else{
            this.socioService.clear();
			this.domicilio.socioId = null;
		    this.domicilio.socioItem = "";
		}
}

loadItemSocio(domicilio){
  this.socioService.getSocioById(domicilio.socioId).subscribe(data => {
    if (data) {
      this.socio = data;
      this.domicilio.socioItem = this.socio.numero+"";
    }
    }, error => {
    swal('Error...', 'An error occurred while calling the socios.', 'error');
  });

}



return(domicilio){
  this.location.back();
}
 
}

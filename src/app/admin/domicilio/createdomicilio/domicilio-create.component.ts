import { Component, OnInit, ViewChild}                                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl }                 from '@angular/forms';
import swal from 'sweetalert2';

import { Location } from '@angular/common';
import { User } from '../../user/user.component.model';

import { DomicilioService }                                  from '../../domicilio/domicilio.component.service';
import { Domicilio }                                         from '../../domicilio/domicilio.component.model';

import { SocioService }                                  from '../../socio/socio.component.service';
import { Socio }                                         from '../../socio/socio.component.model';
import { Departamento } from '../../departamento/departamento.component.model';
import { Planta } from '../../planta/planta.component.model';
import { DepartamentoService } from '../../departamento/departamento.component.service';
import { PlantaService } from '../../planta/planta.component.service';

@Component ({
    selector: 'app-view',
    templateUrl: './domicilio-create.component.html',
	styleUrls: ['./domicilio-create.component.css']
})

export class DomicilioCreateComponent implements OnInit {

    public title = 'Nuevo Domicilio';
    public domicilio: Domicilio;
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

	public socioList: Socio [];
    public socio: Socio;
    public socioAux: Socio;

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
                private departamentoService: DepartamentoService,
                private plantaService: PlantaService
	,private socioService: SocioService
){
  	 this.filterInputSocio.valueChanges.subscribe(busquedaSocio => {
     this.busquedaSocio = busquedaSocio;
   });
	}

    ngOnInit() {
		this.domicilioService.clear();
        this.domicilio = new Domicilio;

		this.loadSocios();
       
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

  return(domicilio){
      this.location.back();
  }
}

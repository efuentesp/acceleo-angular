import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                          from '@angular/router';
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
    templateUrl: './socio-manage.component.html',
	styleUrls: ['./socio-manage.component.css']
})

export class SocioManageComponent implements OnInit {

    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

    public title = 'Manage Socio';
    public socioList: Socio [];
    public socio: Socio;

  	public busquedasocio='';
    public filterInputsocio = new FormControl();

 	public userAdmin: User = JSON.parse(localStorage.getItem('currentUser'));

    // Buttons 
    private searchActive: boolean = false;
    private updateActive: boolean = false;
    private createActive: boolean = false;
    private deleteActive: boolean = false;

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
      
	  // Get data user
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      this.valueName = this.user.username;
      this.token = this.user.token;

      this.socioService.setEdit(false);
      this.socioService.setDelete(false);

      this.loadSocios();
      this.habilita();

    }   

    loadSocios() {
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

        }
      }, error => {
        swal('Error...', 'An error occurred while calling the socios.', 'error');
      });
    }

  add(){
    this.socioService.clear();
    this.router.navigate([ '../createsocio' ], { relativeTo: this.route })
  }

  editar(socio){
    this.socioService.setSocio(socio);
    this.socioService.setEdit(true);
    this.socioService.setDelete(false);
    this.router.navigate([ '../editsocio' ], { relativeTo: this.route })
  }

  eliminar(socio){
    this.socioService.setSocio(socio);
    this.socioService.setEdit(false);
    this.socioService.setDelete(true);
    this.router.navigate([ '../editsocio' ], { relativeTo: this.route })
  }

  // Select row
  setClickedRowSocio(index, socio){
    this.socioService.setSocio(socio);
    this.socioService.setEdit(true);
    this.socioService.setDelete(false);
    this.router.navigate([ '../editsocio' ], { relativeTo: this.route })
  }
  
  habilita(){
    this.userAdmin.authorities.forEach(element => {
      if (element.authority == 'ROLE_SOCIODELETE'){
        this.deleteActive = true;
      }
      if (element.authority == 'ROLE_SOCIOCREATE'){
        this.createActive = true;
      }
      if (element.authority == 'ROLE_SOCIOUPDATE'){
        this.updateActive = true;
      }
      if (element.authority == 'ROLE_SOCIOSEARCH'){
        this.searchActive = true;
      }
    });
  }

}

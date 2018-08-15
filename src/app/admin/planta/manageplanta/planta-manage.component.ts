import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { Location } from '@angular/common';
import { User } from '../../user/user.component.model';

import { PlantaService }                                  from '../../planta/planta.component.service';
import { Planta }                                         from '../../planta/planta.component.model';

import { EmpresaService }                                  from '../../empresa/empresa.component.service';
import { Empresa }                                         from '../../empresa/empresa.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './planta-manage.component.html',
	styleUrls: ['./planta-manage.component.css']
})

export class PlantaManageComponent implements OnInit {

    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

    public title = 'Manage Planta';
    public plantaList: Planta [];
    public planta: Planta;

  	public busquedaplanta='';
    public filterInputplanta = new FormControl();

 	public userAdmin: User = JSON.parse(localStorage.getItem('currentUser'));

    // Buttons 
    private searchActive: boolean = false;
    private updateActive: boolean = false;
    private createActive: boolean = false;
    private deleteActive: boolean = false;

	public empresaList: Empresa [];
    public empresa: Empresa;
	public empresaAux: Empresa;

	public busquedaEmpresa='';
	filterInputEmpresa = new FormControl();

    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private plantaService: PlantaService
	,private empresaService: EmpresaService
){


  	 this.filterInputEmpresa.valueChanges.subscribe(busquedaEmpresa => {
     this.busquedaEmpresa = busquedaEmpresa;
	   });

	}

    ngOnInit() {
      
	  // Get data user
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      this.valueName = this.user.username;
      this.token = this.user.token;

      this.plantaService.setEdit(false);
      this.plantaService.setDelete(false);

      this.loadPlantas();
      this.habilita();

    }   

    loadPlantas() {
      this.plantaService.getAllPlanta().subscribe(data => {
        if (data) {

          this.plantaList = data;

			this.plantaList.forEach(element => {
				this.empresaService.getEmpresaById(element.empresaId).subscribe(dataAux => {
					if (dataAux) {
						this.empresaAux = dataAux;
						  element.empresaItem = this.empresaAux.clave;
				}	
			});	
		});

        }
      }, error => {
        swal('Error...', 'An error occurred while calling the plantas.', 'error');
      });
    }

  add(){
    this.plantaService.clear();
    this.router.navigate([ '../createplanta' ], { relativeTo: this.route })
  }

  editar(planta){
    this.plantaService.setPlanta(planta);
    this.plantaService.setEdit(true);
    this.plantaService.setDelete(false);
    this.router.navigate([ '../editplanta' ], { relativeTo: this.route })
  }

  eliminar(planta){
    this.plantaService.setPlanta(planta);
    this.plantaService.setEdit(false);
    this.plantaService.setDelete(true);
    this.router.navigate([ '../editplanta' ], { relativeTo: this.route })
  }

  // Select row
  setClickedRowPlanta(index, planta){
    this.plantaService.setPlanta(planta);
    this.plantaService.setEdit(true);
    this.plantaService.setDelete(false);
    this.router.navigate([ '../editplanta' ], { relativeTo: this.route })
  }
  
  habilita(){
    this.userAdmin.authorities.forEach(element => {
      if (element.authority == 'ROLE_PLANTADELETE'){
        this.deleteActive = true;
      }
      if (element.authority == 'ROLE_PLANTACREATE'){
        this.createActive = true;
      }
      if (element.authority == 'ROLE_PLANTAUPDATE'){
        this.updateActive = true;
      }
      if (element.authority == 'ROLE_PLANTASEARCH'){
        this.searchActive = true;
      }
    });
  }

}

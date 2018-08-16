import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { Location } from '@angular/common';
import { User } from '../../user/user.component.model';

import { DomicilioService }                                  from '../../domicilio/domicilio.component.service';
import { Domicilio }                                         from '../../domicilio/domicilio.component.model';

import { SocioService }                                  from '../../socio/socio.component.service';
import { Socio }                                         from '../../socio/socio.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './domicilio-manage.component.html',
	styleUrls: ['./domicilio-manage.component.css']
})

export class DomicilioManageComponent implements OnInit {

    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

    public title = 'Manage Domicilio';
    public domicilioList: Domicilio [];
    public domicilio: Domicilio;

  	public busquedadomicilio='';
    public filterInputdomicilio = new FormControl();

 	public userAdmin: User = JSON.parse(localStorage.getItem('currentUser'));

    // Buttons 
    private searchActive: boolean = false;
    private updateActive: boolean = false;
    private createActive: boolean = false;
    private deleteActive: boolean = false;

	public socioList: Socio [];
    public socio: Socio;
	public socioAux: Socio;

	public busquedaSocio='';
	filterInputSocio = new FormControl();

    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private domicilioService: DomicilioService
	,private socioService: SocioService
){


  	 this.filterInputSocio.valueChanges.subscribe(busquedaSocio => {
     this.busquedaSocio = busquedaSocio;
	   });

	}

    ngOnInit() {
      
	  // Get data user
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      this.valueName = this.user.username;
      this.token = this.user.token;

      this.domicilioService.setEdit(false);
      this.domicilioService.setDelete(false);

      this.loadDomicilios();
      this.habilita();

    }   

    loadDomicilios() {
      this.domicilioService.getAllDomicilio().subscribe(data => {
        if (data) {

          this.domicilioList = data;

			this.domicilioList.forEach(element => {
				this.socioService.getSocioById(element.socioId).subscribe(dataAux => {
					if (dataAux) {
						this.socioAux = dataAux;
						element.socioItem = this.socioAux.numero+"";




















				}	
			});	
		});

        }
      }, error => {
        swal('Error...', 'An error occurred while calling the domicilios.', 'error');
      });
    }

  add(){
    this.domicilioService.clear();
    this.router.navigate([ '../createdomicilio' ], { relativeTo: this.route })
  }

  editar(domicilio){
    this.domicilioService.setDomicilio(domicilio);
    this.domicilioService.setEdit(true);
    this.domicilioService.setDelete(false);
    this.router.navigate([ '../editdomicilio' ], { relativeTo: this.route })
  }

  eliminar(domicilio){
    this.domicilioService.setDomicilio(domicilio);
    this.domicilioService.setEdit(false);
    this.domicilioService.setDelete(true);
    this.router.navigate([ '../editdomicilio' ], { relativeTo: this.route })
  }

  // Select row
  setClickedRowDomicilio(index, domicilio){
    this.domicilioService.setDomicilio(domicilio);
    this.domicilioService.setEdit(true);
    this.domicilioService.setDelete(false);
    this.router.navigate([ '../editdomicilio' ], { relativeTo: this.route })
  }
  
  habilita(){
    this.userAdmin.authorities.forEach(element => {
      if (element.authority == 'ROLE_DOMICILIODELETE'){
        this.deleteActive = true;
      }
      if (element.authority == 'ROLE_DOMICILIOCREATE'){
        this.createActive = true;
      }
      if (element.authority == 'ROLE_DOMICILIOUPDATE'){
        this.updateActive = true;
      }
      if (element.authority == 'ROLE_DOMICILIOSEARCH'){
        this.searchActive = true;
      }
    });
  }

}

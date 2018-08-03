import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { Location } from '@angular/common';
import { User } from '../../user/user.component.model';

import { ModuleService }                                  from '../../module/module.component.service';
import { Module }                                         from '../../module/module.component.model';

import { ApplicationService }                                  from '../../application/application.component.service';
import { Application }                                         from '../../application/application.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './module-manage.component.html',
	styleUrls: ['./module-manage.component.css']
})

export class ModuleManageComponent implements OnInit {

    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

    public title = 'Manage Module';
    public moduleList: Module [];
    public module: Module;

  	public busquedamodule='';
    public filterInputmodule = new FormControl();

 	public userAdmin: User = JSON.parse(localStorage.getItem('currentUser'));

    // Buttons 
    private searchActive: boolean = false;
    private updateActive: boolean = false;
    private createActive: boolean = false;
    private deleteActive: boolean = false;

	public applicationList: Application [];
    public application: Application;
	public applicationAux: Application;

	public busquedaApplication='';
	filterInputApplication = new FormControl();

    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private moduleService: ModuleService
	,private applicationService: ApplicationService
){


  	 this.filterInputApplication.valueChanges.subscribe(busquedaApplication => {
     this.busquedaApplication = busquedaApplication;
	   });

	}

    ngOnInit() {
      
	  // Get data user
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      this.valueName = this.user.username;
      this.token = this.user.token;

      this.moduleService.setEdit(false);
      this.moduleService.setDelete(false);

      this.loadModules();
      this.habilita();

    }   

    loadModules() {
      this.moduleService.getAllModule().subscribe(data => {
        if (data) {

          this.moduleList = data;

			this.moduleList.forEach(element => {
				this.applicationService.getApplicationById(element.applicationId).subscribe(dataAux => {
					if (dataAux) {
						this.applicationAux = dataAux;
						element.applicationItem = this.applicationAux.
						name+ "";














				}	
			});	
		});

        }
      }, error => {
        swal('Error...', 'An error occurred while calling the modules.', 'error');
      });
    }

  add(){
    this.moduleService.clear();
    this.router.navigate([ '../createmodule' ], { relativeTo: this.route })
  }

  editar(module){
    this.moduleService.setModule(module);
    this.moduleService.setEdit(true);
    this.moduleService.setDelete(false);
    this.router.navigate([ '../editmodule' ], { relativeTo: this.route })
  }

  eliminar(module){
    this.moduleService.setModule(module);
    this.moduleService.setEdit(false);
    this.moduleService.setDelete(true);
    this.router.navigate([ '../editmodule' ], { relativeTo: this.route })
  }

  // Select row
  setClickedRowModule(index, module){
    this.moduleService.setModule(module);
    this.moduleService.setEdit(true);
    this.moduleService.setDelete(false);
    this.router.navigate([ '../editmodule' ], { relativeTo: this.route })
  }
  
  habilita(){
    this.userAdmin.authorities.forEach(element => {
      if (element.authority == 'ROLE_MODULEDELETE'){
        this.deleteActive = true;
      }
      if (element.authority == 'ROLE_MODULECREATE'){
        this.createActive = true;
      }
      if (element.authority == 'ROLE_MODULEUPDATE'){
        this.updateActive = true;
      }
      if (element.authority == 'ROLE_MODULESEARCH'){
        this.searchActive = true;
      }
    });
  }

}

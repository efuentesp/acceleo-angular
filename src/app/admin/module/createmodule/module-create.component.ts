import { Component, OnInit, ViewChild}                                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl }                 from '@angular/forms';
import swal from 'sweetalert2';

import { Location } from '@angular/common';
import { User } from '../../user/user.component.model';

import { ModuleService }                                  from '../../module/module.component.service';
import { Module }                                         from '../../module/module.component.model';

import { ApplicationService }                                  from '../../application/application.component.service';
import { Application }                                         from '../../application/application.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './module-create.component.html',
	styleUrls: ['./module-create.component.css']
})

export class ModuleCreateComponent implements OnInit {

    public title = 'Nuevo Module';
    public module: Module;
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

	public applicationList: Application;
    public application: Application;

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
		this.moduleService.clear();
        this.module = new Module;

		this.loadApplications();
       
    } 

save(){
   this.moduleService.saveModule(this.module).subscribe(res => {
     if (res.status == 201 || res.status == 200){
        swal('Success...', 'Module save successfully.', 'success');
        this.router.navigate([ '../managemodule' ], { relativeTo: this.route })
     }else if (res.status == 403){
        swal('Error...', 'Usuario no tiene permiso para guardar Module.', 'error');
     }else{
       swal('Error...', 'Module save unsuccessfully.', 'error');
     }
   } );
}

	loadApplications(){
  		this.applicationService.getAllApplication().subscribe(data => {
    	if (data) {
      	this.applicationList = data;
    	}
  		}, error => {
    	swal('Error...', 'An error occurred while calling the Applications.', 'error');
  	});
}

 setClickedRowApplication(index,application){
	      
		  application.checked = !application.checked;

		  if (application.checked){
		  this.applicationService.setApplication(application);
		  this.module.applicationId = application.applicationId;
		  this.module.applicationItem = application.applicationId + "";
	    	}else{
            this.applicationService.clear();
			this.module.applicationId = null;
		    this.module.applicationItem = "";
		}
 }

  return(module){
      this.location.back();
  }

  
}

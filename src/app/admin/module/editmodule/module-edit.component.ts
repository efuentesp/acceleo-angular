import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
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
    templateUrl: './module-edit.component.html',
	styleUrls: ['./module-edit.component.css']
})

export class ModuleEditComponent implements OnInit {

	public title = 'Editar Module';
    public module: Module;
 	public moduleList: Module;
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

	public flag: boolean;
    public flagDelete: boolean;

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
        
        this.flag = this.moduleService.getEdit();
        this.module = this.moduleService.getModule();
        this.flagDelete = this.moduleService.getDelete();
        
		this.loadApplications();
		this.loadItemApplication(this.module);

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

delete(){
  swal({
    title: "Are you sure?",
    text: "You will not be able to recover this module!",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!"
  }).then((isConfirm) => {
    if (isConfirm.value) {
      this.moduleService.deleteModule(this.module).subscribe(res => {
        if (res.status == 201 || res.status == 200){
          swal('Success...', 'Module item has been deleted successfully.', 'success');
          this.router.navigate([ '../managemodule' ], { relativeTo: this.route })
        }else if (res.status == 403){
          swal('Error...', 'Usuario no tiene permiso para guardar Module.', 'error');
        }else{
          swal('Error...', 'Module deleted unsuccessfully.', 'error');
        }
      },error =>{
        if (error.status == 500){
          swal('Warning...', 'Module no se puede eliminar debido a que esta asociado con otra entidad.', 'warning');
        }
      }
	);
    } else {
      //swal("Cancelled", "Module deleted unsuccessfully", "error");
    }
  });
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
		  this.module.applicationItem = application.
						name+ "";
	    	}else{
            this.applicationService.clear();
			this.module.applicationId = null;
		    this.module.applicationItem = "";
		}
}

loadItemApplication(module){
  this.applicationService.getApplicationById(module.applicationId).subscribe(data => {
    if (data) {
      this.application = data;
      this.module.applicationItem = this.application.
						name+ "";
    }
    }, error => {
    swal('Error...', 'An error occurred while calling the applications.', 'error');
  });

}



return(module){
  this.location.back();
}
 
}

import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
import { Location } from '@angular/common';
import { User } from '../../user/user.component.model';

import { ApplicationService }                                  from '../../application/application.component.service';
import { Application }                                         from '../../application/application.component.model';


@Component ({
    selector: 'app-view',
    templateUrl: './application-edit.component.html',
	styleUrls: ['./application-edit.component.css']
})

export class ApplicationEditComponent implements OnInit {

	public title = 'Editar Application';
    public application: Application;
 	public applicationList: Application;
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

	public flag: boolean;
    public flagDelete: boolean;


    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private applicationService: ApplicationService
){


	}	

    ngOnInit() {
        
        this.flag = this.applicationService.getEdit();
        this.application = this.applicationService.getApplication();
        this.flagDelete = this.applicationService.getDelete();
        

    }  

save(){
   this.applicationService.saveApplication(this.application).subscribe(res => {
     if (res.status == 201 || res.status == 200){
        swal('Success...', 'Application save successfully.', 'success');
        this.router.navigate([ '../manageapplication' ], { relativeTo: this.route })
     }else if (res.status == 403){
        swal('Error...', 'Usuario no tiene permiso para guardar Application.', 'error');
     }else{
       swal('Error...', 'Application save unsuccessfully.', 'error');
     }
   } );
}

delete(){
  swal({
    title: "Are you sure?",
    text: "You will not be able to recover this application!",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!"
  }).then((isConfirm) => {
    if (isConfirm.value) {
      this.applicationService.deleteApplication(this.application).subscribe(res => {
        if (res.status == 201 || res.status == 200){
          swal('Success...', 'Application item has been deleted successfully.', 'success');
          this.router.navigate([ '../manageapplication' ], { relativeTo: this.route })
        }else if (res.status == 403){
          swal('Error...', 'Usuario no tiene permiso para guardar Application.', 'error');
        }else{
          swal('Error...', 'Application deleted unsuccessfully.', 'error');
        }
      },error =>{
        if (error.status == 500){
          swal('Warning...', 'Application no se puede eliminar debido a que esta asociado con otra entidad.', 'warning');
        }
      }
	);
    } else {
      //swal("Cancelled", "Application deleted unsuccessfully", "error");
    }
  });
}



return(application){
  this.location.back();
}
 
}

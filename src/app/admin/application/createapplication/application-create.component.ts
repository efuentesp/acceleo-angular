import { Component, OnInit, ViewChild}                                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl }                 from '@angular/forms';
import swal from 'sweetalert2';

import { Location } from '@angular/common';
import { User } from '../../user/user.component.model';

import { ApplicationService }                                  from '../../application/application.component.service';
import { Application }                                         from '../../application/application.component.model';


@Component ({
    selector: 'app-view',
    templateUrl: './application-create.component.html',
	styleUrls: ['./application-create.component.css']
})

export class ApplicationCreateComponent implements OnInit {

    public title = 'Nuevo Application';
    public application: Application;
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;


    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private applicationService: ApplicationService
){
	}

    ngOnInit() {
		this.applicationService.clear();
        this.application = new Application;

       
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


  return(application){
      this.location.back();
  }
}

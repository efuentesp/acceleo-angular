import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { Location } from '@angular/common';
import { User } from '../../user/user.component.model';

import { ApplicationService }                                  from '../../application/application.component.service';
import { Application }                                         from '../../application/application.component.model';


@Component ({
    selector: 'app-view',
    templateUrl: './application-manage.component.html',
	styleUrls: ['./application-manage.component.css']
})

export class ApplicationManageComponent implements OnInit {

    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

    public title = 'Manage Application';
    public applicationList: Application;
    public application: Application;

  	public busquedaapplication='';
    public filterInputapplication = new FormControl();

 	public userAdmin: User = JSON.parse(localStorage.getItem('currentUser'));

    // Buttons 
    private searchActive: boolean = false;
    private updateActive: boolean = false;
    private createActive: boolean = false;
    private deleteActive: boolean = false;





    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private applicationService: ApplicationService
){



	}

    ngOnInit() {
      
	  // Get data user
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      this.valueName = this.user.username;
      this.token = this.user.token;

      this.applicationService.setEdit(false);
      this.applicationService.setDelete(false);

      this.loadApplications();
      this.habilita();

    }   

    loadApplications() {
      this.applicationService.getAllApplication().subscribe(data => {
        if (data) {
          this.applicationList = data;
        }
      }, error => {
        swal('Error...', 'An error occurred while calling the applications.', 'error');
      });
    }

  add(){
    this.applicationService.clear();
    this.router.navigate([ '../createapplication' ], { relativeTo: this.route })
  }

  editar(application){
    this.applicationService.setApplication(application);
    this.applicationService.setEdit(true);
    this.applicationService.setDelete(false);
    this.router.navigate([ '../editapplication' ], { relativeTo: this.route })
  }

  eliminar(application){
    this.applicationService.setApplication(application);
    this.applicationService.setEdit(false);
    this.applicationService.setDelete(true);
    this.router.navigate([ '../editapplication' ], { relativeTo: this.route })
  }

  // Select row
  setClickedRowApplication(index, application){
    this.applicationService.setApplication(application);
    this.applicationService.setEdit(true);
    this.applicationService.setDelete(false);
    this.router.navigate([ '../editapplication' ], { relativeTo: this.route })
  }
  
  habilita(){
    this.userAdmin.authorities.forEach(element => {
      if (element.authority == 'ROLE_APPLICATIONDELETE'){
        this.deleteActive = true;
      }
      if (element.authority == 'ROLE_APPLICATIONCREATE'){
        this.createActive = true;
      }
      if (element.authority == 'ROLE_APPLICATIONUPDATE'){
        this.updateActive = true;
      }
      if (element.authority == 'ROLE_APPLICATIONSEARCH'){
        this.searchActive = true;
      }
    });
  }

}

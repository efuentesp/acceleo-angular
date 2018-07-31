import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { Location } from '@angular/common';
import { User } from '../../user/user.component.model';

import { ReusabilityService }                                  from '../../reusability/reusability.component.service';
import { Reusability }                                         from '../../reusability/reusability.component.model';


@Component ({
    selector: 'app-view',
    templateUrl: './reusability-manage.component.html',
	styleUrls: ['./reusability-manage.component.css']
})

export class ReusabilityManageComponent implements OnInit {

    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

    public title = 'Manage Reusability';
    public reusabilityList: Reusability;
    public reusability: Reusability;

  	public busquedareusability='';
    public filterInputreusability = new FormControl();

 	public userAdmin: User = JSON.parse(localStorage.getItem('currentUser'));

    // Buttons 
    private searchActive: boolean = false;
    private updateActive: boolean = false;
    private createActive: boolean = false;
    private deleteActive: boolean = false;





    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private reusabilityService: ReusabilityService
){



	}

    ngOnInit() {
      
	  // Get data user
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      this.valueName = this.user.username;
      this.token = this.user.token;

      this.reusabilityService.setEdit(false);
      this.reusabilityService.setDelete(false);

      this.loadReusabilitys();
      this.habilita();

    }   

    loadReusabilitys() {
      this.reusabilityService.getAllReusability().subscribe(data => {
        if (data) {
          this.reusabilityList = data;
        }
      }, error => {
        swal('Error...', 'An error occurred while calling the reusabilitys.', 'error');
      });
    }

  add(){
    this.reusabilityService.clear();
    this.router.navigate([ '../createreusability' ], { relativeTo: this.route })
  }

  editar(reusability){
    this.reusabilityService.setReusability(reusability);
    this.reusabilityService.setEdit(true);
    this.reusabilityService.setDelete(false);
    this.router.navigate([ '../editreusability' ], { relativeTo: this.route })
  }

  eliminar(reusability){
    this.reusabilityService.setReusability(reusability);
    this.reusabilityService.setEdit(false);
    this.reusabilityService.setDelete(true);
    this.router.navigate([ '../editreusability' ], { relativeTo: this.route })
  }

  // Select row
  setClickedRowReusability(index, reusability){
    this.reusabilityService.setReusability(reusability);
    this.reusabilityService.setEdit(true);
    this.reusabilityService.setDelete(false);
    this.router.navigate([ '../editreusability' ], { relativeTo: this.route })
  }
  
  habilita(){
    this.userAdmin.authorities.forEach(element => {
      if (element.authority == 'ROLE_REUSABILITYDELETE'){
        this.deleteActive = true;
      }
      if (element.authority == 'ROLE_REUSABILITYCREATE'){
        this.createActive = true;
      }
      if (element.authority == 'ROLE_REUSABILITYUPDATE'){
        this.updateActive = true;
      }
      if (element.authority == 'ROLE_REUSABILITYSEARCH'){
        this.searchActive = true;
      }
    });
  }

}

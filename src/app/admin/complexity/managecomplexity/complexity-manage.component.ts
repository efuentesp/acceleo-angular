import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { Location } from '@angular/common';
import { User } from '../../user/user.component.model';

import { ComplexityService }                                  from '../../complexity/complexity.component.service';
import { Complexity }                                         from '../../complexity/complexity.component.model';


@Component ({
    selector: 'app-view',
    templateUrl: './complexity-manage.component.html',
	styleUrls: ['./complexity-manage.component.css']
})

export class ComplexityManageComponent implements OnInit {

    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

    public title = 'Manage Complexity';
    public complexityList: Complexity;
    public complexity: Complexity;

  	public busquedacomplexity='';
    public filterInputcomplexity = new FormControl();

 	public userAdmin: User = JSON.parse(localStorage.getItem('currentUser'));

    // Buttons 
    private searchActive: boolean = false;
    private updateActive: boolean = false;
    private createActive: boolean = false;
    private deleteActive: boolean = false;





    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private complexityService: ComplexityService
){



	}

    ngOnInit() {
      
	  // Get data user
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      this.valueName = this.user.username;
      this.token = this.user.token;

      this.complexityService.setEdit(false);
      this.complexityService.setDelete(false);

      this.loadComplexitys();
      this.habilita();

    }   

    loadComplexitys() {
      this.complexityService.getAllComplexity().subscribe(data => {
        if (data) {
          this.complexityList = data;
        }
      }, error => {
        swal('Error...', 'An error occurred while calling the complexitys.', 'error');
      });
    }

  add(){
    this.complexityService.clear();
    this.router.navigate([ '../createcomplexity' ], { relativeTo: this.route })
  }

  editar(complexity){
    this.complexityService.setComplexity(complexity);
    this.complexityService.setEdit(true);
    this.complexityService.setDelete(false);
    this.router.navigate([ '../editcomplexity' ], { relativeTo: this.route })
  }

  eliminar(complexity){
    this.complexityService.setComplexity(complexity);
    this.complexityService.setEdit(false);
    this.complexityService.setDelete(true);
    this.router.navigate([ '../editcomplexity' ], { relativeTo: this.route })
  }

  // Select row
  setClickedRowComplexity(index, complexity){
    this.complexityService.setComplexity(complexity);
    this.complexityService.setEdit(true);
    this.complexityService.setDelete(false);
    this.router.navigate([ '../editcomplexity' ], { relativeTo: this.route })
  }
  
  habilita(){
    this.userAdmin.authorities.forEach(element => {
      if (element.authority == 'ROLE_COMPLEXITYDELETE'){
        this.deleteActive = true;
      }
      if (element.authority == 'ROLE_COMPLEXITYCREATE'){
        this.createActive = true;
      }
      if (element.authority == 'ROLE_COMPLEXITYUPDATE'){
        this.updateActive = true;
      }
      if (element.authority == 'ROLE_COMPLEXITYSEARCH'){
        this.searchActive = true;
      }
    });
  }

}

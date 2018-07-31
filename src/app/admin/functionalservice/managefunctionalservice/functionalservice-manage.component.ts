import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { Location } from '@angular/common';
import { User } from '../../user/user.component.model';

import { FunctionalserviceService }                                  from '../../functionalservice/functionalservice.component.service';
import { Functionalservice }                                         from '../../functionalservice/functionalservice.component.model';

import { MenuService }                                  from '../../menu/menu.component.service';
import { Menu }                                         from '../../menu/menu.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './functionalservice-manage.component.html',
	styleUrls: ['./functionalservice-manage.component.css']
})

export class FunctionalserviceManageComponent implements OnInit {

    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

    public title = 'Manage Functionalservice';
    public functionalserviceList: Functionalservice;
    public functionalservice: Functionalservice;

  	public busquedafunctionalservice='';
    public filterInputfunctionalservice = new FormControl();

 	public userAdmin: User = JSON.parse(localStorage.getItem('currentUser'));

    // Buttons 
    private searchActive: boolean = false;
    private updateActive: boolean = false;
    private createActive: boolean = false;
    private deleteActive: boolean = false;

	public menuList: Menu;
    public menu: Menu;


	public busquedaMenu='';
	filterInputMenu = new FormControl();


    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private functionalserviceService: FunctionalserviceService
	,private menuService: MenuService
){


  	 this.filterInputMenu.valueChanges.subscribe(busquedaMenu => {
     this.busquedaMenu = busquedaMenu;
	   });

	}

    ngOnInit() {
      
	  // Get data user
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      this.valueName = this.user.username;
      this.token = this.user.token;

      this.functionalserviceService.setEdit(false);
      this.functionalserviceService.setDelete(false);

      this.loadFunctionalservices();
      this.habilita();

    }   

    loadFunctionalservices() {
      this.functionalserviceService.getAllFunctionalservice().subscribe(data => {
        if (data) {
          this.functionalserviceList = data;
        }
      }, error => {
        swal('Error...', 'An error occurred while calling the functionalservices.', 'error');
      });
    }

  add(){
    this.functionalserviceService.clear();
    this.router.navigate([ '../createfunctionalservice' ], { relativeTo: this.route })
  }

  editar(functionalservice){
    this.functionalserviceService.setFunctionalservice(functionalservice);
    this.functionalserviceService.setEdit(true);
    this.functionalserviceService.setDelete(false);
    this.router.navigate([ '../editfunctionalservice' ], { relativeTo: this.route })
  }

  eliminar(functionalservice){
    this.functionalserviceService.setFunctionalservice(functionalservice);
    this.functionalserviceService.setEdit(false);
    this.functionalserviceService.setDelete(true);
    this.router.navigate([ '../editfunctionalservice' ], { relativeTo: this.route })
  }

  // Select row
  setClickedRowFunctionalservice(index, functionalservice){
    this.functionalserviceService.setFunctionalservice(functionalservice);
    this.functionalserviceService.setEdit(true);
    this.functionalserviceService.setDelete(false);
    this.router.navigate([ '../editfunctionalservice' ], { relativeTo: this.route })
  }
  
  habilita(){
    this.userAdmin.authorities.forEach(element => {
      if (element.authority == 'ROLE_FUNCTIONALSERVICEDELETE'){
        this.deleteActive = true;
      }
      if (element.authority == 'ROLE_FUNCTIONALSERVICECREATE'){
        this.createActive = true;
      }
      if (element.authority == 'ROLE_FUNCTIONALSERVICEUPDATE'){
        this.updateActive = true;
      }
      if (element.authority == 'ROLE_FUNCTIONALSERVICESEARCH'){
        this.searchActive = true;
      }
    });
  }

}

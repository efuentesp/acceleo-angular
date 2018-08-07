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
    public functionalserviceList: Functionalservice [];
    public functionalservice: Functionalservice;

  	public busquedafunctionalservice='';
    public filterInputfunctionalservice = new FormControl();

 	public userAdmin: User = JSON.parse(localStorage.getItem('currentUser'));

    // Buttons 
    private searchActive: boolean = false;
    private updateActive: boolean = false;
    private createActive: boolean = false;
    private deleteActive: boolean = false;

	public menuList: Menu [];
    public menu: Menu;
	public menuAux: Menu;

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

			this.functionalserviceList.forEach(element => {
				this.menuService.getMenuById(element.menuId).subscribe(dataAux => {
					if (dataAux) {
						this.menuAux = dataAux;
						element.menuItem = this.menuAux.
						path+ "";











	      if (element.complexityId == 'ms'){
	          element.complexityItem = 'Muy Simple';
	      }
	      if (element.complexityId == 's'){
	          element.complexityItem = 'Simple';
	      }
	      if (element.complexityId == 'm'){
	          element.complexityItem = 'Mediano';
	      }
	      if (element.complexityId == 'c'){
	          element.complexityItem = 'Complejo';
	      }
	      if (element.complexityId == 'mc'){
	          element.complexityItem = 'Muy Complejo';
	      }




	      if (element.repositoryId == 'e2_4'){
	          element.repositoryItem = 'De 2 a 4';
	      }
	      if (element.repositoryId == 'e5_7'){
	          element.repositoryItem = 'De 5 a 7';
	      }
	      if (element.repositoryId == 'e8_10'){
	          element.repositoryItem = 'De 8 a 10';
	      }
	      if (element.repositoryId == 'e11_25'){
	          element.repositoryItem = 'De 11 a 25';
	      }


	      if (element.dataId == 'd0_10'){
	          element.dataItem = 'De 0 a 10';
	      }
	      if (element.dataId == 'd10_25'){
	          element.dataItem = 'De 10 a 25';
	      }
	      if (element.dataId == 'd26_40'){
	          element.dataItem = 'De 26 a 40';
	      }
	      if (element.dataId == 'd41_100'){
	          element.dataItem = 'De 41 a 100';
	      }


	      if (element.algorithmtypeId == 'a1'){
	          element.algorithmtypeItem = 'Mover informaci�n';
	      }
	      if (element.algorithmtypeId == 'a2'){
	          element.algorithmtypeItem = 'Calculos Aritm�ticos';
	      }


	      if (element.reusabilityId == 'r1'){
	          element.reusabilityItem = 'L�gica �nica';
	      }
	      if (element.reusabilityId == 'r2'){
	          element.reusabilityItem = 'Reutiliza dise�o';
	      }











				}	
			});	
		});

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

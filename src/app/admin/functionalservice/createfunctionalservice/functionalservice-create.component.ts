import { Component, OnInit, ViewChild}                                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl }                 from '@angular/forms';
import swal from 'sweetalert2';

import { Location } from '@angular/common';
import { User } from '../../user/user.component.model';

import { FunctionalserviceService }                                  from '../../functionalservice/functionalservice.component.service';
import { Functionalservice }                                         from '../../functionalservice/functionalservice.component.model';

import { MenuService }                                  from '../../menu/menu.component.service';
import { Menu }                                         from '../../menu/menu.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './functionalservice-create.component.html',
	styleUrls: ['./functionalservice-create.component.css']
})

export class FunctionalserviceCreateComponent implements OnInit {

    public title = 'Nuevo Functionalservice';
    public functionalservice: Functionalservice;
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

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
		this.functionalserviceService.clear();
        this.functionalservice = new Functionalservice;

		this.loadMenus();
       
    } 

save(){
   this.functionalserviceService.saveFunctionalservice(this.functionalservice).subscribe(res => {
     if (res.status == 201 || res.status == 200){
        swal('Success...', 'Functionalservice save successfully.', 'success');
        this.router.navigate([ '../managefunctionalservice' ], { relativeTo: this.route })
     }else if (res.status == 403){
        swal('Error...', 'Usuario no tiene permiso para guardar Functionalservice.', 'error');
     }else{
       swal('Error...', 'Functionalservice save unsuccessfully.', 'error');
     }
   } );
}

	loadMenus(){
  		this.menuService.getAllMenu().subscribe(data => {
    	if (data) {
      	this.menuList = data;
    	}
  		}, error => {
    	swal('Error...', 'An error occurred while calling the Menus.', 'error');
  	});
}

 setClickedRowMenu(index,menu){
	      
		  menu.checked = !menu.checked;

		  if (menu.checked){
		  this.menuService.setMenu(menu);
		  this.functionalservice.menuId = menu.menuId;
		  this.functionalservice.menuItem = menu.menuId + "";
	    	}else{
            this.menuService.clear();
			this.functionalservice.menuId = null;
		    this.functionalservice.menuItem = "";
		}
 }

  return(functionalservice){
      this.location.back();
  }

  
}

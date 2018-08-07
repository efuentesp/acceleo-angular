import { Component, OnInit, ViewChild}                                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl }                 from '@angular/forms';
import swal from 'sweetalert2';

import { Location } from '@angular/common';
import { User } from '../../user/user.component.model';

import { MenuService }                                  from '../../menu/menu.component.service';
import { Menu }                                         from '../../menu/menu.component.model';

import { ModuleService }                                  from '../../module/module.component.service';
import { Module }                                         from '../../module/module.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './menu-create.component.html',
	styleUrls: ['./menu-create.component.css']
})

export class MenuCreateComponent implements OnInit {

    public title = 'Nuevo Menu';
    public menu: Menu;
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

	public moduleList: Module [];
    public module: Module;
    public moduleAux: Module;

	public busquedaModule='';
	filterInputModule = new FormControl();


    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private menuService: MenuService
	,private moduleService: ModuleService
){
  	 this.filterInputModule.valueChanges.subscribe(busquedaModule => {
     this.busquedaModule = busquedaModule;
   });
	}

    ngOnInit() {
		this.menuService.clear();
        this.menu = new Menu;

		this.loadModules();
       
    } 

save(){
   this.menuService.saveMenu(this.menu).subscribe(res => {
     if (res.status == 201 || res.status == 200){
        swal('Success...', 'Menu save successfully.', 'success');
        this.router.navigate([ '../managemenu' ], { relativeTo: this.route })
     }else if (res.status == 403){
        swal('Error...', 'Usuario no tiene permiso para guardar Menu.', 'error');
     }else{
       swal('Error...', 'Menu save unsuccessfully.', 'error');
     }
   } );
}


	loadModules(){
  		this.moduleService.getAllModule().subscribe(data => {
    	if (data) {
      	
		this.moduleList = data;
// Cambios por cada modal
    	}
  		}, error => {
    	swal('Error...', 'An error occurred while calling the Modules.', 'error');
  	});



}

 setClickedRowModule(index,module){
	      
		  module.checked = !module.checked;
		  if (module.checked){
		  this.moduleService.setModule(module);
		  this.menu.moduleId = module.moduleId;
		  this.menu.moduleItem = module.
						name+ "";
	    	}else{
            this.moduleService.clear();
			this.menu.moduleId = null;
		    this.menu.moduleItem = "";
		}
 }

  return(menu){
      this.location.back();
  }
}

import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
import { Location } from '@angular/common';
import { User } from '../../user/user.component.model';

import { MenuService }                                  from '../../menu/menu.component.service';
import { Menu }                                         from '../../menu/menu.component.model';

import { ModuleService }                                  from '../../module/module.component.service';
import { Module }                                         from '../../module/module.component.model';


@Component ({
    selector: 'app-view',
    templateUrl: './menu-edit.component.html',
	styleUrls: ['./menu-edit.component.css']
})

export class MenuEditComponent implements OnInit {

	public title = 'Editar Menu';
    public menu: Menu;
 	public menuList: Menu;
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

	public flag: boolean;
    public flagDelete: boolean;

	public moduleList: Module;
    public module: Module;

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
        

        this.flag = this.menuService.getEdit();
        this.menu = this.menuService.getMenu();
        this.flagDelete = this.menuService.getDelete();
        
		this.loadModules();
		this.loadItemModule(this.menu);

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

delete(){
  swal({
    title: "Are you sure?",
    text: "You will not be able to recover this menu!",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!"
  }).then((isConfirm) => {
    if (isConfirm.value) {
      this.menuService.deleteMenu(this.menu).subscribe(res => {
        if (res.status == 201 || res.status == 200){
          swal('Success...', 'Menu item has been deleted successfully.', 'success');
          this.router.navigate([ '../managemenu' ], { relativeTo: this.route })
        }else if (res.status == 403){
          swal('Error...', 'Usuario no tiene permiso para guardar Menu.', 'error');
        }else{
          swal('Error...', 'Menu deleted unsuccessfully.', 'error');
        }
      });
    } else {
      //swal("Cancelled", "Menu deleted unsuccessfully", "error");
    }
  });
}

	loadModules(){
  		this.moduleService.getAllModule().subscribe(data => {
    	if (data) {
      	this.moduleList = data;
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
		  this.menu.moduleItem = module.moduleId + "";
	    	}else{
            this.moduleService.clear();
			this.menu.moduleId = null;
		    this.menu.moduleItem = "";
		}
}

loadItemModule(menu){
  this.moduleService.getModuleById(menu.moduleId).subscribe(data => {
    if (data) {
      this.module = data;
      this.menu.moduleItem = this.module.moduleId +"";
    }
    }, error => {
    swal('Error...', 'An error occurred while calling the modules.', 'error');
  });

}



return(menu){
  this.location.back();
}
 
}

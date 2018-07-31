import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
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
    templateUrl: './functionalservice-edit.component.html',
	styleUrls: ['./functionalservice-edit.component.css']
})

export class FunctionalserviceEditComponent implements OnInit {

	public title = 'Editar Functionalservice';
    public functionalservice: Functionalservice;
 	public functionalserviceList: Functionalservice;
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

	public flag: boolean;
    public flagDelete: boolean;

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
        

        this.flag = this.functionalserviceService.getEdit();
        this.functionalservice = this.functionalserviceService.getFunctionalservice();
        this.flagDelete = this.functionalserviceService.getDelete();
        
		this.loadMenus();
		this.loadItemMenu(this.functionalservice);

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

delete(){
  swal({
    title: "Are you sure?",
    text: "You will not be able to recover this functionalservice!",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!"
  }).then((isConfirm) => {
    if (isConfirm.value) {
      this.functionalserviceService.deleteFunctionalservice(this.functionalservice).subscribe(res => {
        if (res.status == 201 || res.status == 200){
          swal('Success...', 'Functionalservice item has been deleted successfully.', 'success');
          this.router.navigate([ '../managefunctionalservice' ], { relativeTo: this.route })
        }else if (res.status == 403){
          swal('Error...', 'Usuario no tiene permiso para guardar Functionalservice.', 'error');
        }else{
          swal('Error...', 'Functionalservice deleted unsuccessfully.', 'error');
        }
      });
    } else {
      //swal("Cancelled", "Functionalservice deleted unsuccessfully", "error");
    }
  });
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

loadItemMenu(functionalservice){
  this.menuService.getMenuById(functionalservice.menuId).subscribe(data => {
    if (data) {
      this.menu = data;
      this.functionalservice.menuItem = this.menu.menuId +"";
    }
    }, error => {
    swal('Error...', 'An error occurred while calling the menus.', 'error');
  });

}



return(functionalservice){
  this.location.back();
}
 
}
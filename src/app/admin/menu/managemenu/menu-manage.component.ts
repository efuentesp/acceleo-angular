import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                          from '@angular/router';
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
    templateUrl: './menu-manage.component.html',
	styleUrls: ['./menu-manage.component.css']
})

export class MenuManageComponent implements OnInit {

    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

    public title = 'Manage Menu';
    public menuList: Menu [];
    public menu: Menu;

  	public busquedamenu='';
    public filterInputmenu = new FormControl();

 	public userAdmin: User = JSON.parse(localStorage.getItem('currentUser'));

    // Buttons 
    private searchActive: boolean = false;
    private updateActive: boolean = false;
    private createActive: boolean = false;
    private deleteActive: boolean = false;

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
      
	  // Get data user
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      this.valueName = this.user.username;
      this.token = this.user.token;

      this.menuService.setEdit(false);
      this.menuService.setDelete(false);

      this.loadMenus();
      this.habilita();

    }   

    loadMenus() {
      this.menuService.getAllMenu().subscribe(data => {
        if (data) {

          this.menuList = data;

			this.menuList.forEach(element => {
				this.moduleService.getModuleById(element.moduleId).subscribe(dataAux => {
					if (dataAux) {
						this.moduleAux = dataAux;
						element.moduleItem = this.moduleAux.
						name+ "";














				}	
			});	
		});

        }
      }, error => {
        swal('Error...', 'An error occurred while calling the menus.', 'error');
      });
    }

  add(){
    this.menuService.clear();
    this.router.navigate([ '../createmenu' ], { relativeTo: this.route })
  }

  editar(menu){
    this.menuService.setMenu(menu);
    this.menuService.setEdit(true);
    this.menuService.setDelete(false);
    this.router.navigate([ '../editmenu' ], { relativeTo: this.route })
  }

  eliminar(menu){
    this.menuService.setMenu(menu);
    this.menuService.setEdit(false);
    this.menuService.setDelete(true);
    this.router.navigate([ '../editmenu' ], { relativeTo: this.route })
  }

  // Select row
  setClickedRowMenu(index, menu){
    this.menuService.setMenu(menu);
    this.menuService.setEdit(true);
    this.menuService.setDelete(false);
    this.router.navigate([ '../editmenu' ], { relativeTo: this.route })
  }
  
  habilita(){
    this.userAdmin.authorities.forEach(element => {
      if (element.authority == 'ROLE_MENUDELETE'){
        this.deleteActive = true;
      }
      if (element.authority == 'ROLE_MENUCREATE'){
        this.createActive = true;
      }
      if (element.authority == 'ROLE_MENUUPDATE'){
        this.updateActive = true;
      }
      if (element.authority == 'ROLE_MENUSEARCH'){
        this.searchActive = true;
      }
    });
  }

}

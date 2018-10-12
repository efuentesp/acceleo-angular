import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';

import { PermisoService }                                  from '../../permiso/permiso.component.service';
import { Permiso }                                         from '../../permiso/permiso.component.model';

import { RolService }                                  from '../../rol/rol.component.service';
import { Rol }                                         from '../../rol/rol.component.model';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component ({
    selector: 'app-view',
    templateUrl: './permiso-manage.component.html',
	styleUrls: ['./permiso-manage.component.css']
})

export class PermisoManageComponent implements OnInit {

    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

    public title = 'Manage Permiso';
    public permisoList: Permiso [];
    public permiso: Permiso;

  	public busquedapermiso='';
    public filterInputpermiso = new FormControl();

 	public userAdmin: User = JSON.parse(localStorage.getItem('currentUser'));

    // Buttons 
    private searchActive: boolean = false;
    private updateActive: boolean = false;
    private createActive: boolean = false;
    private deleteActive: boolean = false;

	public rolList: Rol [];
    public rol: Rol;
	public rolAux: Rol;

	public busquedaRol='';
	filterInputRol = new FormControl();

    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private permisoService: PermisoService
	,private rolService: RolService
){


  	 this.filterInputRol.valueChanges.subscribe(busquedaRol => {
     this.busquedaRol = busquedaRol;
	   });

	}

    ngOnInit() {
      
	  // Get data user
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      this.valueName = this.user.username;
      this.token = this.user.token;

      this.permisoService.setEdit(false);
      this.permisoService.setDelete(false);

      this.loadPermisos();
      this.habilita();

    }   

    loadPermisos() {
      this.permisoService.getAllPermiso().subscribe(data => {

		var datePipe = new DatePipe('en-US');

        if (data) {

          this.permisoList = data;

			this.permisoList.forEach(element => {

			// 	Atributorol

			// //let datePipe     = new DatePipe('en-US');
			// //let fechaDate    = datePipe.transform(element.fecha, 'yyyy-MM-dd');
      //       //element.fecha    = fechaDate;
      //       //element.fechaAux = this.parse(fechaDate);



				this.rolService.getRolById(element.rolId).subscribe(dataAux => {
					if (dataAux) {
						this.rolAux = dataAux;
						element.rolItem = this.rolAux.rolItem;
						// nombre+ "";


















				}	
			});	
		});

        }
      }, error => {
        swal('Error...', 'An error occurred while calling the permisos.', 'error');
      });
    }

  add(){
    this.permisoService.clear();
    this.router.navigate([ '../createpermiso' ], { relativeTo: this.route })
  }

  editar(permiso){
    this.permisoService.setPermiso(permiso);
    this.permisoService.setEdit(true);
    this.permisoService.setDelete(false);
    this.router.navigate([ '../editpermiso' ], { relativeTo: this.route })
  }

  eliminar(permiso){
    this.permisoService.setPermiso(permiso);
    this.permisoService.setEdit(false);
    this.permisoService.setDelete(true);
    this.router.navigate([ '../editpermiso' ], { relativeTo: this.route })
  }

  // Select row
  setClickedRowPermiso(index, permiso){
    this.permisoService.setPermiso(permiso);
    this.permisoService.setEdit(true);
    this.permisoService.setDelete(false);
    this.router.navigate([ '../editpermiso' ], { relativeTo: this.route })
  }
  
  habilita(){
    this.userAdmin.authorities.forEach(element => {
      if (element.authority == 'ROLE_PERMISODELETE'){
        this.deleteActive = true;
      }
      if (element.authority == 'ROLE_PERMISOCREATE'){
        this.createActive = true;
      }
      if (element.authority == 'ROLE_PERMISOUPDATE'){
        this.updateActive = true;
      }
      if (element.authority == 'ROLE_PERMISOSEARCH'){
        this.searchActive = true;
      }
    });
  }

  // Parse to NgbDateStruct
    isNumber(value: any): boolean {
      return !isNaN(this.toInteger(value));
  }
 
  toInteger(value: any): number {
      return parseInt(`${value}`, 10);
  }
  parse(value: string): NgbDateStruct {
    if (value) {
        const dateParts = value.trim().split('-');
        if (dateParts.length === 1 && this.isNumber(dateParts[0])) {
            return {day: this.toInteger(dateParts[0]), month: null, year: null};
        } else if (dateParts.length === 2 && this.isNumber(dateParts[0]) && this.isNumber(dateParts[1])) {
            return {day: this.toInteger(dateParts[1]), month: this.toInteger(dateParts[0]), year: null};
        } else if (dateParts.length === 3 && this.isNumber(dateParts[0]) && this.isNumber(dateParts[1]) && this.isNumber(dateParts[2])) {
            return {day: this.toInteger(dateParts[2]), month: this.toInteger(dateParts[1]), year: this.toInteger(dateParts[0])};
        }
    }
    return null;
  }

}

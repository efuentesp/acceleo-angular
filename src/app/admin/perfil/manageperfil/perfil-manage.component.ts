import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';

import { PerfilService }                                  from '../../perfil/perfil.component.service';
import { Perfil }                                         from '../../perfil/perfil.component.model';

import { SocioService }                                  from '../../socio/socio.component.service';
import { Socio }                                         from '../../socio/socio.component.model';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component ({
    selector: 'app-view',
    templateUrl: './perfil-manage.component.html',
	styleUrls: ['./perfil-manage.component.css']
})

export class PerfilManageComponent implements OnInit {

    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

    public title = 'Manage Perfil';
    public perfilList: Perfil [];
    public perfil: Perfil;

  	public busquedaperfil='';
    public filterInputperfil = new FormControl();

 	public userAdmin: User = JSON.parse(localStorage.getItem('currentUser'));

    // Buttons 
    private searchActive: boolean = false;
    private updateActive: boolean = false;
    private createActive: boolean = false;
    private deleteActive: boolean = false;

	public socioList: Socio [];
    public socio: Socio;
	public socioAux: Socio;

	public busquedaSocio='';
	filterInputSocio = new FormControl();

    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private perfilService: PerfilService
	,private socioService: SocioService
){


  	 this.filterInputSocio.valueChanges.subscribe(busquedaSocio => {
     this.busquedaSocio = busquedaSocio;
	   });

	}

    ngOnInit() {
      
	  // Get data user
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      this.valueName = this.user.username;
      this.token = this.user.token;

      this.perfilService.setEdit(false);
      this.perfilService.setDelete(false);

      this.loadPerfils();
      this.habilita();

    }   

    loadPerfils() {
      this.perfilService.getAllPerfil().subscribe(data => {

		var datePipe = new DatePipe('en-US');

        if (data) {

          this.perfilList = data;

			this.perfilList.forEach(element => {

				Atributosocio

			//let datePipe     = new DatePipe('en-US');
			//let fechaDate    = datePipe.transform(element.fecha, 'yyyy-MM-dd');
            //element.fecha    = fechaDate;
            //element.fechaAux = this.parse(fechaDate);



				this.socioService.getSocioById(element.socioId).subscribe(dataAux => {
					if (dataAux) {
						this.socioAux = dataAux;
						element.socioItem = this.socioAux.
















				}	
			});	
		});

        }
      }, error => {
        swal('Error...', 'An error occurred while calling the perfils.', 'error');
      });
    }

  add(){
    this.perfilService.clear();
    this.router.navigate([ '../createperfil' ], { relativeTo: this.route })
  }

  editar(perfil){
    this.perfilService.setPerfil(perfil);
    this.perfilService.setEdit(true);
    this.perfilService.setDelete(false);
    this.router.navigate([ '../editperfil' ], { relativeTo: this.route })
  }

  eliminar(perfil){
    this.perfilService.setPerfil(perfil);
    this.perfilService.setEdit(false);
    this.perfilService.setDelete(true);
    this.router.navigate([ '../editperfil' ], { relativeTo: this.route })
  }

  // Select row
  setClickedRowPerfil(index, perfil){
    this.perfilService.setPerfil(perfil);
    this.perfilService.setEdit(true);
    this.perfilService.setDelete(false);
    this.router.navigate([ '../editperfil' ], { relativeTo: this.route })
  }
  
  habilita(){
    this.userAdmin.authorities.forEach(element => {
      if (element.authority == 'ROLE_PERFILDELETE'){
        this.deleteActive = true;
      }
      if (element.authority == 'ROLE_PERFILCREATE'){
        this.createActive = true;
      }
      if (element.authority == 'ROLE_PERFILUPDATE'){
        this.updateActive = true;
      }
      if (element.authority == 'ROLE_PERFILSEARCH'){
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

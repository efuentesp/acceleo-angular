import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';

import { PosicionService }                                  from '../../posicion/posicion.component.service';
import { Posicion }                                         from '../../posicion/posicion.component.model';

import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { FilialService }                                  from '../../filial/filial.component.service';
import { Filial }                                         from '../../filial/filial.component.model';
import { PuestoService }                                  from '../../puesto/puesto.component.service';
import { Puesto }                                         from '../../puesto/puesto.component.model';
import { ReclutadorService }                                  from '../../reclutador/reclutador.component.service';
import { Reclutador }                                         from '../../reclutador/reclutador.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './posicion-manage.component.html',
	styleUrls: ['./posicion-manage.component.css']
})

export class PosicionManageComponent implements OnInit {

    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

    public title = 'Manage Posicion';
    public posicionList: Posicion [];
    public posicion: Posicion;

  	public busquedaPosicion='';
    public filterInputPosicion = new FormControl();
    datePipe = new DatePipe('en-US');

 	public userAdmin: User = JSON.parse(localStorage.getItem('currentUser'));

	public filialList: Filial [];
	public filial: Filial;
	public filialAux: Filial;
	
	public busquedaFilial='';
	filterInputFilial = new FormControl();
	public puestoList: Puesto [];
	public puesto: Puesto;
	public puestoAux: Puesto;
	
	public busquedaPuesto='';
	filterInputPuesto = new FormControl();
	public reclutadorList: Reclutador [];
	public reclutador: Reclutador;
	public reclutadorAux: Reclutador;
	
	public busquedaReclutador='';
	filterInputReclutador = new FormControl();

    // Buttons 
    private searchActive: boolean = false;
    private updateActive: boolean = false;
    private createActive: boolean = false;
    private deleteActive: boolean = false;

    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private posicionService:PosicionService
				,private filialService: FilialService
				,private puestoService: PuestoService
				,private reclutadorService: ReclutadorService
){
			this.filterInputPosicion.valueChanges.subscribe(busquedaPosicion => {
		  	  	this.busquedaPosicion = busquedaPosicion;
		  	  });
			this.filterInputFilial.valueChanges.subscribe(busquedaFilial => {
			    this.busquedaFilial = busquedaFilial;
			  });
			this.filterInputPuesto.valueChanges.subscribe(busquedaPuesto => {
			    this.busquedaPuesto = busquedaPuesto;
			  });
			this.filterInputReclutador.valueChanges.subscribe(busquedaReclutador => {
			    this.busquedaReclutador = busquedaReclutador;
			  });
}

    ngOnInit() {
      
	  // Get data user
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      this.valueName = this.user.username;
      this.token = this.user.token;

      this.posicionService.setEdit(false);
      this.posicionService.setDelete(false);

      this.loadPosicion();
      this.habilita();

    }   
    
loadPosicion(){
    this.posicionService.getAllPosicion().subscribe(data => {
        if (data) {
            this.posicionList = data;
			this.posicionList.forEach(element => {
			    this.filialService.getFilialById(element.filialId).subscribe(data => {
			        if (data){
			            element.filialItem = data.nombre;
			        }
			    });
			});
			this.posicionList.forEach(element => {
			    this.puestoService.getPuestoById(element.puestoId).subscribe(data => {
			        if (data){
			            element.puestoItem = data.nombre;
			        }
			    });
			});
			this.posicionList.forEach(element => {
			        if (element.tiponominaId == 'a'){
			            element.tiponominaItem = "Externo";
			        }		
			        if (element.tiponominaId == 'b'){
			            element.tiponominaItem = "Interno";
			        }		
			        if (element.tiponominaId == 'c'){
			            element.tiponominaItem = "Sindicalizado";
			        }		
			});
			this.posicionList.forEach(element => {
			    this.reclutadorService.getReclutadorById(element.reclutadorId).subscribe(data => {
			        if (data){
			            element.reclutadorItem = data.nombre;
			        }
			    });
			});
			this.posicionList.forEach(element => {
			        if (element.estatusposicionId == 'e1'){
			            element.estatusposicionItem = "Abierta";
			        }		
			        if (element.estatusposicionId == 'e2'){
			            element.estatusposicionItem = "Cerrada";
			        }		
			        if (element.estatusposicionId == 'e3'){
			            element.estatusposicionItem = "Cancelada";
			        }		
			        if (element.estatusposicionId == 'e4'){
			            element.estatusposicionItem = "En pausa";
			        }		
			});
        }
    }, error => {
    swal('Error...', 'An error occurred while calling the posicions.', 'error');
    });
}


add(){
	this.posicionService.clear();
	this.router.navigate([ '../createposicion' ], { relativeTo: this.route })
}


editar(posicion){
	this.posicionService.setPosicion(posicion);
	this.posicionService.setEdit(true);
	this.posicionService.setDelete(false);
	this.router.navigate([ '../editposicion' ], { relativeTo: this.route })
}


eliminar(posicion){
	this.posicionService.setPosicion(posicion);
	this.posicionService.setEdit(false);
	this.posicionService.setDelete(true);
	this.router.navigate([ '../editposicion' ], { relativeTo: this.route })
}

  // Select row
  setClickedRowPosicion(index, posicion){
    this.posicionService.setPosicion(posicion);
    this.posicionService.setEdit(true);
    this.posicionService.setDelete(false);
    this.router.navigate([ '../editposicion' ], { relativeTo: this.route })
  }
  
  habilita(){
    this.userAdmin.authorities.forEach(element => {
if (element.authority == 'ROLE_POSICIONDELETE'){
	this.deleteActive = true;
}
if (element.authority == 'ROLE_POSICIONCREATE'){
this.createActive = true;
}
if (element.authority == 'ROLE_POSICIONUPDATE'){
	this.updateActive = true;
}
if (element.authority == 'ROLE_ORDENSIMPLIFICADASEARCH'){
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
  
  go(value, posicion){
      this.router.navigate([ '../'+value+'' ], { relativeTo: this.route })
  }
}

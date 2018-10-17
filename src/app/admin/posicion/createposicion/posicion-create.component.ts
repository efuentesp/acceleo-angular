import { Component, OnInit, ViewChild}                                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl }                 from '@angular/forms';
import swal from 'sweetalert2';
import { Location } from '@angular/common';
import { User } from '../../user/user.component.model';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CustomNgbDateParserFormatter } from '../../../dateformat';

import { PosicionService }                                  from '../../posicion/posicion.component.service';
import { Posicion }                                         from '../../posicion/posicion.component.model';

import { FilialService }                                  from '../../filial/filial.component.service';
import { Filial }                                         from '../../filial/filial.component.model';
import { PuestoService }                                  from '../../puesto/puesto.component.service';
import { Puesto }                                         from '../../puesto/puesto.component.model';
import { ReclutadorService }                                  from '../../reclutador/reclutador.component.service';
import { Reclutador }                                         from '../../reclutador/reclutador.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './posicion-create.component.html',
	styleUrls: ['./posicion-create.component.css']
})

export class PosicionCreateComponent implements OnInit {

   public title = 'Nuevo Posicion';
   public posicionform: any;
   public user: User;
   public valueName: string;
   public token: string;

public posicionList: Posicion [];
public posicion: Posicion;
public posicionAux: Posicion;

public busquedaPosicion='';
filterInputPosicion = new FormControl();

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

constructor(private router: Router,  
			private route: ActivatedRoute, 
			private location: Location,
			private parseFormat: CustomNgbDateParserFormatter,
			private posicionService: PosicionService
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
	this.posicionService.clear();
	      this.posicion = new Posicion;
	this.loadFilial();
	this.loadPuesto();
	this.loadReclutador();
} 

save(){
	if (
	this.posicion.filialId === null ||
	this.posicion.puestoId === null ||
	this.posicion.nombre ==="" || this.posicion.nombre ===null || 
	this.posicion.descripcion ==="" || this.posicion.descripcion ===null || 
	this.posicion.fechaAux ===null || 
	this.posicion.contacto ==="" || this.posicion.contacto ===null || 
	this.posicion.salario ===null || 
	this.posicion.vacantes ===null || 
	this.posicion.tiponominaId ==="" || this.posicion.tiponominaId ===null || 
	this.posicion.reclutadorId === null ||
	this.posicion.estatusposicionId ==="" || this.posicion.estatusposicionId ===null || 
		this.posicion.posicionId === null 
	){
		return;
	}else{
	   this.posicion.fecha = this.parseFormat.format(this.posicion.fechaAux);
	   this.posicionService.savePosicion(this.posicion).subscribe(res => {
	     if (res.status == 201 || res.status == 200){
	        swal('Success...', 'Posicion save successfully.', 'success');
	        this.router.navigate([ '../manageposicion' ], { relativeTo: this.route })
	     }else if (res.status == 403){
	        swal('Error...', 'Usuario no tiene permiso para guardar posicion.', 'error');
	     }else{
	       swal('Error...', 'posicion save unsuccessfully.', 'error');
	     }
	   } );
	}
}

loadFilial(){
	this.filialService.getAllFilial().subscribe(data => {
   		if (data) {
 		this.filialList = data;
 		}
	}, error => {
		swal('Error...', 'An error occurred while calling the Filials.', 'error');
	});
 }

 setClickedRowFilial(index,filial){
 	  filial.checked = !filial.checked;
 	  if (filial.checked){
	 	  this.filialService.setFilial(filial);
this.posicion.filialId = filial.filialId;
this.posicion.filialItem = filial.nombre;
 	  }else{
 	      this.filialService.clear();
this.posicion.filialId = "";
this.posicion.filialItem = "";
 	   }
 }
loadPuesto(){
	this.puestoService.getAllPuesto().subscribe(data => {
   		if (data) {
 		this.puestoList = data;
 		this.puestoList.forEach(element => {
 		      	if (element.puestosId == 'a'){
 		      	    element.puestosItem = "Promotor de cambaceo";
 		      	}		
 		      	if (element.puestosId == 'b'){
 		      	    element.puestosItem = "Valuador";
 		      	}		
 		      	if (element.puestosId == 'c'){
 		      	    element.puestosItem = "Mecanógrafo";
 		      	}		
 		      	if (element.puestosId == 'd'){
 		      	    element.puestosItem = "Expendedor";
 		      	}		
 		      	if (element.puestosId == 'e'){
 		      	    element.puestosItem = "Almacenista";
 		      	}		
 		      	if (element.puestosId == 'f'){
 		      	    element.puestosItem = "Mozo";
 		      	}		
 		      	if (element.puestosId == 'g'){
 		      	    element.puestosItem = "Cajero";
 		      	}		
 		});
 		}
	}, error => {
		swal('Error...', 'An error occurred while calling the Puestos.', 'error');
	});
 }

 setClickedRowPuesto(index,puesto){
 	  puesto.checked = !puesto.checked;
 	  if (puesto.checked){
	 	  this.puestoService.setPuesto(puesto);
this.posicion.puestoId = puesto.puestoId;
this.posicion.puestoItem = puesto.puestosItem;
 	  }else{
 	      this.puestoService.clear();
this.posicion.puestoId = "";
this.posicion.puestoItem = "";
 	   }
 }
loadReclutador(){
	this.reclutadorService.getAllReclutador().subscribe(data => {
   		if (data) {
 		this.reclutadorList = data;
 		this.reclutadorList.forEach(element => {
 		      	if (element.generoId == 'mas'){
 		      	    element.generoItem = "Masculino";
 		      	}		
 		      	if (element.generoId == 'fem'){
 		      	    element.generoItem = "Femenino";
 		      	}		
 		});
 		}
	}, error => {
		swal('Error...', 'An error occurred while calling the Reclutadors.', 'error');
	});
 }

 setClickedRowReclutador(index,reclutador){
 	  reclutador.checked = !reclutador.checked;
 	  if (reclutador.checked){
	 	  this.reclutadorService.setReclutador(reclutador);
this.posicion.reclutadorId = reclutador.reclutadorId;
this.posicion.reclutadorItem = reclutador.nombre;
 	  }else{
 	      this.reclutadorService.clear();
this.posicion.reclutadorId = "";
this.posicion.reclutadorItem = "";
 	   }
 }

}

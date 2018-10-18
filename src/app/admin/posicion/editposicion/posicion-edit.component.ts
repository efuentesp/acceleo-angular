import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
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
    templateUrl: './posicion-edit.component.html',
	styleUrls: ['./posicion-edit.component.css']
})

export class PosicionEditComponent implements OnInit {

	public title = 'Editar Posicion';
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;
public changeFormatFecha: boolean = false;

	public flag: boolean;
    public flagDelete: boolean;
    datePipe = new DatePipe('en-US');

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
				private parserFormatter: NgbDateParserFormatter,
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
        
        this.flag = this.posicionService.getEdit();
        this.posicion = this.posicionService.getPosicion();
    		this.posicion.fechaAux = this.parserFormatter.parse(this.posicion.fecha);
        this.flagDelete = this.posicionService.getDelete();
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
	   if (this.changeFormatFecha){
	   	this.posicion.fecha = this.parse((this.posicion.fechaAux)+"");
	   }else{
	   	this.posicion.fecha = this.parseFormat.format(this.posicion.fechaAux);
	   }
	   this.posicionService.savePosicion(this.posicion).subscribe(res => {
	     if (res.status == 201 || res.status == 200){
	        swal('Success...', 'Posicion save successfully.', 'success');
	        this.router.navigate([ '../manageposicion' ], { relativeTo: this.route })
	     }else if (res.status == 403){
	        swal('Error...', 'Usuario no tiene permiso para guardar Posicion.', 'error');
	     }else{
	       swal('Error...', 'Posicion save unsuccessfully.', 'error');
	     }
	   } );
	}	
}

delete(){
  swal({
    title: "Are you sure?",
    text: "You will not be able to recover this posicion!",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!"
  }).then((isConfirm) => {
    if (isConfirm.value) {
      this.posicionService.deletePosicion(this.posicion).subscribe(res => {
        if (res.status == 201 || res.status == 200){
          swal('Success...', 'Posicion item has been deleted successfully.', 'success');
          this.router.navigate([ '../manageposicion' ], { relativeTo: this.route })
        }else if (res.status == 403){
          swal('Error...', 'Usuario no tiene permiso para guardar Posicion.', 'error');
        }else{
          swal('Error...', 'Posicion deleted unsuccessfully.', 'error');
        }
      },error =>{
        if (error.status == 500){
          swal('Warning...', 'Posicion no se puede eliminar debido a que esta asociado con otra entidad.', 'warning');
        }
      }
	);
    } else {
      //swal("Cancelled", "Posicion deleted unsuccessfully", "error");
    }
  });
}

return(posicion){
  this.location.back();
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
changeFecha(value){
	this.changeFormatFecha = value;
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
 
isNumber(value: any): boolean {
	return !isNaN(this.toInteger(value));
}

toInteger(value: any): number {
	return parseInt(`${value}`, 10);
}

parse(value: string): string {
    if (value) {
        const dateParts = value.trim().split('/');
        if (dateParts.length === 3 && this.isNumber(dateParts[0]) && this.isNumber(dateParts[1]) && this.isNumber(dateParts[2])) {
			return this.datePipe.transform(new Date(this.toInteger(dateParts[2]), this.toInteger(dateParts[1]), this.toInteger(dateParts[0])), 'yyyy-MM-dd');
        }
    }
    return null;
} 
 
}


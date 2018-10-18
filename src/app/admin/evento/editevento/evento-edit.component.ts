import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { CustomNgbDateParserFormatter } from '../../../dateformat';

import { EventoService }                                  from '../../evento/evento.component.service';
import { Evento }                                         from '../../evento/evento.component.model';

import { PosicionService }                                  from '../../posicion/posicion.component.service';
import { Posicion }                                         from '../../posicion/posicion.component.model';
import { CandidatoService }                                  from '../../candidato/candidato.component.service';
import { Candidato }                                         from '../../candidato/candidato.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './evento-edit.component.html',
	styleUrls: ['./evento-edit.component.css']
})

export class EventoEditComponent implements OnInit {

	public title = 'Editar Evento';
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;
public changeFormatFecha: boolean = false;
public changeFormatFechareal: boolean = false;

	public flag: boolean;
    public flagDelete: boolean;
    datePipe = new DatePipe('en-US');

	public eventoList: Evento [];
	public evento: Evento;
    public eventoAux: Evento;

	public busquedaEvento='';
	filterInputEvento = new FormControl();

public posicionList: Posicion [];
	    public posicion: Posicion;
	    public posicionAux: Posicion;
	    
	    public busquedaPosicion='';
	    filterInputPosicion = new FormControl();
public candidatoList: Candidato [];
	    public candidato: Candidato;
	    public candidatoAux: Candidato;
	    
	    public busquedaCandidato='';
	    filterInputCandidato = new FormControl();

    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private parseFormat: CustomNgbDateParserFormatter,
				private parserFormatter: NgbDateParserFormatter,
				private eventoService: EventoService
					
				,private posicionService: PosicionService
				,private candidatoService: CandidatoService
					
){
	this.filterInputEvento.valueChanges.subscribe(busquedaEvento => {
     	this.busquedaEvento = busquedaEvento;
     });
     
		
	this.filterInputPosicion.valueChanges.subscribe(busquedaPosicion => {
		     this.busquedaPosicion = busquedaPosicion;
		   });
	this.filterInputCandidato.valueChanges.subscribe(busquedaCandidato => {
		     this.busquedaCandidato = busquedaCandidato;
		   });
		
}

    ngOnInit() {
        
        this.flag = this.eventoService.getEdit();
        this.evento = this.eventoService.getEvento();
    		this.evento.fechaAux = this.parserFormatter.parse(this.evento.fecha);
    		this.evento.fecharealAux = this.parserFormatter.parse(this.evento.fechareal);
        this.flagDelete = this.eventoService.getDelete();
        	this.loadPosicion();
        	this.loadCandidato();
    }  

save(){
	if (
	this.evento.tipoeventoId ==="" || this.evento.tipoeventoId ===null || 
	this.evento.nombre ==="" || this.evento.nombre ===null || 
	this.evento.posicionId === null ||
	this.evento.fechaAux ===null || 
	this.evento.responsable ==="" || this.evento.responsable ===null || 
	this.evento.estatuseventoId ==="" || this.evento.estatuseventoId ===null || 
		this.evento.eventoId === null 
	){
		return;
	}else{
	   if (this.changeFormatFecha){
	   	this.evento.fecha = this.parse((this.evento.fechaAux)+"");
	   }else{
	   	this.evento.fecha = this.parseFormat.format(this.evento.fechaAux);
	   }
	   if (this.changeFormatFechareal){
	   	this.evento.fechareal = this.parse((this.evento.fecharealAux)+"");
	   }else{
	   	this.evento.fechareal = this.parseFormat.format(this.evento.fecharealAux);
	   }
	   this.eventoService.saveEvento(this.evento).subscribe(res => {
	     if (res.status == 201 || res.status == 200){
	        swal('Success...', 'Evento save successfully.', 'success');
	        this.router.navigate([ '../manageevento' ], { relativeTo: this.route })
	     }else if (res.status == 403){
	        swal('Error...', 'Usuario no tiene permiso para guardar Evento.', 'error');
	     }else{
	       swal('Error...', 'Evento save unsuccessfully.', 'error');
	     }
	   } );
	}	
}

delete(){
  swal({
    title: "Are you sure?",
    text: "You will not be able to recover this evento!",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!"
  }).then((isConfirm) => {
    if (isConfirm.value) {
      this.eventoService.deleteEvento(this.evento).subscribe(res => {
        if (res.status == 201 || res.status == 200){
          swal('Success...', 'Evento item has been deleted successfully.', 'success');
          this.router.navigate([ '../manageevento' ], { relativeTo: this.route })
        }else if (res.status == 403){
          swal('Error...', 'Usuario no tiene permiso para guardar Evento.', 'error');
        }else{
          swal('Error...', 'Evento deleted unsuccessfully.', 'error');
        }
      },error =>{
        if (error.status == 500){
          swal('Warning...', 'Evento no se puede eliminar debido a que esta asociado con otra entidad.', 'warning');
        }
      }
	);
    } else {
      //swal("Cancelled", "Evento deleted unsuccessfully", "error");
    }
  });
}

return(evento){
  this.location.back();
}
 
loadPosicion(){
	this.posicionService.getAllPosicion().subscribe(data => {
   		if (data) {
 		this.posicionList = data;
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
		swal('Error...', 'An error occurred while calling the Posicions.', 'error');
	});
 }

 setClickedRowPosicion(index,posicion){
 	  posicion.checked = !posicion.checked;
 	  if (posicion.checked){
	 	  this.posicionService.setPosicion(posicion);
this.evento.posicionId = posicion.posicionId;
this.evento.posicionItem = posicion.nombre;
 	  }else{
 	      this.posicionService.clear();
this.evento.posicionId = "";
this.evento.posicionItem = "";
	 	   }
 }
loadCandidato(){
	this.candidatoService.getAllCandidato().subscribe(data => {
   		if (data) {
 		this.candidatoList = data;
 		this.candidatoList.forEach(element => {
 		      	if (element.generoId == 'mas'){
 		      	    element.generoItem = "Masculino";
 		      	}		
 		      	if (element.generoId == 'fem'){
 		      	    element.generoItem = "Femenino";
 		      	}		
 		});
 		this.candidatoList.forEach(element => {
 		      	if (element.estatuscandidatoId == 'e1'){
 		      	    element.estatuscandidatoItem = "Contactado";
 		      	}		
 		      	if (element.estatuscandidatoId == 'e2'){
 		      	    element.estatuscandidatoItem = "En proceso de evaluación";
 		      	}		
 		      	if (element.estatuscandidatoId == 'e3'){
 		      	    element.estatuscandidatoItem = "Ofertado";
 		      	}		
 		      	if (element.estatuscandidatoId == 'e4'){
 		      	    element.estatuscandidatoItem = "En proceso de contratación";
 		      	}		
 		      	if (element.estatuscandidatoId == 'e5'){
 		      	    element.estatuscandidatoItem = "Contratado";
 		      	}		
 		      	if (element.estatuscandidatoId == 'e6'){
 		      	    element.estatuscandidatoItem = "Rechazado";
 		      	}		
 		      	if (element.estatuscandidatoId == 'e7'){
 		      	    element.estatuscandidatoItem = "Declinó";
 		      	}		
 		});
 		}
	}, error => {
		swal('Error...', 'An error occurred while calling the Candidatos.', 'error');
	});
 }

 setClickedRowCandidato(index,candidato){
 	  candidato.checked = !candidato.checked;
 	  if (candidato.checked){
	 	  this.candidatoService.setCandidato(candidato);
this.evento.candidatoId = candidato.candidatoId;
this.evento.candidatoItem = candidato.nombre;
 	  }else{
 	      this.candidatoService.clear();
this.evento.candidatoId = "";
this.evento.candidatoItem = "";
	 	   }
 }
changeFecha(value){
	this.changeFormatFecha = value;
}
changeFechareal(value){
	this.changeFormatFechareal = value;
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


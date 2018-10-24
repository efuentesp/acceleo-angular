import { Component, OnInit, ViewChild}                                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl }                 from '@angular/forms';
import swal from 'sweetalert2';
import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CustomNgbDateParserFormatter } from '../../../dateformat';

import { CandidatoService }                                  from '../../candidato/candidato.component.service';
import { Candidato }                                         from '../../candidato/candidato.component.model';
import { DireccionService }                                  from '../../direccion/direccion.component.service';
import { Direccion }                                         from '../../direccion/direccion.component.model';
import { DocumentoService }                                  from '../../documento/documento.component.service';
import { Documento }                                         from '../../documento/documento.component.model';
import { SolicitudService }                                  from '../../solicitud/solicitud.component.service';
import { Solicitud }                                         from '../../solicitud/solicitud.component.model';
import { EventoService }                                  from '../../evento/evento.component.service';
import { Evento }                                         from '../../evento/evento.component.model';
import { FilialService }                                  from '../../filial/filial.component.service';
import { Filial }                                         from '../../filial/filial.component.model';
import { PosicionService }                                  from '../../posicion/posicion.component.service';
import { Posicion }                                         from '../../posicion/posicion.component.model';
import { PuestoService }                                  from '../../puesto/puesto.component.service';
import { Puesto }                                         from '../../puesto/puesto.component.model';
import { ReclutadorService }                                  from '../../reclutador/reclutador.component.service';
import { Reclutador }                                         from '../../reclutador/reclutador.component.model';
import { RolService }                                  from '../../rol/rol.component.service';
import { Rol }                                         from '../../rol/rol.component.model';
import { TrayectoriaService }                                  from '../../trayectoria/trayectoria.component.service';
import { Trayectoria }                                         from '../../trayectoria/trayectoria.component.model';
import { UsuarioService }                                  from '../../usuario/usuario.component.service';
import { Usuario }                                         from '../../usuario/usuario.component.model';
import { PermisoService }                                  from '../../permiso/permiso.component.service';
import { Permiso }                                         from '../../permiso/permiso.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './evento-create.component.html',
	styleUrls: ['./evento-create.component.css']
})

export class EventoCreateComponent implements OnInit {

   public title = 'Nuevo Evento';
   public eventoform: any;
   public user: User;
   public valueName: string;
   public token: string;
	   		public changeFormatFecha: boolean = false;
	   		public changeFormatFechareal: boolean = false;

public eventoList: Evento [];
public evento: Evento;
public eventoAux: Evento;

public busquedaEvento='';
filterInputEvento = new FormControl();
datePipe = new DatePipe('en-US');

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
			private parseFormat: CustomNgbDateParserFormatter
			, private candidatoService: CandidatoService
			, private direccionService: DireccionService
			, private documentoService: DocumentoService
			, private solicitudService: SolicitudService
			, private eventoService: EventoService
			, private filialService: FilialService
			, private posicionService: PosicionService
			, private puestoService: PuestoService
			, private reclutadorService: ReclutadorService
			, private rolService: RolService
			, private trayectoriaService: TrayectoriaService
			, private usuarioService: UsuarioService
			, private permisoService: PermisoService
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
	this.eventoService.clear();
	      this.evento = new Evento;
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
	        swal('Error...', 'Usuario no tiene permiso para guardar evento.', 'error');
	     }else{
	       swal('Error...', 'evento save unsuccessfully.', 'error');
	     }
	   } );
	}
}

loadPosicion(){
	this.posicionService.getAllPosicion().subscribe(data => {
   		if (data) {
 		this.posicionList = data;
 		
 		this.posicionList.forEach(element => {
 			          this.puestoService.getPuestoById(element.puestoId).subscribe(data => {
 			              if (data){
 			              	if (data.puestosId == 'a'){
 			              	    element.puestoItem = "Promotor de cambaceo";
 			              	    element.puestoId = "A";
 			              	}		
 			              	if (data.puestosId == 'b'){
 			              	    element.puestoItem = "Valuador";
 			              	    element.puestoId = "B";
 			              	}		
 			              	if (data.puestosId == 'c'){
 			              	    element.puestoItem = "Mecanógrafo";
 			              	    element.puestoId = "C";
 			              	}		
 			              	if (data.puestosId == 'd'){
 			              	    element.puestoItem = "Expendedor";
 			              	    element.puestoId = "D";
 			              	}		
 			              	if (data.puestosId == 'e'){
 			              	    element.puestoItem = "Almacenista";
 			              	    element.puestoId = "E";
 			              	}		
 			              	if (data.puestosId == 'f'){
 			              	    element.puestoItem = "Mozo";
 			              	    element.puestoId = "F";
 			              	}		
 			              	if (data.puestosId == 'g'){
 			              	    element.puestoItem = "Cajero";
 			              	    element.puestoId = "G";
 			              	}		
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
this.evento.posicion = posicion;		   
this.evento.posicionId = posicion.posicionId;
this.evento.posicionItem = posicion.nombre;
 	  }else{
		   this.posicionService.clear();
		   this.evento.posicion = null;		   
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
this.evento.candidato = candidato;
this.evento.candidatoId = candidato.candidatoId;
this.evento.candidatoItem = candidato.nombre;
 	  }else{
		   this.candidatoService.clear();
this.evento.candidato = null;		   
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

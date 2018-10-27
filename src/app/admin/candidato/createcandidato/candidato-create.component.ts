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
    templateUrl: './candidato-create.component.html',
	styleUrls: ['./candidato-create.component.css']
})

export class CandidatoCreateComponent implements OnInit {

   public title = 'Nuevo Candidato';
   public candidatoform: any;
   public user: User;
   public valueName: string;
   public token: string;
   public changeFormatFecha: boolean = false;
   public username : string;
   public filtro : string;

public candidatoList: Candidato [];
public candidato: Candidato;
public candidatoAux: Candidato;

public busquedaCandidato='';
filterInputCandidato = new FormControl();
datePipe = new DatePipe('en-US');

public candidatoFlag : boolean = false;


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
  	 this.filterInputCandidato.valueChanges.subscribe(busquedaCandidato => {
  	  	this.busquedaCandidato = busquedaCandidato;
  	  });
}

ngOnInit() {
	this.candidatoService.clear();
	this.user = JSON.parse(localStorage.getItem('currentUser'));
	this.filtro = this.user.authorityname;
	this.username = this.user.username;
	this.candidato = new Candidato;

	if (this.filtro == 'USER'){
		this.candidatoFlag = true;
	}else{
		this.candidatoFlag = false;
	}
} 

save(){

	if (this.candidatoFlag){
		this.candidato.estatuscandidatoId = "e1";
	}

	if (
	this.candidato.nombre ==="" || this.candidato.nombre ===null || 
	this.candidato.apellidopaterno ==="" || this.candidato.apellidopaterno ===null || 
	this.candidato.apellidomaterno ==="" || this.candidato.apellidomaterno ===null || 
	this.candidato.fechaAux ===null || 
	this.candidato.generoId ==="" || this.candidato.generoId ===null || 
		this.candidato.candidatoId === null 
	){
		return;
	}else{
	   if (this.changeFormatFecha){
	   	this.candidato.fecha = this.parse((this.candidato.fechaAux)+"");
	   }else{
	   	this.candidato.fecha = this.parseFormat.format(this.candidato.fechaAux);
	   }

	   this.candidato.username = this.username;

	   this.candidatoService.saveCandidato(this.candidato).subscribe(res => {
	     if (res.status == 201 || res.status == 200){
	        swal('Success...', 'Candidato save successfully.', 'success');
	        this.router.navigate([ '../managecandidato' ], { relativeTo: this.route })
	     }else if (res.status == 403){
	        swal('Error...', 'Usuario no tiene permiso para guardar candidato.', 'error');
	     }else{
	       swal('Error...', 'candidato save unsuccessfully.', 'error');
	     }
	   } );
	}
}

changeFecha(value){
	this.changeFormatFecha = value;
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

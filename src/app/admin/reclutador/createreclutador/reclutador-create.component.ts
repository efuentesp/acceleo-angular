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
    templateUrl: './reclutador-create.component.html',
	styleUrls: ['./reclutador-create.component.css']
})

export class ReclutadorCreateComponent implements OnInit {

   public title = 'Nuevo Reclutador';
   public reclutadorform: any;
   public user: User;
   public valueName: string;
   public token: string;

public reclutadorList: Reclutador [];
public reclutador: Reclutador;
public reclutadorAux: Reclutador;

public busquedaReclutador='';
filterInputReclutador = new FormControl();
datePipe = new DatePipe('en-US');


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
  	 this.filterInputReclutador.valueChanges.subscribe(busquedaReclutador => {
  	  	this.busquedaReclutador = busquedaReclutador;
  	  });
}

ngOnInit() {
	this.reclutadorService.clear();
	      this.reclutador = new Reclutador;
} 

save(){
	if (
	this.reclutador.nombre ==="" || this.reclutador.nombre ===null || 
	this.reclutador.apellidopaterno ==="" || this.reclutador.apellidopaterno ===null || 
	this.reclutador.apellidomaterno ==="" || this.reclutador.apellidomaterno ===null || 
	this.reclutador.generoId ==="" || this.reclutador.generoId ===null || 
		this.reclutador.reclutadorId === null 
	){
		return;
	}else{
	   this.reclutadorService.saveReclutador(this.reclutador).subscribe(res => {
	     if (res.status == 201 || res.status == 200){
	        swal('Success...', 'Reclutador save successfully.', 'success');
	        this.router.navigate([ '../managereclutador' ], { relativeTo: this.route })
	     }else if (res.status == 403){
	        swal('Error...', 'Usuario no tiene permiso para guardar reclutador.', 'error');
	     }else{
	       swal('Error...', 'reclutador save unsuccessfully.', 'error');
	     }
	   } );
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

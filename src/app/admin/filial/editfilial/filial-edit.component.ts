import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
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
    templateUrl: './filial-edit.component.html',
	styleUrls: ['./filial-edit.component.css']
})

export class FilialEditComponent implements OnInit {

	public title = 'Editar Filial';
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

	public flag: boolean;
    public flagDelete: boolean;
    datePipe = new DatePipe('en-US');

	public filialList: Filial [];
	public filial: Filial;
    public filialAux: Filial;

	public busquedaFilial='';
	filterInputFilial = new FormControl();


    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private parseFormat: CustomNgbDateParserFormatter,
				private parserFormatter: NgbDateParserFormatter
				,private candidatoService: CandidatoService
				,private direccionService: DireccionService
				,private documentoService: DocumentoService
				,private solicitudService: SolicitudService
				,private eventoService: EventoService
				,private filialService: FilialService
				,private posicionService: PosicionService
				,private puestoService: PuestoService
				,private reclutadorService: ReclutadorService
				,private rolService: RolService
				,private trayectoriaService: TrayectoriaService
				,private usuarioService: UsuarioService
				,private permisoService: PermisoService
){
	this.filterInputFilial.valueChanges.subscribe(busquedaFilial => {
     	this.busquedaFilial = busquedaFilial;
     });
     
}

    ngOnInit() {
        
        this.flag = this.filialService.getEdit();
        this.filial = this.filialService.getFilial();
        this.flagDelete = this.filialService.getDelete();
    }  

save(){
	if (
	this.filial.nombre ==="" || this.filial.nombre ===null || 
	this.filial.ubicacion ==="" || this.filial.ubicacion ===null || 
	this.filial.ciudad ==="" || this.filial.ciudad ===null || 
	this.filial.estado ==="" || this.filial.estado ===null || 
	this.filial.telefono ==="" || this.filial.telefono ===null || 
	this.filial.sitio ==="" || this.filial.sitio ===null || 
	this.filial.contacto ==="" || this.filial.contacto ===null || 
		this.filial.filialId === null 
	){
		return;
	}else{
	   this.filialService.saveFilial(this.filial).subscribe(res => {
	     if (res.status == 201 || res.status == 200){
	        swal('Success...', 'Filial save successfully.', 'success');
	        this.router.navigate([ '../managefilial' ], { relativeTo: this.route })
	     }else if (res.status == 403){
	        swal('Error...', 'Usuario no tiene permiso para guardar Filial.', 'error');
	     }else{
	       swal('Error...', 'Filial save unsuccessfully.', 'error');
	     }
	   } );
	}	
}

delete(){
  swal({
    title: "Are you sure?",
    text: "You will not be able to recover this filial!",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!"
  }).then((isConfirm) => {
    if (isConfirm.value) {
      this.filialService.deleteFilial(this.filial).subscribe(res => {
        if (res.status == 201 || res.status == 200){
          swal('Success...', 'Filial item has been deleted successfully.', 'success');
          this.router.navigate([ '../managefilial' ], { relativeTo: this.route })
        }else if (res.status == 403){
          swal('Error...', 'Usuario no tiene permiso para guardar Filial.', 'error');
        }else{
          swal('Error...', 'Filial deleted unsuccessfully.', 'error');
        }
      },error =>{
        if (error.status == 500){
          swal('Warning...', 'Filial no se puede eliminar debido a que esta asociado con otra entidad.', 'warning');
        }
      }
	);
    } else {
      //swal("Cancelled", "Filial deleted unsuccessfully", "error");
    }
  });
}

return(filial){
  this.location.back();
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


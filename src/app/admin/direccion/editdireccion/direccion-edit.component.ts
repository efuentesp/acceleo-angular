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
    templateUrl: './direccion-edit.component.html',
	styleUrls: ['./direccion-edit.component.css']
})

export class DireccionEditComponent implements OnInit {

	public title = 'Editar Direccion';
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

	public flag: boolean;
    public flagDelete: boolean;
    datePipe = new DatePipe('en-US');

	public direccionList: Direccion [];
	public direccion: Direccion;
    public direccionAux: Direccion;

	public busquedaDireccion='';
	filterInputDireccion = new FormControl();

public candidatoList: Candidato [];
	    public candidato: Candidato;
	    public candidatoAux: Candidato;
	    
	    public busquedaCandidato='';
	    filterInputCandidato = new FormControl();

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
	this.filterInputDireccion.valueChanges.subscribe(busquedaDireccion => {
     	this.busquedaDireccion = busquedaDireccion;
     });
     
	this.filterInputCandidato.valueChanges.subscribe(busquedaCandidato => {
		     this.busquedaCandidato = busquedaCandidato;
		   });
}

    ngOnInit() {
        
        this.flag = this.direccionService.getEdit();
        this.direccion = this.direccionService.getDireccion();
        this.flagDelete = this.direccionService.getDelete();
        	this.loadCandidato();
    }  

save(){
	if (
	this.direccion.candidatoId === null ||
	this.direccion.calle ==="" || this.direccion.calle ===null || 
	this.direccion.cp ==="" || this.direccion.cp ===null || 
	this.direccion.ciudad ==="" || this.direccion.ciudad ===null || 
	this.direccion.estado ==="" || this.direccion.estado ===null || 
		this.direccion.direccionId === null 
	){
		return;
	}else{
	   this.direccionService.saveDireccion(this.direccion).subscribe(res => {
	     if (res.status == 201 || res.status == 200){
	        swal('Success...', 'Direccion save successfully.', 'success');
	        this.router.navigate([ '../managedireccion' ], { relativeTo: this.route })
	     }else if (res.status == 403){
	        swal('Error...', 'Usuario no tiene permiso para guardar Direccion.', 'error');
	     }else{
	       swal('Error...', 'Direccion save unsuccessfully.', 'error');
	     }
	   } );
	}	
}

delete(){
  swal({
    title: "Are you sure?",
    text: "You will not be able to recover this direccion!",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!"
  }).then((isConfirm) => {
    if (isConfirm.value) {
      this.direccionService.deleteDireccion(this.direccion).subscribe(res => {
        if (res.status == 201 || res.status == 200){
          swal('Success...', 'Direccion item has been deleted successfully.', 'success');
          this.router.navigate([ '../managedireccion' ], { relativeTo: this.route })
        }else if (res.status == 403){
          swal('Error...', 'Usuario no tiene permiso para guardar Direccion.', 'error');
        }else{
          swal('Error...', 'Direccion deleted unsuccessfully.', 'error');
        }
      },error =>{
        if (error.status == 500){
          swal('Warning...', 'Direccion no se puede eliminar debido a que esta asociado con otra entidad.', 'warning');
        }
      }
	);
    } else {
      //swal("Cancelled", "Direccion deleted unsuccessfully", "error");
    }
  });
}

return(direccion){
  this.location.back();
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
 		this.candidatoList.forEach(element => {
 			          this.solicitudService.getSolicitudById(element.solicitudId).subscribe(data => {
 			              if (data){
 			              	element.solicitudItem = data.correo;
 			              }
 			         });
 			     });
 		this.candidatoList.forEach(element => {
 			          this.eventoService.getEventoById(element.eventoId).subscribe(data => {
 			              if (data){
 			              	element.eventoItem = data.nombre;
 			              }
 			         });
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
this.direccion.candidatoId = candidato.candidatoId;
this.direccion.candidatoItem = candidato.nombre;
 	  }else{
 	      this.candidatoService.clear();
this.direccion.candidatoId = "";
this.direccion.candidatoItem = "";
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


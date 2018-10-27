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
    templateUrl: './trayectoria-edit.component.html',
	styleUrls: ['./trayectoria-edit.component.css']
})

export class TrayectoriaEditComponent implements OnInit {

	public title = 'Editar Trayectoria';
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

	public flag: boolean;
    public flagDelete: boolean;
    datePipe = new DatePipe('en-US');

	public trayectoriaList: Trayectoria [];
	public trayectoria: Trayectoria;
    public trayectoriaAux: Trayectoria;

	public busquedaTrayectoria='';
	filterInputTrayectoria = new FormControl();

public candidatoList: Candidato [];
	    public candidato: Candidato;
	    public candidatoAux: Candidato;
	    
	    public busquedaCandidato='';
	    filterInputCandidato = new FormControl();
public documentoList: Documento [];
	    public documento: Documento;
	    public documentoAux: Documento;
	    
	    public busquedaDocumento='';
	    filterInputDocumento = new FormControl();

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
	this.filterInputTrayectoria.valueChanges.subscribe(busquedaTrayectoria => {
     	this.busquedaTrayectoria = busquedaTrayectoria;
     });
     
	this.filterInputCandidato.valueChanges.subscribe(busquedaCandidato => {
		     this.busquedaCandidato = busquedaCandidato;
		   });
		
	this.filterInputDocumento.valueChanges.subscribe(busquedaDocumento => {
		     this.busquedaDocumento = busquedaDocumento;
		   });
}

    ngOnInit() {
        
        this.flag = this.trayectoriaService.getEdit();
        this.trayectoria = this.trayectoriaService.getTrayectoria();
    		this.trayectoria.candidatoItem = this.trayectoria.candidato.nombre;
    		this.trayectoria.candidatoId = this.trayectoria.candidato.candidatoId;
    		this.trayectoria.documentoItem = this.trayectoria.documento.nombre;
    		this.trayectoria.documentoId = this.trayectoria.documento.documentoId;
        this.flagDelete = this.trayectoriaService.getDelete();
			
	this.user = JSON.parse(localStorage.getItem('currentUser'));

		if (this.user.authorityname != 'USER'){
			this.loadCandidato();
			this.loadDocumento();
		}else{
			this.loadDataCandidato(this.user.username);
			this.loadDocumento();
		}	
	}  

	loadDataCandidato(username){
		this.candidatoService.getAllCandidatoByUserNameList(username).subscribe(data => {
			if (data) { 
				this.candidatoList= data;
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
		});
	}		

save(){
	if (
	this.trayectoria.candidatoId === null ||
	this.trayectoria.tipotrayectoriaId ==="" || this.trayectoria.tipotrayectoriaId ===null || 
	this.trayectoria.descripcion ==="" || this.trayectoria.descripcion ===null || 
	this.trayectoria.clave ==="" || this.trayectoria.clave ===null || 
		this.trayectoria.trayectoriaId === null 
	){
		return;
	}else{
	   this.trayectoriaService.saveTrayectoria(this.trayectoria).subscribe(res => {
	     if (res.status == 201 || res.status == 200){
	        swal('Success...', 'Trayectoria save successfully.', 'success');
	        this.router.navigate([ '../managetrayectoria' ], { relativeTo: this.route })
	     }else if (res.status == 403){
	        swal('Error...', 'Usuario no tiene permiso para guardar Trayectoria.', 'error');
	     }else{
	       swal('Error...', 'Trayectoria save unsuccessfully.', 'error');
	     }
	   } );
	}	
}

delete(){
  swal({
    title: "Are you sure?",
    text: "You will not be able to recover this trayectoria!",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!"
  }).then((isConfirm) => {
    if (isConfirm.value) {
      this.trayectoriaService.deleteTrayectoria(this.trayectoria).subscribe(res => {
        if (res.status == 201 || res.status == 200){
          swal('Success...', 'Trayectoria item has been deleted successfully.', 'success');
          this.router.navigate([ '../managetrayectoria' ], { relativeTo: this.route })
        }else if (res.status == 403){
          swal('Error...', 'Usuario no tiene permiso para guardar Trayectoria.', 'error');
        }else{
          swal('Error...', 'Trayectoria deleted unsuccessfully.', 'error');
        }
      },error =>{
        if (error.status == 500){
          swal('Warning...', 'Trayectoria no se puede eliminar debido a que esta asociado con otra entidad.', 'warning');
        }
      }
	);
    } else {
      //swal("Cancelled", "Trayectoria deleted unsuccessfully", "error");
    }
  });
}

return(trayectoria){
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
 		
 		}
	}, error => {
		swal('Error...', 'An error occurred while calling the Candidatos.', 'error');
	});
 }

 setClickedRowCandidato(index,candidato){
 	  candidato.checked = !candidato.checked;
 	  if (candidato.checked){
		   this.candidatoService.setCandidato(candidato);
		   this.trayectoria.candidato = candidato;
this.trayectoria.candidatoId = candidato.candidatoId;
this.trayectoria.candidatoItem = candidato.nombre;
 	  }else{
		   this.candidatoService.clear();
		   this.trayectoria.candidato = null;
this.trayectoria.candidatoId = "";
this.trayectoria.candidatoItem = "";
	 	   }
 }
loadDocumento(){
	this.documentoService.getAllDocumento().subscribe(data => {
   		if (data) {
 		this.documentoList = data;
 		}
	}, error => {
		swal('Error...', 'An error occurred while calling the Documentos.', 'error');
	});
 }

 setClickedRowDocumento(index,documento){
 	  documento.checked = !documento.checked;
 	  if (documento.checked){
	 	  this.documentoService.setDocumento(documento);
this.trayectoria.documentoId = documento.documentoId;
this.trayectoria.documentoItem = documento.nombre;
 	  }else{
 	      this.documentoService.clear();
this.trayectoria.documentoId = "";
this.trayectoria.documentoItem = "";
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


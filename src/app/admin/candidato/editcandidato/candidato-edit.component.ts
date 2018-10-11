import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { CandidatoService }                                  from '../../candidato/candidato.component.service';
import { Candidato }                                         from '../../candidato/candidato.component.model';

import { SolicitudService }                                  from '../../solicitud/solicitud.component.service';
import { Solicitud }                                         from '../../solicitud/solicitud.component.model';
import { EventoService }                                  from '../../evento/evento.component.service';
import { Evento }                                         from '../../evento/evento.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './candidato-edit.component.html',
	styleUrls: ['./candidato-edit.component.css']
})

export class CandidatoEditComponent implements OnInit {

	public title = 'Editar Candidato';
    public candidato: Candidato;
 	public candidatoList: Candidato;
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

	public flag: boolean;
    public flagDelete: boolean;

	public solicitudList: Solicitud;
    public solicitud: Solicitud;

	public busquedaSolicitud='';
	filterInputSolicitud = new FormControl();
	public eventoList: Evento;
    public evento: Evento;

	public busquedaEvento='';
	filterInputEvento = new FormControl();

    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private parserFormatter: NgbDateParserFormatter,
				private candidatoService: CandidatoService
	,private solicitudService: SolicitudService
	,private eventoService: EventoService
){

 	 this.filterInputSolicitud.valueChanges.subscribe(busquedaSolicitud => {
     this.busquedaSolicitud = busquedaSolicitud;
   });
 	 this.filterInputEvento.valueChanges.subscribe(busquedaEvento => {
     this.busquedaEvento = busquedaEvento;
   });

	}	

    ngOnInit() {
        
        this.flag = this.candidatoService.getEdit();
        this.candidato = this.candidatoService.getCandidato();
        this.flagDelete = this.candidatoService.getDelete();
        
		this.loadSolicituds();
		this.loadItemSolicitud(this.candidato);
		this.loadEventos();
		this.loadItemEvento(this.candidato);

    }  

save(){
	
	this.candidato.fecha = this.parserFormatter.format(this.candidato.fechaAux);

   this.candidatoService.saveCandidato(this.candidato).subscribe(res => {
     if (res.status == 201 || res.status == 200){
        swal('Success...', 'Candidato save successfully.', 'success');
        this.router.navigate([ '../managecandidato' ], { relativeTo: this.route })
     }else if (res.status == 403){
        swal('Error...', 'Usuario no tiene permiso para guardar Candidato.', 'error');
     }else{
       swal('Error...', 'Candidato save unsuccessfully.', 'error');
     }
   } );
}

delete(){
  swal({
    title: "Are you sure?",
    text: "You will not be able to recover this candidato!",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!"
  }).then((isConfirm) => {
    if (isConfirm.value) {
      this.candidatoService.deleteCandidato(this.candidato).subscribe(res => {
        if (res.status == 201 || res.status == 200){
          swal('Success...', 'Candidato item has been deleted successfully.', 'success');
          this.router.navigate([ '../managecandidato' ], { relativeTo: this.route })
        }else if (res.status == 403){
          swal('Error...', 'Usuario no tiene permiso para guardar Candidato.', 'error');
        }else{
          swal('Error...', 'Candidato deleted unsuccessfully.', 'error');
        }
      },error =>{
        if (error.status == 500){
          swal('Warning...', 'Candidato no se puede eliminar debido a que esta asociado con otra entidad.', 'warning');
        }
      }
	);
    } else {
      //swal("Cancelled", "Candidato deleted unsuccessfully", "error");
    }
  });
}

	loadSolicituds(){
  		this.solicitudService.getAllSolicitud().subscribe(data => {
    	if (data) {
      	this.solicitudList = data;
    	}
  		}, error => {
    	swal('Error...', 'An error occurred while calling the Solicituds.', 'error');
  	});
}

 setClickedRowSolicitud(index,solicitud){
	      
		  solicitud.checked = !solicitud.checked;

		  if (solicitud.checked){
		  this.solicitudService.setSolicitud(solicitud);
		  this.candidato.solicitudId = solicitud.solicitudId;
		  this.candidato.solicitudItem = solicitud.
						correo+ "";
						nombre+ "";
	    	}else{
            this.solicitudService.clear();
			this.candidato.solicitudId = null;
		    this.candidato.solicitudItem = "";
		}
}

loadItemSolicitud(candidato){
  this.solicitudService.getSolicitudById(candidato.solicitudId).subscribe(data => {
    if (data) {
      this.solicitud = data;
      this.candidato.solicitudItem = this.solicitud.
						correo+ "";
						nombre+ "";
    }
    }, error => {
    swal('Error...', 'An error occurred while calling the solicituds.', 'error');
  });

}

	loadEventos(){
  		this.eventoService.getAllEvento().subscribe(data => {
    	if (data) {
      	this.eventoList = data;
    	}
  		}, error => {
    	swal('Error...', 'An error occurred while calling the Eventos.', 'error');
  	});
}

 setClickedRowEvento(index,evento){
	      
		  evento.checked = !evento.checked;

		  if (evento.checked){
		  this.eventoService.setEvento(evento);
		  this.candidato.eventoId = evento.eventoId;
		  this.candidato.eventoItem = evento.
						correo+ "";
						nombre+ "";
	    	}else{
            this.eventoService.clear();
			this.candidato.eventoId = null;
		    this.candidato.eventoItem = "";
		}
}

loadItemEvento(candidato){
  this.eventoService.getEventoById(candidato.eventoId).subscribe(data => {
    if (data) {
      this.evento = data;
      this.candidato.eventoItem = this.evento.
						correo+ "";
						nombre+ "";
    }
    }, error => {
    swal('Error...', 'An error occurred while calling the eventos.', 'error');
  });

}



return(candidato){
  this.location.back();
}
 
}

import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { PosicionService }                                  from '../../posicion/posicion.component.service';
import { Posicion }                                         from '../../posicion/posicion.component.model';

import { FilialService }                                  from '../../filial/filial.component.service';
import { Filial }                                         from '../../filial/filial.component.model';
import { PuestoService }                                  from '../../puesto/puesto.component.service';
import { Puesto }                                         from '../../puesto/puesto.component.model';
import { ReclutadorService }                                  from '../../reclutador/reclutador.component.service';
import { Reclutador }                                         from '../../reclutador/reclutador.component.model';
import { SolicitudService }                                  from '../../solicitud/solicitud.component.service';
import { Solicitud }                                         from '../../solicitud/solicitud.component.model';
import { EventoService }                                  from '../../evento/evento.component.service';
import { Evento }                                         from '../../evento/evento.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './posicion-edit.component.html',
	styleUrls: ['./posicion-edit.component.css']
})

export class PosicionEditComponent implements OnInit {

	public title = 'Editar Posicion';
    public posicion: Posicion;
 	public posicionList: Posicion;
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

	public flag: boolean;
    public flagDelete: boolean;

	public filialList: Filial;
    public filial: Filial;

	public busquedaFilial='';
	filterInputFilial = new FormControl();
	public puestoList: Puesto;
    public puesto: Puesto;

	public busquedaPuesto='';
	filterInputPuesto = new FormControl();
	public reclutadorList: Reclutador;
    public reclutador: Reclutador;

	public busquedaReclutador='';
	filterInputReclutador = new FormControl();
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
				private posicionService: PosicionService
	,private filialService: FilialService
	,private puestoService: PuestoService
	,private reclutadorService: ReclutadorService
	,private solicitudService: SolicitudService
	,private eventoService: EventoService
){

 	 this.filterInputFilial.valueChanges.subscribe(busquedaFilial => {
     this.busquedaFilial = busquedaFilial;
   });
 	 this.filterInputPuesto.valueChanges.subscribe(busquedaPuesto => {
     this.busquedaPuesto = busquedaPuesto;
   });
 	 this.filterInputReclutador.valueChanges.subscribe(busquedaReclutador => {
     this.busquedaReclutador = busquedaReclutador;
   });
 	 this.filterInputSolicitud.valueChanges.subscribe(busquedaSolicitud => {
     this.busquedaSolicitud = busquedaSolicitud;
   });
 	 this.filterInputEvento.valueChanges.subscribe(busquedaEvento => {
     this.busquedaEvento = busquedaEvento;
   });

	}	

    ngOnInit() {
        
        this.flag = this.posicionService.getEdit();
        this.posicion = this.posicionService.getPosicion();
        this.flagDelete = this.posicionService.getDelete();
        
		this.loadFilials();
		this.loadItemFilial(this.posicion);
		this.loadPuestos();
		this.loadItemPuesto(this.posicion);
		this.loadReclutadors();
		this.loadItemReclutador(this.posicion);
		this.loadSolicituds();
		this.loadItemSolicitud(this.posicion);
		this.loadEventos();
		this.loadItemEvento(this.posicion);

    }  

save(){
	
	this.posicion.fecha = this.parserFormatter.format(this.posicion.fechaAux);

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

	loadFilials(){
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
		  this.posicion.filialItem = filial.
						nombre+ "";
						nombre+ "";
						nombre+ "";
						correo+ "";
						nombre+ "";
	    	}else{
            this.filialService.clear();
			this.posicion.filialId = null;
		    this.posicion.filialItem = "";
		}
}

loadItemFilial(posicion){
  this.filialService.getFilialById(posicion.filialId).subscribe(data => {
    if (data) {
      this.filial = data;
      this.posicion.filialItem = this.filial.
						nombre+ "";
						nombre+ "";
						nombre+ "";
						correo+ "";
						nombre+ "";
    }
    }, error => {
    swal('Error...', 'An error occurred while calling the filials.', 'error');
  });

}

	loadPuestos(){
  		this.puestoService.getAllPuesto().subscribe(data => {
    	if (data) {
      	this.puestoList = data;
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
		  this.posicion.puestoItem = puesto.
						nombre+ "";
						nombre+ "";
						nombre+ "";
						correo+ "";
						nombre+ "";
	    	}else{
            this.puestoService.clear();
			this.posicion.puestoId = null;
		    this.posicion.puestoItem = "";
		}
}

loadItemPuesto(posicion){
  this.puestoService.getPuestoById(posicion.puestoId).subscribe(data => {
    if (data) {
      this.puesto = data;
      this.posicion.puestoItem = this.puesto.
						nombre+ "";
						nombre+ "";
						nombre+ "";
						correo+ "";
						nombre+ "";
    }
    }, error => {
    swal('Error...', 'An error occurred while calling the puestos.', 'error');
  });

}

	loadReclutadors(){
  		this.reclutadorService.getAllReclutador().subscribe(data => {
    	if (data) {
      	this.reclutadorList = data;
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
		  this.posicion.reclutadorItem = reclutador.
						nombre+ "";
						nombre+ "";
						nombre+ "";
						correo+ "";
						nombre+ "";
	    	}else{
            this.reclutadorService.clear();
			this.posicion.reclutadorId = null;
		    this.posicion.reclutadorItem = "";
		}
}

loadItemReclutador(posicion){
  this.reclutadorService.getReclutadorById(posicion.reclutadorId).subscribe(data => {
    if (data) {
      this.reclutador = data;
      this.posicion.reclutadorItem = this.reclutador.
						nombre+ "";
						nombre+ "";
						nombre+ "";
						correo+ "";
						nombre+ "";
    }
    }, error => {
    swal('Error...', 'An error occurred while calling the reclutadors.', 'error');
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
		  this.posicion.solicitudId = solicitud.solicitudId;
		  this.posicion.solicitudItem = solicitud.
						nombre+ "";
						nombre+ "";
						nombre+ "";
						correo+ "";
						nombre+ "";
	    	}else{
            this.solicitudService.clear();
			this.posicion.solicitudId = null;
		    this.posicion.solicitudItem = "";
		}
}

loadItemSolicitud(posicion){
  this.solicitudService.getSolicitudById(posicion.solicitudId).subscribe(data => {
    if (data) {
      this.solicitud = data;
      this.posicion.solicitudItem = this.solicitud.
						nombre+ "";
						nombre+ "";
						nombre+ "";
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
		  this.posicion.eventoId = evento.eventoId;
		  this.posicion.eventoItem = evento.
						nombre+ "";
						nombre+ "";
						nombre+ "";
						correo+ "";
						nombre+ "";
	    	}else{
            this.eventoService.clear();
			this.posicion.eventoId = null;
		    this.posicion.eventoItem = "";
		}
}

loadItemEvento(posicion){
  this.eventoService.getEventoById(posicion.eventoId).subscribe(data => {
    if (data) {
      this.evento = data;
      this.posicion.eventoItem = this.evento.
						nombre+ "";
						nombre+ "";
						nombre+ "";
						correo+ "";
						nombre+ "";
    }
    }, error => {
    swal('Error...', 'An error occurred while calling the eventos.', 'error');
  });

}



return(posicion){
  this.location.back();
}
 
}

import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

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
    public evento: Evento;
 	public eventoList: Evento;
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

	public flag: boolean;
    public flagDelete: boolean;

	public posicionList: Posicion;
    public posicion: Posicion;

	public busquedaPosicion='';
	filterInputPosicion = new FormControl();
	public candidatoList: Candidato;
    public candidato: Candidato;

	public busquedaCandidato='';
	filterInputCandidato = new FormControl();

    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private parserFormatter: NgbDateParserFormatter,
				private eventoService: EventoService
	,private posicionService: PosicionService
	,private candidatoService: CandidatoService
){

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
        this.flagDelete = this.eventoService.getDelete();
        
		this.loadPosicions();
		this.loadItemPosicion(this.evento);
		this.loadCandidatos();
		this.loadItemCandidato(this.evento);

    }  

save(){
	
	this.evento.fecha = this.parserFormatter.format(this.evento.fechaAux);

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

	loadPosicions(){
  		this.posicionService.getAllPosicion().subscribe(data => {
    	if (data) {
      	this.posicionList = data;
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
		  this.evento.posicionItem = posicion.
						nombre+ "";
						nombre+ "";
	    	}else{
            this.posicionService.clear();
			this.evento.posicionId = null;
		    this.evento.posicionItem = "";
		}
}

loadItemPosicion(evento){
  this.posicionService.getPosicionById(evento.posicionId).subscribe(data => {
    if (data) {
      this.posicion = data;
      this.evento.posicionItem = this.posicion.
						nombre+ "";
						nombre+ "";
    }
    }, error => {
    swal('Error...', 'An error occurred while calling the posicions.', 'error');
  });

}

	loadCandidatos(){
  		this.candidatoService.getAllCandidato().subscribe(data => {
    	if (data) {
      	this.candidatoList = data;
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
		  this.evento.candidatoItem = candidato.
						nombre+ "";
						nombre+ "";
	    	}else{
            this.candidatoService.clear();
			this.evento.candidatoId = null;
		    this.evento.candidatoItem = "";
		}
}

loadItemCandidato(evento){
  this.candidatoService.getCandidatoById(evento.candidatoId).subscribe(data => {
    if (data) {
      this.candidato = data;
      this.evento.candidatoItem = this.candidato.
						nombre+ "";
						nombre+ "";
    }
    }, error => {
    swal('Error...', 'An error occurred while calling the candidatos.', 'error');
  });

}



return(evento){
  this.location.back();
}
 
}

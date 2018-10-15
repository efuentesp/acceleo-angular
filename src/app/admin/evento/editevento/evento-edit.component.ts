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
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

	public flag: boolean;
    public flagDelete: boolean;

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
    }  

save(){
	

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

return(evento){
  this.location.back();
}
 
}


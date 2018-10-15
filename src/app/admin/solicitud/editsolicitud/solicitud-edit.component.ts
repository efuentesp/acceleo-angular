import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { SolicitudService }                                  from '../../solicitud/solicitud.component.service';
import { Solicitud }                                         from '../../solicitud/solicitud.component.model';

import { PosicionService }                                  from '../../posicion/posicion.component.service';
import { Posicion }                                         from '../../posicion/posicion.component.model';
import { CandidatoService }                                  from '../../candidato/candidato.component.service';
import { Candidato }                                         from '../../candidato/candidato.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './solicitud-edit.component.html',
	styleUrls: ['./solicitud-edit.component.css']
})

export class SolicitudEditComponent implements OnInit {

	public title = 'Editar Solicitud';
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

	public flag: boolean;
    public flagDelete: boolean;

	public solicitudList: Solicitud [];
	public solicitud: Solicitud;
    public solicitudAux: Solicitud;

	public busquedaSolicitud='';
	filterInputSolicitud = new FormControl();

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
				private solicitudService: SolicitudService
				,private posicionService: PosicionService
				,private candidatoService: CandidatoService
					
){
	this.filterInputSolicitud.valueChanges.subscribe(busquedaSolicitud => {
     	this.busquedaSolicitud = busquedaSolicitud;
     });
     
	this.filterInputPosicion.valueChanges.subscribe(busquedaPosicion => {
		     this.busquedaPosicion = busquedaPosicion;
		   });
	this.filterInputCandidato.valueChanges.subscribe(busquedaCandidato => {
		     this.busquedaCandidato = busquedaCandidato;
		   });
		
}

    ngOnInit() {
        
        this.flag = this.solicitudService.getEdit();
        this.solicitud = this.solicitudService.getSolicitud();
        this.flagDelete = this.solicitudService.getDelete();
    }  

save(){
	

   this.solicitudService.saveSolicitud(this.solicitud).subscribe(res => {
     if (res.status == 201 || res.status == 200){
        swal('Success...', 'Solicitud save successfully.', 'success');
        this.router.navigate([ '../managesolicitud' ], { relativeTo: this.route })
     }else if (res.status == 403){
        swal('Error...', 'Usuario no tiene permiso para guardar Solicitud.', 'error');
     }else{
       swal('Error...', 'Solicitud save unsuccessfully.', 'error');
     }
   } );
}

delete(){
  swal({
    title: "Are you sure?",
    text: "You will not be able to recover this solicitud!",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!"
  }).then((isConfirm) => {
    if (isConfirm.value) {
      this.solicitudService.deleteSolicitud(this.solicitud).subscribe(res => {
        if (res.status == 201 || res.status == 200){
          swal('Success...', 'Solicitud item has been deleted successfully.', 'success');
          this.router.navigate([ '../managesolicitud' ], { relativeTo: this.route })
        }else if (res.status == 403){
          swal('Error...', 'Usuario no tiene permiso para guardar Solicitud.', 'error');
        }else{
          swal('Error...', 'Solicitud deleted unsuccessfully.', 'error');
        }
      },error =>{
        if (error.status == 500){
          swal('Warning...', 'Solicitud no se puede eliminar debido a que esta asociado con otra entidad.', 'warning');
        }
      }
	);
    } else {
      //swal("Cancelled", "Solicitud deleted unsuccessfully", "error");
    }
  });
}

return(solicitud){
  this.location.back();
}
 
}


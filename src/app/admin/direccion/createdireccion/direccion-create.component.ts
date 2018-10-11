import { Component, OnInit, ViewChild}                                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl }                 from '@angular/forms';
import swal from 'sweetalert2';

import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { DireccionService }                                  from '../../direccion/direccion.component.service';
import { Direccion }                                         from '../../direccion/direccion.component.model';

import { CandidatoService }                                  from '../../candidato/candidato.component.service';
import { Candidato }                                         from '../../candidato/candidato.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './direccion-create.component.html',
	styleUrls: ['./direccion-create.component.css']
})

export class DireccionCreateComponent implements OnInit {

    public title = 'Nuevo Direccion';
    public direccion: Direccion;
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;
	public datePipe = new DatePipe('en-US');

	public candidatoList: Candidato [];
    public candidato: Candidato;
    public candidatoAux: Candidato;

	public busquedaCandidato='';
	filterInputCandidato = new FormControl();


    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private parserFormatter: NgbDateParserFormatter,
				private direccionService: DireccionService
	,private candidatoService: CandidatoService
){
  	 this.filterInputCandidato.valueChanges.subscribe(busquedaCandidato => {
     this.busquedaCandidato = busquedaCandidato;
   });
	}

    ngOnInit() {
		this.direccionService.clear();
        this.direccion = new Direccion;

		this.loadCandidatos();
       
    } 

save(){


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


	loadCandidatos(){
  		this.candidatoService.getAllCandidato().subscribe(data => {
    	if (data) {
      	
		this.candidatoList = data;
// Cambios por cada modal
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
		  this.direccion.candidatoItem = candidato.
						nombre+ "";
	    	}else{
            this.candidatoService.clear();
			this.direccion.candidatoId = null;
		    this.direccion.candidatoItem = "";
		}
 }

  return(direccion){
      this.location.back();
  }
}

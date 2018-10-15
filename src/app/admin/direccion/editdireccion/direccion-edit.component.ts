import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { DireccionService }                                  from '../../direccion/direccion.component.service';
import { Direccion }                                         from '../../direccion/direccion.component.model';

import { CandidatoService }                                  from '../../candidato/candidato.component.service';
import { Candidato }                                         from '../../candidato/candidato.component.model';

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
				private parserFormatter: NgbDateParserFormatter,
				private direccionService: DireccionService
				,private candidatoService: CandidatoService
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
 
}


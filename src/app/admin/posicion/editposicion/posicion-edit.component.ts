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

@Component ({
    selector: 'app-view',
    templateUrl: './posicion-edit.component.html',
	styleUrls: ['./posicion-edit.component.css']
})

export class PosicionEditComponent implements OnInit {

	public title = 'Editar Posicion';
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

	public flag: boolean;
    public flagDelete: boolean;

	public posicionList: Posicion [];
	public posicion: Posicion;
    public posicionAux: Posicion;

	public busquedaPosicion='';
	filterInputPosicion = new FormControl();

public filialList: Filial [];
	    public filial: Filial;
	    public filialAux: Filial;
	    
	    public busquedaFilial='';
	    filterInputFilial = new FormControl();
public puestoList: Puesto [];
	    public puesto: Puesto;
	    public puestoAux: Puesto;
	    
	    public busquedaPuesto='';
	    filterInputPuesto = new FormControl();
public reclutadorList: Reclutador [];
	    public reclutador: Reclutador;
	    public reclutadorAux: Reclutador;
	    
	    public busquedaReclutador='';
	    filterInputReclutador = new FormControl();

    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private parserFormatter: NgbDateParserFormatter,
				private posicionService: PosicionService
				,private filialService: FilialService
				,private puestoService: PuestoService
					
				,private reclutadorService: ReclutadorService
					
){
	this.filterInputPosicion.valueChanges.subscribe(busquedaPosicion => {
     	this.busquedaPosicion = busquedaPosicion;
     });
     
	this.filterInputFilial.valueChanges.subscribe(busquedaFilial => {
		     this.busquedaFilial = busquedaFilial;
		   });
	this.filterInputPuesto.valueChanges.subscribe(busquedaPuesto => {
		     this.busquedaPuesto = busquedaPuesto;
		   });
		
	this.filterInputReclutador.valueChanges.subscribe(busquedaReclutador => {
		     this.busquedaReclutador = busquedaReclutador;
		   });
		
}

    ngOnInit() {
        
        this.flag = this.posicionService.getEdit();
        this.posicion = this.posicionService.getPosicion();
        this.flagDelete = this.posicionService.getDelete();
    }  

save(){
	

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

return(posicion){
  this.location.back();
}
 
}


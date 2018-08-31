import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { OrdensimplificadaService }                                  from '../../ordensimplificada/ordensimplificada.component.service';
import { Ordensimplificada }                                         from '../../ordensimplificada/ordensimplificada.component.model';

import { OperadorproduccionService }                                  from '../../operadorproduccion/operadorproduccion.component.service';
import { Operadorproduccion }                                         from '../../operadorproduccion/operadorproduccion.component.model';
import { ClienteService }                                  from '../../cliente/cliente.component.service';
import { Cliente }                                         from '../../cliente/cliente.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './ordensimplificada-edit.component.html',
	styleUrls: ['./ordensimplificada-edit.component.css']
})

export class OrdensimplificadaEditComponent implements OnInit {

	public title = 'Editar Ordensimplificada';
    public ordensimplificada: Ordensimplificada;
 	public ordensimplificadaList: Ordensimplificada;
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

	public flag: boolean;
    public flagDelete: boolean;

	public operadorproduccionList: Operadorproduccion;
    public operadorproduccion: Operadorproduccion;

	public busquedaOperadorproduccion='';
	filterInputOperadorproduccion = new FormControl();

	public clienteList: Cliente;
    public cliente: Cliente;

	public busquedaCliente='';
	filterInputCliente = new FormControl();

    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private parserFormatter: NgbDateParserFormatter,
				private ordensimplificadaService: OrdensimplificadaService
	,private operadorproduccionService: OperadorproduccionService
	,private clienteService: ClienteService
){

 	 this.filterInputOperadorproduccion.valueChanges.subscribe(busquedaOperadorproduccion => {
     this.busquedaOperadorproduccion = busquedaOperadorproduccion;
   });
 	 this.filterInputOperadorproduccion.valueChanges.subscribe(busquedaOperadorproduccion => {
     this.busquedaOperadorproduccion = busquedaOperadorproduccion;
   });
 	 this.filterInputCliente.valueChanges.subscribe(busquedaCliente => {
     this.busquedaCliente = busquedaCliente;
   });

	}	

    ngOnInit() {
        
        this.flag = this.ordensimplificadaService.getEdit();
        this.ordensimplificada = this.ordensimplificadaService.getOrdensimplificada();
        this.flagDelete = this.ordensimplificadaService.getDelete();
        
		this.loadOperadorproduccions();
		this.loadItemOperadorproduccion(this.ordensimplificada);
		this.loadOperadorproduccions();
		this.loadItemOperadorproduccion(this.ordensimplificada);
		this.loadClientes();
		this.loadItemCliente(this.ordensimplificada);

    }  

save(){
	
	this.ordensimplificada.fechainicial = this.parserFormatter.format(this.ordensimplificada.fechainicialAux);
	this.ordensimplificada.fechafinal = this.parserFormatter.format(this.ordensimplificada.fechafinalAux);

   this.ordensimplificadaService.saveOrdensimplificada(this.ordensimplificada).subscribe(res => {
     if (res.status == 201 || res.status == 200){
        swal('Success...', 'Ordensimplificada save successfully.', 'success');
        this.router.navigate([ '../manageordensimplificada' ], { relativeTo: this.route })
     }else if (res.status == 403){
        swal('Error...', 'Usuario no tiene permiso para guardar Ordensimplificada.', 'error');
     }else{
       swal('Error...', 'Ordensimplificada save unsuccessfully.', 'error');
     }
   } );
}

delete(){
  swal({
    title: "Are you sure?",
    text: "You will not be able to recover this ordensimplificada!",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!"
  }).then((isConfirm) => {
    if (isConfirm.value) {
      this.ordensimplificadaService.deleteOrdensimplificada(this.ordensimplificada).subscribe(res => {
        if (res.status == 201 || res.status == 200){
          swal('Success...', 'Ordensimplificada item has been deleted successfully.', 'success');
          this.router.navigate([ '../manageordensimplificada' ], { relativeTo: this.route })
        }else if (res.status == 403){
          swal('Error...', 'Usuario no tiene permiso para guardar Ordensimplificada.', 'error');
        }else{
          swal('Error...', 'Ordensimplificada deleted unsuccessfully.', 'error');
        }
      },error =>{
        if (error.status == 500){
          swal('Warning...', 'Ordensimplificada no se puede eliminar debido a que esta asociado con otra entidad.', 'warning');
        }
      }
	);
    } else {
      //swal("Cancelled", "Ordensimplificada deleted unsuccessfully", "error");
    }
  });
}


	loadOperadorproduccions(){
  		this.operadorproduccionService.getAllOperadorproduccion().subscribe(data => {
    	if (data) {
      	this.operadorproduccionList = data;
    	}
  		}, error => {
    	swal('Error...', 'An error occurred while calling the Operadorproduccions.', 'error');
  	});
}

 setClickedRowOperadorproduccion(index,operadorproduccion){
	      
		  operadorproduccion.checked = !operadorproduccion.checked;

		  if (operadorproduccion.checked){
		  this.operadorproduccionService.setOperadorproduccion(operadorproduccion);
		  this.ordensimplificada.operadorproduccionId = operadorproduccion.operadorproduccionId;
		  this.ordensimplificada.operadorproduccionItem = operadorproduccion.numeroempleado+"";
	    	}else{
            this.operadorproduccionService.clear();
			this.ordensimplificada.operadorproduccionId = null;
		    this.ordensimplificada.operadorproduccionItem = "";
		}
}

loadItemOperadorproduccion(ordensimplificada){
  this.operadorproduccionService.getOperadorproduccionById(ordensimplificada.operadorproduccionId).subscribe(data => {
    if (data) {
      this.operadorproduccion = data;
      this.ordensimplificada.operadorproduccionItem = this.operadorproduccion.numeroempleado+"";
    }
    }, error => {
    swal('Error...', 'An error occurred while calling the operadorproduccions.', 'error');
  });

}

	loadClientes(){
  		this.clienteService.getAllCliente().subscribe(data => {
    	if (data) {
      	this.clienteList = data;
    	}
  		}, error => {
    	swal('Error...', 'An error occurred while calling the Clientes.', 'error');
  	});
}

 setClickedRowCliente(index,cliente){
	      
		  cliente.checked = !cliente.checked;

		  if (cliente.checked){
		  this.clienteService.setCliente(cliente);
		  this.ordensimplificada.clienteId = cliente.clienteId;
		  this.ordensimplificada.clienteItem = cliente.nombre;
	    	}else{
            this.clienteService.clear();
			this.ordensimplificada.clienteId = null;
		    this.ordensimplificada.clienteItem = "";
		}
}

loadItemCliente(ordensimplificada){
  this.clienteService.getClienteById(ordensimplificada.clienteId).subscribe(data => {
    if (data) {
      this.cliente = data;
      this.ordensimplificada.clienteItem = this.cliente.nombre;
    }
    }, error => {
    swal('Error...', 'An error occurred while calling the clientes.', 'error');
  });

}



return(ordensimplificada){
  this.location.back();
}
 
}

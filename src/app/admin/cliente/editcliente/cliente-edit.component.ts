import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { ClienteService }                                  from '../../cliente/cliente.component.service';
import { Cliente }                                         from '../../cliente/cliente.component.model';

import { EtiquetaasignadaService }                                  from '../../etiquetaasignada/etiquetaasignada.component.service';
import { Etiquetaasignada }                                         from '../../etiquetaasignada/etiquetaasignada.component.model';
import { OrdensimplificadaService }                                  from '../../ordensimplificada/ordensimplificada.component.service';
import { Ordensimplificada }                                         from '../../ordensimplificada/ordensimplificada.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './cliente-edit.component.html',
	styleUrls: ['./cliente-edit.component.css']
})

export class ClienteEditComponent implements OnInit {

	public title = 'Editar Cliente';
    public cliente: Cliente;
 	public clienteList: Cliente;
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

	public flag: boolean;
    public flagDelete: boolean;

	public busquedaCliente='';
	filterInputCliente = new FormControl();
	public etiquetaasignadaList: Etiquetaasignada;
    public etiquetaasignada: Etiquetaasignada;

	public busquedaEtiquetaasignada='';
	filterInputEtiquetaasignada = new FormControl();
	public ordensimplificadaList: Ordensimplificada;
    public ordensimplificada: Ordensimplificada;

	public busquedaOrdensimplificada='';
	filterInputOrdensimplificada = new FormControl();

    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private parserFormatter: NgbDateParserFormatter,
				private clienteService: ClienteService
	,private etiquetaasignadaService: EtiquetaasignadaService
	,private ordensimplificadaService: OrdensimplificadaService
){

 	 this.filterInputCliente.valueChanges.subscribe(busquedaCliente => {
     this.busquedaCliente = busquedaCliente;
   });
 	 this.filterInputEtiquetaasignada.valueChanges.subscribe(busquedaEtiquetaasignada => {
     this.busquedaEtiquetaasignada = busquedaEtiquetaasignada;
   });
 	 this.filterInputOrdensimplificada.valueChanges.subscribe(busquedaOrdensimplificada => {
     this.busquedaOrdensimplificada = busquedaOrdensimplificada;
   });

	}	

    ngOnInit() {
        
        this.flag = this.clienteService.getEdit();
        this.cliente = this.clienteService.getCliente();
        this.flagDelete = this.clienteService.getDelete();
        
		this.loadClientes();
		this.loadItemCliente(this.cliente);
		this.loadEtiquetaasignadas();
		this.loadItemEtiquetaasignada(this.cliente);
		this.loadOrdensimplificadas();
		this.loadItemOrdensimplificada(this.cliente);

    }  

save(){
	

   this.clienteService.saveCliente(this.cliente).subscribe(res => {
     if (res.status == 201 || res.status == 200){
        swal('Success...', 'Cliente save successfully.', 'success');
        this.router.navigate([ '../managecliente' ], { relativeTo: this.route })
     }else if (res.status == 403){
        swal('Error...', 'Usuario no tiene permiso para guardar Cliente.', 'error');
     }else{
       swal('Error...', 'Cliente save unsuccessfully.', 'error');
     }
   } );
}

delete(){
  swal({
    title: "Are you sure?",
    text: "You will not be able to recover this cliente!",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!"
  }).then((isConfirm) => {
    if (isConfirm.value) {
      this.clienteService.deleteCliente(this.cliente).subscribe(res => {
        if (res.status == 201 || res.status == 200){
          swal('Success...', 'Cliente item has been deleted successfully.', 'success');
          this.router.navigate([ '../managecliente' ], { relativeTo: this.route })
        }else if (res.status == 403){
          swal('Error...', 'Usuario no tiene permiso para guardar Cliente.', 'error');
        }else{
          swal('Error...', 'Cliente deleted unsuccessfully.', 'error');
        }
      },error =>{
        if (error.status == 500){
          swal('Warning...', 'Cliente no se puede eliminar debido a que esta asociado con otra entidad.', 'warning');
        }
      }
	);
    } else {
      //swal("Cancelled", "Cliente deleted unsuccessfully", "error");
    }
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
		  this.cliente.clienteId = cliente.clienteId;
		  this.cliente.clienteItem = cliente.nombre;
	    	}else{
            this.clienteService.clear();
			this.cliente.clienteId = null;
		    this.cliente.clienteItem = "";
		}
}

loadItemCliente(cliente){
  this.clienteService.getClienteById(cliente.clienteId).subscribe(data => {
    if (data) {
      this.cliente = data;
      this.cliente.clienteItem = this.cliente.nombre;
    }
    }, error => {
    swal('Error...', 'An error occurred while calling the clientes.', 'error');
  });

}

	loadEtiquetaasignadas(){
  		this.etiquetaasignadaService.getAllEtiquetaasignada().subscribe(data => {
    	if (data) {
      	this.etiquetaasignadaList = data;
    	}
  		}, error => {
    	swal('Error...', 'An error occurred while calling the Etiquetaasignadas.', 'error');
  	});
}

 setClickedRowEtiquetaasignada(index,etiquetaasignada){
	      
		  etiquetaasignada.checked = !etiquetaasignada.checked;

		  if (etiquetaasignada.checked){
		  this.etiquetaasignadaService.setEtiquetaasignada(etiquetaasignada);
		  this.cliente.etiquetaasignadaId = etiquetaasignada.etiquetaasignadaId;
		  this.cliente.etiquetaasignadaItem = etiquetaasignada.sap+"";
	    	}else{
            this.etiquetaasignadaService.clear();
			this.cliente.etiquetaasignadaId = null;
		    this.cliente.etiquetaasignadaItem = "";
		}
}

loadItemEtiquetaasignada(cliente){
  this.etiquetaasignadaService.getEtiquetaasignadaById(cliente.etiquetaasignadaId).subscribe(data => {
    if (data) {
      this.etiquetaasignada = data;
      this.cliente.etiquetaasignadaItem = this.etiquetaasignada.sap+"";
    }
    }, error => {
    swal('Error...', 'An error occurred while calling the etiquetaasignadas.', 'error');
  });

}

	loadOrdensimplificadas(){
  		this.ordensimplificadaService.getAllOrdensimplificada().subscribe(data => {
    	if (data) {
      	this.ordensimplificadaList = data;
    	}
  		}, error => {
    	swal('Error...', 'An error occurred while calling the Ordensimplificadas.', 'error');
  	});
}

 setClickedRowOrdensimplificada(index,ordensimplificada){
	      
		  ordensimplificada.checked = !ordensimplificada.checked;

		  if (ordensimplificada.checked){
		  this.ordensimplificadaService.setOrdensimplificada(ordensimplificada);
		  this.cliente.ordensimplificadaId = ordensimplificada.ordensimplificadaId;
		  this.cliente.ordensimplificadaItem = ordensimplificada.ordentrabajo+"";
	    	}else{
            this.ordensimplificadaService.clear();
			this.cliente.ordensimplificadaId = null;
		    this.cliente.ordensimplificadaItem = "";
		}
}

loadItemOrdensimplificada(cliente){
  this.ordensimplificadaService.getOrdensimplificadaById(cliente.ordensimplificadaId).subscribe(data => {
    if (data) {
      this.ordensimplificada = data;
      this.cliente.ordensimplificadaItem = this.ordensimplificada.ordentrabajo+"";
    }
    }, error => {
    swal('Error...', 'An error occurred while calling the ordensimplificadas.', 'error');
  });

}



return(cliente){
  this.location.back();
}
 
}

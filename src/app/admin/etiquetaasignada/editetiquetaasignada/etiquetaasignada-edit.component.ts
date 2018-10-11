import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { EtiquetaasignadaService }                                  from '../../etiquetaasignada/etiquetaasignada.component.service';
import { Etiquetaasignada }                                         from '../../etiquetaasignada/etiquetaasignada.component.model';

import { ClienteService }                                  from '../../cliente/cliente.component.service';
import { Cliente }                                         from '../../cliente/cliente.component.model';
import { OrdensimplificadaService }                                  from '../../ordensimplificada/ordensimplificada.component.service';
import { Ordensimplificada }                                         from '../../ordensimplificada/ordensimplificada.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './etiquetaasignada-edit.component.html',
	styleUrls: ['./etiquetaasignada-edit.component.css']
})

export class EtiquetaasignadaEditComponent implements OnInit {

	public title = 'Editar Etiquetaasignada';
    public etiquetaasignada: Etiquetaasignada;
 	public etiquetaasignadaList: Etiquetaasignada;
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

	public flag: boolean;
    public flagDelete: boolean;

	public clienteList: Cliente;
    public cliente: Cliente;

	public busquedaCliente='';
	filterInputCliente = new FormControl();
	public ordensimplificadaList: Ordensimplificada;
    public ordensimplificada: Ordensimplificada;

	public busquedaOrdensimplificada='';
	filterInputOrdensimplificada = new FormControl();

    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private parserFormatter: NgbDateParserFormatter,
				private etiquetaasignadaService: EtiquetaasignadaService
	,private clienteService: ClienteService
	,private ordensimplificadaService: OrdensimplificadaService
){

 	 this.filterInputCliente.valueChanges.subscribe(busquedaCliente => {
     this.busquedaCliente = busquedaCliente;
   });
 	 this.filterInputOrdensimplificada.valueChanges.subscribe(busquedaOrdensimplificada => {
     this.busquedaOrdensimplificada = busquedaOrdensimplificada;
   });

	}	

    ngOnInit() {
        
        this.flag = this.etiquetaasignadaService.getEdit();
        this.etiquetaasignada = this.etiquetaasignadaService.getEtiquetaasignada();
        this.flagDelete = this.etiquetaasignadaService.getDelete();
        
		this.loadClientes();
		this.loadItemCliente(this.etiquetaasignada);
		this.loadOrdensimplificadas();
		this.loadItemOrdensimplificada(this.etiquetaasignada);

    }  

save(){
	

   this.etiquetaasignadaService.saveEtiquetaasignada(this.etiquetaasignada).subscribe(res => {
     if (res.status == 201 || res.status == 200){
        swal('Success...', 'Etiquetaasignada save successfully.', 'success');
        this.router.navigate([ '../manageetiquetaasignada' ], { relativeTo: this.route })
     }else if (res.status == 403){
        swal('Error...', 'Usuario no tiene permiso para guardar Etiquetaasignada.', 'error');
     }else{
       swal('Error...', 'Etiquetaasignada save unsuccessfully.', 'error');
     }
   } );
}

delete(){
  swal({
    title: "Are you sure?",
    text: "You will not be able to recover this etiquetaasignada!",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!"
  }).then((isConfirm) => {
    if (isConfirm.value) {
      this.etiquetaasignadaService.deleteEtiquetaasignada(this.etiquetaasignada).subscribe(res => {
        if (res.status == 201 || res.status == 200){
          swal('Success...', 'Etiquetaasignada item has been deleted successfully.', 'success');
          this.router.navigate([ '../manageetiquetaasignada' ], { relativeTo: this.route })
        }else if (res.status == 403){
          swal('Error...', 'Usuario no tiene permiso para guardar Etiquetaasignada.', 'error');
        }else{
          swal('Error...', 'Etiquetaasignada deleted unsuccessfully.', 'error');
        }
      },error =>{
        if (error.status == 500){
          swal('Warning...', 'Etiquetaasignada no se puede eliminar debido a que esta asociado con otra entidad.', 'warning');
        }
      }
	);
    } else {
      //swal("Cancelled", "Etiquetaasignada deleted unsuccessfully", "error");
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
		  this.etiquetaasignada.cliente1Id = cliente.clienteId;
		  this.etiquetaasignada.cliente1Item = cliente.nombre;
	    	}else{
            this.clienteService.clear();
			this.etiquetaasignada.cliente1Id = null;
		    this.etiquetaasignada.cliente1Item = "";
		}
}

loadItemCliente(etiquetaasignada){
  this.clienteService.getClienteById(etiquetaasignada.clienteId).subscribe(data => {
    if (data) {
      this.cliente = data;
      this.etiquetaasignada.cliente1Item = this.cliente.nombre;
    }
    }, error => {
    swal('Error...', 'An error occurred while calling the clientes.', 'error');
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
	      
		//   ordensimplificada.checked = !ordensimplificada.checked;

		//   if (ordensimplificada.checked){
		//   this.ordensimplificadaService.setOrdensimplificada(ordensimplificada);
		//   this.etiquetaasignada.ordensimplificadaId = ordensimplificada.ordensimplificadaId;
		//   this.etiquetaasignada.ordensimplificadaItem = ordensimplificada.ordentrabajo+"";
	  //   	}else{
    //         this.ordensimplificadaService.clear();
		// 	this.etiquetaasignada.ordensimplificadaId = null;
		//     this.etiquetaasignada.ordensimplificadaItem = "";
		// }
}

loadItemOrdensimplificada(etiquetaasignada){
  // this.ordensimplificadaService.getOrdensimplificadaById(etiquetaasignada.ordensimplificadaId).subscribe(data => {
  //   if (data) {
  //     this.ordensimplificada = data;
  //     this.etiquetaasignada.ordensimplificadaItem = this.ordensimplificada.ordentrabajo+"";
  //   }
  //   }, error => {
  //   swal('Error...', 'An error occurred while calling the ordensimplificadas.', 'error');
  // });

}



return(etiquetaasignada){
  this.location.back();
}
 
}

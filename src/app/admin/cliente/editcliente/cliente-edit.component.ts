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
    public clienteList: Cliente [];
     
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

    public cliente1: Cliente;
    public cliente1List: Cliente [];

	public flag: boolean;
  public flagDelete: boolean;

	public busquedaCliente1='';
	filterInputCliente1 = new FormControl();

    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private parserFormatter: NgbDateParserFormatter,
				private clienteService: ClienteService
){

 	 this.filterInputCliente1.valueChanges.subscribe(busquedaCliente => {
     this.busquedaCliente1 = busquedaCliente;
   });
	}	

    ngOnInit() {
        
        this.flag = this.clienteService.getEdit();
        this.cliente = this.clienteService.getCliente();
        this.flagDelete = this.clienteService.getDelete();
        
	    	this.loadCliente1();

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

loadCliente1(){
  this.clienteService.getAllCliente().subscribe(data => {
  if (data) {
  this.cliente1List = data;
  this.cliente1List.forEach(element => {
    if (element.cliente1Id!= null){
      this.clienteService.getClienteById(element.cliente1Id).subscribe(res =>{
        element.cliente1Id   = res.clienteId;
        element.cliente1Item = res.nombre;
      })
    }
  });
  }
  }, error => {
  swal('Error...', 'An error occurred while calling the Clientes.', 'error');
});
}

setClickedRowCliente1(index,cliente1){
  cliente1.checked = !cliente1.checked;
  if (cliente1.checked){
  this.cliente.cliente1Id = cliente1.clienteId;
  this.cliente.cliente1Item = cliente1.nombre;
  }else{
  this.clienteService.clear();
  this.cliente.cliente1Id = null;
  this.cliente.cliente1Item = "";
  }
}

// loadItemCliente(cliente){
//   this.clienteService.getClienteById(cliente.clienteId).subscribe(data => {
//     if (data) {
//       this.cliente = data;
//       this.cliente.clienteItem = this.cliente.nombre;
//     }
//     }, error => {
//     swal('Error...', 'An error occurred while calling the clientes.', 'error');
//   });

// }

return(cliente){
  this.location.back();
}
 
}

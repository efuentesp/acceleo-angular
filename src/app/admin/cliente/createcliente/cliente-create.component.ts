import { Component, OnInit, ViewChild}                                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl }                 from '@angular/forms';
import swal from 'sweetalert2';

import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { ClienteService }                                  from '../../cliente/cliente.component.service';
import { Cliente }                                         from '../../cliente/cliente.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './cliente-create.component.html',
	styleUrls: ['./cliente-create.component.css']
})

export class ClienteCreateComponent implements OnInit {

    public title = 'Nuevo Cliente';
	public cliente: Cliente;
	
    public clienteForm: any;
    public user: User;
    public valueName: string;
    public token: string;

	public cliente1List: Cliente [];
	public cliente1Aux: Cliente;

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
		this.clienteService.clear();
        this.cliente = new Cliente;
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

  return(cliente){
      this.location.back();
  }
}

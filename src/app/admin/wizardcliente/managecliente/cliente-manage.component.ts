import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { User } from '../../user/user.component.model';

import { ClienteFakeService }                                  from '../cliente.component.servicefake';
import { ClienteService }                                  from '../cliente.component.service';
import { Cliente }                                         from '../cliente.component.model';


import { GeneroService }                                  from '../genero/genero.component.service';
import { Genero }                                         from '../genero/genero.component.model';
import { SearchClientePipe }                              from "../pipe/cliente.filter.pipe";

import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component ({
    selector: 'app-view',
    templateUrl: './cliente-manage.component.html',
    styleUrls: ['./cliente-manage.component.css']
})

export class ClienteManageComponent implements OnInit {

  
  public form: any;
  public user: User;
  public valueName: string;
  public token: string;

  public title = 'Nuevo Cliente';
  public clienteList: Cliente [];
  public cliente: Cliente;

  public busquedaCliente='';
  public filterInputCliente = new FormControl();

	public generoList: Genero;
  public genero: Genero;
  
  public userAdmin: User = JSON.parse(localStorage.getItem('currentUser'));

  // Buttons 
  private searchActive: boolean = false;
  private updateActive: boolean = false;
  private createActive: boolean = false;
  private deleteActive: boolean = false;

    constructor(
			private route: ActivatedRoute, 
			private location: Location,
      private router: Router, private clienteService: ClienteService,
      private generoService: GeneroService, private clienteFakeService: ClienteFakeService) {

      this.filterInputCliente.valueChanges.subscribe(busquedaCliente => {
          this.busquedaCliente = busquedaCliente;
          });
      }

    ngOnInit() {

        // Get data user
        this.user = JSON.parse(localStorage.getItem('currentUser'));
        this.valueName = this.user.username;
        this.token = this.user.token;

        this.cliente = this.clienteService.getCliente();
        this.loadClientes();
        this.habilita();
    }

    loadClientes() {
      this.clienteFakeService.getAllCliente().subscribe(data => {
        console.log('Clientes');
        console.log(data)
        if (data) {
          this.clienteList = data;
        }
      }, error => {
        swal('Error...', 'An error occurred while calling the clientes.', 'error');
      });

      /*
      this.clienteService.getAllCliente().subscribe(data => {
        console.log(data)
        if (data) {
          this.clienteList = data;
        }
      }, error => {
        swal('Error...', 'An error occurred while calling the clientes.', 'error');
      });
      */
    }

    add(){
      this.router.navigate(['/createcliente']);
    }

    habilita(){
     // Botones
    }

}

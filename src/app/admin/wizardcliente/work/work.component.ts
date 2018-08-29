import { Component, OnInit, Input }   from '@angular/core';
import { Router }              from '@angular/router';

import { ClienteService }     from '../cliente.component.service';
import { Personal, Cliente, Address, Work }            from '../cliente.component.model';
import swal from 'sweetalert2';

@Component ({
    selector:     'mt-wizard-work'
    ,templateUrl: './work.component.html'
})

export class WorkComponent implements OnInit {

    title = 'What do you do?';
    workType: string;
    personal: Personal;
    @Input() cliente: Cliente;
    address  : Address;
    work: Work;
    form: any;

    constructor(private router: Router, private clienteService: ClienteService) {
    }

    ngOnInit() {

      this.work     = this.clienteService.getWork();
      this.workType = this.work.work;

    }

    save(form: any): boolean {
        
        /*
        if (!form.valid) {
            return false;
        }*/


        this.address  = this.clienteService.getAddress();
        this.personal = this.clienteService.getPersonal();
        this.cliente = this.clienteService.getCliente();

        this.cliente.id        = this.personal.id;
        this.cliente.step      = this.personal.step = 3;
        this.cliente.firstName = this.personal.firstName;
        this.cliente.lastName  = this.personal.lastName;
        this.cliente.email     = this.personal.email;

        this.cliente.street    = this.address.street;
        this.cliente.city      = this.address.city;
        this.cliente.state     = this.address.state;
        this.cliente.zip       = this.address.zip;

        this.cliente.work      = this.work.work;

        this.clienteService.setPersonal(this.personal);
        this.clienteService.setAddress(this.address);
        this.clienteService.setWork(this.work);

        this.saveForm(this.cliente);

        return true;

    }

    goToPrevious(form: any) {
            this.router.navigate(['/admin/createcliente']);
    }

    goToNext(form: any) {
        if (this.save(form)) {
            this.router.navigate(['/admin/address']);
        }
    }

    saveForm(data){
        console.log('Next Street');
        /*
        this.clienteService.saveCliente(data).subscribe(res => {
          
           this.clienteService.setPersonal(res);
           this.clienteService.setAddress(res);
           this.clienteService.setWork(res);
         }, error => {
           swal('Error...', 'Article save unsuccessfully.', 'error');
         });
         */
   }

}

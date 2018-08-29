import { Component, OnInit, Input }             from '@angular/core';
import { Router }                               from '@angular/router';
import { Address, Personal, Cliente, Work }    from '../cliente.component.model';

import { ClienteService }     from '../cliente.component.service';
import swal from 'sweetalert2';

@Component ({
    selector:     'mt-wizard-address'
    ,templateUrl: './address.component.html',
	styleUrls: ['./address.component.css']
})

export class AddressComponent implements OnInit {

    title = 'Where do you live?';
    address: Address;
    work: Work;
    personal: Personal;
    workType: string;
    @Input() cliente: Cliente;
    form: any;

    constructor(private router: Router, private clienteService: ClienteService) {
    }

    ngOnInit() {
        this.address  = this.clienteService.getAddress();
    }

    save(form: any): boolean {
        if (!form.valid) {
            return false;
        }

        
        this.cliente = this.clienteService.getCliente();
        this.personal = this.clienteService.getPersonal();
        this.work     = this.clienteService.getWork();

        this.cliente.id        = this.personal.id;
        this.cliente.step      = this.personal.step = 4;
        this.cliente.firstName = this.personal.firstName;
        this.cliente.lastName  = this.personal.lastName;
        this.cliente.email     = this.personal.email;

        this.cliente.street    = this.address.street;
        this.cliente.city      = this.address.city;
        this.cliente.state     = this.address.state;
        this.cliente.zip       = this.address.zip;

        this.cliente.work      = this.work.work;

        this.clienteService.setPersonal(this.personal);
        this.clienteService.setWork(this.work);
        this.clienteService.setAddress(this.address);

        this.saveForm(this.cliente);

        return true;
        
    }

    goToPrevious(form: any) {
        console.log('Next');
          this.router.navigate(['/admin/work']);
    }

    goToNext(form: any) {
        console.log('Next');
        if (this.save(form)) {
            this.router.navigate(['/admin/result']);
        }
    }

    saveForm(data){
        console.log('Next Result');
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

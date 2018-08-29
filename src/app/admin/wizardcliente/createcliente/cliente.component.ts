import { Component, OnInit, Input }    from '@angular/core';
import { Router }                      from '@angular/router';
import { Personal, Cliente, Address, Work } from '../cliente.component.model';
import { ClienteService }                   from '../cliente.component.service';
import { ClienteFakeService }               from '../cliente.component.servicefake';
import swal                                 from 'sweetalert2';

@Component ({
    selector:     'mt-wizard-personal'
    ,templateUrl: './cliente.component.html',
	styleUrls: ['./cliente.component.css']
})

export class ClienteComponent implements OnInit {

    title = 'Please tell us about yourself.';
    @Input() cliente: Cliente;
    address: Address;
    work: Work;
    workType: string;
    form: any;

    constructor(private router: Router, private clienteFakeService: ClienteFakeService, private clienteService: ClienteService) {
    }

    ngOnInit() {
        this.cliente = this.clienteService.getCliente();
    }

    save(form: any): boolean {
        if (!form.valid) {
            return false;
        }

        this.cliente  = this.clienteFakeService.getCliente();
        this.address  = this.clienteFakeService.getAddress();
        this.work     = this.clienteFakeService.getWork();

        this.cliente.id        = this.cliente.id;
        this.cliente.step      = this.cliente.step = 2;
        this.cliente.firstName = this.cliente.firstName;
        this.cliente.lastName  = this.cliente.lastName;
        this.cliente.email     = this.cliente.email;

        this.cliente.street    = this.address.street;
        this.cliente.city      = this.address.city;
        this.cliente.state     = this.address.state;
        this.cliente.zip       = this.address.zip;

        this.cliente.work      = this.work.work;

        this.clienteFakeService.setPersonal(this.cliente);
        this.clienteFakeService.setAddress(this.address);
        this.clienteFakeService.setWork(this.work);
        this.saveForm(this.cliente);

        return true;
    }

    goToNext(form: any) {
        if (this.save(form)) {
            this.router.navigate(['/admin/work']);
        }
    }

    saveForm(data){
        /*
         this.clienteFakeService.saveCliente(data).subscribe(res => {
            this.clienteFakeService.setPersonal(res);
            this.clienteFakeService.setAddress(res);
            this.clienteFakeService.setWork(res);

          }, error => {
            swal('Error...', 'Article save unsuccessfully.', 'error');
          });*/
    }
}

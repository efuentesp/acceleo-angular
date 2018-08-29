import { Component, OnInit, Input }    from '@angular/core';
import { Router }                      from '@angular/router';
import { Personal, Cliente, Address, Work } from '../cliente.component.model';
import { ClienteService }              from '../cliente.component.service';
import swal                            from 'sweetalert2';

@Component ({
    selector:     'mt-wizard-personal'
    ,templateUrl: './personal.component.html'
})

export class PersonalComponent implements OnInit {

    title = 'Please tell us about yourself.';
    personal: Personal;
    @Input() cliente: Cliente;
    address: Address;
    work: Work;
    workType: string;
    form: any;

    constructor(private router: Router, private clienteService: ClienteService) {
    }

    ngOnInit() {
        this.personal = this.clienteService.getPersonal();
    }

    save(form: any): boolean {
        if (!form.valid) {
            return false;
        }

        this.cliente = this.clienteService.getCliente();
        this.address  = this.clienteService.getAddress();
        this.work     = this.clienteService.getWork();

        this.cliente.id        = this.personal.id;
        this.cliente.step      = this.personal.step = 2;
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

    goToNext(form: any) {
        //if (this.save(form)) {
            this.router.navigate(['/admin/work']);
        //}
    }

    saveForm(data){
        console.log('Next Work');
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

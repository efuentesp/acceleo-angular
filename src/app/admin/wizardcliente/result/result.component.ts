import { Component, OnInit, Input }   from '@angular/core';
import { Cliente,Address, Personal, Work }  from '../cliente.component.model';
import { ClienteService }            from '../cliente.component.service';
import { Router }                               from '@angular/router';
import swal from 'sweetalert2';

@Component ({
    selector:     'mt-wizard-result'
    ,templateUrl: './result.component.html'
})

export class ResultComponent implements OnInit {

    title = 'Thanks for staying tuned!';
    @Input() cliente: Cliente;
    isFormValid: boolean = false;
    address: Address;
    workType: string;
    personal: Personal;
    work : Work;

    constructor(private router: Router, private clienteService: ClienteService) {
    }

    ngOnInit() {
        this.cliente = this.clienteService.getCliente();
    }

    save(form: any): boolean {
        if (!form.valid) {
            return false;
        }

        this.personal = this.clienteService.getPersonal();
        this.address  = this.clienteService.getAddress();
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

    saveForm(data){

/*
        this.clienteService.savecliente(data).subscribe(res => {
           swal('Success...', 'Article save successfully.', 'success');
         }, error => {
           swal('Error...', 'Article save unsuccessfully.', 'error');
         });
         */
   }

   goToPrevious(form: any) {
        this.router.navigate(['/admin/address']);
   }

   goToNext(form: any) {
       //if (this.save(form)) {
           this.clienteService.resetCliente();
           this.router.navigate(['/admin/createcliente']);
       //}
   }
}

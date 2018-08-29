import { Injectable }                        from '@angular/core';
import { Cliente, Personal, Address, Work }       from './cliente.component.model';
import { WorkflowService }                   from './workflow/workflow.service';
import { STEPS }                             from './workflow/workflow.model';

import { environment } from "../../../environments/environment";
import { Http, Response } from "@angular/http";
import { Headers, RequestOptions } from '@angular/http';

import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ClienteService {

    private cliente: Cliente = new Cliente();
    private isPersonalFormValid: boolean = false;
    private isWorkFormValid: boolean = false;
    private isAddressFormValid: boolean = false;

    env: any = environment;

    constructor(private workflowService: WorkflowService, private http: Http) {
    }

    getPersonal(): Personal {
        var personal: Personal = {
            id: this.cliente.id,
            firstName: this.cliente.firstName,
            lastName: this.cliente.lastName,
            email: this.cliente.email,
            step: this.cliente.step
        };
        return personal;
    }

    setPersonal(data: Personal) {

        this.isPersonalFormValid = true;

        this.cliente.id = data.id;
        this.cliente.firstName = data.firstName;
        this.cliente.lastName = data.lastName;
        this.cliente.email = data.email;
        this.cliente.step = data.step;
        this.workflowService.validateStep(STEPS.personal);
    }

    getAddress() : Address {
        // Return the Address data
        var address: Address = {
            street: this.cliente.street,
            city: this.cliente.city,
            state: this.cliente.state,
            zip: this.cliente.zip
        };
        return address;
    }

    setAddress(data: Address) {
        // Update the Address data only when the Address Form had been validated successfully
        this.isAddressFormValid = true;
        this.cliente.street = data.street;
        this.cliente.city = data.city;
        this.cliente.state = data.state;
        this.cliente.zip = data.zip;
        // Validate Address Step in Workflow
        this.workflowService.validateStep(STEPS.address);
    }

    getCliente(): Cliente {
        // Return the entire Form Data
        return this.cliente;
    }

    resetCliente(): Cliente {
        // Reset the workflow
        this.workflowService.resetSteps();
        // Return the form data after all this.* members had been reset
        this.cliente.clear();
        this.isPersonalFormValid = this.isWorkFormValid = this.isAddressFormValid = false;
        return this.cliente;
    }

    isFormValid() {
        // Return true if all forms had been validated successfully; otherwise, return false
        return this.isPersonalFormValid &&
                this.isWorkFormValid &&
                this.isAddressFormValid;
    }

    saveCliente(data){
      return this.http.post(this.env.api + "/addCliente", data).pipe(map(res => res.json()));
    }

    getAllData(){
      return this.http.get(this.env.api + "/cliente").pipe(map(res => res.json()));
    }

    getWork() : Work {
      var work: Work = {
          work: this.cliente.work
      };

      return work;

    }

    setWork(data: Work) {

      this.isWorkFormValid = true;
      this.cliente.work = data.work;

      this.workflowService.validateStep(STEPS.work);
    }

}

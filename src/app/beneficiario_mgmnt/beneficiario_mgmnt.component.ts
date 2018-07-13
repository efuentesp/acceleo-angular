import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { BeneficiarioService }                                  from '../beneficiario/beneficiario.component.service';
import { Beneficiario }                                         from '../beneficiario/beneficiario.component.model';

import { SearchBeneficiarioPipe }                               from "../pipe/beneficiario.filter.pipe";
@Component ({
    selector: 'app-view',
    templateUrl: './beneficiario_mgmnt.component.html'
})

export class BeneficiarioMngComponent implements OnInit {

    title = 'Nuevo Beneficiario';
    beneficiarioList: Beneficiario;
    beneficiario: Beneficiario;
    form: any;

  	public busquedaBeneficiario='';
	filterInputBeneficiario = new FormControl();

    constructor(private router: Router, private beneficiarioService: BeneficiarioService) {
	   	   this.filterInputBeneficiario.valueChanges.subscribe(busquedaBeneficiario => {
	         this.busquedaBeneficiario = busquedaBeneficiario;
	       });
	}

    ngOnInit() {

        this.loadBeneficiarios();

    }

    loadBeneficiarios() {
      this.beneficiarioService.getAllBeneficiario().subscribe(data => {
        if (data) {
          this.beneficiarioList = data;
        }
      }, error => {
        swal('Error...', 'An error occurred while calling the beneficiarios.', 'error');
      });
    }
    save(beneficiario){
      this.beneficiarioService.saveBeneficiario(this.beneficiario).subscribe(res => {
        if (res.status == 201){
          swal('Success...', 'Beneficiario save successfully.', 'success');
        }else{
          swal('Error...', 'Beneficiario save unsuccessfully.', 'error');
        }

      } );
    }
	

  add(){
    this.router.navigate(['/beneficiario']);
  }

  setClickedRowbeneficiario(index, beneficiario){
	this.beneficiarioService.setBeneficiario(beneficiario);
    this.router.navigate(['/beneficiario']);
  }

}


import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { AfiliadoService }                                  from '../afiliado/afiliado.component.service';
import { Afiliado }                                         from '../afiliado/afiliado.component.model';

import { BeneficiarioService }                                  from '../beneficiario/beneficiario.component.service';
import { Beneficiario }                                         from '../beneficiario/beneficiario.component.model';




@Component ({
    selector: 'app-view',
    templateUrl: './afiliado.component.html'
})

export class AfiliadoComponent implements OnInit {

    title = 'Nuevo Afiliado';
    afiliadoList: Afiliado;
    afiliado: Afiliado;
    form: any;

	beneficiarioList: Beneficiario;







		public busquedaBeneficiario='';
		filterInputBeneficiario = new FormControl();

    constructor(private router: Router, 
				private afiliadoService: AfiliadoService
		,private beneficiarioService: BeneficiarioService

) {
		

		  	 this.filterInputBeneficiario.valueChanges.subscribe(busquedaBeneficiario => {
	         this.busquedaBeneficiario = busquedaBeneficiario;
	       });

	}

    ngOnInit() {
        this.afiliado = this.afiliadoService.getAfiliado();
        this.loadAfiliados();

		this.loadBeneficiarios();

    }

	loadAfiliados(){
      this.afiliadoService.getAllAfiliado().subscribe(data => {
        if (data) {
          this.afiliadoList = data;
        }
      }, error => {
        swal('Error...', 'An error occurred while calling the afiliados.', 'error');
      });
    }

		loadBeneficiarios(){
      		this.beneficiarioService.getAllBeneficiario().subscribe(data => {
        	if (data) {
          	this.beneficiarioList = data;
        	}
      		}, error => {
        	swal('Error...', 'An error occurred while calling the beneficiarios.', 'error');
      	});
    }


    save(afiliado){
      this.afiliadoService.saveAfiliado(this.afiliado).subscribe(res => {
        if (res.status == 201 || res.status == 200){
          swal('Success...', 'Afiliado save successfully.', 'success');
		  this.router.navigate(['/afiliado_mgmnt']);
        }else{
          swal('Error...', 'Afiliado save unsuccessfully.', 'error');
        }
      } );
    }
	
	


	return(afiliado){
      this.router.navigate(['/afiliado_mgmnt']);
    }

	  		setClickedRowbeneficiario(index, beneficiario){
			this.afiliado.beneficiarioId = beneficiario.beneficiarioId;
		}
	
}


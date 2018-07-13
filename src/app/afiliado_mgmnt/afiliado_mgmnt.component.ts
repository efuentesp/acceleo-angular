import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { AfiliadoService }                                  from '../afiliado/afiliado.component.service';
import { Afiliado }                                         from '../afiliado/afiliado.component.model';

import { SearchAfiliadoPipe }                               from "../pipe/afiliado.filter.pipe";
@Component ({
    selector: 'app-view',
    templateUrl: './afiliado_mgmnt.component.html'
})

export class AfiliadoMngComponent implements OnInit {

    title = 'Nuevo Afiliado';
    afiliadoList: Afiliado;
    afiliado: Afiliado;
    form: any;

  	public busquedaAfiliado='';
	filterInputAfiliado = new FormControl();

    constructor(private router: Router, private afiliadoService: AfiliadoService) {
	   	   this.filterInputAfiliado.valueChanges.subscribe(busquedaAfiliado => {
	         this.busquedaAfiliado = busquedaAfiliado;
	       });
	}

    ngOnInit() {

        this.loadAfiliados();

    }

    loadAfiliados() {
      this.afiliadoService.getAllAfiliado().subscribe(data => {
        if (data) {
          this.afiliadoList = data;
        }
      }, error => {
        swal('Error...', 'An error occurred while calling the afiliados.', 'error');
      });
    }
    save(afiliado){
      this.afiliadoService.saveAfiliado(this.afiliado).subscribe(res => {
        if (res.status == 201){
          swal('Success...', 'Afiliado save successfully.', 'success');
        }else{
          swal('Error...', 'Afiliado save unsuccessfully.', 'error');
        }

      } );
    }
	

  add(){
    this.router.navigate(['/afiliado']);
  }

  setClickedRowafiliado(index, afiliado){
	this.afiliadoService.setAfiliado(afiliado);
    this.router.navigate(['/afiliado']);
  }

}


import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { SolicitudpensionService }                                  from '../solicitudpension/solicitudpension.component.service';
import { Solicitudpension }                                         from '../solicitudpension/solicitudpension.component.model';

import { AfiliadoService }                                  from '../afiliado/afiliado.component.service';
import { Afiliado }                                         from '../afiliado/afiliado.component.model';
import { TipopensionService }                                  from '../tipopension/tipopension.component.service';
import { Tipopension }                                         from '../tipopension/tipopension.component.model';




@Component ({
    selector: 'app-view',
    templateUrl: './solicitudpension.component.html'
})

export class SolicitudpensionComponent implements OnInit {

    title = 'Nuevo Solicitudpension';
    solicitudpensionList: Solicitudpension;
    solicitudpension: Solicitudpension;
    form: any;

	afiliadoList: Afiliado;
	tipopensionList: Tipopension;







		public busquedaAfiliado='';
		filterInputAfiliado = new FormControl();
		public busquedaTipopension='';
		filterInputTipopension = new FormControl();

    constructor(private router: Router, 
				private solicitudpensionService: SolicitudpensionService
		,private afiliadoService: AfiliadoService
		,private tipopensionService: TipopensionService

) {
		

		  	 this.filterInputAfiliado.valueChanges.subscribe(busquedaAfiliado => {
	         this.busquedaAfiliado = busquedaAfiliado;
	       });
		  	 this.filterInputTipopension.valueChanges.subscribe(busquedaTipopension => {
	         this.busquedaTipopension = busquedaTipopension;
	       });

	}

    ngOnInit() {
        this.solicitudpension = this.solicitudpensionService.getSolicitudpension();
        this.loadSolicitudpensions();

		this.loadAfiliados();
		this.loadTipopensions();

    }

	loadSolicitudpensions(){
      this.solicitudpensionService.getAllSolicitudpension().subscribe(data => {
        if (data) {
          this.solicitudpensionList = data;
        }
      }, error => {
        swal('Error...', 'An error occurred while calling the solicitudpensions.', 'error');
      });
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
		loadTipopensions(){
      		this.tipopensionService.getAllTipopension().subscribe(data => {
        	if (data) {
          	this.tipopensionList = data;
        	}
      		}, error => {
        	swal('Error...', 'An error occurred while calling the tipopensions.', 'error');
      	});
    }


    save(solicitudpension){
      this.solicitudpensionService.saveSolicitudpension(this.solicitudpension).subscribe(res => {
        if (res.status == 201 || res.status == 200){
          swal('Success...', 'Solicitudpension save successfully.', 'success');
		  this.router.navigate(['/solicitudpension_mgmnt']);
        }else{
          swal('Error...', 'Solicitudpension save unsuccessfully.', 'error');
        }
      } );
    }
	
	


	return(solicitudpension){
      this.router.navigate(['/solicitudpension_mgmnt']);
    }

	  		setClickedRowafiliado(index, afiliado){
			this.solicitudpension.afiliadoId = afiliado.afiliadoId;
		}
	  		setClickedRowtipopension(index, tipopension){
			this.solicitudpension.tipopensionId = tipopension.tipopensionId;
		}
	
}


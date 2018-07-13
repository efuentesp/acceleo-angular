import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { SolicitudpensionService }                                  from '../solicitudpension/solicitudpension.component.service';
import { Solicitudpension }                                         from '../solicitudpension/solicitudpension.component.model';

import { SearchSolicitudpensionPipe }                               from "../pipe/solicitudpension.filter.pipe";
@Component ({
    selector: 'app-view',
    templateUrl: './solicitudpension_mgmnt.component.html'
})

export class SolicitudpensionMngComponent implements OnInit {

    title = 'Nuevo Solicitudpension';
    solicitudpensionList: Solicitudpension;
    solicitudpension: Solicitudpension;
    form: any;

  	public busquedaSolicitudpension='';
	filterInputSolicitudpension = new FormControl();

    constructor(private router: Router, private solicitudpensionService: SolicitudpensionService) {
	   	   this.filterInputSolicitudpension.valueChanges.subscribe(busquedaSolicitudpension => {
	         this.busquedaSolicitudpension = busquedaSolicitudpension;
	       });
	}

    ngOnInit() {

        this.loadSolicitudpensions();

    }

    loadSolicitudpensions() {
      this.solicitudpensionService.getAllSolicitudpension().subscribe(data => {
        if (data) {
          this.solicitudpensionList = data;
        }
      }, error => {
        swal('Error...', 'An error occurred while calling the solicitudpensions.', 'error');
      });
    }
    save(solicitudpension){
      this.solicitudpensionService.saveSolicitudpension(this.solicitudpension).subscribe(res => {
        if (res.status == 201){
          swal('Success...', 'Solicitudpension save successfully.', 'success');
        }else{
          swal('Error...', 'Solicitudpension save unsuccessfully.', 'error');
        }

      } );
    }
	

  add(){
    this.router.navigate(['/solicitudpension']);
  }

  setClickedRowsolicitudpension(index, solicitudpension){
	this.solicitudpensionService.setSolicitudpension(solicitudpension);
    this.router.navigate(['/solicitudpension']);
  }

}


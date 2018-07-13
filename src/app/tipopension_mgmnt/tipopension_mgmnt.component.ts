import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { TipopensionService }                                  from '../tipopension/tipopension.component.service';
import { Tipopension }                                         from '../tipopension/tipopension.component.model';

import { SearchTipopensionPipe }                               from "../pipe/tipopension.filter.pipe";
@Component ({
    selector: 'app-view',
    templateUrl: './tipopension_mgmnt.component.html'
})

export class TipopensionMngComponent implements OnInit {

    title = 'Nuevo Tipopension';
    tipopensionList: Tipopension;
    tipopension: Tipopension;
    form: any;

  	public busquedaTipopension='';
	filterInputTipopension = new FormControl();

    constructor(private router: Router, private tipopensionService: TipopensionService) {
	   	   this.filterInputTipopension.valueChanges.subscribe(busquedaTipopension => {
	         this.busquedaTipopension = busquedaTipopension;
	       });
	}

    ngOnInit() {

        this.loadTipopensions();

    }

    loadTipopensions() {
      this.tipopensionService.getAllTipopension().subscribe(data => {
        if (data) {
          this.tipopensionList = data;
        }
      }, error => {
        swal('Error...', 'An error occurred while calling the tipopensions.', 'error');
      });
    }
    save(tipopension){
      this.tipopensionService.saveTipopension(this.tipopension).subscribe(res => {
        if (res.status == 201){
          swal('Success...', 'Tipopension save successfully.', 'success');
        }else{
          swal('Error...', 'Tipopension save unsuccessfully.', 'error');
        }

      } );
    }
	

  add(){
    this.router.navigate(['/tipopension']);
  }

  setClickedRowtipopension(index, tipopension){
	this.tipopensionService.setTipopension(tipopension);
    this.router.navigate(['/tipopension']);
  }

}


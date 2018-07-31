import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { Location } from '@angular/common';
import { User } from '../../user/user.component.model';

import { DataService }                                  from '../../data/data.component.service';
import { Data }                                         from '../../data/data.component.model';


@Component ({
    selector: 'app-view',
    templateUrl: './data-manage.component.html',
	styleUrls: ['./data-manage.component.css']
})

export class DataManageComponent implements OnInit {

    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

    public title = 'Manage Data';
    public dataList: Data;
    public data: Data;

  	public busquedadata='';
    public filterInputdata = new FormControl();

 	public userAdmin: User = JSON.parse(localStorage.getItem('currentUser'));

    // Buttons 
    private searchActive: boolean = false;
    private updateActive: boolean = false;
    private createActive: boolean = false;
    private deleteActive: boolean = false;





    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private dataService: DataService
){



	}

    ngOnInit() {
      
	  // Get data user
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      this.valueName = this.user.username;
      this.token = this.user.token;

      this.dataService.setEdit(false);
      this.dataService.setDelete(false);

      this.loadDatas();
      this.habilita();

    }   

    loadDatas() {
      this.dataService.getAllData().subscribe(data => {
        if (data) {
          this.dataList = data;
        }
      }, error => {
        swal('Error...', 'An error occurred while calling the datas.', 'error');
      });
    }

  add(){
    this.dataService.clear();
    this.router.navigate([ '../createdata' ], { relativeTo: this.route })
  }

  editar(data){
    this.dataService.setData(data);
    this.dataService.setEdit(true);
    this.dataService.setDelete(false);
    this.router.navigate([ '../editdata' ], { relativeTo: this.route })
  }

  eliminar(data){
    this.dataService.setData(data);
    this.dataService.setEdit(false);
    this.dataService.setDelete(true);
    this.router.navigate([ '../editdata' ], { relativeTo: this.route })
  }

  // Select row
  setClickedRowData(index, data){
    this.dataService.setData(data);
    this.dataService.setEdit(true);
    this.dataService.setDelete(false);
    this.router.navigate([ '../editdata' ], { relativeTo: this.route })
  }
  
  habilita(){
    this.userAdmin.authorities.forEach(element => {
      if (element.authority == 'ROLE_DATADELETE'){
        this.deleteActive = true;
      }
      if (element.authority == 'ROLE_DATACREATE'){
        this.createActive = true;
      }
      if (element.authority == 'ROLE_DATAUPDATE'){
        this.updateActive = true;
      }
      if (element.authority == 'ROLE_DATASEARCH'){
        this.searchActive = true;
      }
    });
  }

}

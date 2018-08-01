import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
import { Location } from '@angular/common';
import { User } from '../../user/user.component.model';

import { DataService }                                  from '../../data/data.component.service';
import { Data }                                         from '../../data/data.component.model';



@Component ({
    selector: 'app-view',
    templateUrl: './data-edit.component.html',
	styleUrls: ['./data-edit.component.css']
})

export class DataEditComponent implements OnInit {

	public title = 'Editar Data';
    public data: Data;
 	public dataList: Data;
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

	public flag: boolean;
    public flagDelete: boolean;



    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private dataService: DataService
){


	}	

    ngOnInit() {
        

        this.flag = this.dataService.getEdit();
        this.data = this.dataService.getData();
        this.flagDelete = this.dataService.getDelete();
        

    }  

save(){
   this.dataService.saveData(this.data).subscribe(res => {
     if (res.status == 201 || res.status == 200){
        swal('Success...', 'Data save successfully.', 'success');
        this.router.navigate([ '../managedata' ], { relativeTo: this.route })
     }else if (res.status == 403){
        swal('Error...', 'Usuario no tiene permiso para guardar Data.', 'error');
     }else{
       swal('Error...', 'Data save unsuccessfully.', 'error');
     }
   } );
}

delete(){
  swal({
    title: "Are you sure?",
    text: "You will not be able to recover this data!",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!"
  }).then((isConfirm) => {
    if (isConfirm.value) {
      this.dataService.deleteData(this.data).subscribe(res => {
        if (res.status == 201 || res.status == 200){
          swal('Success...', 'Data item has been deleted successfully.', 'success');
          this.router.navigate([ '../managedata' ], { relativeTo: this.route })
        }else if (res.status == 403){
          swal('Error...', 'Usuario no tiene permiso para guardar Data.', 'error');
        }else{
          swal('Error...', 'Data deleted unsuccessfully.', 'error');
        }
      },error =>{
        if (error.status == 500){
          swal('Warning...', 'Data no se puede eliminar debido a que esta asociado con otra entidad.', 'warning');
        }
      }
	);
    } else {
      //swal("Cancelled", "Data deleted unsuccessfully", "error");
    }
  });
}



return(data){
  this.location.back();
}
 
}

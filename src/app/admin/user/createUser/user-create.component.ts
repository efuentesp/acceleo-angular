import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { UserService }                                  from '../../user/user.component.service';
import { User }                                         from '../../user/user.component.model';

import { Location } from '@angular/common';
import { AuthorityService } from '../../authority/authority.component.service';
import { Authority } from '../../authority/authority.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './user-create.component.html',
    styleUrls: ['./user-create.component.css']
})

export class UserCreateComponent implements OnInit {

    public title = 'Nuevo User';
    public userList: User;
    public user: User;
    public form: any;
    public flag: boolean = false;
    public flagDelete: boolean = false;
    public selectedValue: number = null;
    private authority = Authority;
    public userArray: User[];
    public selectElem: string;
    public selectedVal: number;

	  public authorityList: Authority [];

    public auth = Authority;
		public busquedaBeneficiario='';
    public filterInputBeneficiario = new FormControl();
    public isChecked: boolean;
    public passwordChange: boolean = false;
    public changeCombo: boolean = false;

    public userAdmin: User = JSON.parse(localStorage.getItem('currentUser'));

    // Buttons
    private searchActive: boolean = false;
    private updateActive: boolean = false;
    private createActive: boolean = false;
    private deleteActive: boolean = false;

    constructor(private router: Router,
                private userService: UserService,
                private authorityService: AuthorityService,
                private location: Location,
                private route:ActivatedRoute

    ) {	}

    ngOnInit() {

         this.user = new User();
         this.isChecked = this.user.enabled;
         this.loadAuthority();

    }

    save(){
      console.log('En el metodo save...');

      if (!this.changeCombo){
        console.log("this.selectedVal", this.selectedVal);
        console.log("selectedValue", this.selectedValue);
        this.selectedValue = this.selectedVal;
      }

       this.userService.saveUser(this.user, this.selectedValue, this.passwordChange).subscribe(res => {
         
        console.log('Resultado:', res);

        if (res.status == 201 || res.status == 200){
           swal('Success...', 'User save successfully.', 'success');
           this.router.navigate([ '../manageUser' ], { relativeTo: this.route })
         }else if (res.status === 406) {
          swal('Error...', 'User duplicated.', 'error');
         }else{
           swal('Error...', 'User save unsuccessfully.', 'error');
         }
       },error =>{
        if (error.status == 401 || error.status == 406){
          swal('Error...', 'User duplicated.', 'error');
        }

       } );
    }

    loadUsers(){
      this.userService.getAllUser().subscribe(data => {
        if (data) {
          this.userList = data;
        }
      }, error => {
        swal('Error...', 'An error occurred while calling the users.', 'error');
      });
    }

    loadAuthority(){
      this.authorityService.getAllAuthority().subscribe( data => {
        if (data) {
          this.authorityList = data;
        }}, error => {
          swal('Error...', 'An error occurred while calling the authorities.', 'error');
        });
    }

    setRole(item){
      console.log ("El cambio es: ", item);
      this.selectedValue = item;
      this.changeCombo = true;
      this.user.selected = item;
    }

    setChange(){
      this.passwordChange = true;
    }

	return(beneficiario){
      this.location.back();
  }

}

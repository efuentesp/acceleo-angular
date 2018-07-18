import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
import { User } from './user.component.model';
import { Http, Response }                          from "@angular/http";
import { Headers, RequestOptions }                 from '@angular/http';



@Component ({
  
})

export class UserStorageComponent implements OnInit {

    public user: User = JSON.parse(localStorage.getItem('currentUser'));

    ngOnInit() {
       this.getOpts();
    }

    getOpts(){

        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');

        let opts = new RequestOptions({ headers: headers });

        return opts;
    }

}

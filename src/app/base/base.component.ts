import { Component, OnInit }   from '@angular/core';
import { Router }              from '@angular/router';

@Component ({
    selector: 'app-view',
    templateUrl: './base.component.html'
})

export class BaseComponent implements OnInit {

    constructor(private router: Router) {}
    ngOnInit() {}

}


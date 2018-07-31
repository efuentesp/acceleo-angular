import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { Location } from '@angular/common';
import { User } from '../../user/user.component.model';

import { RepositoryService }                                  from '../../repository/repository.component.service';
import { Repository }                                         from '../../repository/repository.component.model';


@Component ({
    selector: 'app-view',
    templateUrl: './repository-manage.component.html',
	styleUrls: ['./repository-manage.component.css']
})

export class RepositoryManageComponent implements OnInit {

    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

    public title = 'Manage Repository';
    public repositoryList: Repository;
    public repository: Repository;

  	public busquedarepository='';
    public filterInputrepository = new FormControl();

 	public userAdmin: User = JSON.parse(localStorage.getItem('currentUser'));

    // Buttons 
    private searchActive: boolean = false;
    private updateActive: boolean = false;
    private createActive: boolean = false;
    private deleteActive: boolean = false;





    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private repositoryService: RepositoryService
){



	}

    ngOnInit() {
      
	  // Get data user
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      this.valueName = this.user.username;
      this.token = this.user.token;

      this.repositoryService.setEdit(false);
      this.repositoryService.setDelete(false);

      this.loadRepositorys();
      this.habilita();

    }   

    loadRepositorys() {
      this.repositoryService.getAllRepository().subscribe(data => {
        if (data) {
          this.repositoryList = data;
        }
      }, error => {
        swal('Error...', 'An error occurred while calling the repositorys.', 'error');
      });
    }

  add(){
    this.repositoryService.clear();
    this.router.navigate([ '../createrepository' ], { relativeTo: this.route })
  }

  editar(repository){
    this.repositoryService.setRepository(repository);
    this.repositoryService.setEdit(true);
    this.repositoryService.setDelete(false);
    this.router.navigate([ '../editrepository' ], { relativeTo: this.route })
  }

  eliminar(repository){
    this.repositoryService.setRepository(repository);
    this.repositoryService.setEdit(false);
    this.repositoryService.setDelete(true);
    this.router.navigate([ '../editrepository' ], { relativeTo: this.route })
  }

  // Select row
  setClickedRowRepository(index, repository){
    this.repositoryService.setRepository(repository);
    this.repositoryService.setEdit(true);
    this.repositoryService.setDelete(false);
    this.router.navigate([ '../editrepository' ], { relativeTo: this.route })
  }
  
  habilita(){
    this.userAdmin.authorities.forEach(element => {
      if (element.authority == 'ROLE_REPOSITORYDELETE'){
        this.deleteActive = true;
      }
      if (element.authority == 'ROLE_REPOSITORYCREATE'){
        this.createActive = true;
      }
      if (element.authority == 'ROLE_REPOSITORYUPDATE'){
        this.updateActive = true;
      }
      if (element.authority == 'ROLE_REPOSITORYSEARCH'){
        this.searchActive = true;
      }
    });
  }

}

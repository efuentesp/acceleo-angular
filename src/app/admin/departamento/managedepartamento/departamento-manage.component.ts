import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { Location } from '@angular/common';
import { User } from '../../user/user.component.model';

import { DepartamentoService }                                  from '../../departamento/departamento.component.service';
import { Departamento }                                         from '../../departamento/departamento.component.model';

import { EmpresaService }                                  from '../../empresa/empresa.component.service';
import { Empresa }                                         from '../../empresa/empresa.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './departamento-manage.component.html',
	styleUrls: ['./departamento-manage.component.css']
})

export class DepartamentoManageComponent implements OnInit {

    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

    public title = 'Manage Departamento';
    public departamentoList: Departamento [];
    public departamento: Departamento;

  	public busquedadepartamento='';
    public filterInputdepartamento = new FormControl();

 	public userAdmin: User = JSON.parse(localStorage.getItem('currentUser'));

    // Buttons 
    private searchActive: boolean = false;
    private updateActive: boolean = false;
    private createActive: boolean = false;
    private deleteActive: boolean = false;

	public empresaList: Empresa [];
    public empresa: Empresa;
	public empresaAux: Empresa;

	public busquedaEmpresa='';
	filterInputEmpresa = new FormControl();

    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private departamentoService: DepartamentoService
	,private empresaService: EmpresaService
){


  	 this.filterInputEmpresa.valueChanges.subscribe(busquedaEmpresa => {
     this.busquedaEmpresa = busquedaEmpresa;
	   });

	}

    ngOnInit() {
      
	  // Get data user
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      this.valueName = this.user.username;
      this.token = this.user.token;

      this.departamentoService.setEdit(false);
      this.departamentoService.setDelete(false);

      this.loadDepartamentos();
      this.habilita();

    }   

    loadDepartamentos() {
      this.departamentoService.getAllDepartamento().subscribe(data => {
        if (data) {

          this.departamentoList = data;

			this.departamentoList.forEach(element => {
        console.log ('Info', element);
				this.empresaService.getEmpresaById(element.empresaId).subscribe(dataAux => {
					if (dataAux) {
						this.empresaAux = dataAux;
						element.empresaItem = this.empresaAux.clave;
				}	
			});	
		});

        }
      }, error => {
        swal('Error...', 'An error occurred while calling the departamentos.', 'error');
      });
    }

  add(){
    this.departamentoService.clear();
    this.router.navigate([ '../createdepartamento' ], { relativeTo: this.route })
  }

  editar(departamento){
    this.departamentoService.setDepartamento(departamento);
    this.departamentoService.setEdit(true);
    this.departamentoService.setDelete(false);
    this.router.navigate([ '../editdepartamento' ], { relativeTo: this.route })
  }

  eliminar(departamento){
    this.departamentoService.setDepartamento(departamento);
    this.departamentoService.setEdit(false);
    this.departamentoService.setDelete(true);
    this.router.navigate([ '../editdepartamento' ], { relativeTo: this.route })
  }

  // Select row
  setClickedRowDepartamento(index, departamento){
    this.departamentoService.setDepartamento(departamento);
    this.departamentoService.setEdit(true);
    this.departamentoService.setDelete(false);
    this.router.navigate([ '../editdepartamento' ], { relativeTo: this.route })
  }
  
  habilita(){
    this.userAdmin.authorities.forEach(element => {
      if (element.authority == 'ROLE_DEPARTAMENTODELETE'){
        this.deleteActive = true;
      }
      if (element.authority == 'ROLE_DEPARTAMENTOCREATE'){
        this.createActive = true;
      }
      if (element.authority == 'ROLE_DEPARTAMENTOUPDATE'){
        this.updateActive = true;
      }
      if (element.authority == 'ROLE_DEPARTAMENTOSEARCH'){
        this.searchActive = true;
      }
    });
  }

}

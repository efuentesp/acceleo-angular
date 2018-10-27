import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute, Params}                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';

import { PosicionService }                                  from '../../posicion/posicion.component.service';
import { Posicion }                                         from '../../posicion/posicion.component.model';

import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { FilialService }                                  from '../../filial/filial.component.service';
import { Filial }                                         from '../../filial/filial.component.model';
import { PuestoService }                                  from '../../puesto/puesto.component.service';
import { Puesto }                                         from '../../puesto/puesto.component.model';
import { ReclutadorService }                                  from '../../reclutador/reclutador.component.service';
import { Reclutador }                                         from '../../reclutador/reclutador.component.model';
import { CandidatoService } from '../../candidato/candidato.component.service';
import { Candidato } from '../../candidato/candidato.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './posicion-manage.component.html',
	styleUrls: ['./posicion-manage.component.css']
})

export class PosicionManageComponent implements OnInit {

    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

    public title = 'Manage Posicion';
    public posicionList: Posicion [];
	public posicion: Posicion;
	
	public filtro = null;

  	public busquedaPosicion='';
    public filterInputPosicion = new FormControl();
    datePipe = new DatePipe('en-US');

 	public userAdmin: User = JSON.parse(localStorage.getItem('currentUser'));

	public filialList: Filial [];
	public filial: Filial;
	public filialAux: Filial;
	
	public busquedaFilial='';
	filterInputFilial = new FormControl();
	public puestoList: Puesto [];
	public puesto: Puesto;
	public puestoAux: Puesto;
	
	public busquedaPuesto='';
	filterInputPuesto = new FormControl();
	public reclutadorList: Reclutador [];
	public reclutador: Reclutador;
	public reclutadorAux: Reclutador;
	
	public busquedaReclutador='';
	filterInputReclutador = new FormControl();

	public candidato: Candidato;

    // Buttons 
    private searchActive: boolean = false;
    private updateActive: boolean = false;
    private createActive: boolean = false;
    private deleteActive: boolean = false;
    
private searchSolicitudActive: boolean = false;
private updateSolicitudActive: boolean = false;
private createSolicitudActive: boolean = false;
private deleteSolicitudActive: boolean = false;
private searchEventoActive: boolean = false;
private updateEventoActive: boolean = false;
private createEventoActive: boolean = false;
private deleteEventoActive: boolean = false;

// data  
public link: string = '';
public filialId: string = '';
public puestoId: string = '';
public reclutadorId: string = '';

    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private posicionService:PosicionService
				,private filialService: FilialService
				,private puestoService: PuestoService
				,private reclutadorService: ReclutadorService
				, private candidatoService: CandidatoService
){
			this.filterInputPosicion.valueChanges.subscribe(busquedaPosicion => {
		  	  	this.busquedaPosicion = busquedaPosicion;
		  	  });
			this.filterInputFilial.valueChanges.subscribe(busquedaFilial => {
			    this.busquedaFilial = busquedaFilial;
			  });
			this.filterInputPuesto.valueChanges.subscribe(busquedaPuesto => {
			    this.busquedaPuesto = busquedaPuesto;
			  });
			this.filterInputReclutador.valueChanges.subscribe(busquedaReclutador => {
			    this.busquedaReclutador = busquedaReclutador;
			  });
}

    ngOnInit() {
      
	  // Get data user
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      this.valueName = this.user.username;
	  this.token = this.user.token;

	  this.filtro = this.user.authorityname;
	  
      this.posicionService.setEdit(false);
      this.posicionService.setDelete(false);
    
      this.habilita();
      this.getParams();

    }   
    
loadPosicion(){
    this.posicionService.getAllPosicion().subscribe(data => {
        if (data) {
            this.posicionList = data;
          
this.posicionList.forEach(element => {
	
    // Entidad a Enum
         	if (element.puesto.puestosId == 'a'){
         	    element.puestoItem = "Promotor de cambaceo";
         	    element.puestoId = "A";
         	}		
         	if (element.puesto.puestosId == 'b'){
         	    element.puestoItem = "Valuador";
         	    element.puestoId = "B";
         	}		
         	if (element.puesto.puestosId == 'c'){
         	    element.puestoItem = "Mecanógrafo";
         	    element.puestoId = "C";
         	}		
         	if (element.puesto.puestosId == 'd'){
         	    element.puestoItem = "Expendedor";
         	    element.puestoId = "D";
         	}		
         	if (element.puesto.puestosId == 'e'){
         	    element.puestoItem = "Almacenista";
         	    element.puestoId = "E";
         	}		
         	if (element.puesto.puestosId == 'f'){
         	    element.puestoItem = "Mozo";
         	    element.puestoId = "F";
         	}		
         	if (element.puesto.puestosId == 'g'){
         	    element.puestoItem = "Cajero";
         	    element.puestoId = "G";
         	}		
        
});
this.posicionList.forEach(element => {
      	if (element.tiponominaId == 'a'){
      	    element.tiponominaItem = "Externo";
      	}		
      	if (element.tiponominaId == 'b'){
      	    element.tiponominaItem = "Interno";
      	}		
      	if (element.tiponominaId == 'c'){
      	    element.tiponominaItem = "Sindicalizado";
      	}		
});

this.posicionList.forEach(element => {
      	if (element.estatusposicionId == 'e1'){
      	    element.estatusposicionItem = "Abierta";
      	}		
      	if (element.estatusposicionId == 'e2'){
      	    element.estatusposicionItem = "Cerrada";
      	}		
      	if (element.estatusposicionId == 'e3'){
      	    element.estatusposicionItem = "Cancelada";
      	}		
      	if (element.estatusposicionId == 'e4'){
      	    element.estatusposicionItem = "En pausa";
      	}		
});
        }
    }, error => {
    swal('Error...', 'An error occurred while calling the posicions.', 'error');
    });
}


add(){
	this.posicionService.clear();
	this.router.navigate([ '../createposicion' ], { relativeTo: this.route })
}


editar(posicion){
	this.posicionService.setPosicion(posicion);
	this.posicionService.setEdit(true);
	this.posicionService.setDelete(false);
	this.router.navigate([ '../editposicion' ], { relativeTo: this.route })
}


eliminar(posicion){
	this.posicionService.setPosicion(posicion);
	this.posicionService.setEdit(false);
	this.posicionService.setDelete(true);
	this.router.navigate([ '../editposicion' ], { relativeTo: this.route })
}

  // Select row
  setClickedRowPosicion(index, posicion){
    this.posicionService.setPosicion(posicion);
    this.posicionService.setEdit(true);
    this.posicionService.setDelete(false);
    this.router.navigate([ '../editposicion' ], { relativeTo: this.route })
  }
  
  habilita(){
    this.userAdmin.authorities.forEach(element => {
if (element.authority == 'ROLE_POSICIONDELETE'){
	this.deleteActive = true;
}
if (element.authority == 'ROLE_POSICIONCREATE'){
this.createActive = true;
}
if (element.authority == 'ROLE_POSICIONUPDATE'){
	this.updateActive = true;
}
if (element.authority == 'ROLE_POSICIONSEARCH'){
	this.searchActive = true;
}

 // Children with one to many
if (element.authority == 'ROLE_SOLICITUDDELETE'){
    this.deleteSolicitudActive = true;
}
if (element.authority == 'ROLE_SOLICITUDCREATE'){
this.createSolicitudActive = true;
}
if (element.authority == 'ROLE_SOLICITUDUPDATE'){
    this.updateSolicitudActive = true;
}
if (element.authority == 'ROLE_SOLICITUDSEARCH'){
    this.searchSolicitudActive = true;
}
if (element.authority == 'ROLE_EVENTODELETE'){
    this.deleteEventoActive = true;
}
if (element.authority == 'ROLE_EVENTOCREATE'){
this.createEventoActive = true;
}
if (element.authority == 'ROLE_EVENTOUPDATE'){
    this.updateEventoActive = true;
}
if (element.authority == 'ROLE_EVENTOSEARCH'){
    this.searchEventoActive = true;
}
	
}); 

}

  // Parse to NgbDateStruct
    isNumber(value: any): boolean {
      return !isNaN(this.toInteger(value));
  }
 
  toInteger(value: any): number {
      return parseInt(`${value}`, 10);
  }
  parse(value: string): NgbDateStruct {
    if (value) {
        const dateParts = value.trim().split('-');
        if (dateParts.length === 1 && this.isNumber(dateParts[0])) {
            return {day: this.toInteger(dateParts[0]), month: null, year: null};
        } else if (dateParts.length === 2 && this.isNumber(dateParts[0]) && this.isNumber(dateParts[1])) {
            return {day: this.toInteger(dateParts[1]), month: this.toInteger(dateParts[0]), year: null};
        } else if (dateParts.length === 3 && this.isNumber(dateParts[0]) && this.isNumber(dateParts[1]) && this.isNumber(dateParts[2])) {
            return {day: this.toInteger(dateParts[2]), month: this.toInteger(dateParts[1]), year: this.toInteger(dateParts[0])};
        }
    }
    return null;
  }
  
  	goSolicitud(value, posicion){
  	    this.router.navigate([ '../'+value+'', { posicionId: posicion.posicionId, link: 'solicitud'}], { relativeTo: this.route })
  	}
  	goEvento(value, posicion){
  	    this.router.navigate([ '../'+value+'', { posicionId: posicion.posicionId, link: 'evento'}], { relativeTo: this.route })
  	}
  	
  	  getParams(){
  	    this.route.params.subscribe((params: Params) => {
  	        this.link = params['link'];
  	        
          	this.filialId = params['filialId'];
          	this.puestoId = params['puestoId'];
          	this.reclutadorId = params['reclutadorId'];
  	
  	        if (!this.link){

                    this.loadPosicion();
				  
  	        }else{

					if (this.filialId){
						this.loadPosicionByFilial(this.filialId);
					}
					if (this.puestoId){
						this.loadPosicionByPuesto(this.puestoId);
					}
					if (this.reclutadorId){
						this.loadPosicionByReclutador(this.reclutadorId);
					}

			
  	        }
  	    });
  	  }
  	  
  	loadPosicionByFilial(filialId){
  	    this.posicionService.getAllPosicionByFilial(filialId).subscribe(data => {
  	        if (data) {
  	            this.posicionList = data;
  	
  	this.posicionList.forEach(element => {
		  
		// Entidad a Enum
		if (element.puesto.puestosId == 'a'){
			element.puestoItem = "Promotor de cambaceo";
			element.puestoId = "A";
		}		
		if (element.puesto.puestosId == 'b'){
			element.puestoItem = "Valuador";
			element.puestoId = "B";
		}		
		if (element.puesto.puestosId == 'c'){
			element.puestoItem = "Mecanógrafo";
			element.puestoId = "C";
		}		
		if (element.puesto.puestosId == 'd'){
			element.puestoItem = "Expendedor";
			element.puestoId = "D";
		}		
		if (element.puesto.puestosId == 'e'){
			element.puestoItem = "Almacenista";
			element.puestoId = "E";
		}		
		if (element.puesto.puestosId == 'f'){
			element.puestoItem = "Mozo";
			element.puestoId = "F";
		}		
		if (element.puesto.puestosId == 'g'){
			element.puestoItem = "Cajero";
			element.puestoId = "G";
		}			
  	         
  	
  	});
  	this.posicionList.forEach(element => {
  	      	if (element.tiponominaId == 'a'){
  	      	    element.tiponominaItem = "Externo";
  	      	}		
  	      	if (element.tiponominaId == 'b'){
  	      	    element.tiponominaItem = "Interno";
  	      	}		
  	      	if (element.tiponominaId == 'c'){
  	      	    element.tiponominaItem = "Sindicalizado";
  	      	}		
  	});
  	
  	this.posicionList.forEach(element => {
  	      	if (element.estatusposicionId == 'e1'){
  	      	    element.estatusposicionItem = "Abierta";
  	      	}		
  	      	if (element.estatusposicionId == 'e2'){
  	      	    element.estatusposicionItem = "Cerrada";
  	      	}		
  	      	if (element.estatusposicionId == 'e3'){
  	      	    element.estatusposicionItem = "Cancelada";
  	      	}		
  	      	if (element.estatusposicionId == 'e4'){
  	      	    element.estatusposicionItem = "En pausa";
  	      	}		
  	});
  	
  	
  	        }    
  	    }, error => {
  	    swal('Error...', 'An error occurred while calling the posicions.', 'error');
  	    });    
  	}
  	loadPosicionByPuesto(puestoId){
  	    this.posicionService.getAllPosicionByPuesto(puestoId).subscribe(data => {
  	        if (data) {
  	            this.posicionList = data;
  	
  	this.posicionList.forEach(element => {
  	     this.puestoService.getPuestoById(element.puestoId).subscribe(data => {
  	         if (data){
  	         	if (data.puestosId == 'a'){
  	         	    element.puestoItem = "Promotor de cambaceo";
  	         	    element.puestoId = "A";
  	         	}		
  	         	if (data.puestosId == 'b'){
  	         	    element.puestoItem = "Valuador";
  	         	    element.puestoId = "B";
  	         	}		
  	         	if (data.puestosId == 'c'){
  	         	    element.puestoItem = "Mecanógrafo";
  	         	    element.puestoId = "C";
  	         	}		
  	         	if (data.puestosId == 'd'){
  	         	    element.puestoItem = "Expendedor";
  	         	    element.puestoId = "D";
  	         	}		
  	         	if (data.puestosId == 'e'){
  	         	    element.puestoItem = "Almacenista";
  	         	    element.puestoId = "E";
  	         	}		
  	         	if (data.puestosId == 'f'){
  	         	    element.puestoItem = "Mozo";
  	         	    element.puestoId = "F";
  	         	}		
  	         	if (data.puestosId == 'g'){
  	         	    element.puestoItem = "Cajero";
  	         	    element.puestoId = "G";
  	         	}		
  	         }
  	    });
  	});
  	this.posicionList.forEach(element => {
  	      	if (element.tiponominaId == 'a'){
  	      	    element.tiponominaItem = "Externo";
  	      	}		
  	      	if (element.tiponominaId == 'b'){
  	      	    element.tiponominaItem = "Interno";
  	      	}		
  	      	if (element.tiponominaId == 'c'){
  	      	    element.tiponominaItem = "Sindicalizado";
  	      	}		
  	});
  
  	this.posicionList.forEach(element => {
  	      	if (element.estatusposicionId == 'e1'){
  	      	    element.estatusposicionItem = "Abierta";
  	      	}		
  	      	if (element.estatusposicionId == 'e2'){
  	      	    element.estatusposicionItem = "Cerrada";
  	      	}		
  	      	if (element.estatusposicionId == 'e3'){
  	      	    element.estatusposicionItem = "Cancelada";
  	      	}		
  	      	if (element.estatusposicionId == 'e4'){
  	      	    element.estatusposicionItem = "En pausa";
  	      	}		
  	});
  	
  	
  	        }    
  	    }, error => {
  	    swal('Error...', 'An error occurred while calling the posicions.', 'error');
  	    });    
  	}
  	loadPosicionByReclutador(reclutadorId){
  	    this.posicionService.getAllPosicionByReclutador(reclutadorId).subscribe(data => {
  	        if (data) {
  	            this.posicionList = data;
  	
  	this.posicionList.forEach(element => {
  	     this.puestoService.getPuestoById(element.puestoId).subscribe(data => {
  	         if (data){
  	         	if (data.puestosId == 'a'){
  	         	    element.puestoItem = "Promotor de cambaceo";
  	         	    element.puestoId = "A";
  	         	}		
  	         	if (data.puestosId == 'b'){
  	         	    element.puestoItem = "Valuador";
  	         	    element.puestoId = "B";
  	         	}		
  	         	if (data.puestosId == 'c'){
  	         	    element.puestoItem = "Mecanógrafo";
  	         	    element.puestoId = "C";
  	         	}		
  	         	if (data.puestosId == 'd'){
  	         	    element.puestoItem = "Expendedor";
  	         	    element.puestoId = "D";
  	         	}		
  	         	if (data.puestosId == 'e'){
  	         	    element.puestoItem = "Almacenista";
  	         	    element.puestoId = "E";
  	         	}		
  	         	if (data.puestosId == 'f'){
  	         	    element.puestoItem = "Mozo";
  	         	    element.puestoId = "F";
  	         	}		
  	         	if (data.puestosId == 'g'){
  	         	    element.puestoItem = "Cajero";
  	         	    element.puestoId = "G";
  	         	}		
  	         }
  	    });
  	});
  	this.posicionList.forEach(element => {
  	      	if (element.tiponominaId == 'a'){
  	      	    element.tiponominaItem = "Externo";
  	      	}		
  	      	if (element.tiponominaId == 'b'){
  	      	    element.tiponominaItem = "Interno";
  	      	}		
  	      	if (element.tiponominaId == 'c'){
  	      	    element.tiponominaItem = "Sindicalizado";
  	      	}		
  	});
  
  	this.posicionList.forEach(element => {
  	      	if (element.estatusposicionId == 'e1'){
  	      	    element.estatusposicionItem = "Abierta";
  	      	}		
  	      	if (element.estatusposicionId == 'e2'){
  	      	    element.estatusposicionItem = "Cerrada";
  	      	}		
  	      	if (element.estatusposicionId == 'e3'){
  	      	    element.estatusposicionItem = "Cancelada";
  	      	}		
  	      	if (element.estatusposicionId == 'e4'){
  	      	    element.estatusposicionItem = "En pausa";
  	      	}		
  	});
  	
  	
  	        }    
  	    }, error => {
  	    swal('Error...', 'An error occurred while calling the posicions.', 'error');
  	    });    
	}
	  
	  loadDataCandidato(username){
		this.candidatoService.getAllCandidatoByUserName(username).subscribe(data => {
			if (data) {            
			   this.candidato = data;
			   this.loadPosicionByCandidato(this.candidato.candidatoId);
			}
		});
	}

	loadPosicionByCandidato(candidatoId){
		this.posicionService.getAllPosicionByCandidato(candidatoId).subscribe(data => {
			if (data) {
				this.posicionList = data;
			  
	this.posicionList.forEach(element => {
		
		// Entidad a Enum
				 if (element.puesto.puestosId == 'a'){
					 element.puestoItem = "Promotor de cambaceo";
					 element.puestoId = "A";
				 }		
				 if (element.puesto.puestosId == 'b'){
					 element.puestoItem = "Valuador";
					 element.puestoId = "B";
				 }		
				 if (element.puesto.puestosId == 'c'){
					 element.puestoItem = "Mecanógrafo";
					 element.puestoId = "C";
				 }		
				 if (element.puesto.puestosId == 'd'){
					 element.puestoItem = "Expendedor";
					 element.puestoId = "D";
				 }		
				 if (element.puesto.puestosId == 'e'){
					 element.puestoItem = "Almacenista";
					 element.puestoId = "E";
				 }		
				 if (element.puesto.puestosId == 'f'){
					 element.puestoItem = "Mozo";
					 element.puestoId = "F";
				 }		
				 if (element.puesto.puestosId == 'g'){
					 element.puestoItem = "Cajero";
					 element.puestoId = "G";
				 }		
			
	});
	this.posicionList.forEach(element => {
			  if (element.tiponominaId == 'a'){
				  element.tiponominaItem = "Externo";
			  }		
			  if (element.tiponominaId == 'b'){
				  element.tiponominaItem = "Interno";
			  }		
			  if (element.tiponominaId == 'c'){
				  element.tiponominaItem = "Sindicalizado";
			  }		
	});
	
	this.posicionList.forEach(element => {
			  if (element.estatusposicionId == 'e1'){
				  element.estatusposicionItem = "Abierta";
			  }		
			  if (element.estatusposicionId == 'e2'){
				  element.estatusposicionItem = "Cerrada";
			  }		
			  if (element.estatusposicionId == 'e3'){
				  element.estatusposicionItem = "Cancelada";
			  }		
			  if (element.estatusposicionId == 'e4'){
				  element.estatusposicionItem = "En pausa";
			  }		
	});
			}
		}, error => {
		swal('Error...', 'An error occurred while calling the posicions.', 'error');
		});
	}
  	
}

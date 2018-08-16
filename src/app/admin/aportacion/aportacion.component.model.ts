import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

export class Aportacion {

	aportacionId: number = null;
	aportacionItem: string = '';

	fechaAux: NgbDateStruct = null;
	fecha: string = '';
	monto: string = '';

	cuentadeahorroId: number = null;
	cuentadeahorroItem: string = '';
	tipoaportacionId: string = '';
	tipoaportacionItem: string = '';	
}

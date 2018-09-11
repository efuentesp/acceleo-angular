import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

export class Aportacion {

	aportacionId: number = null;
	aportacionItem: string = '';

	monto: string = '';
	fecha: string = '';
	fechaAux: NgbDateStruct = null;

	cuentadeahorroId: number = null;
	cuentadeahorroItem: string = '';
	tipoaportacionId: string = '';
	tipoaportacionItem: string = '';	
}

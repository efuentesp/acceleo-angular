import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

export class Beneficiario {

	beneficiarioId: number = null;
	beneficiarioItem: string = '';

	nombre: string = '';
	apellidomaterno: string = '';
	apellidopaterno: string = '';
	fechanacimiento: string = '';
	fechanacimientoAux: NgbDateStruct = null;

	cuentadeahorroId: number = null;
	cuentadeahorroItem: string = '';
	generoId: string = '';
	generoItem: string = '';	
	parentescoId: string = '';
	parentescoItem: string = '';	
}

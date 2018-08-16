import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

export class Cuentadeahorro {

	cuentadeahorroId: number = null;
	cuentadeahorroItem: string = '';

	numero: number = null;
	fechadisponibilidad: string = '';
	fechadisponibilidadAux: NgbDateStruct = null;
	fechacontratacion: string = '';
	fechacontratacionAux: NgbDateStruct = null;
	fechavencimiento: string = '';
	fechavencimientoAux: NgbDateStruct = null;

	tipoahorroId: string = '';
	tipoahorroItem: string = '';	
}

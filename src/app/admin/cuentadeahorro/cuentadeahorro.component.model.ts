import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

export class Cuentadeahorro {

	cuentadeahorroId: number = null;
	cuentadeahorroItem: string = '';

	fechacontratacion: string = '';
	fechacontratacionAux: NgbDateStruct = null;
	numero: number = null;
	fechadisponibilidad: string = '';
	fechadisponibilidadAux: NgbDateStruct = null;
	fechavencimiento: string = '';
	fechavencimientoAux: NgbDateStruct = null;

	socioId: number = null;
	socioItem: string = '';
	tipoahorroId: string = '';
	tipoahorroItem: string = '';	
}

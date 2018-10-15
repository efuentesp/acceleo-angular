import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

export class Solicitud {

	posicionId: string = '';
	posicionItem: string = '';
	candidatoId: string = '';
	candidatoItem: string = '';
	fecha: string = '';
	fechaAux: NgbDateStruct = null;
	salario: number = null;
	correo: string = '';
	telefono: string = '';
	estatussolicitudId: string = '';
	estatussolicitudItem: string = '';
	
	solicitudId: number = null;
	solicitudItem: string = '';

}

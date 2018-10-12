import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

export class Solicitud {

	solicitudId: number = null;
	solicitudItem: string = '';

	correo: string = '';
	telefono: string = '';
	salario: string = '';

	posicionId: number = null;
	posicionItem: string = '';
	candidatoId: number = null;
	candidatoItem: string = '';
	fecha: string = '';
	estatussolicitudId: string = '';
	estatussolicitudItem: string = '';	
}

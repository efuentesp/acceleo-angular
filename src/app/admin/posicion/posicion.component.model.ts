import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

export class Posicion {

	posicionId: number = null;
	posicionItem: string = '';

	nombre: string = '';
	vacantes: number = null;
	contacto: string = '';
	salario: string = '';
	descripcion: string = '';
	fecha: string = '';
	fechaAux: NgbDateStruct = null;

	filialId: number = null;
	filialItem: string = '';
	puestoId: number = null;
	puestoItem: string = '';
	tiponominaId: string = '';
	tiponominaItem: string = '';	
	reclutadorId: number = null;
	reclutadorItem: string = '';
	estatusposicionId: string = '';
	estatusposicionItem: string = '';	
	solicitudId: number = null;
	solicitudItem: string = '';
	eventoId: number = null;
	eventoItem: string = '';
}

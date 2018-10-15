import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

export class Posicion {

	filialId: string = '';
	filialItem: string = '';
	puestoId: string = '';
	puestoItem: string = '';
	nombre: string = '';
	descripcion: string = '';
	fecha: string = '';
	fechaAux: NgbDateStruct = null;
	contacto: string = '';
	salario: number = null;
	vacantes: number = null;
	tiponominaId: string = '';
	tiponominaItem: string = '';
	reclutadorId: string = '';
	reclutadorItem: string = '';
	estatusposicionId: string = '';
	estatusposicionItem: string = '';
	solicitudId: string = '';
	solicitudItem: string = '';
	eventoId: string = '';
	eventoItem: string = '';
	
	posicionId: number = null;
	posicionItem: string = '';

}

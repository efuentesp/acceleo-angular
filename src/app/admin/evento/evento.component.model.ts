import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

export class Evento {

	eventoId: number = null;
	eventoItem: string = '';

	nombre: string = '';
	fecha: string = '';
	fechaAux: NgbDateStruct = null;
	responsable: string = '';

	tipoeventoId: string = '';
	tipoeventoItem: string = '';	
	posicionId: number = null;
	posicionItem: string = '';
	candidatoId: number = null;
	candidatoItem: string = '';
	responsablereal: string = '';
	notas: string = '';
	comentarios: string = '';
	feedback: string = '';
	fechareal: string = '';
	estatuseventoId: string = '';
	estatuseventoItem: string = '';	
}

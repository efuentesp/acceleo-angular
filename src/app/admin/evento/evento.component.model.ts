import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { Posicion } from "../posicion/posicion.component.model";
import { Candidato } from "../candidato/candidato.component.model";


export class Evento {

	tipoeventoId: string = '';
	tipoeventoItem: string = '';
	nombre: string = '';
	posicion : Posicion = null;
	posicionId: string = '';
	posicionItem: string = '';
	candidato : Candidato = null;
	candidatoId: string = '';
	candidatoItem: string = '';
	fecha: string = '';
	fechaAux: NgbDateStruct = null;
	responsable: string = '';
	notas: string = '';
	fechareal: string = '';
	fecharealAux: NgbDateStruct = null;
	responsablereal: string = '';
	feedback: string = '';
	comentarios: string = '';
	estatuseventoId: string = '';
	estatuseventoItem: string = '';
	
	eventoId: string = '';
	eventoItem: string = '';

}

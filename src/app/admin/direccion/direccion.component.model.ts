import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { Candidato } from "../candidato/candidato.component.model";


export class Direccion {

	candidato : Candidato = null;
	candidatoId: string = '';
	candidatoItem: string = '';
	calle: string = '';
	cp: string = '';
	ciudad: string = '';
	estado: string = '';
	
	direccionId: string = '';
	direccionItem: string = '';

}

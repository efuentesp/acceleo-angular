import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { Posicion } from "../posicion/posicion.component.model";
import { Candidato } from "../candidato/candidato.component.model";


export class Solicitud {

	posicion : Posicion = new Posicion;
	posicionId: string = '';
	posicionItem: string = '';
	candidato : Candidato = new Candidato;
	candidatoId: string = '';
	candidatoItem: string = '';
	fecha: string = '';
	fechaAux: NgbDateStruct = null;
	salario: number = null;
	correo: string = '';
	telefono: string = '';
	estatussolicitudId: string = '';
	estatussolicitudItem: string = '';
	
	solicitudId: string = '';
	solicitudItem: string = '';

}

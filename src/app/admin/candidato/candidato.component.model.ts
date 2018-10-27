import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { Solicitud } from "../solicitud/solicitud.component.model";
import { Evento } from "../evento/evento.component.model";


export class Candidato {

	nombre: string = '';
	apellidopaterno: string = '';
	apellidomaterno: string = '';
	fecha: string = '';
	fechaAux: NgbDateStruct = null;
	generoId: string = '';
	generoItem: string = '';
	estatuscandidatoId: string = '';
	estatuscandidatoItem: string = '';
	candidatoId: string = '';
	candidatoItem: string = '';
	username: string = '';

}

import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

export class Candidato {

	candidatoId: number = null;
	candidatoItem: string = '';

	fecha: string = '';
	fechaAux: NgbDateStruct = null;
	apellidomaterno: string = '';
	nombre: string = '';
	apellidopaterno: string = '';

	generoId: string = '';
	generoItem: string = '';	
	estatuscandidatoId: string = '';
	estatuscandidatoItem: string = '';	
	solicitudId: number = null;
	solicitudItem: string = '';
	eventoId: number = null;
	eventoItem: string = '';
}

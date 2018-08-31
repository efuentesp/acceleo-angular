import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

export class Ordensimplificada {

	ordensimplificadaId: number = null;
	ordensimplificadaItem: string = '';

	fechafinal: string = '';
	fechafinalAux: NgbDateStruct = null;
	ordentrabajo: number = null;
	cantidadprogramada: number = null;
	sap: number = null;
	cantidadproducida: number = null;
	fechainicial: string = '';
	fechainicialAux: NgbDateStruct = null;

	lineaId: string = '';
	lineaItem: string = '';	
	destinoId: string = '';
	destinoItem: string = '';	
	estadoordenId: string = '';
	estadoordenItem: string = '';	
	operadorproduccionId: number = null;
	operadorproduccionItem: string = '';
	comentario: string = '';
	clienteId: number = null;
	clienteItem: string = '';
}

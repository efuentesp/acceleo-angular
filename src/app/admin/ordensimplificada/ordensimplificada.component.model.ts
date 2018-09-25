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

	linea1Id: string = '';
	linea1Item: string = '';

	destino1Id: string = '';
	destino1Item: string = '';	

	estadoorden1Id: string = '';
	estadoorden1Item: string = '';

	estadoorden2Id: string = '';
	estadoorden2Item: string = '';

	operadorproduccion1Id: number = null;
	operadorproduccion1Item: string = '';

	operadorproduccion2Id: number = null;
	operadorproduccion2Item: string = '';

	comentario: string = '';
	
	cliente1Id: number = null;
	cliente1Item: string = '';
}

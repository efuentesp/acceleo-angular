import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

export class Tasadeinteres {

	tasadeinteresId: number = null;
	tasadeinteresItem: string = '';

	fechainicio: string = '';
	fechainicioAux: NgbDateStruct = null;
	tasa: string = '';
	fechafin: string = '';
	fechafinAux: NgbDateStruct = null;

	empresaId: number = null;
	empresaItem: string = '';
}

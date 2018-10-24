import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { Candidato } from "../candidato/candidato.component.model";
import { Documento } from "../documento/documento.component.model";


export class Trayectoria {

	candidato : Candidato = new Candidato;
	candidatoId: string = '';
	candidatoItem: string = '';
	tipotrayectoriaId: string = '';
	tipotrayectoriaItem: string = '';
	descripcion: string = '';
	clave: string = '';
	documento : Documento = new Documento;
	documentoId: string = '';
	documentoItem: string = '';
	
	trayectoriaId: string = '';
	trayectoriaItem: string = '';

}

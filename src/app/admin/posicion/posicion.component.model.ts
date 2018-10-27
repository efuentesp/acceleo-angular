import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { Filial } from "../filial/filial.component.model";
import { Puesto } from "../puesto/puesto.component.model";
import { Reclutador } from "../reclutador/reclutador.component.model";
import { Solicitud } from "../solicitud/solicitud.component.model";
import { Evento } from "../evento/evento.component.model";


export class Posicion {

	filial : Filial = null;
	filialId: string = '';
	filialItem: string = '';
	puesto : Puesto = null;
	puestoId: string = '';
	puestoItem: string = '';
	nombre: string = '';
	descripcion: string = '';
	fecha: string = '';
	fechaAux: NgbDateStruct = null;
	contacto: string = '';
	salario: number = null;
	vacantes: number = null;
	tiponominaId: string = '';
	tiponominaItem: string = '';
	reclutador : Reclutador = null;
	reclutadorId: string = '';
	reclutadorItem: string = '';
	estatusposicionId: string = '';
	estatusposicionItem: string = '';
	
	posicionId: string = '';
	posicionItem: string = '';

}

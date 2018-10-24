import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { Rol } from "../rol/rol.component.model";


export class Usuario {

	nombreclave: string = '';
	password: string = '';
	activo: number = null;
	rol : Rol = null;
	rolId: string = '';
	rolItem: string = '';
	
	usuarioId: string = '';
	usuarioItem: string = '';

}

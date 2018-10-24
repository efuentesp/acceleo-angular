import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { Rol } from "../rol/rol.component.model";


export class Permiso {

	rol : Rol = null;
	rolId: string = '';
	rolItem: string = '';
	funcion: string = '';
	ruta: string = '';
	nivelpermiso: string = '';
	
	permisoId: string = '';
	permisoItem: string = '';

}

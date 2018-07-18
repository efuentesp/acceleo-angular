import { Authority } from "../../user/authorities.component.model";





export class User {

	idUser: number = null;   // <--- On Session
	username:  string = '';
	password:  string = '';
	token: string = '';
	firstname: string;
	lastname:string;
	authorities: Authority[];
	
	email: string = '';
	enabled: boolean = false;
	selected: number = null;
}

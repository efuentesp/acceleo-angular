import { ConfigAuthority } from "./manage-authority.component.model";

export class AdminPermiso {

	// idGrupo: number = null;
	// nombreGrupo: string = '';
	// idPrivilege: number = null;
	// nombrePrivilege: string = '';
	// admin: boolean = false;
	// user: boolean = false;
	// anonymous: boolean = false;
	// idAuthorityAdmin: number = null;
	// idPrivilegeAdmin: number = null;
	// idPrivilegeUser: number = null;
	// idAuthorityAnonymous: number = null;
    // idPrivilegeAnonymous: number = null;
    // activeUser: number = null;

    public idGrupo: number = null;
	public nombreGrupo: string = '';
	public idPrivilege: number = null;
	public nombrePrivilege: string = '';
    public activeUser: number = null;
    public lstConfigAuthority: ConfigAuthority[];
	
}
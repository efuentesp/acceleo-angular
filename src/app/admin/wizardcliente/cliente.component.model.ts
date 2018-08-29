export class Cliente {
	id: number = null;
	firstName: string = '';
	lastName : string = '';
	email: string = '';
	work: string = '';
	street: string = '';
	city: string = '';
	state: string = '';
	zip: string = '';
	step: number = null;

	clear() {
		this.id = null;
		this.firstName = '';
		this.lastName = '';
		this.email = '';
		this.work = '';
		this.street = '';
		this.city = '';
		this.state = '';
		this.zip = '';
		this.step = null;
	}
}

export class Personal {
    id: number = null;
    firstName: string = '';
    lastName : string = '';
    email: string = '';
    step: number = null;
}

export class Address {
    street: string = '';
    city: string = '';
    state: string = '';
    zip: string = '';

}

export class Work{
  work: string ='';
}

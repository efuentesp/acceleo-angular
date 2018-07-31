import { Injectable }                              from '@angular/core';
import { environment }                             from "../../../environments/environment";
import { Http, Response }                          from "@angular/http";
import { Headers, RequestOptions }                 from '@angular/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { Repository }                           from '../repository/repository.component.model';
import { User } from '../user/user.component.model';
import { UserStorageComponent } from '../user/user-storage.component';

@Injectable()
export class RepositoryService {

    private isRepositoryFormValid: boolean = false;
    private env: any = environment;
    private repository = new Repository();
    private flag :boolean = false;
    private flagDelete :boolean = false;
    private storage: UserStorageComponent;

    public user: User = JSON.parse(localStorage.getItem('currentUser'));

    constructor(private http: Http) {
    }

    getAllRepository(){
		let headers = new Headers;
         headers.append('Content-Type','application/json');
         headers.append('Authorization','Bearer ' + this.user.token+'');
         let opts = new RequestOptions({ headers: headers });
      return this.http.get(this.env.api + "/repository", opts).pipe(map(res => res.json()));
    }

    saveRepository(repository){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });

		if (!repository.repositoryId){
            return this.http.post(this.env.api + "/repository", repository, opts).pipe(map(res => res));
        }else{
            return this.http.put(this.env.api + "/repository/"+ repository.repositoryId, repository, opts).pipe(map(res => res));
        }
    }

    deleteRepository(repository){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.delete(this.env.api + "/repository/"+repository.repositoryId, opts).pipe(map(res => res));
    }

    getRepositoryById(repositoryId){

        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.get(this.env.api + "/idrepository/"+repositoryId, opts).pipe(map(res => res.json()));
    }

    resetRepository(): Repository {
        this.clear();
        return this.repository;
    }

    getRepository(): Repository {
        var repository: Repository = {
					e2_4: this.repository.e2_4, 
					e8_10: this.repository.e8_10, 
					e11_25: this.repository.e11_25, 
					e5_7: this.repository.e5_7, 
					
					repositoryId: this.repository.repositoryId	

        };
        return repository;
    }


setRepository(repository: Repository) {
       
	this.isRepositoryFormValid = true;
			this.repository.e2_4 = repository.e2_4;    
			this.repository.e8_10 = repository.e8_10;    
			this.repository.e11_25 = repository.e11_25;    
			this.repository.e5_7 = repository.e5_7;    
			this.repository.repositoryId        = repository.repositoryId;
        	this.validateRepository();
    }

    isFormValid() {
        return this.isRepositoryFormValid;
    }

    validateRepository() {

    }

    clear() {

			this.repository.e2_4 = '';    
			this.repository.e8_10 = '';    
			this.repository.e11_25 = '';    
			this.repository.e5_7 = '';    
			this.repository.repositoryId = null;
    }

    setEdit(flag){
        this.flag = flag;
    }

    getEdit(){
        return this.flag;
    }

    setDelete(flagDelete){
      this.flagDelete = flagDelete;
    }

    getDelete(){
      return this.flagDelete;
    }

}

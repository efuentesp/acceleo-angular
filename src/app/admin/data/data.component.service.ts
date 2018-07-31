import { Injectable }                              from '@angular/core';
import { environment }                             from "../../../environments/environment";
import { Http, Response }                          from "@angular/http";
import { Headers, RequestOptions }                 from '@angular/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { Data }                           from '../data/data.component.model';
import { User } from '../user/user.component.model';
import { UserStorageComponent } from '../user/user-storage.component';

@Injectable()
export class DataService {

    private isDataFormValid: boolean = false;
    private env: any = environment;
    private data = new Data();
    private flag :boolean = false;
    private flagDelete :boolean = false;
    private storage: UserStorageComponent;

    public user: User = JSON.parse(localStorage.getItem('currentUser'));

    constructor(private http: Http) {
    }

    getAllData(){
		let headers = new Headers;
         headers.append('Content-Type','application/json');
         headers.append('Authorization','Bearer ' + this.user.token+'');
         let opts = new RequestOptions({ headers: headers });
      return this.http.get(this.env.api + "/data", opts).pipe(map(res => res.json()));
    }

    saveData(data){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });

		if (!data.dataId){
            return this.http.post(this.env.api + "/data", data, opts).pipe(map(res => res));
        }else{
            return this.http.put(this.env.api + "/data/"+ data.dataId, data, opts).pipe(map(res => res));
        }
    }

    deleteData(data){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.delete(this.env.api + "/data/"+data.dataId, opts).pipe(map(res => res));
    }

    getDataById(dataId){

        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.get(this.env.api + "/iddata/"+dataId, opts).pipe(map(res => res.json()));
    }

    resetData(): Data {
        this.clear();
        return this.data;
    }

    getData(): Data {
        var data: Data = {
					d0_10: this.data.d0_10, 
					d41_100: this.data.d41_100, 
					d10_25: this.data.d10_25, 
					d26_40: this.data.d26_40, 
					
					dataId: this.data.dataId	

        };
        return data;
    }


setData(data: Data) {
       
	this.isDataFormValid = true;
			this.data.d0_10 = data.d0_10;    
			this.data.d41_100 = data.d41_100;    
			this.data.d10_25 = data.d10_25;    
			this.data.d26_40 = data.d26_40;    
			this.data.dataId        = data.dataId;
        	this.validateData();
    }

    isFormValid() {
        return this.isDataFormValid;
    }

    validateData() {

    }

    clear() {

			this.data.d0_10 = '';    
			this.data.d41_100 = '';    
			this.data.d10_25 = '';    
			this.data.d26_40 = '';    
			this.data.dataId = null;
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

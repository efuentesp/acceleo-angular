import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterDepartamento',
    pure: false
})

@Injectable()
export class SearchDepartamentoPipe implements PipeTransform {
      transform(items: any[], busquedaDepartamento): any {
        return busquedaDepartamento && items ? items.filter(item =>
			((item.empresaItem+"").toString().indexOf(busquedaDepartamento) !== -1)
||			((item.nombredepto+"").toLowerCase().indexOf((busquedaDepartamento+"").toLowerCase()) !== -1) 
||			((item.representante+"").toLowerCase().indexOf((busquedaDepartamento+"").toLowerCase()) !== -1) 
        ): items;
    }
}

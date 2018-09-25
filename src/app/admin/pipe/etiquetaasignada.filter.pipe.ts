import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterEtiquetaasignada',
    pure: false
})

@Injectable()
export class SearchEtiquetaasignadaPipe implements PipeTransform {
      transform(items: any[], busquedaEtiquetaasignada): any {
        return busquedaEtiquetaasignada && items ? items.filter(item =>
			((item.sap+"").toLowerCase().indexOf((busquedaEtiquetaasignada+"").toLowerCase()) !== -1) 
||			((item.clienteItem+"").toString().indexOf(busquedaEtiquetaasignada) !== -1)
        ): items;
    }
}

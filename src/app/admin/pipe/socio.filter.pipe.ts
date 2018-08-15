import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterSocio',
    pure: false
})

@Injectable()
export class SearchSocioPipe implements PipeTransform {
      transform(items: any[], busquedaSocio): any {
        return busquedaSocio && items ? items.filter(item =>
			((item.numero+"").toLowerCase().indexOf((busquedaSocio+"").toLowerCase()) !== -1) 
||			((item.nombre+"").toLowerCase().indexOf((busquedaSocio+"").toLowerCase()) !== -1) 
||			((item.apellidopaterno+"").toLowerCase().indexOf((busquedaSocio+"").toLowerCase()) !== -1) 
||			((item.apellidomaterno+"").toLowerCase().indexOf((busquedaSocio+"").toLowerCase()) !== -1) 
||			((item.esId+"").toString().indexOf(busquedaSocio) !== -1)
||			((item.tipoId+"").toString().indexOf(busquedaSocio) !== -1)
||			((item.perteneceItem+"").toString().indexOf(busquedaSocio) !== -1)
        ): items;
    }
}

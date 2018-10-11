import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterSolicitud',
    pure: false
})

@Injectable()
export class SearchSolicitudPipe implements PipeTransform {
      transform(items: any[], busquedaSolicitud): any {
        return busquedaSolicitud && items ? items.filter(item =>
			((item.posicionItem+"").toString().indexOf(busquedaSolicitud) !== -1)
||			((item.candidatoItem+"").toString().indexOf(busquedaSolicitud) !== -1)
||||			((item.salario+"").toLowerCase().indexOf((busquedaSolicitud+"").toLowerCase()) !== -1) 
||			((item.estadoId+"").toString().indexOf(busquedaSolicitud) !== -1)
        ): items;
    }
}

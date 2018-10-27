import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterSolicitud',
    pure: false
})

@Injectable()
export class SearchSolicitudPipe implements PipeTransform {
      transform(items: any[], busquedaSolicitud): any {
        return busquedaSolicitud && items ? items.filter(item =>
        
			((item.posicion.nombre+"").toString().toLowerCase().indexOf((busquedaSolicitud+"").toLowerCase()) !== -1)
			||
			((item.candidato.nombre+"").toString().toLowerCase().indexOf((busquedaSolicitud+"").toLowerCase()) !== -1)
			||
			((item.fecha+"").toLowerCase().indexOf((busquedaSolicitud+"").toLowerCase()) !== -1)
			||
			((item.salario+"").toLowerCase().indexOf((busquedaSolicitud+"").toLowerCase()) !== -1)
			||
			((item.estatussolicitudItem+"").toString().toLowerCase().indexOf((busquedaSolicitud+"").toLowerCase()) !== -1)
        ): items;
    }
}

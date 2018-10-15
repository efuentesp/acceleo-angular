import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterCandidato',
    pure: false
})

@Injectable()
export class SearchCandidatoPipe implements PipeTransform {
      transform(items: any[], busquedaCandidato): any {
        return busquedaCandidato && items ? items.filter(item =>
        
			((item.nombre+"").toLowerCase().indexOf((busquedaCandidato+"").toLowerCase()) !== -1)
			||
			((item.apellidopaterno+"").toLowerCase().indexOf((busquedaCandidato+"").toLowerCase()) !== -1)
			||
			((item.apellidomaterno+"").toLowerCase().indexOf((busquedaCandidato+"").toLowerCase()) !== -1)
			||
			((item.fecha+"").toLowerCase().indexOf((busquedaCandidato+"").toLowerCase()) !== -1)
			||
			((item.generoItem+"").toString().indexOf((busquedaCandidato+"").toLowerCase()) !== -1)
			||
			((item.estatuscandidatoItem+"").toString().indexOf((busquedaCandidato+"").toLowerCase()) !== -1)
        ): items;
    }
}

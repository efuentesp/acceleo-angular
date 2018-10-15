import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterDocumento',
    pure: false
})

@Injectable()
export class SearchDocumentoPipe implements PipeTransform {
      transform(items: any[], busquedaDocumento): any {
        return busquedaDocumento && items ? items.filter(item =>
        
			((item.nombre+"").toLowerCase().indexOf((busquedaDocumento+"").toLowerCase()) !== -1)
			||
			((item.descripcion+"").toLowerCase().indexOf((busquedaDocumento+"").toLowerCase()) !== -1)
        ): items;
    }
}

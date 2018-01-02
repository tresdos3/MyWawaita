import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DataService } from '../service/data.service';

@Pipe({
  name: 'doc'
})
export class DocPipe implements PipeTransform {

  constructor(private db: DataService) { }
  transform(value: any): Observable<any> {
    return this.db.GetDocuments(value.path);
  }

}

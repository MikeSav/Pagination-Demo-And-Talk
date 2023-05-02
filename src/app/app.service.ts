import {
  HostListener,
  Injectable
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  dataUrl = '../data/simple-data.json';

  constructor(private http: HttpClient) { }

  getData(url = this.dataUrl): Observable<any> {
    return this.http.get(url);
  }
}

// First we import the classes required
import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';
 
// All the RxJS stuff we need
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ServerDataResponseService {

  private baseUrl = 'http://localhost:62014/api';
  
     // Injecting the http client into the service
     constructor(private http: Http) {}
  
     // Method retrieve all the posts
    getValues () {
      var endPointUrl =this.baseUrl + '/values';
      var values;
      this.http.get(endPointUrl).subscribe(
        result => values = result
      );
      return values;
    }

}

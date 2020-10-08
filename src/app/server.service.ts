import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import Swal from 'sweetalert2';
import { throwError } from 'rxjs';
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  protocol = window.location.protocol;
  hostname = window.location.hostname;
  port = 8000;
  hostAddress = `${this.protocol}//${this.hostname}:${this.port}/`;


  constructor(
    private httpClient: HttpClient
  ) { }



  postData(url, data) {

    const header = new HttpHeaders({ 'Content-Type' : 'application/json' });
    return this.httpClient.post<any>(this.hostAddress+url,data,{headers:header}).pipe(catchError(this.handleError));

  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // Swal.fire("Error",errorMessage,"error");
    // window.alert(errorMessage);
    return throwError(errorMessage);
  }
}

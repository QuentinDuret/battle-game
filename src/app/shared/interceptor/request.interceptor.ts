import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  private getToken(): string | null {
    return "MySecret2024"; 
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.getToken();  
    let headers = new HttpHeaders();        
    let updateReq = req.clone({
        url: req.url,
        headers: req.headers         
    })    
    
   
    headers  = updateReq.headers.append('Authorization', `${token}` );
     
    headers = headers.set('Content-Type', 'application/json');        
    updateReq = req.clone({headers});   
    return next.handle(updateReq);
}
}

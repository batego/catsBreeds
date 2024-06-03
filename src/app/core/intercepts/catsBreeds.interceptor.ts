import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CatBreedsService } from '../services/catBreeds.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class CatsBreedsInterceptor implements HttpInterceptor {

  constructor(private catBreed: CatBreedsService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const cloneReq = req.clone({
      setHeaders: { 'x-api-key': environment.key },
    });

    return next.handle(req);
  }
}

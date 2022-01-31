import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {catchError, Observable, throwError as observableThrowError } from "rxjs";

@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor{
        constructor(){}
       intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
            req = req.clone({
                setHeaders:{
                    'x-rapidapi-key': 'esGbwrm390mshS2BCl0RALxQRtZTp1W7sFMjsnyJlJzDXVkW0H',
                    'x-rapidapi-host': 'rawg-video-games-database.p.rapidapi.com',
                },
                setParams: {
                    key: '25c4746d87c24b6186f2483cee19fc49',
                }
            });
            return next.handle(req);
        }
    }
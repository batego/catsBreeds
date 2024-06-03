import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CatsBreedsInterceptor } from './app/core/intercepts/catsBreeds.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    appConfig.providers,
    importProvidersFrom([BrowserModule, BrowserAnimationsModule, HttpClientModule]),
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: CatsBreedsInterceptor,
    //   multi: true,
    // },
  ],
}).catch((err) => console.error(err));

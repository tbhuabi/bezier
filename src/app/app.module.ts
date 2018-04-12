import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule }  from '@angular/platform-browser';
import { UIFormsModule } from 'tanbo-ui-native';

import { AppComponent } from './app';

import { HomeComponent } from '../pages/home/home';
import { OtherComponent } from '../pages/other/other.component';
import { routing } from './app.routing';
import { ApiInterceptor } from './api-interceptor';

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        routing,
        UIFormsModule,
        FormsModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        OtherComponent
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: ApiInterceptor,
        multi: true
    }, {
        provide: APP_BASE_HREF,
        useValue: '/'
    }],
    bootstrap: [AppComponent]
})
export class AppModule {
}

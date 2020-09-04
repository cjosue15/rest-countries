import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

@NgModule({
    declarations: [AppComponent, HomeComponent],
    imports: [BrowserModule, HttpClientModule, AppRoutingModule, ComponentsModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { DetailComponent } from './pages/detail/detail.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [AppComponent, HomeComponent, DetailComponent],
    imports: [BrowserModule, HttpClientModule, AppRoutingModule, ComponentsModule, ReactiveFormsModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}

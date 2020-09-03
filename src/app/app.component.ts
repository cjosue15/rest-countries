import { Component, OnInit } from '@angular/core';
import { CountriesService } from './services/countries.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    data: any[];
    regiones: any[];
    contador: number;
    constructor(private countriesService: CountriesService) {
        this.data = [];
        this.regiones = [];
        this.contador = 10;
    }

    ngOnInit(): void {
        this.getData();
    }

    async getData() {
        try {
            this.data = await this.countriesService.getAllCountries().toPromise();
            this.regiones = await this.countriesService.getSelects().toPromise();
        } catch (error) {
            console.log(error);
        }
    }

    pedirMas() {
        this.contador += 10;
    }
}

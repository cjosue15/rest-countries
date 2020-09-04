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
    selected: any;
    constructor(private countriesService: CountriesService) {
        this.data = [];
        this.regiones = [];
        this.contador = 10;
        this.selected = { id: '', text: 'Filter by Region' };
        this.getData();
    }

    ngOnInit(): void {
        window.onscroll = () => {
            let scrollHeight;
            let totalHeight;
            scrollHeight = document.body.scrollHeight;
            totalHeight = window.scrollY + window.innerHeight;
            if (totalHeight >= scrollHeight) {
                this.contador += 10;
            }
        };
    }

    async getData() {
        try {
            this.data = await this.countriesService.getAllCountries().toPromise();
            this.regiones = await this.countriesService.getSelects().toPromise();
            this.regiones.unshift({ id: '', text: 'All', count: this.data.length });
        } catch (error) {
            console.log(error);
        }
    }

    changeRegion(event) {
        this.selected = event;
        console.log(event);
    }

    pedirMas() {
        this.contador += 10;
    }
}

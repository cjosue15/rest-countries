import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
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
                // console.log(this.data.length);

                if (this.contador < this.data.length) {
                    setTimeout(() => {
                        this.contador += 10;
                    }, 500);
                }

                // console.log(this.contador);
            }
        };
    }

    async getData() {
        try {
            this.data = await this.countriesService.getAllCountries().toPromise();
            this.regiones = await this.countriesService.getSelects().toPromise();
            this.regiones.unshift({ id: 'all', text: 'All', count: this.data.length });
        } catch (error) {
            console.log(error);
        }
    }

    changeRegion(event) {
        this.contador = 10;
        this.selected = event;
        const ruta = event.id === 'all' ? 'all' : `region/${event.id}`;

        this.countriesService.getCountriesByRegion(ruta).subscribe((response) => {
            this.data = response;
            console.log(response);
        });
    }

    pedirMas() {
        this.contador += 10;
    }
}

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
    data: any[];
    dataBefore: any[];
    regiones: any[];
    contador: number;
    selected: any;
    loading: boolean;
    loadingMore: boolean;
    espera: number;
    search: FormControl;
    // @ViewChild('search', { static: false }) search: ElementRef;
    constructor(private countriesService: CountriesService, private router: Router) {
        this.data = [];
        this.dataBefore = [];
        this.loading = false;
        this.loadingMore = false;
        this.regiones = [];
        this.espera = 0;
        this.contador = 12;
        this.search = new FormControl('');
        this.selected = { id: 'all', text: 'Filter by Region' };
        this.getData();
    }

    ngOnInit(): void {
        window.onscroll = () => {
            let scrollHeight;
            let totalHeight;
            scrollHeight = document.body.scrollHeight;
            totalHeight = window.scrollY + window.innerHeight;
            if (totalHeight >= scrollHeight) {
                if (this.contador < this.data.length) {
                    this.espera++;
                    this.loadingMore = true;
                    setTimeout(() => {
                        this.espera--;
                        if (this.espera === 0) {
                            this.contador += 12;
                            this.loadingMore = false;
                        }
                    }, 700);
                }
            }
        };
    }

    async getData() {
        this.loading = true;
        try {
            this.data = await this.countriesService.getAllCountries().toPromise();
            this.dataBefore = await this.countriesService.getAllCountries().toPromise();
            this.regiones = await this.countriesService.getSelects().toPromise();
            this.regiones.unshift({ id: 'all', text: 'All', count: this.data.length });
            this.loading = false;
        } catch (error) {
            console.log(error);
            this.loading = false;
        }
    }

    changeRegion(event) {
        this.loading = true;
        this.contador = 12;
        this.selected = event;
        const ruta = event.id === 'all' ? 'all' : `region/${event.id}`;
        this.search.setValue('');
        this.countriesService.getCountriesByRegion(ruta).subscribe((response) => {
            this.data = response;
            this.dataBefore = response;
            this.loading = false;
        });
    }

    searchCountrie() {
        this.espera++;
        setTimeout(() => {
            this.espera--;
            if (this.espera === 0) {
                this.contador = 12;
                const value = this.search.value;
                this.data = this.dataBefore.filter(
                    (item) => item.name.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) !== -1
                );
                // console.log(this.dataBefore);
                // console.log(this.data);
            }
        }, 500);
    }

    details(name: string) {
        this.router.navigate([`details/${name.toLowerCase()}`]);
    }
}

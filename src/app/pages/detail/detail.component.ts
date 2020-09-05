import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
    name: string;
    countrie: any;
    loading: boolean;
    languages: string;
    currencies: string;
    domains: string;
    borders: any[];
    constructor(
        private activatedRoute: ActivatedRoute,
        private countriesService: CountriesService,
        private titleService: Title
    ) {
        this.loading = false;
        this.languages = '';
        this.currencies = '';
        this.domains = '';
        this.borders = [];
        this.activatedRoute.params.subscribe((params) => {
            if (params.name) {
                this.name = params.name;
                this.getDetalle();
            }
        });
    }

    ngOnInit(): void {}

    async getDetalle() {
        this.loading = true;
        this.borders = [];

        try {
            this.countrie = await this.countriesService.getCountrieDetail(this.name).toPromise();
            this.titleService.setTitle(this.countrie.name);
            this.languages = this.countrie.languages.map((item) => item.name).join(', ');
            this.currencies = this.countrie.currencies.map((item) => item.name).join(', ');
            this.domains = this.countrie.topLevelDomain.join(', ');
            this.countrie.borders.forEach(async (element) => {
                const pais = await this.countriesService.getBorderByCountrie(element).toPromise();
                this.borders.push(pais);
            });
            this.loading = false;
        } catch (error) {
            this.loading = false;
        }

        // getBorderByCountrie
    }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountriesService } from '../../services/countries.service';

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
    constructor(private activatedRoute: ActivatedRoute, private countriesService: CountriesService) {
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
        // this.countriesService.getCountrieDetail(this.name).subscribe(
        //     (response) => {
        //         this.countrie = response;
        //         this.languages = this.countrie.languages.map((item) => item.name).join(', ');
        //         this.currencies = this.countrie.currencies.map((item) => item.name).join(', ');
        //         this.domains = this.countrie.topLevelDomain.join(', ');
        //         this.loading = false;
        //     },
        //     (error) => {
        //         this.loading = false;
        //     }
        // );

        try {
            this.countrie = await this.countriesService.getCountrieDetail(this.name).toPromise();
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

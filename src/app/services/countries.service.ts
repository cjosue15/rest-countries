import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class CountriesService {
    url: string;
    constructor(private http: HttpClient) {
        this.url = 'https://restcountries.eu/rest/v2/';
    }

    getAllCountries() {
        return this.http.get(`${this.url}all`).pipe(map((response: any) => response));
    }

    getCountriesByRegion(region) {
        return this.http.get(`${this.url}${region}`).pipe(map((response: any) => response));
    }

    getSelects() {
        return this.http.get(`${this.url}all?fields=region`).pipe(
            map((response: any) => {
                const result = response.reduce((a, { region }) => {
                    if (region) {
                        a[region] = a[region] || { region, countries: 0 };
                        a[region].countries += 1;
                    }
                    return a;
                }, {});

                return Object.values(result).map((item: any) => ({
                    id: item.region.toLocaleLowerCase(),
                    text: item.region,
                    count: item.countries,
                }));
            })
        );
    }
}

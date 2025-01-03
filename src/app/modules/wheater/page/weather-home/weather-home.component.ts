import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { WeatherDatas } from 'src/app/models/interfaces/WeatherDatas';
import { Subject, takeUntil } from 'rxjs';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-weather-home',
  templateUrl: './weather-home.component.html',
})
export class WheaterHomeComponent implements OnInit, OnDestroy {

  constructor(
    private weatherService: WeatherService,
  ) { }

  private readonly destroy$: Subject<void> = new Subject();

  initialCityName = 'São Paulo';
  weatherData!: WeatherDatas;
  searchIcon = faMagnifyingGlass;

  ngOnInit() {
    this.getWeatherDatas(this.initialCityName);
  }

  getWeatherDatas(cityName: string): void {
    this.weatherService.getWeatherDatas(cityName)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        response && (this.weatherData = response);
    },
    error: (error) => {
      console.error(error);
    }
  });
}

  onSubmit(): void {
    this.getWeatherDatas(this.initialCityName);
    this.initialCityName = '';
  }


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

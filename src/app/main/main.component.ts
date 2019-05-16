import { Component, OnInit, OnDestroy } from '@angular/core';
import { Game } from './game.model';
import { Subscription } from 'rxjs';
import { GameService } from './game.service';
import { PageEvent } from '@angular/material';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  games: Game[] = [];
  isLoading = false;
  totalGames = 10;
  gamesPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  years: Date[];
  genres: string[];
  private gamesSub: Subscription;
  private yearsSub: Subscription;
  private genresSub: Subscription;

  constructor(private gameService: GameService) {
    this.gameService.getYears();
    this.yearsSub = this.gameService.getYearsUpdateListener()
      .subscribe(years => {
        this.years = years;
      });
    this.gameService.getGenres();
    this.genresSub = this.gameService.getGenresUpdateListener()
    .subscribe(genres => {
      this.genres = genres;
    });
   }


  ngOnInit() {
    this.isLoading = true;
    this.gameService.getGames(this.gamesPerPage, this.currentPage);
    this.gamesSub = this.gameService
      .getGameUpdateListener()
      .subscribe((gameData) => {
        this.isLoading = false;
        this.games = gameData.games;
        this.totalGames = gameData.gameCount;
      });
  }

  search(form: NgForm) {
    console.log(form.value['1980']);
    const searchYears = [];
    const searchGenres = [];
    const years = [];
    this.years.forEach(y => {
      years.push(y.getFullYear().toString());
    });
    Object.getOwnPropertyNames(form.value).forEach(name => {
      if (years.includes(name)) {
        if (form.value[name]) {
          searchYears.push(name);
        }

      } else if (this.genres.includes(name)) {
        if (form.value[name]) {
          searchGenres.push(name);
        };
      }
    });
    this.gameService.getGamesBySearch(searchYears, searchGenres);
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.gamesPerPage = pageData.pageSize;
    this.gameService.getGames(this.gamesPerPage, this.currentPage);

  }

  ngOnDestroy() {
    this.gamesSub.unsubscribe();
    this.yearsSub.unsubscribe();
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Game } from './game.model';
import { Subscription } from 'rxjs';
import { GameService } from './game.service';
import { PageEvent } from '@angular/material';

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
  private gamesSub: Subscription;

  constructor(private gameService: GameService) { }

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

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.gamesPerPage = pageData.pageSize;
    this.gameService.getGames(this.gamesPerPage, this.currentPage);

  }

  ngOnDestroy() {
    this.gamesSub.unsubscribe();
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Game } from './game.model';
import { Subscription } from 'rxjs';
import { GameService } from './game.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  games: Game[] = [];
  isLoading = false;
  private gamesSub: Subscription;

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.isLoading = true;
    this.gameService.getGames();
    this.gamesSub = this.gameService
      .getGameUpdateListener()
      .subscribe((games: Game[]) => {
        this.isLoading = false;
        this.games = games;
      });
  }

  ngOnDestroy() {
    this.gamesSub.unsubscribe();
  }

}

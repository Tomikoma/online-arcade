import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from '../game.model';
import { GameService } from '../game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {

  gameId: string;
  routeSub: Subscription;

  game: Game;
  private gameSub: Subscription;

  constructor(private route: ActivatedRoute, private gameService: GameService) {
    this.routeSub = this.route.params.subscribe( params => {
      this.gameId = params.id;
    });
  }

  ngOnInit() {
    this.gameService.getGames();
    this.gameSub = this.gameService.getGameUpdateListener()
      .subscribe((games: Game[]) => {
        this.game = games.find(game => game.id === this.gameId);
      });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
    this.gameSub.unsubscribe();
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from '../game.model';
import { GameService } from '../game.service';
import { AuthService } from 'src/app/auth/auth.service';
import { NgForm } from '@angular/forms';
import { MyComment } from './mycomment.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {

  gameId: string;
  routeSub: Subscription;
  isUserAuthenticated = false;
  value = 5;
  ratingOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  game: Game;
  rating: number;
  count: number;
  comments: MyComment[];
  private rateSub: Subscription;
  private gameSub: Subscription;
  private authSub: Subscription;
  private commentSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private authService: AuthService,
    ) {
    this.route.params.subscribe( params => {
      this.gameId = params.id;
    });
  }

  ngOnInit() {
    this.gameService.getGame(this.gameId);
    this.gameSub = this.gameService.getOneGameUpdateListener()
      .subscribe(gameData => {
        this.game = gameData;
      });
    this.isUserAuthenticated = this.authService.getIsAuth();
    this.authSub = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.isUserAuthenticated = isAuthenticated;
      });
    this.gameService.getRating(this.gameId);
    this.rateSub = this.gameService.getRatingUpdateListener()
      .subscribe(ratingData => {
        this.rating = ratingData.rating;
        this.count = ratingData.count;
      });
    this.gameService.getComments(this.gameId);
    this.commentSub = this.gameService.getCommentsUpdateListener()
      .subscribe(comments => {
        this.comments = comments;
      });
  }

  rateGame(rating: number) {
    this.gameService.rateGame(rating, this.gameId);
  }
  comment(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.gameService.comment(form.value.content, this.gameId);
  }


  ngOnDestroy() {
    this.gameSub.unsubscribe();
    this.authSub.unsubscribe();
    this.rateSub.unsubscribe();
    this.commentSub.unsubscribe();
  }

}

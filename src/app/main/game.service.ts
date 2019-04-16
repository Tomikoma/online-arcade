import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Game } from './game.model';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class GameService {

  private games: Game[] = [];
  private gamesUpdated = new Subject<Game[]>();

  constructor(private http: HttpClient) {}

  getGames() {
    this.http.get<{message: string; games: any}>('http://localhost:3000/api/games')
    .subscribe(gameData => {
      console.log(gameData.message);
      this.games = gameData.games;
      this.gamesUpdated.next([...this.games]);
    });
  }

  getGameUpdateListener() {
    return this.gamesUpdated.asObservable();
  }

  getGame() {

  }
}

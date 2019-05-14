import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Game } from './game.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class GameService {

  private games: Game[] = [];
  private gamesUpdated = new Subject<Game[]>();

  constructor(private http: HttpClient) {}

  /*getGames() {
    this.http.get<{message: string; games: any}>('http://localhost:3000/api/games')
    .subscribe(gameData => {
      console.log(gameData.message);
      this.games = gameData.games;
      this.gamesUpdated.next([...this.games]);
    });
  }*/

  getGames() {
    this.http
      .get<{ message: string; games: any }>('http://localhost:3000/api/games')
      .pipe(
        map(gameData => {
          // console.log(gameData);
          return gameData.games.map(game => {
            return {
              id: game._id,
              title: game.title,
              releaseDate: new Date(game.releaseDate),
              genre: game.genre,
              images: game.images,
              description: game.description,
              modes: game.modes,
            };
          });
        })
      )
      .subscribe(transformedGames => {
        this.games = transformedGames;
        this.gamesUpdated.next([...this.games]);
      });
  }

  getGameUpdateListener() {
    return this.gamesUpdated.asObservable();
  }

}

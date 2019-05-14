import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Game } from './game.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class GameService {

  private games: Game[] = [];
  private gamesUpdated = new Subject<{games: Game[], gameCount: number}>();

  constructor(private http: HttpClient) {}

  /*getGames() {
    this.http.get<{message: string; games: any}>('http://localhost:3000/api/games')
    .subscribe(gameData => {
      console.log(gameData.message);
      this.games = gameData.games;
      this.gamesUpdated.next([...this.games]);
    });
  }*/

  getGames(gamesPerPage: number, currentPage: number) {
    const queryParams =  `?pagesize=${gamesPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; games: any , maxGames: number}>('http://localhost:3000/api/games' + queryParams)
      .pipe(
        map(gameData => {
          // console.log(gameData);
          return {games: gameData.games.map(game => {
            return {
              id: game._id,
              title: game.title,
              releaseDate: new Date(game.releaseDate),
              genre: game.genre,
              images: game.images,
              description: game.description,
              modes: game.modes,
            };
          }),
          maxGames: gameData.maxGames
        };
        })
      )
      .subscribe(transformedGames => {
        this.games = transformedGames.games;
        this.gamesUpdated.next({games: [...this.games], gameCount: transformedGames.maxGames});
      });
  }

  getGameUpdateListener() {
    return this.gamesUpdated.asObservable();
  }

}

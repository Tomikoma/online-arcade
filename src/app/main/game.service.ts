import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Game } from './game.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { MyComment } from './game/mycomment.model';

@Injectable({providedIn: 'root'})
export class GameService {

  private games: Game[] = [];
  private gamesUpdated = new Subject<{games: Game[], gameCount: number}>();
  private oneGameUpdated = new Subject<Game>();
  private ratingUpdateListener = new Subject<{rating: number, count: number}>();
  private commentsUpdateListener = new Subject<MyComment[]>();
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

  getGame(id: string) {
    this.http.get<{game: any}>('http://localhost:3000/api/games/' + id)
      .subscribe(gameData => {
        let game = gameData.game;
        game.releaseDate = new Date(game.releaseDate);
        game.id = gameData.game._id;
        this.oneGameUpdated.next(game);
      });
  }

  rateGame(rating: number, gameId: string){
    this.http.post('http://localhost:3000/api/games/rate', {rating, gameId})
      .subscribe(response => {
        console.log(response);
        this.getRating(gameId);
      });
  }

  comment(content: string, gameId: string) {
    const commentData = {content, gameId, commentDate: new Date()};
    this.http.post('http://localhost:3000/api/games/comment', commentData)
      .subscribe(response => {
        console.log(response);
        this.getComments(gameId);
      });
  }

  getComments(gameId: string) {
    this.http.get<{comments: any[]}>('http://localhost:3000/api/games/comment/' + gameId)
      .subscribe(commentData => {
        commentData.comments.forEach(comment => {
          comment.commentDate = new Date(comment.commentDate);
        });
        const comments = commentData.comments;
        this.commentsUpdateListener.next(comments);
      });
  }

  getRating(gameId: string) {
    this.http.get<{rating: number, count: number}>('http://localhost:3000/api/games/rate/' + gameId)
    .subscribe(ratingData => {
      this.ratingUpdateListener.next({rating: ratingData.rating, count: ratingData.count});
    });
  }

  getCommentsUpdateListener() {
    return this.commentsUpdateListener.asObservable();
  }

  getRatingUpdateListener(){
    return this.ratingUpdateListener.asObservable();
  }

  getGameUpdateListener() {
    return this.gamesUpdated.asObservable();
  }

  getOneGameUpdateListener() {
    return this.oneGameUpdated.asObservable();
  }
}

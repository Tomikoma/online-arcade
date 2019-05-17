import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Game } from './game.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { MyComment } from './game/mycomment.model';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl;

@Injectable({providedIn: 'root'})
export class GameService {


  private games: Game[] = [];
  private gamesUpdated = new Subject<{games: Game[], gameCount: number}>();
  private oneGameUpdated = new Subject<Game>();
  private ratingUpdateListener = new Subject<{rating: number, count: number}>();
  private commentsUpdateListener = new Subject<MyComment[]>();
  private yearsUpdateListener = new Subject<Date[]>();
  private genresUpdateListener = new Subject<string[]>();
  private gamesSearchUpdated = new Subject<{games: Game[], gameCount: number}>();
  constructor(private http: HttpClient) {}

  /*getGames() {
    this.http.get<{message: string; games: any}>(BACKEND_URL + 'games')
    .subscribe(gameData => {
      console.log(gameData.message);
      this.games = gameData.games;
      this.gamesUpdated.next([...this.games]);
    });
  }*/

  getYears() {
    this.http.get<{years: Date[]}>(BACKEND_URL + 'games/years')
      .subscribe(yearData => {
        let years = [];
        yearData.years.forEach(year => {
          years.push(new Date(year));
        });
        this.yearsUpdateListener.next(years);
      });
  }

  getGenres() {
    this.http.get<{genres: string[]}>(BACKEND_URL + 'games/genres')
      .subscribe(genreData => {
        this.genresUpdateListener.next(genreData.genres);
      });
  }

  getGamesBySearch(searchYears: string[], searchGenres: string[]) {
    if (searchYears.length === 0 && searchGenres.length === 0) {
      this.getGames(5, 1);
      return;
    }
    this.http.post<{games: any[], maxCount: number}>(BACKEND_URL + 'games/search',
     {years: searchYears, genres: searchGenres})
     .pipe(
      map(gameData => {
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
        maxGames: gameData.maxCount,
      };
      })
    )
      .subscribe(searchData => {
        this.gamesSearchUpdated.next({games: searchData.games,gameCount: searchData.maxGames});
      });
  }

  getGames(gamesPerPage: number, currentPage: number) {
    const queryParams =  `?pagesize=${gamesPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; games: any , maxGames: number}>(BACKEND_URL + 'games' + queryParams)
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
    this.http.get<{game: any}>(BACKEND_URL + 'games/' + id)
      .subscribe(gameData => {
        let game = gameData.game;
        game.releaseDate = new Date(game.releaseDate);
        game.id = gameData.game._id;
        this.oneGameUpdated.next(game);
      });
  }

  rateGame(rating: number, gameId: string){
    this.http.post(BACKEND_URL + 'games/rate', {rating, gameId})
      .subscribe(response => {
        console.log(response);
        this.getRating(gameId);
      });
  }

  comment(content: string, gameId: string) {
    const commentData = {content, gameId, commentDate: new Date()};
    this.http.post(BACKEND_URL + 'games/comment', commentData)
      .subscribe(response => {
        console.log(response);
        this.getComments(gameId);
      });
  }

  getComments(gameId: string) {
    this.http.get<{comments: any[]}>(BACKEND_URL + 'games/comment/' + gameId)
      .subscribe(commentData => {
        commentData.comments.forEach(comment => {
          comment.commentDate = new Date(comment.commentDate);
        });
        const comments = commentData.comments;
        this.commentsUpdateListener.next(comments);
      });
  }

  getRating(gameId: string) {
    this.http.get<{rating: number, count: number}>(BACKEND_URL + 'games/rate/' + gameId)
    .subscribe(ratingData => {
      this.ratingUpdateListener.next({rating: ratingData.rating, count: ratingData.count});
    });
  }

  getGameSearchUpdatedListener(){
    return this.gamesSearchUpdated.asObservable();
  }

  getGenresUpdateListener() {
    return this.genresUpdateListener.asObservable();
  }

  getYearsUpdateListener() {
    return this.yearsUpdateListener.asObservable();
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

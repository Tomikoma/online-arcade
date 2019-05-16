import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import {Howl, Howler} from 'howler';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
  userIsAuthenticated = false;
  private AuthListenerSub: Subscription;

  sound = new Howl({
    src: ['../../assets/music/Puzzle-Game.mp3'],
    volume: 1,
    loop: 1
  });

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.AuthListenerSub = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });

    //Howler.volume(0.5);
  }
  logout() {
    this.authService.logout();
  }

  startOrStopMusic(){
    if (!this.sound.playing()) {
      //this.sound.loop(1);
      this.sound.play();
    } else {
      this.sound.stop();
    }
  }


  ngOnDestroy() {
    this.AuthListenerSub.unsubscribe();
  }

}

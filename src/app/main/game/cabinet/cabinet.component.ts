import { Component, OnInit } from '@angular/core';
import {  HostListener } from '@angular/core';
import { Game } from './domain/Game';
import { Link } from './domain/Link';
import { Url } from 'url';
import { DomSanitizer } from '@angular/platform-browser';

const leftArrow = 37
const upArrow = 38
const rightArrow = 39
const downArrow = 40


@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.css']
})
export class CabinetComponent implements OnInit {

  image: Url;
  game: Game

  links = [
    new Link('#', 'Features'),
    new Link('#', 'Enterprise'),
    new Link('#', 'Support'),
    new Link('#', 'Pricing'),
  ]

  constructor(game: Game, private sanitizer: DomSanitizer) {
    this.game = game
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event) {
    event.preventDefault()
    switch (event.keyCode) {
      case leftArrow:  return this.game.moveBlockLeft()
      case rightArrow: return this.game.moveBlockRight()
      case upArrow:    return this.game.rotateBlock()
      case downArrow:  return this.game.moveDown()
      default:         return
    }
  }
  getUrl()
{
  return "url({{this.image}})";
}
  ngOnInit(){
    this.image = this.sanitizer.bypassSecurityTrustUrl
    ('https://letspartysalinas.com/wp-content/uploads/2019/03/Tetris-Arcade-Game-Rental-e1552242029381.jpg');
  }

}

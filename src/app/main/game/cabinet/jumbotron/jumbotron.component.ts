import { Component, OnInit, Input } from '@angular/core'
import { Game } from '../domain/Game'

@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.css']
})
export class JumbotronComponent implements OnInit {

  @Input() game: Game

  constructor() { }

  ngOnInit() {
  }

}

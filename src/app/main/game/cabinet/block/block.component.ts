import { Component, OnInit } from '@angular/core'
import { Pixel } from '../domain/Pixel'

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']
})
export class BlockComponent implements OnInit {
  pixels: Pixel[]

  color: string

  constructor() {}

  ngOnInit() {}
}

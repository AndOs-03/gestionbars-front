import { Component } from '@angular/core';
import {MagasinsService} from "./magasins.service";

@Component({
  selector: 'app-magasins',
  templateUrl: './magasins.component.html',
  styleUrls: ['./magasins.component.scss']
})
export class MagasinsComponent {

  constructor(public magasinsService: MagasinsService) { }
}

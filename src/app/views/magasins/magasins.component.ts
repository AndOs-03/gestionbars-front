import {Component, OnInit} from '@angular/core';
import {MagasinsService} from "./magasins.service";
import {MagasinVM} from "../../models/structure/magasin.model";

@Component({
  selector: 'app-magasins',
  templateUrl: './magasins.component.html',
  styleUrls: ['./magasins.component.scss']
})
export class MagasinsComponent implements OnInit {

  magasins: MagasinVM[] = [];
  constructor(public magasinsService: MagasinsService) { }

  ngOnInit(): void {
    this.listerMagasins();
  }

  listerMagasins() {
    this.magasinsService.listerMagasins().subscribe({
      next: resultat => {
        this.magasins = resultat;
      },
      error: erreur => {
        const messageErreur = erreur.error.parameters.message;
      }
    });
  }

  supprimerMagasin(magasinId: string) {
    this.magasinsService.supprimerMagasin(magasinId).subscribe({
      next: resultat => {
        // TODO: MESSAGE SUCCES
        this.listerMagasins();
      },
      error: erreur => {
        const messageErreur = erreur.error.parameters.message;
      }
    });
  }
}

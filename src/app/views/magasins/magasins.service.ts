import {Injectable} from '@angular/core';
import {CreerMagasinCommande} from "./creer-magasin/creer-magasin.commande";
import {HttpClient, HttpHeaders} from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({"Content-Type": "application/json"})
};

@Injectable({
  providedIn: 'root'
})
export class MagasinsService {

  apiBaseUrl: string = 'http://localhost:8083/api/andos/gestionbars';
  formulaireEditionValide: boolean = false;
  private creerMagasinCommande!: CreerMagasinCommande;

  constructor(private http: HttpClient) {
  }

  creerMagasin() {
    const url = `${this.apiBaseUrl}/magasins`;
    this.http.post<CreerMagasinCommande>(url, this.creerMagasinCommande, httpOptions).subscribe({
      next: resultat => {
        // TODO: AFFICHER MESSAGE SUCCES
      },
      error: erreur => {
        const messageErreur = erreur.error.parameters.message;
        // TODO: AFFICHER MESSAGE ERREUR
      }
    });
  }

  setCommandeCreation(commande: CreerMagasinCommande) {
    this.creerMagasinCommande = commande;
  }
}

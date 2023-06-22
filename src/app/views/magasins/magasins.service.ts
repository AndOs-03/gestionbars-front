import {Injectable} from '@angular/core';
import {CreerMagasinCommande} from "./creer-magasin/creer-magasin.commande";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {MagasinVM} from "../../models/structure/magasin.model";
import {MagasinDetailsVM} from "../../models/structure/magasin-details.model";
import {ModifierMagasinCommande} from "./modifier-magasin.commande";

const httpOptions = {
  headers: new HttpHeaders({"Content-Type": "application/json"})
};

@Injectable({
  providedIn: 'root'
})
export class MagasinsService {

  apiBaseUrl: string = 'http://localhost:8083/api/andos/gestionbars';
  magasins: MagasinVM[] = [];

  constructor(private http: HttpClient) {
  }

  creerMagasin(commande: CreerMagasinCommande): Observable<CreerMagasinCommande> {
    const url = `${this.apiBaseUrl}/magasins`;
    return this.http.post<CreerMagasinCommande>(url, commande, httpOptions);
  }

  listerMagasins(): Observable<MagasinVM[]> {
    const url = `${this.apiBaseUrl}/magasins`;
    return this.http.get<MagasinVM[]>(url);
  }

  modifierMagasin(commande: ModifierMagasinCommande): Observable<ModifierMagasinCommande> {
    const url = `${this.apiBaseUrl}/magasins`;
    return this.http.put<ModifierMagasinCommande>(url, commande, httpOptions);
  }

  supprimerMagasin(magasinId: string): Observable<Object> {
    const url = `${this.apiBaseUrl}/magasins/${magasinId}`;
    return this.http.delete(url, httpOptions);
  }

  recupererMagsinParId(magasinId: string): Observable<MagasinDetailsVM> {
    const url = `${this.apiBaseUrl}/magasins/${magasinId}`;
    return this.http.get<MagasinDetailsVM>(url);
  }

  recupererDernierMagasin(): Observable<MagasinVM> {
    const url = `${this.apiBaseUrl}/magasins/dernier-magasin`;
    return this.http.get<MagasinVM>(url);
  }
}

import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {FournisseurVM} from "../models/tiers/fournisseur.model";
import {
  CreerFournisseurCommande
} from "../views/fournisseurs/creer-fournisseur/creer-fournisseur.commande";
import {
  ModifierFournisseurCommande
} from "../views/fournisseurs/modifier-fournisseur/modifier-fournisseur.commande";

const httpOptions = {
  headers: new HttpHeaders({"Content-Type": "application/json"})
};

@Injectable({
  providedIn: 'root'
})
export class FournisseursService {

  apiBaseUrl: string = 'http://localhost:8083/api/andos/gestionbars';
  fournisseursApiBaseUrl: string = `${this.apiBaseUrl}/fournisseurs`;
  fournisseurs: FournisseurVM[] = [];

  constructor(private http: HttpClient) {
  }

  listerFournisseurs(): Observable<FournisseurVM[]> {
    return this.http.get<FournisseurVM[]>(this.fournisseursApiBaseUrl);
  }

  creerFournisseur(commande: CreerFournisseurCommande): Observable<CreerFournisseurCommande> {
    return this.http.post<CreerFournisseurCommande>(this.fournisseursApiBaseUrl, commande, httpOptions);
  }

  modifierFournisseur(commande: ModifierFournisseurCommande): Observable<ModifierFournisseurCommande> {
    return this.http.put<ModifierFournisseurCommande>(this.fournisseursApiBaseUrl, commande, httpOptions);
  }

  supprimerFournisseur(fournisseurId: string): Observable<Object> {
    const url = `${this.fournisseursApiBaseUrl}/${fournisseurId}`;
    return this.http.delete(url, httpOptions);
  }

  recupererFournisseurParId(fournisseurId: string): Observable<FournisseurVM> {
    const url = `${this.fournisseursApiBaseUrl}/${fournisseurId}`;
    return this.http.get<FournisseurVM>(url);
  }

  recupererDernierFournisseur(): Observable<FournisseurVM> {
    const url = `${this.fournisseursApiBaseUrl}/dernier-fournisseur`;
    return this.http.get<FournisseurVM>(url);
  }
}

import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {MarqueVM} from "../models/structure/marque.model";
import {CreerMarqueCommande} from "../views/marques/creer-marque/creer-marque.commande";
import {ModifierMarqueCommande} from "../views/marques/modifier-marque.commande";

''

const httpOptions = {
  headers: new HttpHeaders({"Content-Type": "application/json"})
};

@Injectable({
  providedIn: 'root'
})
export class MarquesService {

  apiBaseUrl: string = 'http://localhost:8083/api/andos/gestionbars';
  marquesApiBaseUrl: string = `${this.apiBaseUrl}/marques`;
  marques: MarqueVM[] = [];

  constructor(private http: HttpClient) {
  }

  creerMarque(commande: CreerMarqueCommande, photo: File): Observable<any> {
    const commandeJsonString: string = JSON.stringify(commande);
    const commandeBlob: Blob = new Blob([commandeJsonString], {type: 'application/json'});
    const commandeFile: File = new File([commandeBlob], 'data.json', {type: 'application/json'});

    const formData: FormData = new FormData();
    formData.append("commande", commandeFile);
    formData.append("photo", photo);

    return this.http.post<any>(this.marquesApiBaseUrl, formData);
  }

  listerMarques(): Observable<MarqueVM[]> {
    return this.http.get<MarqueVM[]>(this.marquesApiBaseUrl);
  }

  modifierMarque(commande: ModifierMarqueCommande, photo: File): Observable<any> {
    const commandeJsonString: string = JSON.stringify(commande);
    const commandeBlob: Blob = new Blob([commandeJsonString], {type: 'application/json'});
    const commandeFile: File = new File([commandeBlob], 'data.json', {type: 'application/json'});

    const formData: FormData = new FormData();
    formData.append("commande", commandeFile);
    formData.append("photo", photo);

    return this.http.put<any>(this.marquesApiBaseUrl, formData);
  }

  supprimerMarque(marqueId: string): Observable<Object> {
    const url = `${this.marquesApiBaseUrl}/${marqueId}`;
    return this.http.delete(url, httpOptions);
  }

  recupererMarqueParId(marqueId: string): Observable<MarqueVM> {
    const url = `${this.marquesApiBaseUrl}/${marqueId}`;
    return this.http.get<MarqueVM>(url);
  }

  recupererDerniereMarque(): Observable<MarqueVM> {
    const url = `${this.marquesApiBaseUrl}/derniere-marque`;
    return this.http.get<MarqueVM>(url);
  }
}

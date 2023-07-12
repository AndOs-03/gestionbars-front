import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {FournisseurVM} from "../models/tiers/fournisseur.model";

const httpOptions = {
  headers: new HttpHeaders({"Content-Type": "application/json"})
};

@Injectable({
  providedIn: 'root'
})
export class FournisseursService {

  apiBaseUrl: string = 'http://localhost:8083/api/andos/gestionbars';
  marquesApiBaseUrl: string = `${this.apiBaseUrl}/fournisseurs`;
  fournisseurs: FournisseurVM[] = [];

  constructor(private http: HttpClient) {
  }

  listerFournisseurs(): Observable<FournisseurVM[]> {
    return this.http.get<FournisseurVM[]>(this.marquesApiBaseUrl);
  }
}

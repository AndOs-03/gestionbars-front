import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {CategorieVM} from "../models/structure/categorie.model";
import {CreerCategorieCommande} from "../views/categories/creer-categorie/creer-categorie.commande";
import {ModifierCategorieCommande} from "../views/categories/modifier-categorie.commande";

const httpOptions = {
  headers: new HttpHeaders({"Content-Type": "application/json"})
};

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  apiBaseUrl: string = 'http://localhost:8083/api/andos/gestionbars';
  categories: CategorieVM[] = [];

  constructor(private http: HttpClient) {
  }

  creerCategorie(commande: CreerCategorieCommande): Observable<CreerCategorieCommande> {
    const url = `${this.apiBaseUrl}/categories`;
    return this.http.post<CreerCategorieCommande>(url, commande, httpOptions);
  }

  listerCategories(): Observable<CategorieVM[]> {
    const url = `${this.apiBaseUrl}/categories`;
    return this.http.get<CategorieVM[]>(url);
  }

  modifierCategorie(commande: ModifierCategorieCommande): Observable<ModifierCategorieCommande> {
    const url = `${this.apiBaseUrl}/categories`;
    return this.http.put<ModifierCategorieCommande>(url, commande, httpOptions);
  }

  supprimerCategorie(categorieId: string): Observable<Object> {
    const url = `${this.apiBaseUrl}/categories/${categorieId}`;
    return this.http.delete(url, httpOptions);
  }

  recupererCategorieParId(categorieId: string): Observable<CategorieVM> {
    const url = `${this.apiBaseUrl}/categories/${categorieId}`;
    return this.http.get<CategorieVM>(url);
  }

  recupererDerniereCategorie(): Observable<CategorieVM> {
    const url = `${this.apiBaseUrl}/categories/derniere-categorie`;
    return this.http.get<CategorieVM>(url);
  }
}

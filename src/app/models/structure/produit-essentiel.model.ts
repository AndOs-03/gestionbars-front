import {PersonneVM} from "./personne.model";

export class ProduitEssentielVM {
  readonly id: string;
  readonly libelle: string;
  readonly prixVenteTtc!: number;
  readonly quantiteStockInitial!: number;
  readonly prixStockInitial!: number;
  readonly urlPhoto!: string;
  readonly marque!: PersonneVM;
  readonly categorie!: PersonneVM;

  constructor(id: string, libelle: string) {
    this.id = id;
    this.libelle = libelle;
  }
}

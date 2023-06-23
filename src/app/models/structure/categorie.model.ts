import {ProduitEssentielVM} from "./produit-essentiel.model";

export class CategorieVM {
  readonly id: string;
  readonly libelle: string;
  readonly produits!: ProduitEssentielVM[];

  constructor(id: string, libelle: string) {
    this.id = id;
    this.libelle = libelle;
  }
}

import {ProduitEssentielVM} from "./produit-essentiel.model";

export class MarqueVM {
  readonly id: string;
  readonly libelle: string;
  readonly urlPhoto: string;
  readonly produits!: ProduitEssentielVM[];

  constructor(id: string, libelle: string, urlPhoto: string) {
    this.id = id;
    this.libelle = libelle;
    this.urlPhoto = urlPhoto;
  }
}

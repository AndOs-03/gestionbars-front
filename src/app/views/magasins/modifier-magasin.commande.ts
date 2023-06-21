import {CreerMagasinCommande} from "./creer-magasin/creer-magasin.commande";

export class ModifierMagasinCommande extends CreerMagasinCommande{
  magasinId!: string;

  setMagasinId(magasinId: string) {
    this.magasinId = magasinId
  }
}

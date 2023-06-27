import {CreerMarqueCommande} from "./creer-marque/creer-marque.commande";

export class ModifierMarqueCommande extends CreerMarqueCommande{
  marqueId!: string;

  setMarqueIdd(marqueId: string) {
    this.marqueId = marqueId;
  }
}

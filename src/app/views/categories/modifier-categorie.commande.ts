import {CreerCategorieCommande} from "./creer-categorie/creer-categorie.commande";

export class ModifierCategorieCommande extends CreerCategorieCommande{
  categorieId!: string;

  setCategorieId(categorieId: string) {
    this.categorieId = categorieId;
  }
}

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {CategoriesService} from "../../services/categories.service";
import {CategorieVM} from "../../models/structure/categorie.model";
import {Observable} from "rxjs";
import {ModifierCategorieCommande} from "./modifier-categorie.commande";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  commandeModification: ModifierCategorieCommande;
  categorieActuel!: CategorieVM;

  formulaireModifierCategorie!: FormGroup;
  formulaireModificationVisible: boolean = false;
  formulaireValide: boolean = false;
  formulaireSoumis: boolean = false;

  constructor(
    public categoriesService: CategoriesService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.commandeModification = new ModifierCategorieCommande();
  }

  ngOnInit(): void {
    this.listerCategories();
    this.initialisationDuFormulaire();
  }

  listerCategories() {
    this.categoriesService.listerCategories().subscribe({
      next: resultat => {
        this.categoriesService.categories = resultat;
      },
      error: erreur => {
        const messageErreur = erreur.error.parameters.message;
        this.toastr.error(messageErreur, "Erreur de chargement");
      }
    });
  }

  supprimerCategorie(categorie: CategorieVM) {
    const categorieId: string = categorie.id
    this.categoriesService.supprimerCategorie(categorieId).subscribe({
      next: resultat => {
        this.toastr.success("Catégorie supprimée avec succès !", "Gestion Bars");
        this.listerCategories();
      },
      error: erreur => {
        const messageErreur = erreur.error.parameters.message;
        this.toastr.error(messageErreur, "Erreur de suppression");
      }
    });
  }

  private recupererCategorieActuel(categorieId: string): Observable<CategorieVM> {
    return this.categoriesService.recupererCategorieParId(categorieId);
  }


  // ############################   METHODES DE MODIFICATION    ###################################
  affichierFormulaireModification(categorie: CategorieVM) {
    const categorieId: string = categorie.id;
    this.recupererCategorieActuel(categorieId).subscribe({
      next: resultat => {
        this.categorieActuel = resultat;
        this.afficherValeursActuellesDansFormulaire();
      },
      error: erreur => {
        const messageErreur = erreur.error.parameters.message;
        this.toastr.error(messageErreur, "Récupération");
      }
    });

    this.formulaireModificationVisible = !this.formulaireModificationVisible;
  }

  changementDeVisibilite(visible: boolean) {
    if (!visible) {
      this.initialisationDuFormulaire();
      this.formulaireModificationVisible = false;
    }
  }

  initialisationDuFormulaire() {
    this.formulaireModifierCategorie = this.formBuilder.group({
      libelle: ['', Validators.required]
    });
    this.formulaireSoumis = false;
    this.formulaireValide = false;
  }

  actualiserValeursFormulaire() {
    this.actualiserCommande();
    this.formulaireValide = this.formulaireModifierCategorie.valid;
  }

  actualiserCommande() {
    this.commandeModification.setLibelle(this.formulaireModifierCategorie.get('libelle')?.value);
  }

  afficherValeursActuellesDansFormulaire() {
    this.formulaireModifierCategorie.get('libelle')?.setValue(this.categorieActuel.libelle);
    this.formulaireValide = true;
  }

  modifierCategorie() {
    this.formulaireSoumis = true;
    this.commandeModification.setCategorieId(this.categorieActuel.id);
    this.categoriesService.modifierCategorie(this.commandeModification).subscribe({
      next: resultat => {
        this.toastr.success(`Catégorie modifiée avec succès.`, "Gestion-Bars");
        this.listerCategories();
        this.formulaireModificationVisible = false;
      },
      error: erreur => {
        const messageErreur = erreur.error.parameters.message;
        this.toastr.error(messageErreur, "Gestion-Bars");
      }
    });
  }
}

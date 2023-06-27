import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Observable} from "rxjs";
import {ModifierMarqueCommande} from "./modifier-marque.commande";
import {MarqueVM} from "../../models/structure/marque.model";
import {MarquesService} from "../../services/marques.service";

@Component({
  selector: 'app-marques',
  templateUrl: './marques.component.html',
  styleUrls: ['./marques.component.scss']
})
export class MarquesComponent implements OnInit {

  commandeModification: ModifierMarqueCommande;
  marqueActuel!: MarqueVM;

  formulaireModifierMarque!: FormGroup;
  formulaireModificationVisible: boolean = false;
  formulaireValide: boolean = false;
  formulaireSoumis: boolean = false;

  constructor(
    public marqueService: MarquesService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.commandeModification = new ModifierMarqueCommande();
  }

  ngOnInit(): void {
    this.listerMarques();
    this.initialisationDuFormulaire();
  }

  listerMarques() {
    this.marqueService.listerMarques().subscribe({
      next: resultat => {
        this.marqueService.marques = resultat;
      },
      error: erreur => {
        const messageErreur = erreur.error.parameters.message;
        this.toastr.error(messageErreur, "Erreur de chargement");
      }
    });
  }

  supprimerMarque(marque: MarqueVM) {
    const marqueId: string = marque.id
    this.marqueService.supprimerMarque(marqueId).subscribe({
      next: resultat => {
        this.toastr.success("Marque supprimée avec succès !", "Gestion Bars");
        this.listerMarques();
      },
      error: erreur => {
        const messageErreur = erreur.error.parameters.message;
        this.toastr.error(messageErreur, "Erreur de suppression");
      }
    });
  }

  private recupererMarqueActuel(marqueId: string): Observable<MarqueVM> {
    return this.marqueService.recupererMarqueParId(marqueId);
  }


  // ############################   METHODES DE MODIFICATION    ###################################
  affichierFormulaireModification(marque: MarqueVM) {
    const marqueId: string = marque.id;
    this.recupererMarqueActuel(marqueId).subscribe({
      next: resultat => {
        this.marqueActuel = resultat;
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
    this.formulaireModifierMarque = this.formBuilder.group({
      libelle: ['', Validators.required]
    });
    this.formulaireSoumis = false;
    this.formulaireValide = false;
  }

  actualiserValeursFormulaire() {
    this.actualiserCommande();
    this.formulaireValide = this.formulaireModifierMarque.valid;
  }

  actualiserCommande() {
    // this.commandeModification.setLibelle(this.formulaireModifierMarque.get('libelle')?.value);
  }

  afficherValeursActuellesDansFormulaire() {
    this.formulaireModifierMarque.get('libelle')?.setValue(this.marqueActuel.libelle);
    this.formulaireValide = true;
  }

  modifierMarque() {
    // this.formulaireSoumis = true;
    // this.commandeModification.setCategorieId(this.categorieActuel.id);
    // this.categoriesService.modifierCategorie(this.commandeModification).subscribe({
    //   next: resultat => {
    //     this.toastr.success(`Catégorie modifiée avec succès.`, "Gestion-Bars");
    //     this.listerCategories();
    //     this.formulaireModificationVisible = false;
    //   },
    //   error: erreur => {
    //     const messageErreur = erreur.error.parameters.message;
    //     this.toastr.error(messageErreur, "Gestion-Bars");
    //   }
    // });
  }
}

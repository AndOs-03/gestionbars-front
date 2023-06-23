import {Component, OnInit} from '@angular/core';
import {MagasinsService} from "../../services/magasins.service";
import {MagasinVM} from "../../models/structure/magasin.model";
import {ModifierMagasinCommande} from "./modifier-magasin.commande";
import {MagasinDetailsVM} from "../../models/structure/magasin-details.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-magasins',
  templateUrl: './magasins.component.html',
  styleUrls: ['./magasins.component.scss']
})
export class MagasinsComponent implements OnInit {

  commandeModification: ModifierMagasinCommande;
  magasinActuel!: MagasinDetailsVM;

  formulaireModifierMagasin!: FormGroup;
  formulaireModificationVisible: boolean = false;
  formulaireValide: boolean = false;
  formulaireSoumis: boolean = false;

  constructor(
    public magasinService: MagasinsService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.commandeModification = new ModifierMagasinCommande();
  }

  ngOnInit(): void {
    this.listerMagasins();
    this.initialisationDuFormulaire();
  }

  listerMagasins() {
    this.magasinService.listerMagasins().subscribe({
      next: resultat => {
        this.magasinService.magasins = resultat;
      },
      error: erreur => {
        const messageErreur = erreur.error.parameters.message;
        this.toastr.error(messageErreur, "Erreur de chargement");
      }
    });
  }

  supprimerMagasin(magasin: MagasinVM) {
    const magasinId: string = magasin.id
    this.magasinService.supprimerMagasin(magasinId).subscribe({
      next: resultat => {
        this.toastr.success("Magasin supprimé avec succès !", "Gestion Bars");
        this.listerMagasins();
      },
      error: erreur => {
        const messageErreur = erreur.error.parameters.message;
        this.toastr.error(messageErreur, "Erreur de suppression");
      }
    });
  }

  private recupererMagasinActuel(magasinId: string): Observable<MagasinDetailsVM> {
    return this.magasinService.recupererMagsinParId(magasinId);
  }


  // ############################   METHODES DE MODIFICATION    ###################################
  affichierFormulaireModification(magasin: MagasinVM) {
    const magasinId: string = magasin.id;
    this.recupererMagasinActuel(magasinId).subscribe({
      next: resultat => {
        this.magasinActuel = resultat;
        this.afficherValeursActuellesDansFormulaire();
      },
      error: erreur => {
        const messageErreur = erreur.error.parameters.message;
        this.toastr.error(messageErreur, "Récupération du magasin");
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
    this.formulaireModifierMagasin = this.formBuilder.group({
      libelle: ['', Validators.required],
      adresse: [''],
      responsableId: ['']
    });
    this.formulaireSoumis = false;
    this.formulaireValide = false;
  }

  actualiserValeursFormulaire() {
    this.actualiserCommande();
    this.formulaireValide = this.formulaireModifierMagasin.valid;
  }

  actualiserCommande() {
    this.commandeModification.setLibelle(this.formulaireModifierMagasin.get('libelle')?.value);
    this.commandeModification.setAdresse(this.formulaireModifierMagasin.get('adresse')?.value);
    this.commandeModification.setResponssableId(this.formulaireModifierMagasin.get('responsableId')?.value);
  }

  afficherValeursActuellesDansFormulaire() {
    this.formulaireModifierMagasin.get('libelle')?.setValue(this.magasinActuel.libelle);
    this.formulaireModifierMagasin.get('adresse')?.setValue(this.magasinActuel.adresse);
    this.formulaireModifierMagasin.get('responsableId')?.setValue(this.magasinActuel.responsable?.id);
    this.formulaireValide = true;
  }

  modifierMagasin() {
    this.formulaireSoumis = true;
    this.commandeModification.setMagasinId(this.magasinActuel.id);
    this.magasinService.modifierMagasin(this.commandeModification).subscribe({
      next: resultat => {
        this.toastr.success(`Magasin modifié avec succès.`, "Gestion-Bars");
        this.listerMagasins();
        this.formulaireModificationVisible = false;
      },
      error: erreur => {
        const messageErreur = erreur.error.parameters.message;
        this.toastr.error(messageErreur, "Gestion-Bars");
      }
    });
  }
}

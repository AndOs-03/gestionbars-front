import {Component, OnInit} from '@angular/core';
import {MagasinsService} from "./magasins.service";
import {MagasinVM} from "../../models/structure/magasin.model";
import {ModifierMagasinCommande} from "./modifier-magasin.commande";
import {MagasinDetailsVM} from "../../models/structure/magasin-details.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";

@Component({
  selector: 'app-magasins',
  templateUrl: './magasins.component.html',
  styleUrls: ['./magasins.component.scss']
})
export class MagasinsComponent implements OnInit {

  magasins: MagasinVM[] = [];
  commandeModification: ModifierMagasinCommande;
  magasinActuel!: MagasinDetailsVM;

  formulaireModifierMagasin!: FormGroup;
  formulaireModificationVisible: boolean = false;
  formulaireValide: boolean = false;
  formulaireSoumis: boolean = false;

  constructor(private magasinService: MagasinsService, private formBuilder: FormBuilder) {
    this.commandeModification = new ModifierMagasinCommande();
  }

  ngOnInit(): void {
    this.listerMagasins();
    this.formulaireModifierMagasin = this.formBuilder.group({
      libelle: ['', Validators.required],
      adresse: [''],
      responsableId: ['']
    });
  }

  listerMagasins() {
    this.magasinService.listerMagasins().subscribe({
      next: resultat => {
        this.magasins = resultat;
      },
      error: erreur => {
        const messageErreur = erreur.error.parameters.message;
      }
    });
  }

  supprimerMagasin(magasinId: string) {
    this.magasinService.supprimerMagasin(magasinId).subscribe({
      next: resultat => {
        // TODO: MESSAGE SUCCES
        this.listerMagasins();
      },
      error: erreur => {
        const messageErreur = erreur.error.parameters.message;
      }
    });
  }

  private recupererMagasinActuel(magasinId: string): Observable<MagasinDetailsVM> {
    return this.magasinService.recupererMagsinParId(magasinId);
  }


  // ############################   METHODES DE MODIFICATION    ###################################
  affichierFormulaireModification(magasinId: string) {
    this.recupererMagasinActuel(magasinId).subscribe({
      next: resultat => {
        this.magasinActuel = resultat;
        this.afficherValeursActuellesDansFormulaire();
      },
      error: erreur => {
        const messageErreur = erreur.error.parameters.message;
        // this.notificationService.afficherMessageErreur(messageErreur, "Gestion-Bars");
      }
    });

    this.formulaireModificationVisible = !this.formulaireModificationVisible;
  }

  changementVisibiliteFormulaireModification(visibile: boolean) {
    this.formulaireModificationVisible = visibile;
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
        // this.notificationService.afficherMessageSucces(`Magasin ${resultat.libelle} crée avec succès.`, "Gestion-Bars");
        this.listerMagasins();
      },
      error: erreur => {
        const messageErreur = erreur.error.parameters.message;
        // this.notificationService.afficherMessageErreur(messageErreur, "Gestion-Bars");
      }
    });
  }
}

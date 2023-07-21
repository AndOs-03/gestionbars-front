import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FournisseursService} from "../../../services/fournisseurs.service";
import {ToastrService} from "ngx-toastr";
import {PersonnaliteFournisseur} from "../../../models/tiers/personnalite-fournisseur";
import {FournisseurVM} from "../../../models/tiers/fournisseur.model";
import {ModifierFournisseurCommande} from "./modifier-fournisseur.commande";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-modifier-fournisseur',
  templateUrl: './modifier-fournisseur.component.html',
  styleUrls: ['./modifier-fournisseur.component.scss']
})
export class ModifierFournisseurComponent implements OnInit {

  personnalites: string[];
  formulaireModifierFournisseur!: FormGroup;
  commande: ModifierFournisseurCommande;
  formulaireSoumis: boolean = false;
  formulaireValide: boolean = false;
  founisseurId: string;
  founisseur!: FournisseurVM;

  constructor(
    private formBuilder: FormBuilder,
    private fournisseurService: FournisseursService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.founisseurId = this.recupererIdFournisseur();
    this.personnalites = this.transformerPersonnaliteEnListe();
    this.commande = new ModifierFournisseurCommande();
    this.commande.fournisseurId = this.founisseurId;
  }

  ngOnInit(): void {
    this.initialisationDuFormulaire();
    this.recupererFournisseurActuel(this.founisseurId).subscribe({
      next: resultat => {
        this.founisseur = resultat;
        this.chargementDuFormulaire();
      },
      error: erreur => {
        const messageErreur = erreur.error.parameters.message;
        this.toastr.error(messageErreur, "Gestion-Bars");
        throw new Error(messageErreur);
      }
    });
  }

  private recupererIdFournisseur(): string {
    return this.route.snapshot.params['id'];
  }

  transformerPersonnaliteEnListe() {
    return Object.values(PersonnaliteFournisseur);
  }

  private recupererFournisseurActuel(fournisseurId: string): Observable<FournisseurVM> {
    return this.fournisseurService.recupererFournisseurParId(fournisseurId);
  }

  actualiserCommande() {
    this.commande.personnalite = this.formulaireModifierFournisseur.get('personnalite')?.value;
    this.commande.nom = this.formulaireModifierFournisseur.get('nom')?.value;
    this.commande.contact = this.formulaireModifierFournisseur.get('contact')?.value;
    this.commande.email = this.formulaireModifierFournisseur.get('email')?.value;
    this.commande.adresse = this.formulaireModifierFournisseur.get('adresse')?.value;
    this.commande.activite = this.formulaireModifierFournisseur.get('activite')?.value;
    this.commande.interlocuteur = this.formulaireModifierFournisseur.get('interlocuteur')?.value;
    this.commande.detteInitiale = this.formulaireModifierFournisseur.get('detteInitiale')?.value;
  }

  actualiserValeursFormulaire() {
    this.actualiserCommande();
    this.formulaireValide = this.formulaireModifierFournisseur.valid;
  }

  modifierFournisseur() {
    this.validationFormulaire();
    this.formulaireSoumis = true;
    this.fournisseurService.modifierFournisseur(this.commande).subscribe({
      next: resultat => {
        this.toastr.success(`Fournisseur modifier avec succès.`, "Gestion-Bars");
        this.router.navigate(['tiers/fournisseurs']);
      },
      error: erreur => {
        const messageErreur = erreur.error.parameters.message;
        this.toastr.error(messageErreur, "Gestion-Bars");
      }
    });
  }

  private validationFormulaire(): void {
    let personnalite = this.formulaireModifierFournisseur.get('personnalite')?.value;
    if (personnalite === "Personnalité" || personnalite.length === 0) {
      this.toastr.error("Choisir la personnalité", "Gestion-Bars");
      throw new Error("Choisir la personnalité");
    }
  }

  initialisationDuFormulaire() {
    this.formulaireModifierFournisseur = this.formBuilder.group({
      personnalite: new FormControl('Personnalité', Validators.required),
      nom: new FormControl('', Validators.required),
      contact: new FormControl('', Validators.required),
      email: new FormControl(''),
      adresse: new FormControl('', Validators.required),
      activite: new FormControl('', Validators.required),
      interlocuteur: new FormControl(''),
      detteInitiale: new FormControl('0.0')
    });
    this.formulaireSoumis = false;
    this.formulaireValide = false;
  }

  chargementDuFormulaire() {
    this.formulaireModifierFournisseur = this.formBuilder.group({
      personnalite: new FormControl(this.founisseur.personnalite, Validators.required),
      nom: new FormControl(this.founisseur.nom, Validators.required),
      contact: new FormControl(this.founisseur.contact, Validators.required),
      email: new FormControl(this.founisseur.email),
      adresse: new FormControl(this.founisseur.adresse, Validators.required),
      activite: new FormControl(this.founisseur.activite, Validators.required),
      interlocuteur: new FormControl(this.founisseur.interlocuteur),
      detteInitiale: new FormControl(this.founisseur.detteInitiale)
    });
    this.actualiserCommande();
    this.formulaireSoumis = false;
    this.formulaireValide = false;
  }

  annulerEdition() {
    this.router.navigate(['tiers/fournisseurs']);
  }
}

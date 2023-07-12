import {Component, OnInit} from '@angular/core';
import {PersonnaliteFournisseur} from "../../../models/tiers/personnalite-fournisseur";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FournisseursService} from "../../../services/fournisseurs.service";
import {CreerFournisseurCommande} from "./creer-fournisseur.commande";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-creer-fournisseur',
  templateUrl: './creer-fournisseur.component.html',
  styleUrls: ['./creer-fournisseur.component.scss']
})
export class CreerFournisseurComponent implements OnInit {

  personnalites: string[];
  formulaireCreerFournisseur!: FormGroup;
  commande: CreerFournisseurCommande;
  formulaireSoumis: boolean = false;
  formulaireValide: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private fournisseurService: FournisseursService,
    private toastr: ToastrService
  ) {
    this.personnalites = this.transformerPersonnaliteEnListe();
    this.commande = new CreerFournisseurCommande();
  }

  ngOnInit(): void {
    this.initialisationDuFormulaire();
  }

  transformerPersonnaliteEnListe() {
    return Object.values(PersonnaliteFournisseur).filter((v: PersonnaliteFournisseur) => isNaN(Number(v)))
  }

  actualiserCommande() {
    this.commande.personnalite = this.formulaireCreerFournisseur.get('personnalite')?.value;
    this.commande.nom = this.formulaireCreerFournisseur.get('nom')?.value;
    this.commande.contact = this.formulaireCreerFournisseur.get('contact')?.value;
    this.commande.email = this.formulaireCreerFournisseur.get('email')?.value;
    this.commande.adresse = this.formulaireCreerFournisseur.get('adresse')?.value;
    this.commande.activite = this.formulaireCreerFournisseur.get('activite')?.value;
    this.commande.interlocuteur = this.formulaireCreerFournisseur.get('interlocuteur')?.value;
    this.commande.detteInitiale = this.formulaireCreerFournisseur.get('detteInitiale')?.value;
  }

  actualiserValeursFormulaire() {
    this.actualiserCommande();
    this.formulaireValide = this.formulaireCreerFournisseur.valid;
  }

  ajouterFournisseur() {
    let personnalite = this.formulaireCreerFournisseur.get('personnalite')?.value;
    if (personnalite === "Personnalité" || personnalite.length === 0) {
      this.toastr.error("Choisir la personnalité", "Gestion-Bars");
      throw new Error("Choisir la personnalité");
    }
    this.formulaireSoumis = true;
    this.fournisseurService.creerFournisseur(this.commande).subscribe({
      next: resultat => {
        this.toastr.success(`Fournisseur crée avec succès.`, "Gestion-Bars");
        this.fournisseurService.recupererDernierFournisseur().subscribe(derniereCategorie => {
          this.fournisseurService.fournisseurs.push(derniereCategorie);
        });
        this.initialisationDuFormulaire();
      },
      error: erreur => {
        const messageErreur = erreur.error.parameters.message;
        this.toastr.error(messageErreur, "Gestion-Bars");
      }
    });
  }

  initialisationDuFormulaire() {
    this.formulaireCreerFournisseur = this.formBuilder.group({
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
}

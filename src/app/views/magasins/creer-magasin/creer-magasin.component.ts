import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MagasinsService} from "../magasins.service";
import {CreerMagasinCommande} from "./creer-magasin.commande";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-creer-magasin',
  templateUrl: './creer-magasin.component.html',
  styleUrls: ['./creer-magasin.component.scss']
})
export class CreerMagasinComponent implements OnInit {

  formulaireSoumis: boolean = false;
  formulaireValide: boolean = false;
  formulaireAjouterMagasin!: FormGroup;
  commande: CreerMagasinCommande;

  constructor(
    private formBuilder: FormBuilder,
    public magasinService: MagasinsService,
    private toastr: ToastrService
  ) {
    this.commande = new CreerMagasinCommande();
  }

  ngOnInit(): void {
    this.initialisationDuFormulaire();
  }

  actualiserCommande() {
    this.commande.setLibelle(this.formulaireAjouterMagasin.get('libelle')?.value);
    this.commande.setAdresse(this.formulaireAjouterMagasin.get('adresse')?.value);
    this.commande.setResponssableId(this.formulaireAjouterMagasin.get('responsableId')?.value);
  }

  actualiserValeursFormulaire() {
    this.actualiserCommande();
    this.formulaireValide = this.formulaireAjouterMagasin.valid;
  }

  ajouterMagasin() {
    this.formulaireSoumis = true;
    this.magasinService.creerMagasin(this.commande).subscribe({
      next: resultat => {
        this.toastr.success(`Magasin crée avec succès.`, "Gestion-Bars");
        this.magasinService.recupererDernierMagasin().subscribe(dernierMagasin => {
          this.magasinService.magasins.push(dernierMagasin);
        });
        this.viderLeFormulaire();
      },
      error: erreur => {
        const messageErreur = erreur.error.parameters.message;
        this.toastr.error(messageErreur, "Gestion-Bars");
      }
    });
  }

  viderLeFormulaire() {
    this.formulaireAjouterMagasin.get('libelle')?.setValue("");
    this.formulaireSoumis = false;
    this.formulaireValide = false;
  }

  changementDeVisibilite(visible: boolean) {
    if (!visible) {
      this.initialisationDuFormulaire();
    }
  }

  initialisationDuFormulaire() {
    this.formulaireAjouterMagasin = this.formBuilder.group({
      libelle: new FormControl('', Validators.required),
      adresse: new FormControl(''),
      responsableId: new FormControl('')
    });
    this.formulaireSoumis = false;
    this.formulaireValide = false;
  }
}

import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {CreerCategorieCommande} from "./creer-categorie.commande";
import {CategoriesService} from "../../../services/categories.service";

@Component({
  selector: 'app-creer-categorie',
  templateUrl: './creer-categorie.component.html',
  styleUrls: ['./creer-categorie.component.scss']
})
export class CreerCategorieComponent {

  formulaireSoumis: boolean = false;
  formulaireValide: boolean = false;
  formulaireAjouterCategorie!: FormGroup;
  commande: CreerCategorieCommande;

  constructor(
    private formBuilder: FormBuilder,
    public categoriesService: CategoriesService,
    private toastr: ToastrService
  ) {
    this.commande = new CreerCategorieCommande();
  }

  ngOnInit(): void {
    this.initialisationDuFormulaire();
  }

  actualiserCommande() {
    this.commande.setLibelle(this.formulaireAjouterCategorie.get('libelle')?.value);
  }

  actualiserValeursFormulaire() {
    this.actualiserCommande();
    this.formulaireValide = this.formulaireAjouterCategorie.valid;
  }

  ajouterCategorie() {
    this.formulaireSoumis = true;
    this.categoriesService.creerCategorie(this.commande).subscribe({
      next: resultat => {
        this.toastr.success(`Catégorie crée avec succès.`, "Gestion-Bars");
        this.categoriesService.recupererDerniereCategorie().subscribe(derniereCategorie => {
          this.categoriesService.categories.push(derniereCategorie);
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
    this.formulaireAjouterCategorie.get('libelle')?.setValue("");
    this.formulaireSoumis = false;
    this.formulaireValide = false;
  }

  changementDeVisibilite(visible: boolean) {
    if (!visible) {
      this.initialisationDuFormulaire();
    }
  }

  initialisationDuFormulaire() {
    this.formulaireAjouterCategorie = this.formBuilder.group({
      libelle: new FormControl('', Validators.required)
    });
    this.formulaireSoumis = false;
    this.formulaireValide = false;
  }
}

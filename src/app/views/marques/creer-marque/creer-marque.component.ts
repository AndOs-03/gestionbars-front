import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {MarquesService} from "../../../services/marques.service";
import {CreerMarqueCommande} from "./creer-marque.commande";

@Component({
  selector: 'app-creer-marque',
  templateUrl: './creer-marque.component.html',
  styleUrls: ['./creer-marque.component.scss']
})
export class CreerMarqueComponent {

  formulaireSoumis: boolean = false;
  formulaireValide: boolean = false;
  formulaireAjouterMarque!: FormGroup;
  photoMarque!: File;
  commande: CreerMarqueCommande;

  constructor(
    private formBuilder: FormBuilder,
    public marquesService: MarquesService,
    private toastr: ToastrService
  ) {
    this.commande = new CreerMarqueCommande();
  }

  ngOnInit(): void {
    this.initialisationDuFormulaire();
  }

  actualiserCommande() {
    this.commande.setLibelle(this.formulaireAjouterMarque.get('libelle')?.value);
  }

  actualiserValeursFormulaire() {
    this.actualiserCommande();
    this.formulaireValide = this.formulaireAjouterMarque.valid;
  }

  ajouterMarque() {
    this.formulaireSoumis = true;
    console.log("photo: " + this.photoMarque);
    this.marquesService.creerMarque(this.commande, this.photoMarque).subscribe({
      next: resultat => {
        this.toastr.success(`Marque crée avec succès.`, "Gestion-Bars");
        this.marquesService.recupererDerniereMarque().subscribe(derniereMarque => {
          this.marquesService.marques.push(derniereMarque);
        });
        this.viderLeFormulaire();
      },
      error: erreur => {
        const messageErreur = erreur.error.parameters.message;
        this.toastr.error(messageErreur, "Gestion-Bars");
      }
    });
  }

  selectionDePhoto(event: any) {
    this.photoMarque = event.target.files[0];
  }

  viderLeFormulaire() {
    this.formulaireAjouterMarque.get('libelle')?.setValue("");
    this.formulaireSoumis = false;
    this.formulaireValide = false;
  }

  changementDeVisibilite(visible: boolean) {
    if (!visible) {
      this.initialisationDuFormulaire();
    }
  }

  initialisationDuFormulaire() {
    this.formulaireAjouterMarque = this.formBuilder.group({
      libelle: new FormControl('', Validators.required),
      photoMarque: new FormControl('')
    });
    this.formulaireSoumis = false;
    this.formulaireValide = false;
  }
}

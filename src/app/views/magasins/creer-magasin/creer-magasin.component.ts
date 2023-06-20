import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MagasinsService} from "../magasins.service";
import {CreerMagasinCommande} from "./creer-magasin.commande";

@Component({
  selector: 'app-creer-magasin',
  templateUrl: './creer-magasin.component.html',
  styleUrls: ['./creer-magasin.component.scss']
})
export class CreerMagasinComponent implements OnInit {

  formulaireSoumis: boolean = false;
  formulaireAjouterMagasin!: FormGroup;
  commande!: CreerMagasinCommande;

  constructor(private formBuilder: FormBuilder, public magasinService: MagasinsService) {
    this.commande = new CreerMagasinCommande();
  }

  ngOnInit(): void {
    this.formulaireAjouterMagasin = this.formBuilder.group({
      libelle: ['', Validators.required],
      adresse: [''],
      responsableId: ['']
    })
  }

  actualiserCommande() {
    this.commande.setLibelle(this.formulaireAjouterMagasin.get('libelle')?.value);
    this.commande.setAdresse(this.formulaireAjouterMagasin.get('adresse')?.value);
    this.commande.setResponssableId(this.formulaireAjouterMagasin.get('responsableId')?.value);
  }

  actualiserValeursFormulaire() {
    this.actualiserCommande();
    this.magasinService.setCommandeCreation(this.commande);
    this.magasinService.formulaireEditionValide = this.formulaireAjouterMagasin.valid;
  }
}

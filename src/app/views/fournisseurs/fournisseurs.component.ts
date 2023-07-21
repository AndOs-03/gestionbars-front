import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {FournisseurVM} from "../../models/tiers/fournisseur.model";
import {FournisseursService} from "../../services/fournisseurs.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-fournisseurs',
  templateUrl: './fournisseurs.component.html',
  styleUrls: ['./fournisseurs.component.scss']
})
export class FournisseursComponent implements OnInit {

  fournisseurActuel!: FournisseurVM;

  constructor(
    private router: Router,
    public fournisseursService: FournisseursService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.listerFournisseurs();
  }

  listerFournisseurs() {
    this.fournisseursService.listerFournisseurs().subscribe({
      next: resultat => {
        this.fournisseursService.fournisseurs = resultat;
      },
      error: erreur => {
        const messageErreur = erreur.error.parameters.message;
        this.toastr.error(messageErreur, "Erreur de chargement");
      }
    });
  }

  afficherFormulaireDeCreation() {
    this.router.navigate(['tiers/fournisseurs/creer']);
  }

  affichierFormulaireModification(fournisseur: FournisseurVM) {
    this.router.navigate(['tiers/fournisseurs/modifier', fournisseur.id]);
  }

  supprimerFournisseur(fournisseur: FournisseurVM) {
    const fournisseurId: string = fournisseur.id
    this.fournisseursService.supprimerFournisseur(fournisseurId).subscribe({
      next: resultat => {
        this.toastr.success("Fournisseur supprimé avec succès !", "Gestion Bars");
        this.listerFournisseurs();
      },
      error: erreur => {
        const messageErreur = erreur.error.parameters.message;
        this.toastr.error(messageErreur, "Erreur de suppression");
      }
    });
  }

  // afficherDialogSuppression(fournisseur: FournisseurVM) {
  //   const dialogRef = this.dialog.open(
  //     ConfirmationDialogComponent, {
  //       data: {
  //         message: 'Êtes-vous sur de supprimer ce fournisseur ?'
  //       }
  //     });
  //
  //   dialogRef.afterClosed().subscribe((confirmed: boolean) => {
  //     if (confirmed) {
  //       this.supprimerFournisseur(fournisseur);
  //     }
  //   });
  // }
}

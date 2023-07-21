export class FournisseurVM {
  readonly id: string;
  readonly nom: string;
  readonly contact!: string;
  readonly email!: string;
  readonly adresse!: string;
  readonly activite!: string;
  readonly interlocuteur!: string;
  readonly detteInitiale!: string;
  readonly personnalite!: string;

  constructor(id: string, nom: string) {
    this.id = id;
    this.nom = nom;
  }
}

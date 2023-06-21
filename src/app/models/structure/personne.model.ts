export class PersonneVM {
  readonly id: string;
  readonly nom: string;

  constructor(id: string, nom: string) {
    this.id = id;
    this.nom = nom;
  }
}

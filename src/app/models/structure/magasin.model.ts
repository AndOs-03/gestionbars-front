export class MagasinVM {
  readonly id: string;
  readonly libelle: string;
  readonly adresse!: string;
  readonly responsable!: string;

  constructor(id: string, libelle: string) {
    this.id = id;
    this.libelle = libelle;
  }
}

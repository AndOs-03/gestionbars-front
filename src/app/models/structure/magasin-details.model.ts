import {PersonneVM} from "./personne.model";

export class MagasinDetailsVM {
  readonly id: string;
  readonly libelle: string;
  readonly adresse!: string;
  readonly responsable!: PersonneVM;

  constructor(id: string, libelle: string) {
    this.id = id;
    this.libelle = libelle;
  }
}

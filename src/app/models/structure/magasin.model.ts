export class Magasin {
  private id: string;
  private libelle: string;
  private adresse!: string;
  private responsableId!: string;

  constructor(id: string, libelle: string) {
    this.id = id;
    this.libelle = libelle;
  }
}

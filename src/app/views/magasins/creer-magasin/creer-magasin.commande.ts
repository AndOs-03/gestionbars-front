export class CreerMagasinCommande {
  libelle!: string;
  adresse!: string;
  responsableId!: string;

  constructor() {}

  setLibelle(libelle: string) {
    this.libelle = libelle
  }

  setAdresse(adresse: string) {
    this.adresse = adresse
  }

  setResponssableId(responsableId: string) {
    this.responsableId = responsableId
  }
}

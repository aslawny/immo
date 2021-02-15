<template>
  <div class="home">
    <div class="container">
      <br />
      <div class="home-img">
        <form id="annonce_form" v-on:submit.prevent="addAnnonce">
          <div class="form-row">
            <div class="col-md-4 mb-1">
              <label for="annonceType">Achat / Vente</label>
              <select class="form-control" id="annonceType" v-model="annonce.av" required>
                <option>Achat</option>
                <option>Vente</option>
              </select>
            </div>
            <div class="col-md-4 mb-1">
              <label for="annonceMv">Maison / Appt</label>
              <select
                class="form-control"
                id="annonceMv"
                v-model="annonce.maison"
                required
              >
                <option>Maison</option>
                <option>Appartement</option>
              </select>
            </div>
            <div class="col-md-4 mb-1">
              <label>Prix</label>
              <input class="form-control" id="prix" v-model="annonce.prix" required />
            </div>
            <div class="col-md-4 mb-2">
              <label>Ville</label>
              <input class="form-control" id="ville" v-model="annonce.ville" required />
            </div>
            <div class="col-md-4 mb-2">
              <label>CP</label>
              <input class="form-control" id="cp" v-model="annonce.cp" required />
            </div>
            <div class="col-md-4 mb-2">
              <label>Surface</label>
              <input
                class="form-control"
                id="surface"
                v-model="annonce.surface"
                required
              />
            </div>
            <div class="col-md-4 mb-3">
              <label>Pieces</label>
              <input class="form-control" id="pieces" v-model="annonce.pieces" required />
            </div>
            <div class="col-md-4 mb-3">
              <label>Chambres</label>
              <input
                class="form-control"
                id="chambres"
                v-model="annonce.chambres"
                required
              />
            </div>
            <div class="col-md-4 mb-3">
              <label>Année</label>
              <input class="form-control" id="annee" v-model="annonce.annee" required />
            </div>
            <div class="col-md-6 mb-4">
              <label for="contactComment">Descriptif :</label>
              <textarea
                class="form-control"
                id="contactComment"
                rows="3"
                v-model="annonce.commentaire"
                required
              ></textarea>
            </div>
            <div class="col-md-6 mb-4">
              <label for="equipement">Equipement :</label>
              <textarea
                class="form-control"
                id="equipement"
                rows="3"
                v-model="annonce.equipement"
                required
              ></textarea>
            </div>
            <div class="col-md-4 mb-5">
              <label for="energie">Energie</label>
              <select
                class="form-control"
                id="energie"
                v-model="annonce.energie"
                required
              >
                <option>A</option>
                <option>B</option>
                <option>C</option>
                <option>D</option>
                <option>E</option>
                <option>F</option>
                <option>G</option>
              </select>
            </div>
            <div class="col-md-4 mb-5">
              <label for="ges">Ges</label>
              <select class="form-control" id="ges" v-model="annonce.ges" required>
                <option>A</option>
                <option>B</option>
                <option>C</option>
                <option>D</option>
                <option>E</option>
                <option>F</option>
                <option>G</option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary col-md-12 mb-5">Ajouter</button>
            <br />
            <br />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../firebaseDb";

export default {
  data() {
    return {
      annonce: {},
    };
  },
  methods: {
    addAnnonce(event) {
      event.preventDefault();
      this.annonce.statut = "A traiter";
      db.collection("annonces")
        .add(this.annonce)
        .then(() => {
          alert("Annonce ajoutée.");
          this.annonce.av = "";
          this.annonce.ville = "";
          this.annonce.cp = "";
          this.annonce.prix = "";
          this.annonce.maison = "";
          this.annonce.surface = "";
          this.annonce.pieces = "";
          this.annonce.chambres = "";
          this.annonce.annee = "";
          this.annonce.descriptif = "";
          this.annonce.commentaire = "";
          this.annonce.equipement = "";
          this.annonce.energie = "";
          this.annonce.ges = "";
          this.annonce.ville = "";
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

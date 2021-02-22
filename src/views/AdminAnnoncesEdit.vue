<template>
  <div class="justify-content-center container">
    <div class="col-md-12">
      <h3 class="text-center">Mise à jour de Annonce</h3>
      <form @submit.prevent="onUpdateForm">
        <div class="form-row">
          <div class="col-md-4 mb-1">
            <label for="annonceType">Achat / Vente</label>
            <select
              class="form-control"
              id="annonceType"
              v-model="annonce.av"
              required
            >
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
            <input
              class="form-control"
              id="prix"
              v-model="annonce.prix"
              required
            />
          </div>
          <div class="col-md-4 mb-2">
            <label>Ville</label>
            <input
              class="form-control"
              id="ville"
              v-model="annonce.ville"
              required
            />
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
            <input
              class="form-control"
              id="pieces"
              v-model="annonce.pieces"
              required
            />
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
            <input
              class="form-control"
              id="annee"
              v-model="annonce.annee"
              required
            />
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
            <select
              class="form-control"
              id="ges"
              v-model="annonce.ges"
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
            <div class="col-md-4 mb-1">
            <label for="annonceStatut">Statut</label>
            <select
              class="form-control"
              id="annonceStatut"
              v-model="annonce.statut"
              required
            >
              <option>A traiter</option>
              <option>Traité</option>
            </select>
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Mettre a jour</button>
      </form>
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
  created() {
    let dbRef = db.collection("annonces").doc(this.$route.params.id);
    dbRef
      .get()
      .then((doc) => {
        this.annonce = doc.data();
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    onUpdateForm(event) {
      event.preventDefault();
      db.collection("annonces")
        .doc(this.$route.params.id)
        .update(this.annonce)
        .then(() => {
          console.log("Annonce successfully updated!");
          this.$router.push("/adminAnnonces");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<template>
  <div v-if="admin">
    <div class="col-md-12">
      <div class="form-group">
        <input
          type="text"
          name="search"
          v-model="annonceSearch"
          placeholder="Search annonce"
          class="form-control"
          v-on:keyup="searchannonce"
        />
      </div>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Achat/Vente</th>
            <th>Maison/Appt Année</th>
            <th>Prix</th>
            <th>CP Ville</th>
            <th>Surface Pieces Chbres</th>
            <th>Descriptif</th>
            <th>Equipement</th>
            <th>Energie / GES</th>
            <th>Statut</th>
             <th>Edit/Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="annonce in annonces" :key="annonce.key">
            <td>{{ annonce.av }}</td>
            <td>{{ annonce.maison }} / {{ annonce.annee }}</td>
            <td>{{ annonce.prix }} €</td>
            <td>{{ annonce.cp }}  {{ annonce.ville }}</td>
            <td>
              {{ annonce.surface }} m²/ {{ annonce.pieces }} pièces/
              {{ annonce.chambres }} chambres
            </td>
            <td>{{ annonce.commentaire }}</td>
            <td>{{ annonce.equipement }}</td>
            <td>{{ annonce.energie }} / {{ annonce.ges }}</td>
            <td>{{ annonce.statut }}</td>
            <td>
              <router-link
                :to="{ name: 'editAnno', params: { id: annonce.key } }"
                class="btn btn-primary"
                >Edit
              </router-link>

              <button
                @click.prevent="deleteAnnonce(annonce.key)"
                class="btn btn-danger"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div v-else>
    <br /><br />
    <h3>Sorry but you need to be admin to see those data ;)</h3>
  </div>
</template>

<script>
import { db } from "../firebaseDb";
import firebase from "firebase";

export default {
  data() {
    return {
      annonces: [],
      originalAnnonce: [],
      annonceSearch: "",
      admin: false,
      user: "",
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.admin = true;
        this.fetchAnnonce();
      }
    });
  },
  methods: {
    fetchAnnonce: function () {
      db.collection("annonces").onSnapshot((snapshotChange) => {
        this.annonces = [];
        snapshotChange.forEach((doc) => {
          this.annonces.push({
            key: doc.id,
            av: doc.data().av,
            commentaire: doc.data().commentaire,
            annee: doc.data().annee,
            prix: doc.data().prix,
            maison: doc.data().maison,
            cp: doc.data().cp,
            ville: doc.data().ville,
            surface: doc.data().surface,
            chambres: doc.data().chambres,
            equipement: doc.data().equipement,
            energie: doc.data().energie,
            ges: doc.data().ges,
            statut: doc.data().statut,
          });
        });
        this.originalAnnonce = this.annonces;
      });
    },
    deleteAnnonce(id) {
      if (window.confirm("Do you really want to delete?")) {
        db.collection("annonces")
          .doc(id)
          .delete()
          .then(() => {
            console.log("annonce deleted!");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    searchannonce: function () {
      if (this.annonceSearch == "") {
        this.annonces = this.originalAnnonce;
        this.fetchAnnonce();
      }
      var searchedAnnonce = [];
      for (var i = 0; i < this.originalAnnonce.length; i++) {
        var annonceEqpt = this.originalAnnonce[i]["equipement"].toLowerCase();
        var annonceStatut = this.originalAnnonce[i]["statut"].toLowerCase();
        var annonceVille = this.originalAnnonce[i]["ville"].toLowerCase();
        var annonceSurface = this.originalAnnonce[i]["surface"].toLowerCase();
        var annonceCommentaire = this.originalAnnonce[i][
          "commentaire"
        ].toLowerCase();

        if (annonceEqpt.indexOf(this.annonceSearch.toLowerCase()) >= 0) {
          searchedAnnonce.push(this.originalAnnonce[i]);
        }
        if (annonceStatut.indexOf(this.annonceSearch.toLowerCase()) >= 0) {
          searchedAnnonce.push(this.originalAnnonce[i]);
        }
        if (annonceVille.indexOf(this.annonceSearch.toLowerCase()) >= 0) {
          searchedAnnonce.push(this.originalAnnonce[i]);
        }
        if (annonceSurface.indexOf(this.annonceSearch.toLowerCase()) >= 0) {
          searchedAnnonce.push(this.originalAnnonce[i]);
        }
        if (annonceCommentaire.indexOf(this.annonceSearch.toLowerCase()) >= 0) {
          searchedAnnonce.push(this.originalAnnonce[i]);
        }
      }
      this.annonces = searchedAnnonce;
    },
  },
};
</script>

<style>
.btn-primary {
  margin-right: 12px;
}
</style>

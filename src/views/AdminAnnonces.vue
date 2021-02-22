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
          </tr>
        </thead>
        <tbody>
          <tr v-for="annonce in annonces" :key="annonce.key">
            <td>{{ annonce.email }}</td>
            <td>{{ annonce.aide }}</td>
            <td>{{ annonce.commentaire }}</td>
            <td>{{ annonce.statut }}</td>
            <td>
              <router-link
                :to="{ name: 'edit', params: { id: annonce.key } }"
                class="btn btn-primary"
                >Edit
              </router-link>

              <button @click.prevent="deleteannonce(annonce.key)" class="btn btn-danger">
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
      originalannonce: [],
      annonceSearch: "",
      admin: false,
      user: "",
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.admin = true;
        this.fetchannonce();
      }
    });
  },
  methods: {
    fetchannonce: function () {
      db.collection("annonces").onSnapshot((snapshotChange) => {
        this.annonces = [];
        snapshotChange.forEach((doc) => {
          this.annonces.push({
            key: doc.id,
            email: doc.data().email,
            aide: doc.data().aide,
            domaine: doc.data().domaine,
            commentaire: doc.data().commentaire,
            statut: doc.data().statut,
          });
        });
        this.originalannonce = this.annonces;
      });
    },
    deleteannonce(id) {
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
        this.annonces = this.originalannonce;
        this.fetchannonce();
      }
      var searchedannonce = [];
      for (var i = 0; i < this.originalannonce.length; i++) {
        var annonceEMail = this.originalannonce[i]["email"].toLowerCase();
        var annonceStatut = this.originalannonce[i]["statut"].toLowerCase();
        var annonceAide = this.originalannonce[i]["aide"].toLowerCase();
        var annonceDomaine = this.originalannonce[i]["domaine"].toLowerCase();
        var annonceCommentaire = this.originalannonce[i]["commentaire"].toLowerCase();

        if (annonceEMail.indexOf(this.annonceSearch.toLowerCase()) >= 0) {
          searchedannonce.push(this.originalannonce[i]);
        }
        if (annonceStatut.indexOf(this.annonceSearch.toLowerCase()) >= 0) {
          searchedannonce.push(this.originalannonce[i]);
        }
        if (annonceAide.indexOf(this.annonceSearch.toLowerCase()) >= 0) {
          searchedannonce.push(this.originalannonce[i]);
        }
        if (annonceDomaine.indexOf(this.annonceSearch.toLowerCase()) >= 0) {
          searchedannonce.push(this.originalannonce[i]);
        }
        if (annonceCommentaire.indexOf(this.annonceSearch.toLowerCase()) >= 0) {
          searchedannonce.push(this.originalannonce[i]);
        }
      }
      this.annonces = searchedannonce;
    },
  },
};
</script>

<style>
.btn-primary {
  margin-right: 12px;
}
</style>

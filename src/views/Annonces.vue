<template>
  <main>
    <div class="position-relative overflow-hidden p-1 p-md-5 m-md-1 text-center bg-light">
      <div class="col-md-5 p-lg-1 mx-auto my-1">
        <h1 class="display-4 fw-normal">Biens en Vente</h1>
        <p class="lead fw-normal">{{ this.nbAnnonce }} Résultats</p>
      </div>
      <div class="product-device shadow-sm d-none d-md-block"></div>
      <div class="product-device product-device-2 shadow-sm d-none d-md-block"></div>
    </div>

    <div>
      <br />
      <input
        type="text"
        name="search"
        v-model="annonceSearch"
        placeholder="Chercher Annonce"
        class="form-control"
        v-on:keyup="searchAnnonce"
      />
    </div>

    <div
      v-for="annonce in annonces"
      :key="annonce.key"
      class="d-md-flex flex-md-equal w-100 my-md-2 ps-md-3"
    >
      <div :class="annonce.class1">
        <div class="my-3 py-3">
          <h2 class="display-5">
            {{ annonce.maison }} de {{ annonce.surface }} m² -
            {{ annonce.chambres }} chambres à {{ annonce.ville }}
          </h2>
          <p class="lead">{{ annonce.chambres }} pièces à {{ annonce.prix }}€</p>
        </div>
        <div
          :class="annonce.class2"
          style="width: 100%; height: 400px; border-radius: 21px 21px 0 0"
        >
          <router-link :to="{ name: 'annonceDetail', params: { id: annonce.key } }"
            ><img src="../assets/immo1.jpg" />&nbsp;&nbsp;<img
              src="../assets/immo2.jpg"
            />
          </router-link>
        </div>
        <br /><br />
      </div>
    </div>
  </main>
</template>

<script>
import { db } from "../firebaseDb";

export default {
  data() {
    return {
      annonces: [],
      originalAnnonce: [],
      annonceSearch: "",
      nbAnnonce: 0,
      itemId: 0,
      showDiv: true,
      class1: "",
      class2: "",
    };
  },
  created() {
    this.fetchAnnonce();
  },
  methods: {
    fetchAnnonce: function () {
      db.collection("annonces").onSnapshot((snapshotChange) => {
        this.annonces = [];
        this.itemId = 0;
        snapshotChange.forEach((doc) => {
          if (doc.data().statut == "A traiter") {
            if (this.itemId % 2 == 0) {
              this.class1 =
                "bg-dark text-white me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden";
              this.class2 =
                "bg-light me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden";
              this.showDiv = true;
            } else {
              this.class1 =
                "bg-light me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden";
              this.class2 =
                "bg-dark text-white me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden";
              this.showDiv = false;
            }

            this.itemId++;
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
              class1: this.class1,
              class2: this.class2,
              showDiv: this.showDiv,
            });
          }
        });
        this.nbAnnonce = this.annonces.length;
        this.originalAnnonce = this.annonces;
      });
    },

    searchAnnonce: function () {
      if (this.annonceSearch == "") {
        this.annonces = this.originalAnnonce;
        this.fetchAnnonce();
      }
      var searchedAnnonce = [];
      for (var i = 0; i < this.originalAnnonce.length; i++) {
        var annonceEqpt = this.originalAnnonce[i]["equipement"].toLowerCase();
        var annonceVille = this.originalAnnonce[i]["ville"].toLowerCase();
        var annonceSurface = this.originalAnnonce[i]["surface"].toLowerCase();
        var annonceCommentaire = this.originalAnnonce[i]["commentaire"].toLowerCase();
        var annonceam = this.originalAnnonce[i]["maison"].toLowerCase();
        var annoncepieces = this.originalAnnonce[i]["pieces"].toLowerCase();
        var annonceprix = this.originalAnnonce[i]["prix"].toLowerCase();

        if (annonceEqpt.indexOf(this.annonceSearch.toLowerCase()) >= 0) {
          searchedAnnonce.push(this.originalAnnonce[i]);
        }
        if (annonceprix.indexOf(this.annonceSearch.toLowerCase()) >= 0) {
          searchedAnnonce.push(this.originalAnnonce[i]);
        }
        if (annonceam.indexOf(this.annonceSearch.toLowerCase()) >= 0) {
          searchedAnnonce.push(this.originalAnnonce[i]);
        }
        if (annoncepieces.indexOf(this.annonceSearch.toLowerCase()) >= 0) {
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
.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}

.container {
  max-width: 960px;
}

/*
 * Dummy devices (replace them with your own or something else entirely!)
 */

.product-device {
  position: absolute;
  right: 10%;
  width: 150px;
  height: 240px;
  bottom: 0;
  background-color: #333;
  border-radius: 21px;
  transform: rotate(30deg);
}

.product-device-2 {
  right: auto;
  bottom: 0;
  left: 5%;
  background-color: #e5e5e5;
}

/*
 * Extra utilities
 */

.flex-equal > * {
  flex: 1;
}
@media (min-width: 768px) {
  .flex-md-equal > * {
    flex: 1;
  }
}
</style>

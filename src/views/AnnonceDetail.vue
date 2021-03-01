<template>
  <main role="main">
    <!-- Wrap the rest of the page in another container to center all the content. -->

    <div class="container marketing">
      <!-- Three columns of text below the carousel -->
      <div class="row">
        <div class="col-lg-12">
          <br />
          <h2>
            {{ annonce.av }} {{ annonce.maison }} à {{ annonce.ville }} -
            {{ annonce.chambres }} chambres
          </h2>
          <br />
          <img src="../assets/immo1.jpg" />
          <br />
          <br />
          <h3>Au prix de {{ annonce.prix }} €</h3>
          <br />
        </div>
      </div>
      <div class="row featurette">
        <div class="col-sm">
          <p class="lead">
            Nombre de pièces : {{ annonce.pieces }}
            <br />
            Nombre de chambres : {{ annonce.chambres }}
            <br />
            Année de construction : 1970
            <br />
          </p>
        </div>
        <div class="col-sm">
          <img src="../assets/immo2.jpg" />
        </div>
      </div>

      <hr class="featurette-divider" />

      <div class="row featurette">
        <div class="col-sm">
          <img src="../assets/immo3.jpg" />
        </div>
        <div class="col-sm">
          <p class="lead">
            Descriptif : <br />
            {{ annonce.commentaire }}
          </p>
        </div>
      </div>

      <hr class="featurette-divider" />

      <div class="row featurette">
        <div class="col-sm">
          <p class="lead">
            Equipement : <br />
            {{ annonce.equipement }}
          </p>
        </div>
        <div class="col-sm">
          <img src="../assets/immo4.jpg" />
        </div>
      </div>

      <hr class="featurette-divider" />

      <div class="row featurette">
        <div class="col-sm">
          <img src="../assets/immo5.jpg" />
        </div>
        <div class="col-sm">
          <p class="lead">
            Bilan Energetique :<br />
            Consommation d'énérgie : {{ annonce.energie }} <br />
            Emission de Gaz à effet de serre : {{ annonce.ges }}
          </p>
        </div>
      </div>

      <hr class="featurette-divider" />

      <!-- /END THE FEATURETTES -->
    </div>
    <!-- /.container -->
  </main>
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
};
</script>

<style>
.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}
</style>

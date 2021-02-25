<template>
  <main role="main">
    <!-- Wrap the rest of the page in another container to center all the content. -->

    <div class="container marketing">
      <!-- Three columns of text below the carousel -->
      <div class="row">
        <div class="col-lg-12">
          <img src="../assets/immo1.jpg" />
          <h2>{{ annonce.av }} à {{ annonce.ville }} pour {{ annonce.prix }}€</h2>
          <p>
            {{ annonce.commentaire }}
          </p>
        </div>
      </div>
      <hr class="featurette-divider" />

      <div class="row featurette">
        <div class="col-md-6">
          <p class="lead">
            {{ annonce.equipement }}
          </p>
        </div>
        <div class="col-md-6">
          <img src="../assets/immo2.jpg" />
        </div>
      </div>

      <hr class="featurette-divider" />

      <div class="row featurette">
        <div class="col-md-6 order-md-2">
          <p class="lead">
            Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta
            felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl
            consectetur. Fusce dapibus, tellus ac cursus commodo.
          </p>
        </div>
        <div class="col-md-6 order-md-1">
          <img src="../assets/immo3.jpg" />
        </div>
      </div>

      <hr class="featurette-divider" />

      <div class="row featurette">
        <div class="col-md-6">
          <img src="../assets/immo4.jpg" />
        </div>
        <div class="col-md-6">
          <img src="../assets/immo5.jpg" />
        </div>
      </div>

      <hr class="featurette-divider" />

      <div class="row featurette">
        <div class="col-md-5">
          <img src="../assets/immo6.jpg" />
        </div>
        <div class="col-md-5">
          <img src="../assets/immo7.jpg" />
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

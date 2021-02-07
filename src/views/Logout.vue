<template>
  <div class="container">
    <br /><br />
    <h3>On se déco {{ user.email }} ??</h3>

    <button type="submit" class="btn btn-dark btn-lg btn-block" @click="logOut()">
      Déconnecter
    </button>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      user: null,
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  },
  methods: {
    logOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          firebase.auth().onAuthStateChanged(() => {
            this.$router.push("/");
          });
        });
    },
  },
};
</script>

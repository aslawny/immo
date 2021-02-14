<template>
  <div class="justify-content-center container">
    <div class="col-md-12">
      <h3 class="text-center">Mise à jour de contact Contact</h3>
      <form @submit.prevent="onUpdateForm">
        <div class="form-group">
          <label>Email</label>
          <input type="email" class="form-control" v-model="contact.email" required />
        </div>
        <div class="form-group">
          <label>Accompagnent souhaité</label>
          <select class="form-control" id="contactAide" v-model="contact.aide" required>
            <option>Je souhaite acheter un bien</option>
            <option>Je souhaite vendre mon bien</option>
            <option>Je souhaite estimer mon bien</option>
            <option>Je souhaite simplement quelques renseignements</option>
          </select>
        </div>
        <div class="form-group">
          <label>Statut</label>
          <select
            class="form-control"
            id="contactStatut"
            v-model="contact.statut"
            required
          >
            <option>A traiter</option>
            <option>En cours</option>
            <option>Traité</option>
          </select>
        </div>
        <div class="form-group">
          <label>Commentaire</label>
          <textarea
            class="form-control"
            id="contactComment"
            rows="3"
            v-model="contact.commentaire"
            required
          ></textarea>
          <button type="submit" class="btn btn-primary">Mettre a jour</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { db } from "../firebaseDb";

export default {
  data() {
    return {
      contact: {},
    };
  },
  created() {
    let dbRef = db.collection("contacts").doc(this.$route.params.id);
    dbRef
      .get()
      .then((doc) => {
        this.contact = doc.data();
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    onUpdateForm(event) {
      event.preventDefault();
      db.collection("contacts")
        .doc(this.$route.params.id)
        .update(this.contact)
        .then(() => {
          console.log("Contact successfully updated!");
          this.$router.push("/admin");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

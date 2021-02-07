<template>
  <div class="home">
    <div class="container">
      <br />" Crois que tu y arriveras et tu seras à mi-chemin." &nbsp;&nbsp; Théodore
      Roosevelt<br />
      <div class="home-img">
        &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <form id="contact_form" v-on:submit.prevent="addContact">
          <div class="form-group">
            <label for="contactEMail">Votre Email (Pour vous recontacter))</label>
            <input
              type="email"
              class="form-control"
              id="contactEMail"
              placeholder="nom@exemple.fr"
              v-model="contact.email"
              required
            />
          </div>
          <div class="form-group">
            <label for="contactAide">Aide Souhaitée</label>
            <select class="form-control" id="contactAide" v-model="contact.aide" required>
              <option>Reconversion</option>
              <option>Coaching</option>
            </select>
          </div>
          <div class="form-group">
            <label for="contactDomaine">Domaine</label>
            <select
              class="form-control"
              id="contactDomaine"
              v-model="contact.domaine"
              required
            >
              <option>Commercial</option>
              <option>Programmation</option>
            </select>
          </div>
          <div class="form-group">
            <label for="contactComment">Dites nous en plus :</label>
            <textarea
              class="form-control"
              id="contactComment"
              rows="3"
              v-model="contact.commentaire"
              required
            ></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Contactez Moi</button>
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
      contact: {},
    };
  },
  methods: {
    addContact(event) {
      event.preventDefault();
      this.contact.statut = "A traiter";
      db.collection("contacts")
        .add(this.contact)
        .then(() => {
          alert(
            "Merci pour votre demande! Nous tenterons de vous recontacter dans les plus brefs délais."
          );
          this.contact.email = "";
          this.contact.aide = "";
          this.contact.domaine = "";
          this.contact.commentaire = "";
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

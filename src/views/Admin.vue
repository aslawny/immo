<template>
  <div v-if="admin">
    <div class="col-md-12">
      <div class="form-group">
        <input
          type="text"
          name="search"
          v-model="contactSearch"
          placeholder="Chercher Contact"
          class="form-control"
          v-on:keyup="searchContact"
        />
      </div>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Email</th>
            <th>Accompagnent</th>
            <th>Commentaire</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="contact in contacts" :key="contact.key">
            <td>{{ contact.email }}</td>
            <td>{{ contact.aide }}</td>
            <td>{{ contact.commentaire }}</td>
            <td>{{ contact.statut }}</td>
            <td>
              <router-link
                :to="{ name: 'edit', params: { id: contact.key } }"
                class="btn btn-primary"
                >Edit
              </router-link>

              <button @click.prevent="deleteContact(contact.key)" class="btn btn-danger">
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
      contacts: [],
      originalContact: [],
      contactSearch: "",
      admin: false,
      user: "",
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.admin = true;
        this.fetchContact();
      }
    });
  },
  methods: {
    fetchContact: function () {
      db.collection("contacts").onSnapshot((snapshotChange) => {
        this.contacts = [];
        snapshotChange.forEach((doc) => {
          this.contacts.push({
            key: doc.id,
            email: doc.data().email,
            aide: doc.data().aide,
            domaine: doc.data().domaine,
            commentaire: doc.data().commentaire,
            statut: doc.data().statut,
          });
        });
        this.originalContact = this.contacts;
      });
    },
    deleteContact(id) {
      if (window.confirm("Do you really want to delete?")) {
        db.collection("contacts")
          .doc(id)
          .delete()
          .then(() => {
            console.log("Contact deleted!");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    searchContact: function () {
      if (this.contactSearch == "") {
        this.contacts = this.originalContact;
        this.fetchContact();
      }
      var searchedContact = [];
      for (var i = 0; i < this.originalContact.length; i++) {
        var contactEMail = this.originalContact[i]["email"].toLowerCase();
        var contactStatut = this.originalContact[i]["statut"].toLowerCase();
        var contactAide = this.originalContact[i]["aide"].toLowerCase();
        var contactDomaine = this.originalContact[i]["domaine"].toLowerCase();
        var contactCommentaire = this.originalContact[i]["commentaire"].toLowerCase();

        if (contactEMail.indexOf(this.contactSearch.toLowerCase()) >= 0) {
          searchedContact.push(this.originalContact[i]);
        }
        if (contactStatut.indexOf(this.contactSearch.toLowerCase()) >= 0) {
          searchedContact.push(this.originalContact[i]);
        }
        if (contactAide.indexOf(this.contactSearch.toLowerCase()) >= 0) {
          searchedContact.push(this.originalContact[i]);
        }
        if (contactDomaine.indexOf(this.contactSearch.toLowerCase()) >= 0) {
          searchedContact.push(this.originalContact[i]);
        }
        if (contactCommentaire.indexOf(this.contactSearch.toLowerCase()) >= 0) {
          searchedContact.push(this.originalContact[i]);
        }
      }
      this.contacts = searchedContact;
    },
  },
};
</script>

<style>
.btn-primary {
  margin-right: 12px;
}
</style>

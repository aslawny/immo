<template>
  <div id="app">
    <!-- header -->
    <div id="nav">
      <nav class="navbar fixed-top navbar-expand-lg navbar-dark">
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarHeader"
          aria-controls="navbarHeader"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarHeader">
          <ul class="navbar-center navbar-nav mr-auto mt-2 mt-lg-0">
            <li
              class="nav-item"
              v-on:click="setActive('/')"
              :class="{ active: isActive('/') }"
            >
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li
              class="nav-item"
              v-on:click="setActive('annonces')"
              :class="{ active: isActive('annonces') }"
            >
              <router-link class="nav-link" to="/annonces">Annonces</router-link>
            </li>
            <li
              class="nav-item"
              v-on:click="setActive('pricing')"
              :class="{ active: isActive('pricing') }"
            >
              <router-link class="nav-link" to="/pricing">Honoraires</router-link>
            </li>
            <li
              class="nav-item"
              v-on:click="setActive('contact')"
              :class="{ active: isActive('contact') }"
            >
              <router-link class="nav-link" to="/contact">Contactez-Moi</router-link>
            </li>
            <li
              v-if="admin"
              class="nav-item"
              v-on:click="setActive('admin')"
              :class="{ active: isActive('admin') }"
            >
              <router-link class="nav-link" to="/admin">Gérer Contacts</router-link>
            </li>
            <li
              v-if="admin"
              class="nav-item"
              v-on:click="setActive('addAnnonces')"
              :class="{ active: isActive('addAnnonces') }"
            >
              <router-link class="nav-link" to="/addAnnonces"
                >Ajouter Annonces</router-link
              >
            </li>
            <li
              v-if="admin"
              class="nav-item"
              v-on:click="setActive('adminAnnonces')"
              :class="{ active: isActive('adminAnnonces') }"
            >
              <router-link class="nav-link" to="/adminAnnonces"
                >Gérer Annonces</router-link
              >
            </li>
            <li
              v-if="admin"
              class="nav-item"
              v-on:click="setActive('logout')"
              :class="{ active: isActive('logout') }"
            >
              <router-link class="nav-link" to="/logout">Logout</router-link>
            </li>
            <li
              class="nav-item"
              v-on:click="setActive('about')"
              :class="{ active: isActive('about') }"
            >
              <router-link class="nav-link" to="/about">A propos</router-link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    <!-- current page -->
    <div>
      <br /><br /><br />
      <h4>Romain Tardif présente</h4>
      <h1>Le Marly de Romain</h1>
      <h4>Depuis 2014</h4>
      <router-view />
      <br /><br />
    </div>
    <!-- footer-->
    <nav navbar-expand-lg class="navbar navbar-bottom fixed-bottom navbar-foot">
      <ul class="navbar-footer-center navbar-nav mr-auto text-center">
        <li class="nav-item">
          <a v-if="admin" class="navbar-brand" href=""> Welcome {{ login }}</a>
          <router-link v-else to="/login">Copyright 2021</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "App",
  components: {},
  data() {
    return { activeItem: "/", login: "", admin: false };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.admin = true;
        this.login = user.email;
      }
    });
  },
  methods: {
    isActive: function (menuItem) {
      return this.activeItem === menuItem;
    },
    setActive: function (menuItem) {
      this.activeItem = menuItem;
    },
  },
};
</script>

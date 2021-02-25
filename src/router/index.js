import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import Contact from "@/views/Contact.vue";
import ContactEdit from "@/views/ContactEdit.vue";
import AdminAnnoncesEdit from "@/views/AdminAnnoncesEdit.vue";
import Admin from "@/views/Admin.vue";
import AdminAnnonces from "@/views/AdminAnnonces.vue";
import AddAnnonces from "@/views/AddAnnonces.vue";
import About from "@/views/About.vue";
import Pricing from "@/views/Pricing.vue";
import Annonces from "@/views/Annonces.vue";
import AnnonceDetail from "@/views/AnnonceDetail.vue";
import Login from "@/views/Login.vue";
import Logout from "@/views/Logout.vue";
import NotFound from "@/views/NotFound.vue";

const routes = [{
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/contact",
        name: "Contact",
        component: Contact,
    },
    {
        path: "/pricing",
        name: "Pricing",
        component: Pricing,
    },
    {
        path: "/annonces",
        name: "Annonces",
        component: Annonces,
    },
    {
        path: "/annonceDetail:id",
        name: "annonceDetail",
        component: AnnonceDetail,
    },
    {
        path: "/admin",
        name: "Admin",
        component: Admin,
    },
    {
        path: "/adminAnnonces",
        name: "AdminAnnonces",
        component: AdminAnnonces,
    },
    {
        path: "/addAnnonces",
        name: "AddAnnonces",
        component: AddAnnonces,
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/logout",
        name: "Logout",
        component: Logout,
    },
    {
        path: "/about",
        name: "About",
        component: About,
    },
    {
        path: '/edit/:id',
        name: 'edit',
        component: ContactEdit,
    },
    {
        path: '/editAnno/:id',
        name: 'editAnno',
        component: AdminAnnoncesEdit,
    }, {
        path: "/:catchAll(.*)",
        component: NotFound,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
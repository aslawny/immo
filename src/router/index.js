import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import Contact from "@/views/Contact.vue";
import ContactEdit from "@/views/ContactEdit.vue";
import Admin from "@/views/Admin.vue";
import About from "@/views/About.vue";
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
        path: "/admin",
        name: "Admin",
        component: Admin,
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
import Vue from "vue";
import Router from "vue-router";
import Login from "../components/login.component.vue";
import EmotiEntry from "../components/emote-entry.component.vue";
import store from "../store";
import { IAuthState } from "../store/auth.store";



Vue.use(Router);

const router: Router = new Router({
    routes: [
        {
            path: "/",
            component: EmotiEntry
        },
        {
            path: "/login",
            name: "login",
            component: Login,
            beforeEnter: (to: Router.Route, from: Router.Route, next: (to?: Router.RawLocation) => any): any => {
                const state:IAuthState = <IAuthState>store.state.auth;
                if (state.authStatus === "authenticated") {
                    next("/");
                } else {
                    next();
                }
            }
        },
        {
            path: "*",
            redirect: "/"
        }
    ]
});

// router.beforeEach((to, from, next) => {
//     if(to.matched.some(record => record.meta.requiresAuth)) {

//     } else {
//         return next();
//     }
// })

export default router;

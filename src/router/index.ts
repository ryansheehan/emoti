import Vue from "vue";
import Router from "vue-router";
import store from "../store";
import Home from "../components/home.component.vue";
import Login from "../components/login.component.vue";


Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      redirect: { name: "home" }
    },
    {
      path: "/home",
      name: "home",
      component: Home,
      meta: { requiresAuth: true }
    },
    {
        path: "/login",
        name: "login",
        component: Login,
        beforeEnter(to: Router.Route, from: Router.Route, next: (to?:Router.RawLocation)=>any): any {
            return store.getters.isAuthenticated.then((authenticated:boolean)=> {
                if(authenticated) {
                    return next({name: "home"});
                }
                return next();
            });
        }
    }
  ]
});

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        return store.getters.isAuthenticated.then((authenticated: boolean) => {
            if(authenticated) {
                return next();
            }
            return next({name: "login"});
        });
    }
    return next();
})

export default router;

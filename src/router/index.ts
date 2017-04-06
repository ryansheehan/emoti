import Vue from "vue";
import Router from "vue-router";
import store from "../store";
import Home from "../components/home.component.vue";
import Login from "../components/login.component.vue";


Vue.use(Router);

const router: Router = new Router({
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
        beforeEnter: (to: Router.Route, from: Router.Route, next: (to?:Router.RawLocation)=>any): any => {
            if(store.getters.isAuthenticated) {
                console.log("here 1");
                next({name: "home"});
            } else {
                console.log("here 2");
                next();
            }
        }
    }
  ]
});

router.beforeEach((to, from, next) => {
    console.log("going to ", to);
    console.log("status:", store.state.auth.authenticationStatus);
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if(!store.getters.isAuthenticated) {
            console.log("here 3");
            next();
        } else {
            console.log("here 4");
            next({name: "login"});
        }
    } else {
        console.log("here 5");
        return next();
    }
})

export default router;

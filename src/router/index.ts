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
            console.log("before promise");
            store.getters.initializedPromise.then(()=> {
                console.log("in promise");
                if(store.getters.isAuthenticated) {
                    console.log("login home");
                    next({name: "home"});
                } else {
                    console.log("login continue");
                    next();
                }
            });
        }
    }
  ]
});

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        store.getters.initializedPromise.then(()=> {
            if(store.getters.isAuthenticated) {
                next();
            } else {
                next({name: "login"});
            }
        });
    } else {
        return next();
    }
})

export default router;

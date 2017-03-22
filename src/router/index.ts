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
        beforeEnter(to: Router.Route, from: Router.Route, next: (to?:Router.RawLocation)=>any): any {
            waitForAuthenticationStatus().then(()=>{
                if(store.getters['auth/isAuthenticated']) {
                    next({name: "home"});
                } else {
                    next();
                }
             });
        }
    }
  ]
});


function waitForAuthenticationStatus(pollTime:number = 100):Promise<any> {
    return new Promise<any>((resolve, reject)=> {
        function _wait():void {
            if(store.state.auth.authenticationStatus === "undetermined") {
                setTimeout(_wait, pollTime);
            } else {
                resolve();
            }
        }

        _wait();
    });
}

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        return waitForAuthenticationStatus().then(()=>{
            if(store.getters["auth/isAuthenticated"]) {
                next();
            } else {
                next({name: "login"});
            }
        });
    }
    return next();
})

export default router;

import Vue from 'vue';
import Router from 'vue-router';
import store from '../store';
import Hello from 'layout/hello.layout.vue';
import CounterLayout from 'layout/counter.layout.vue';
import Home from '../components/home.component.vue';
import Login from '../components/login.component.vue';


Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: { name: 'home' }
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: { requiresAuth: true }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        beforeEnter(to, from, next) {
            return store.getters.isAuthenticated.then((authenticated:boolean)=>{
                if(authenticated) {
                    next({name: 'home'});
                }
            });
        }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    return store.getters.isAuthenticated.then((authenticated:boolean) => {
        if(authenticated) {
            console.log(`User is authorized for ${to.name}.`);
            next();
        } else {
            console.warn(`Route ${to.name} requires authentication and user is not authenticated.  set meta: { requiresAuth: false}`);
            next({name: 'login'});
        }
    });
  }
  next();
})

export default router;

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
            if(store.getters.isAuthenticated) {
                router.push('home');
            }
        }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(!store.getters.isAuthenticated) {
        console.log(store.getters.isAuthenticated);
        console.log(to, from);
      console.warn('Route requires authentication and user is not authenticated.  set meta: { requiresAuth: false}');
      return next('/login');
    }
  }
  next();
})

export default router;

import Vue from 'vue';
import Router from 'vue-router';
import store from '../store';
import Hello from 'layout/hello.layout.vue';
import CounterLayout from 'layout/counter.layout.vue';


Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'hello',
      component: Hello
    },
    {
      path: '/counter',
      name: 'counter',
      component: CounterLayout,
      meta: { requiresAuth: true }
    }
  ]
});

router.beforeEach((to, from, next) => {  
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(!store.getters.isAuthenticated) {   
      console.warn('Route requires authentication and user is not authenticated.  set meta: { requiresAuth: false}');
      return next('/');
    }
  } 
  next();
})

export default router;

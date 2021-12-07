import Vue from 'vue';
import { routes } from '../routes';
import VueRouter from 'vue-router';

const router = new VueRouter({
    mode: 'history',
    routes,
});

/**
 * En cada navegación podremos comprobar si la página a la que intenta acceder
 * requiere de autenticación y, de ser así, si el usuario se autenticó. Si el
 * usuario aún no se ha autenticado e intenta visitar una página privada le
 * enviaremos al login. Si está autenticado e intenta visitar el login le
 * enviaremos a la pantalla principal.
 */
router.beforeEach((to, from, next) => {
    let auth = localStorage.getItem('auth');
    const publicPages = ['login', 'register'];
    let isPublic = publicPages.indexOf(to.name) !== -1;
    if (!auth && !isPublic) {
        next({ name: "login" });
    }
    if(auth && to.name === 'login') {
        return next({ name: 'home' });
    }
    return next();
})

Vue.$router = router;

Vue.use(VueRouter);

export default router;

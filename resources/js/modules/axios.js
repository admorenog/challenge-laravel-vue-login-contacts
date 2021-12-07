import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

/**
 * Configuramos todas las cabeceras necesarias para realizar llamadas
 * api con Laravel y sanctum
 */
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.withCredentials = true;

/**
 * Sanctum devuelve o 401 o 419 en las llamadas api cuando la sesión expira,
 * así que podremos interceptar todas las respuestas ajax realizadas con axios
 * y en caso de recibir alguno de los códigos de error descritos por sesión
 * caducada redirigiremos al login mostrando un mensaje de error.
 * Nosotros tendremos que realizar alguna gestión como borrar los datos de
 * autenticación y ocultar la pantalla de carga, la cual seguramente mostraremos
 * antes de cada llamada.
 */
const sessionExpiredStatusCodes = [401, 419];
axios.interceptors.response.use(null,
    function (error) {
        let sessionExpired = sessionExpiredStatusCodes.indexOf(error.response.status) !== -1;
        if(sessionExpired) {
            console.log("session expired");
            // TODO: mostrar mensaje que indique que la sesión ha expirado.
            localStorage.removeItem("auth");
            Vue.$EventBus.$emit('setLoaderVisibility', false);
            Vue.$router.push({name: 'login'});
        }
        return Promise.reject(error);
    });

Vue.use(VueAxios, axios);

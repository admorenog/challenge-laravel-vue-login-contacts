/**
 * Aquí instanciaremos vue inicializando las distintas configuraciones
 * como pueda ser la del router, bus o axios. Por organización saqué
 * las configuraciones a ficheros aparte dentro de la carpeta modules
 */

import Vue from 'vue';
import router from './modules/router';
import './modules/bus';
import './modules/axios';
import App from './components/Common/MainApp';

new Vue({
    el: '#app',
    router,
    render: h => h(App)
});

import Vue from "vue";

/**
 * Instanciamos Vue en una variable de la clase, de esta forma podremos
 * usarlo dentro de los componentes usando this.$EventBus
 */
Vue.prototype.$EventBus = new Vue();

/**
 * El mismo objeto lo asignamos a la misma variable de forma estática
 * de esta forma podremos usarlo en cualquier parte haciendo import Vue
 * y Vue.$EventBus
 */
Vue.$EventBus = Vue.prototype.$EventBus;

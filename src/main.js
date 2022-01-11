import Vue from 'vue'
import App from './App.vue'
//ativando módulo/plugin no global view project
import VueResource from 'vue-resource';

Vue.use(VueResource);

new Vue({
  el: '#app',
  render: h => h(App)
})
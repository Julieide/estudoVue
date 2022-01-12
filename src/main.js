import Vue from 'vue'
import App from './App.vue'
//registrando o módulo no projeto
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
//tem que vir em {}, pq não é default
import { routes } from './routes';

Vue.use(VueRouter);
//configurando um roteador para enxergar as rotas
const router = new VueRouter ({ 
  routes: routes, // instancia de Router passando a propriedade da rota
  mode: 'history' //usando history o vue.cli se encarrega de encontrar o caminho sem o #
}); 

Vue.use(VueResource);

new Vue({
  el: '#app',
  router, //associando a instacia para que seja vista em todos os lugares da aplicação
  render: h => h(App)
})
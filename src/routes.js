//carregando os componentes que estarão nas rotas
import Cadastro from './components/Cadastro/Cadastro.vue';
import Home from './components/home/Home.vue';

//array com as rotas da aplicação
export const routes = [
    //configurando as rotas>> Rota é um objeto javascript com duas propriedades.
    { path: '', name: 'home', component: Home, titulo: 'Home', menu: true },
    { path: '/cadastro', name:'cadastro', component: Cadastro, titulo: 'Cadastro', menu: true },
    { path: '*', component: Home, menu: false } //qualquer endereço inválido vem para home

];
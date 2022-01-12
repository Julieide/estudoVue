//carregando os componentes que estarão nas rotas
import Cadastro from './components/Cadastro/Cadastro.vue';
import Home from './components/home/Home.vue';

//array com as rotas da aplicação
export const routes = [
    //configurando as rotas>> Rota é um objeto javascript com duas propriedades.
    { path: '', component: Home },//path significa o caminho, quando coloca em branco é como se fosse localhost:8080/#/ ou seja traz a home
    { path: '/Cadastro', component: Cadastro }
];
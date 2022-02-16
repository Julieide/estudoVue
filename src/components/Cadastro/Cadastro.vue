<template>

  <div>
    <h1 class="centralizado">Cadastro</h1>
    <h2 class="centralizado"></h2>

    <h1 v-if="foto._id" class="centralizado">Alteração</h1>
    <h1 v-else class="centralizado">Inclusão</h1>

    <!-- associando o evento com método do componente -->

    <form @submit.prevent="grava()"> <!--.prevent cancela o evento padrao-->

      <div class="controle">
        <label for="titulo">TÍTULO</label>
        <input id="titulo" autocomplete="off" v-model="foto.titulo">
      </div>

      <div class="controle">
        <label for="url">URL</label>
        <input id="url" autocomplete="off" v-model.lazy="foto.url"> <!--lazy só valida na hora que sair do campo-->
        <imagem-responsiva v-show="foto.url" :url="foto.url" :titulo="foto.titulo"/><!-- só vai mostrar o título quando carregar a url-->
      </div>

      <div class="controle">
        <label for="descricao">DESCRIÇÃO</label>
        <textarea id="descricao" autocomplete="off" v-model="foto.descricao"></textarea>
      </div>

      <div class="centralizado">
        <meu-botao rotulo="GRAVAR" tipo="submit"/>
        <router-link :to="{ name:'home'}"><meu-botao rotulo="VOLTAR" tipo="button"/></router-link>
      </div>

    </form>
  </div>
</template>

<script>

import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue'
import Botao from '../shared/botao/Botao.vue';
import Foto from '../../domain/foto/Foto';
import FotoService from '../../domain/foto/FotoService';

export default {

  components: {

    'imagem-responsiva': ImagemResponsiva, 
    'meu-botao': Botao
  },

  data() {
    return {

      foto: new Foto(),
      id: this.$route.params.id //extraindo o paramentro da rota
    }
  },

  methods: {

    grava() {

      this.service
        .cadastra(this.foto) //enviando os dados para API
        .then(() => {
          if (this.id) this.$router.push({ name:'home'}); //se for alterar volta pra home
          this.foto = new Foto()
        },
        err => console.log(err));//new foto()limpa o form se deu tudo certo senão retorna o erro
    } 
  },
  
  created() {

    this.service = new FotoService(this.$resource);

    if(this.id) {//verifica se o id não é vazio
      this.service
        .busca(this.id)
        .then(foto => this.foto = foto); //carrega os dados na tela através do v-bind 
    }
  }


}
</script>
<style scoped>

  .centralizado {
    text-align: center;
  }
  .controle {
    font-size: 1.2em;
    margin-bottom: 20px;

  }
  .controle label {
    display: block;
    font-weight: bold;
  }

 .controle label + input, .controle textarea {
    width: 100%;
    font-size: inherit;
    border-radius: 5px
  }

  .centralizado {
    text-align: center;
  }

</style>
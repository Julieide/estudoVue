
<template>
  <div>
    <h1 class="titulo">{{ titulo }}</h1>
    <h2 class="subtitulo">{{ subtitulo }}</h2>

    <!-- novo elemento para exibir mensagens para o usuário -->
    <p v-show="mensagem" class="centralizado">{{ mensagem }}</p>

    <h5 class="titulo-filtro"> Pesquisa </h5> <!-- v-on '@' da view para fonte-->

    <input type="search" class="filtro" v-on:input="filtro = $event.target.value" placeholder="Digite o título da foto!">
      
      <ul class="lista-fotos">
        <li class="lista-fotos-item" v-for="foto of fotosComFiltro" :key="foto.titulo">

          <meu-painel :titulo="foto.titulo">
                <imagem-responsiva v-meu-transform:scale.animate="1.2" :url="foto.url" :titulo="foto.titulo"/>
                
                <router-link :to="{ name: 'altera', params: { id : foto._id }}">
                  <meu-botao 
                    rotulo="Alterar" 
                    tipo="button"/>
                </router-link> 

                <meu-botao 
                  rotulo="remover" 
                  tipo="button" 
                  :confirmacao="true" 
                  @botaoAtivado="remove(foto)"
                  estilo="perigo"/> <!--passando o valor como string, nesse caso não precisa v-bind : -->
          </meu-painel>

        </li>
      </ul>
  </div>
</template>

<script>
import Painel from '../shared/painel/Painel.vue';
import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue';
import Botao from '../shared/botao/Botao.vue';
// importando FotoService
import FotoService from '../../domain/foto/FotoService';

export default {

  components: {
    'meu-painel' : Painel,
    'imagem-responsiva' : ImagemResponsiva, //após importado deve-se registrar o componente em components
    'meu-botao' : Botao
  },

  data() {

    return {

      titulo: 'Alurapic', 
      subtitulo: 'Estudo Vue',
      filtro: '',

      fotos: [],

      mensagem: ''
    }
  },

  computed: {
    fotosComFiltro() {
      if (this.filtro) { //criando uma expressão com o valor de filtro, insensitivo
        let exp = new RegExp (this.filtro.trim(), 'i');
        return this.fotos.filter(foto => exp.test(foto.titulo)); //retorna a pesquisa
      } else {
        return this.fotos;
      }
    }
  },

  methods: {

    remove(foto) {

      this.service
        .apaga(foto._id)
        .then(
          () => {
            let indice = this.fotos.indexOf(foto);
            this.fotos.splice(indice, 1);
            this.mensagem = 'Foto removida com sucesso'
          }, 
          err => this.mensagem = err.message
        )
    }
  },

  created() {

    // parametrizando o endereço
    //this.resource = this.$resource('v1/fotos{/id}');

    // criando uma instância do nosso serviço que depende de $resource
    this.service = new FotoService(this.$resource);

    this.service
      .lista()
      .then(fotos => this.fotos = fotos, err => this.mensagem = err.message);


    /*
    this.$http
      .get('v1/fotos')
      .then(res => res.json())
      .then(fotos => this.fotos = fotos, err => console.log(err));
      */
  }
}

</script>

<style>
  .corpo {
    font-family: Helvetica, sans-serif;
    width: 96%;
    margin: 0 auto;
  }

  .titulo {

    text-align: center;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    text-decoration: underline;
  }

  .subtitulo {

    text-align: center;
    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    color: crimson;
  }

  .lista-fotos {
    list-style: none;
  }

  .lista-fotos .lista-fotos-item {

    display: inline-block;
  }

  .filtro {
    display: block;
    width: 60%;
    align-content: right;
    padding: -10px;
  }

  .titulo-filtro{
    color: rgb(30, 50, 161);
    margin-block-end: 0px;
  }
</style>

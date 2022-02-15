
<template>
  <div>
    <h1 class="titulo">{{ titulo }}</h1>
    <h2 class="subtitulo">{{ subtitulo }}</h2>

    <h5 class="titulo-filtro"> Pesquisa </h5> <!-- v-on '@' da view para fonte-->
    <input type="search" class="filtro" v-on:input="filtro = $event.target.value" placeholder="Digite o título da foto!">
      
      <ul class="lista-fotos">
        <li class="lista-fotos-item" v-for="foto of fotosComFiltro" :key="foto.titulo">

          <meu-painel :titulo="foto.titulo">
                <imagem-responsiva v-meu-transform:scale.animate="1.2" :url="foto.url" :titulo="foto.titulo"/>
                <meu-botao 
                  rotulo="remover" 
                  tipo="button" 
                  :confirmacao="true" 
                  @botaoAtivado="remove(foto)"
                  estilo="padrao"/> <!--passando o valor como string, nesse caso não precisa v-bind : -->
          </meu-painel>

        </li>
      </ul>
  </div>
</template>

<script>
import Painel from '../shared/painel/Painel.vue';
import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue';
import Botao from '../shared/botao/Botao.vue';

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

      fotos: []
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
        alert('Deseja remover a foto: ' + foto.titulo);
    }
  },

  created() {

    this.$http.get('http://localhost:3000/v1/fotos')
      .then(res => res.json())
      .then(fotos => this.fotos = fotos, err => console.log(err));
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

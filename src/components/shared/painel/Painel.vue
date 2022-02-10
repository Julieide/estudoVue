
<template>
    <div class="painel"> <!-- v-on substituido por @, qdo duplo click no titulo traz diferente da variável visivel-->
        <h2 class="painel-titulo" @dblclick="visivel = !visivel">{{ titulo }}</h2> 
        <!-- transition >> aplicando efeito no componente-->
         <transition name = "painel-fade"> 
            <div class="painel-conteudo" v-show="visivel">
              <!-- slot define a área que irá receber todo contéudo vindo da 'API' ou outros conteúdos que queira que seja inserido -->
              <slot>
              </slot>
            </div>
         </transition>
    </div>
</template>

<script>
export default {

    props: ['titulo'],

    data() {
      return {
        visivel: true //variável visivel usada para mostrar ou não o conteudo no painel
      }
    }
}

</script>
<!-- scoped faz com que o style fique exclusivo para essa tela-->
<style scoped>
   .painel {
    padding: 0 auto;
    border: solid 2px grey;
    display: inline-block;
    margin: 5px;
    box-shadow: 5px 5px 10px grey;
    width: 200px;
    height: 100%;
    vertical-align: top;
    text-align: center;
  }

  .painel .painel-titulo {
    text-align: center;
    border: solid 2px;
    background: lightblue;
    margin: 0 0 15px 0;
    padding: 10px;
    text-transform: uppercase;
  }

  .painel-fade-enter, .painel-fade-leave-active {
    opacity: 0
  }

 .painel-fade-enter-active, .painel-fade-leave-active {
    transition: opacity .4s
 }

  * {
      box-shadow: 5px 5px 5px;
  }

  .painel-conteudo {
    overflow: hidden; /*não deixa a imagem passar do tamanho do painel*/
  }

</style>

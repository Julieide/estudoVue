<template>
   <!-- não precisa colocar dentro de uma div, pois é somente uma tag-->
    <img class="imagem-responsiva" :src="url" :alt="titulo">
</template>

<script>
    export default {
        //props = propriedades que o objeto pode receber
        props: ['url', 'titulo']
    }

</script>

<style scoped>

    .imagem-responsiva {
        width: 100%;
    }


</style>

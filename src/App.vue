<template>
  <!-- <div id="balls">
    <Ball depth="2" size="150" posX="50" posY="150" bgColor= "black" textColor= "white" text= "Hello"/>
    <Ball depth="4" size="150" posX="0" posY="10" bgColor= "red" textColor= "white" text= "Hello"/>
  </div> -->

  <div id="card-container">
    <Card />
  </div>
</template>

<script>
import Ball from './components/Ball.vue'
import Card from './components/Card.vue'

export default {
  name: 'app',
  components: {
    Ball,
    Card
  },
  mounted() {
    // new Parallax($('#balls').get(0));
  }
}
</script>

<style <style scoped>

  #card-container {
    background-color: rgb(20,20,20);
    padding: 50px 0;
    height: 100vh;
  }

  #balls {
    background-color: blue;
    text-align: center;
    height: 100vh;
    padding: 10px;
    overflow: hidden;
  }
</style>

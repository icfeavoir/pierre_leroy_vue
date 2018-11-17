<template>
  <div class="ball-container" v-bind:data-depth="depth">
    <div class="ball" v-bind:style="{
      width: size + 'px',
      height: size + 'px',
      top: posY + 'px',
      left: posX + 'px',
      backgroundColor: bgColor,
      color: textColor
    }">
      <p style="display: table-cell; vertical-align: middle;">{{ text }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Ball',
  props: {
    depth: String,
    size: String,
    posX: String,
    posY: String,
    bgColor: String,
    textColor: String,
    text: String,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#balls {
  background-color: blue;
  text-align: center;
  height: 100vh;
  padding: 10px;
  overflow: hidden;
}

.ball {
  position: absolute;
  overflow: hidden;
  border-radius: 50%;
  background-color: black;
  color: blue;
  font-weight: bold;
  text-align: center;
  display: table;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)
}

.ball-skill {
  display: table-cell;
  vertical-align: middle;
}
</style>

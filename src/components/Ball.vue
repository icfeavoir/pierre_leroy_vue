<template>
  <div class="ball-container" v-bind:data-depth="depth">
    <div class="ball" v-bind:style="{
      width: realSize + 'px',
      height: realSize + 'px',
      left: realX + 'px',
      top: realY + 'px',
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
    containerSize: String,
    size: String,
    posX: String,
    posY: String,
    bgColor: String,
    textColor: String,
    text: String,
  },
  data() {
    return {
      propor: 1,
      width: 1,
      height: 1,
    }
  },
  computed: {
    depth: () => {
      return -1 * (0.4 + Math.random() * 3);
    },
    realSize: function() {
      return parseInt(this.size) * this.propor / 250;
    },
    realX: function() {
      return this.posX * this.width / 100;
    },
    realY: function() {
      return this.posY * this.height / 100;
    },
  },
  methods: {
    winValues: function() {
      this.width = $("#balls").width();
      this.height = $("#balls").height();
      this.propor = Math.min(this.width, this.height);
    },
  },
  mounted() {
    this.winValues()
    window.addEventListener('resize', this.winValues)
  },
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ball {
  position: absolute;
  overflow: hidden;
  border-radius: 50%;
  background-color: black;
  color: blue;
  font-weight: bold;
  text-align: center;
  display: table;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.ball-skill {
  display: table-cell;
  vertical-align: middle;
}
</style>

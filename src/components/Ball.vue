<template>
  <div class="ball-container" :data-depth="depth">
    <div
      class="ball"
      :style="{
        width: realSize + 'px',
        height: realSize + 'px',
        left: realX + 'px',
        top: realY + 'px',
        backgroundColor: bgColor,
        color: textColor,
      }"
    >
      <p class="ball-skill" :style="{ 'font-size': fontSize }">{{ text }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Ball',
  props: {
    containerSize: String,
    size: [String, Number],
    posX: [String, Number],
    posY: [String, Number],
    bgColor: String,
    textColor: String,
    text: String,
  },
  data() {
    return {
      propor: 1,
      width: 1,
      height: 1,
      landscape: 1,
    }
  },
  computed: {
    depth() {
      return -1 * (0.4 + Math.random() * 3)
    },
    realSize() {
      return (parseInt(this.size, 10) * this.propor) / 250 / this.landscape
    },
    realX() {
      return (this.posX * this.width) / 100
    },
    realY() {
      return (this.posY * this.height) / 100
    },
    fontSize() {
      return this.realSize * 1.2 / this.text.length + 'px'
    },
  },
  methods: {
    winValues() {
      const balls = document.getElementById('balls')
      this.width = balls ? balls.clientWidth : 1
      this.height = balls ? balls.clientHeight : 1
      this.propor = Math.min(this.width, this.height)
      this.landscape = this.width > this.height ? 1 : 1.5
    },
  },
  mounted() {
    this.winValues()
    window.addEventListener('resize', this.winValues)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.winValues)
  },
}
</script>

<style scoped>
.ball {
  background-color: black;
  color: blue;
  position: absolute;
  opacity: 0.88;
  overflow: hidden;
  border-radius: 50%;
  font-weight: bold;
  text-align: center;
  font-size: 1vw;
  display: table;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  text-transform: uppercase;
}

.ball-skill {
  display: table-cell;
  vertical-align: middle;
}
</style>

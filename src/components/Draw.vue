<template>
  <div :data-depth="realDepth" class="layer" id="draw">
    <svg
      class="arrow-svg"
      width="50"
      height="205"
      viewBox="0 0 50 205"
      aria-hidden="true"
    >
      <path
        ref="pathEl"
        class="arrow-path"
        fill="none"
        stroke="#0d2732"
        stroke-width="1"
        d="M20 30 l0 75 l-20 0 l25 30 l25 -30 l-20 0 l0 -75 l-10 0"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'Draw',
  props: {
    speed: Number,
  },
  data() {
    return {
      height: 500,
      parallax: null,
      drawTimer: null,
    }
  },
  computed: {
    realDepth() {
      return ((this.speed || 0) * this.height) / 500
    },
  },
  methods: {
    onResize() {
      this.height = window.innerHeight
    },
    startDraw() {
      const path = this.$refs.pathEl
      if (!path) return
      const length = path.getTotalLength()
      path.style.strokeDasharray = String(length)
      path.style.strokeDashoffset = String(length)
      // Force layout so the transition runs from the dashed start state.
      path.getBoundingClientRect()
      path.classList.add('is-drawn')
      path.style.strokeDashoffset = '0'
    },
  },
  mounted() {
    this.onResize()
    window.addEventListener('resize', this.onResize)

    // Match the original delayed draw-in.
    this.drawTimer = window.setTimeout(() => {
      this.startDraw()
    }, 2000)

    if (this.$el.parentElement) {
      this.parallax = new window.Parallax(this.$el.parentElement, {
        scalarX: 28,
        scalarY: 28,
      })
    }
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.onResize)
    if (this.drawTimer) {
      window.clearTimeout(this.drawTimer)
    }
    if (this.parallax) {
      this.parallax.destroy()
    }
  },
}
</script>

<style lang="scss" scoped>
.layer {
  overflow-x: hidden;
  display: inline-block;
  width: 50px;
  height: 205px;
}

.arrow-path {
  transition: stroke-dashoffset 1.6s ease-in-out;
}
</style>

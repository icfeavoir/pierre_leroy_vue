<template>
  <div
    class="side-parallax"
    :style="{
      left: toLeft + 'px',
    }"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'SideParallax',
  props: {
    direction: Number,
  },
  data() {
    return {
      toLeft: 0,
    }
  },
  computed: {
    dir() {
      return this.direction || 0
    },
  },
  mounted() {
    this.handleScroll()
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      const coef = window.innerHeight / 5
      const rect = this.$el.getBoundingClientRect()
      const diff = rect.top - coef - 250
      let next = this.direction * (-diff + coef)
      next = this.direction * next >= 0 ? 0 : next
      this.toLeft = next
    },
  },
}
</script>

<style lang="scss" scoped>
.side-parallax {
  position: relative;
}
</style>

<template>
    <div v-bind:data-depth="realDepth" class="layer" id="draw"></div>
</template>

<script>
export default {
  name: 'Draw',
  props: {
      depth: Number,
  },
  computed: {
      realDepth: function() {
          return this.depth || 0;
      }
  },
  mounted() {
    SVG($('.layer').get(0))
        .size(50, 205)
        .path()
        .attr({ 
        fill: 'none',
        stroke: 'white', 
        'stroke-width': 2,
    })
        .M(20, 100)
        .l(0, 75)
        .l(-20, 0)
        .l(25, 30)
        .l(25, -30)
        .l(-20, 0)
        .l(0, -75)
        .l(-10, 0)
        .drawAnimated({
            easing: "<>"
        });
  },
}
</script>

<style lang="scss" scoped>
    template {
        overflow-x: hidden;
    }
</style>

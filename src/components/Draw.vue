<template>
    <div v-bind:data-depth="realDepth" class="layer" id="draw"></div>
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
        };
    },
    computed: {
        realDepth: function() {
            return (this.speed || 0) * this.height / 500;
        },
    },
    methods: {
        onResize: function() {
            this.height = $(window).height();
        },
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
        .M(20, 30)
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

    this.onResize();
    window.addEventListener('resize', this.onResize);

    new Parallax($(this.$el).parent().get(0));
  },
}
</script>

<style lang="scss" scoped>
    template {
        overflow-x: hidden;
    }
</style>

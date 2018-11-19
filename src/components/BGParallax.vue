<template>

    <div :style="{
            backgroundImage: 'url(' + fullUrl + ')',
        }"
    class="bg-parallax code" data-paroller-factor="0.8" data-paroller-factor-xs="0.2">
        <p class="title">{{ title }}</p>
        <p class="credit">{{ credit }}</p>
    </div>

</template>

<script>
export default {
  name: 'BGParallax',
  props: {
      url: String,
      credit: String,
      title: String,
  },
  mounted() {
		$('.bg-parallax').paroller();
  },
  computed: {
      fullUrl: function() {
          return require('../assets/bgParallax/' + this.url);
      }
  },
}
</script>

<style lang="scss" scoped>
	.code {
        position: relative;
        background: black;
		background-repeat: no-repeat;
        background-position: center center;
        background-size: 100vw auto;
        height: 60vh;
    }
    .title {
        padding-top: 20px;
        font-size: 50px;
        letter-spacing: 7px;
        color: white;
        text-shadow: 2px 0 0 grey, -2px 0 0 grey, 0 2px 0 grey, 0 -2px 0 grey, 1px 1px grey, -1px -1px 0 grey, 1px -1px 0 grey, -1px 1px 0 grey;
    }
    .credit {
        position: absolute;
        bottom: 0;
        left: 5px;
        font-size: 11px;
    }
</style>

<template>
  <div
    :style="{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6)), url(' + fullUrl + ')' }"
    class="bg-parallax"
  >
    <p v-if="titleOnTop" class="title">{{ title }}</p>
    <slot></slot>

    <div class="credit-container">
      <p class="credit">{{ credit }}</p>
      <p v-if="!titleOnTop" class="title">{{ title }}</p>
    </div>
  </div>
</template>

<script>
const bgImages = import.meta.glob('../assets/bgParallax/*', {
  eager: true,
  import: 'default',
})

export default {
  name: 'BGParallax',
  props: {
    url: String,
    credit: String,
    title: String,
    titleOnTop: Boolean,
  },
  computed: {
    fullUrl() {
      const key = `../assets/bgParallax/${this.url}`
      return bgImages[key] || ''
    },
  },
}
</script>

<style lang="scss" scoped>
.bg-parallax {
  position: relative;
  background-color: black;
  background-size: 100vw auto;
  -webkit-background-size: 100vw auto;
  -moz-background-size: 100vw auto;
  -o-background-size: 100vw auto;
  max-height: 60vh;

  @media (orientation: portrait) {
    background-size: auto 100vh;
    -webkit-background-size: auto 100vh;
    -moz-background-size: auto 100vh;
    -o-background-size: auto 100vh;
    background-position: left;
    max-height: none;
  }

  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;

  .title {
    font-size: 50px;
    letter-spacing: 7px;

    @media only screen and (max-width: 700px) {
      font-size: 35px;
      letter-spacing: 2px;
    }

    color: white;
    text-shadow:
      2px 0 0 grey, -2px 0 0 grey,
      0 2px 0 grey, 0 -2px 0 grey,
      1px 1px grey,
      -1px -1px 0 grey,
      1px -1px 0 grey,
      -1px 1px 0 grey;
  }

  .credit-container {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    text-shadow: 0.5px 0.5px white;

    .credit {
      position: absolute;
      top: calc(-20px - 50px);
      left: 2vw;
      font-size: 11px;
    }
  }
}
</style>

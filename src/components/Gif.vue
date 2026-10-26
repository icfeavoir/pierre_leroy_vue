<template>
  <div class="gif-container">
    <img :src="gif" :style="{ width: size + '%' }" alt="">
  </div>
</template>

<script>
const gifImages = import.meta.glob('../assets/gif/*', {
  eager: true,
  import: 'default',
})

export default {
  name: 'Gif',
  props: {
    url: String,
  },
  computed: {
    gif() {
      const key = `../assets/gif/${this.url}`
      return gifImages[key] || ''
    },
    size() {
      const about = document.getElementById('about')
      const width = about ? about.clientWidth : 800
      return width < 600 ? 50 : 80
    },
  },
}
</script>

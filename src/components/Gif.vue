<template>
    <div class="gif-container">
        <img :src="gif" />
    </div>
</template>

<script>
export default {
    name: 'Gif',
    props: {
        url: String,
    },
    data() {
        return {
        };
    },
    computed: {
        gif: function() {
            return require('../assets/gif/' + this.url);
        }
    },
    methods: {
    },
    mounted() {
  },
}
</script>

<style lang="scss" scoped>
    .gif-container {
        height: 50%;

        img {
            height: 100%;
        }
    }
</style>

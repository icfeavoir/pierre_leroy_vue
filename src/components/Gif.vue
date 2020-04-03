<template>
    <div class="gif-container">
        <img :src="gif" v-bind:style="{width: size + '%'}">
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
        },
        size: function() {
            var width = $("#about").width();
            return width < 600 ? 50 : 80;
        }
    },
    methods: {
    },
    mounted() {
  },
}
</script>

<style lang="scss" scoped>
</style>

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
        size: Number,
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
</style>

<template>

    <div :style="{
            backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6)), url(' + fullUrl + ')',
        }"
    class="bg-parallax" data-paroller-factor="0.8" data-paroller-factor-xs="0.2">
        <side-parallax :direction=0.3><p class="title">{{ title }}</p></side-parallax>
        <div class="credit-container"><p class="credit">{{ credit }}</p></div>
    </div>

</template>

<script>
import SideParallax from './SideParallax.vue'

export default {
    name: 'BGParallax',
    components: {
        SideParallax
    },
    props: {
        url: String,
        credit: String,
        title: String,
    },
    computed: {
        fullUrl: function() {
            return require('../assets/bgParallax/' + this.url);
        },
    },
}
</script>

<style lang="scss" scoped>
	.bg-parallax {
        background: black;
        background-size: 100vw auto;
        -webkit-background-size: 100 vw auto;
        -moz-background-size: 100 vw auto;
        -o-background-size: 100 vw auto;
        max-height: 60vh;

		/* Create the parallax scrolling effect */
		background-attachment: fixed;
		background-position: center;
		background-repeat: no-repeat;
    }
    .title {
        padding-top: 20px;
        font-size: 50px;
        letter-spacing: 7px;
        color: white;
        text-shadow: 2px 0 0 grey, -2px 0 0 grey, 
                    0 2px 0 grey, 0 -2px 0 grey, 
                    1px 1px grey, 
                    -1px -1px 0 grey, 
                    1px -1px 0 grey, 
                    -1px 1px 0 grey;
    }
    .credit-container {
        position: relative;
        width: 100%;
        height: 50%;
        text-shadow: .5px .5px white;
        .credit {
            position: absolute;
            top: -40%;
            left: 2vw;
            font-size: 11px;
        }
    }
</style>

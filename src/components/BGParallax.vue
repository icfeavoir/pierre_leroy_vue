<template>

    <div :style="{
            backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6)), url(' + fullUrl + ')',
        }"
    class="bg-parallax">
        <side-parallax :direction="direction" class="title-container">
            <div class="absolute-bottom" :style="{top: fromTop, bottom: fromBottom}">
                <p class="title">{{ title }}</p>
            </div>
        </side-parallax>
        <div class="credit-container"><p class="credit">{{ credit }}</p></div>
        <slot></slot>
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
        titleOnTop: Boolean, 
    },
    computed: {
        fullUrl: function() {
            return require('../assets/bgParallax/' + this.url);
        },
        direction: function() {
            return this.titleOnTop ? 0.3 : 8;
        },
        fromTop: function() {
            return this.titleOnTop ? 0 : 'auto';
        },
        fromBottom: function() {
            return this.titleOnTop ? 'auto' : 0;
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

        .title-container {
            position: relative;
            height: 100%;

            .absolute-bottom {
                position: absolute;
                left: 50%;

                .title {
                    position: relative;
                    left: -50%;
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
            }
        }
        .credit-container {
            position: relative;
            width: 100%;
            height: 0;
            text-shadow: .5px .5px white;
            .credit {
                position: absolute;
                top: calc(-20px - 50px);
                left: 2vw;
                font-size: 11px;
            }
        }
    }
</style>
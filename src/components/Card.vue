<template>
    <side-parallax :direction=direction :speed=speed class="col-lg-6 col-md-12 text-center parcours-bloc-parent">
        <a :href="realUrl" :target="target">
            <div class="parcours-bloc meet">
                <p class="parcours-year">{{ date }}</p>
                <hr class="parcours-hr">
                <p class="parcours-title">{{ title }}</p>
                <p class="parcours-desc"><slot></slot></p>
            </div>
        </a>
    </side-parallax>
</template>

<script>
import SideParallax from './SideParallax.vue'
export default {
    name: 'Card',
	components: {
		SideParallax
    },
    props: {
        direction: Number,
        speed: Number,
        date: String,
        title: String,
        url: String,
    },
    computed: {
        realUrl: function() {
            return this.url || '#0';
        },
        target: function() {
            return this.url ? '_blank' : '';
        }
    },
}
</script>

<style lang="scss" scoped>
    @import '../scss/cards.scss';
</style>

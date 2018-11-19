<template>
    <div v-bind:style="{
            left: toLeft + 'px',
        }"
        id="my-elem" class="col-lg-6 col-md-12 text-center parcours-bloc-parent parallax" data-paroller-type="foreground" data-paroller-direction="horizontal"
        >
        <div class="parcours-bloc meet">
            <p class="parcours-year">{{ date }}</p>
            <hr class="parcours-hr">
            <p class="parcours-title">{{ title }}</p>
            <p class="parcours-desc">{{ desc }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Card',
    props: {
        direction: Number,
        speed: Number,
        date: String,
        title: String,
        desc: String,
    },
    data() {
        return {
            toLeft: 0,
        };
    },
    computed: {
        dir: function() {
            return this.direction || 0;
        },
        realSpeed: function() {
            return this.speed || 1;
        }
    },
    mounted() {
        this.handleScroll();
    },
    methods: {
        handleScroll: function() {
            let coef = this.realSpeed * ($(window).height() / 5);
            let diff = $(this.$el).position().top - $(document).scrollTop() - coef;

            this.toLeft = this.direction * (- diff + coef);
            this.toLeft = this.direction * this.toLeft >= 0 ? 0 : this.toLeft;
        },
    },
    created: function () {
        window.addEventListener('scroll', this.handleScroll);
    },
    destroyed: function () {
        window.removeEventListener('scroll', this.handleScroll);
    }
}
</script>

<style lang="scss" scoped>
    @import '../scss/cards.scss';
</style>

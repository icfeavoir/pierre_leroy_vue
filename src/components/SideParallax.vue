<template>
    <div class="side-parallax" v-bind:style="{
            left: toLeft + 'px',
        }">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'Card',
    props: {
        direction: Number,
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
    },
    mounted() {
        this.handleScroll();
    },
    methods: {
        handleScroll: function() {
            let coef = $(window).height() / 5;
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
    .side-parallax {
        position: relative;
    }
</style>

<template>
    <div>
        <input type="range" :min="min" :max="max" :step="step" v-model="value" />
        <p id="range-value">{{ value }}</p>
    </div>
</template>

<script>
export default {
    name: 'Range',
    props: {
        min: Number,
        max: Number,
        step: Number,
    },
    data() {
        return {
            value: 0
        };
    },
    computed: {
    },
    methods: {
    },
    mounted() {
        this.value = this.min
    },
}
</script>

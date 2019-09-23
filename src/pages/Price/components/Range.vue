<template>
    <div>
        <input type="range" :min="min" :max="max" :step="step" v-model="value" @change="$emit('range-changed', value)"/>
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
        this.$emit('range-changed', this.value) // valeur par défaut
    },
}
</script>

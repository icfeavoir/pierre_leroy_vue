<template>
    <button class="button-choice" :attr-id="id" :title="help" ><slot></slot></button>
</template>

<script>
export default {
    name: 'Button',
    props: {
        id: String,
        help: String,
    },
    data() {
        return {
        };
    },
    computed: {
    },
    methods: {
    },
    mounted() {
  },
}
</script>

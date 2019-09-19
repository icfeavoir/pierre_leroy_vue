<template>
    <button class="button-choice" :attr-id="id" :title="help" >{{ text }}</button>
</template>

<script>
export default {
    name: 'Button',
    props: {
        id: String,
        text: String,
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

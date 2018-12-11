<template>
    <div class="gif-container">
        <img :src="gif" />
    </div>
</template>

<script>
export default {
    name: 'Gif',
    props: {
        gifUrl: String,
    },
    data() {
        return {
            gif: "",
        };
    },
    computed: {
    },
    methods: {
    },
    mounted() {
        let apiKey = "";
        let endpoint = "";
        
        this.$axios.get('//api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=zB66Gyh4dc8Lo8A2yMwSfeMk52npmF1a&limit=5')
            .then(res => {
                console.log(res.data.data[1]);
                this.gif = res.data[1].embed_url;
            })
            .catch(err => {
                console.log("err: " + err);
            });
  },
}
</script>

<style lang="scss" scoped>
</style>

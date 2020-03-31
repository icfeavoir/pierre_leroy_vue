<template>
    <div class="card-shadow text-center">
        <div class="shadow-effect"><div class="shape"></div></div>
        <p class="title">{{ title }}</p>
        <div class="content"><slot></slot></div>
    </div>
</template>

<script>
export default {
    name: 'Card',
	components: {
    },
    props: {
        direction: Number,
        date: String,
        title: String,
    },
}
</script>

<style lang="scss" scoped>
.card-shadow {
    background-color: rgba(255,255,255, 1);
    margin: 10px 10px;
    padding: 0 20px 10px;
    display: inline-block;
    position: relative;
    width: 100%;
    min-height: 1px;
    vertical-align: top;

    -ms-flex: 0 0 30%;
    flex: 0 0 30%;
    max-width: 30%;

    @media only screen and (max-width: 1000px) {
        -ms-flex: 0 0 40%;
        flex: 0 0 40%;
        max-width: 40%;
    }

    @media only screen and (max-width: 700px) {
        -ms-flex: 0 0 100%;
        flex: 0 0 100%;
        max-width: 100%;
        margin: 10px 0;
    }
    
    .title {
        font-size: 30px;
        font-weight: 900;
    }

    .content {
        color: black;
        font-weight: 900;
    }
    
    .shadow-effect {
        z-index: -1;
        position: absolute;
        content: "";
        left: 10px;
        width: calc(100% - 20px);
        height: 100%;
        filter:drop-shadow(0 5px 5px rgba(0,0,0,0.8));
        
        .shape {
            width: 100%;
            height: 100%;
            background: #777;
            clip-path: polygon(0 0, 50% 10%, 100% 0, 100% 100%, 50% 90%, 0 100%);
            -webkit-clip-path: polygon(0 0, 50% 10%, 100% 0, 100% 100%, 50% 90%, 0 100%);
        }
    }
}
</style>

<template>
    <div class="card-shadow col-lg-6 col-md-12 text-center">
        <div class="shadow-effect"><div class="shape"></div></div>
        <p class="title">{{ title }}</p><br>
        <div class="content"><slot></slot></div>
    </div>
</template>

<script>
import SideParallax from './SideParallax.vue'
export default {
    name: 'Card',
	components: {
		// SideParallax
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

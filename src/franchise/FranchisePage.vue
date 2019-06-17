<template>
    <div>
        <h1>Franchise name: {{ franchise.name }}</h1>
        <p>Points: {{ franchise.points }}</p>
        <img :src="loadUrl(franchise.image)"/>
        <img :src="loadUrl(franchise.map)"/>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    computed: {
        ...mapState({
            franchise: state => state.franchises.item,
        }),
    },
    methods: {
        loadUrl: (url) => `src/img/${url}`,
    }
};
</script>
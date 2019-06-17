<template>
    <div>
        <h1>Franchise name: {{ franchise.name }}</h1>
        <p>Points: {{ franchise.points }}</p>
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
    created () {

    },
};
</script>
<template>
    <div>
        <h1>Hi {{account.user.firstName}}!</h1>
        <img :src="avatarSrc(account.user.avatar)"/>
        <p>List of franchises. Click one to go...</p>
        <em v-if="franchises.loading">Loading franchises...</em>
        <span v-if="franchises.error" class="text-danger">ERROR: {{franchises.error}}</span>
        <ul v-if="franchises.items">
            <li v-for="franchise in franchises.items" :key="franchise.id">
                <a @mousedown="goToPage({ franchise })">{{ franchise.name }}</a>
            </li>
        </ul>
        <p>
            <router-link to="/login">Logout</router-link>
        </p>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    computed: {
        ...mapState({
            account: state => state.account,
            franchises: state => state.franchises.all,
        }),
    },
    created () {
        this.getAllFranchises();
    },
    methods: {
        ...mapActions('franchises', {
            getAllFranchises: 'getAll',
            goToPage: 'goToFranchise',
        }),
        avatarSrc: (avatar) => avatar.dataUrl,

    }
};
</script>
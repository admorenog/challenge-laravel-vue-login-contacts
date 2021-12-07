<template>
    <main>
        <v-top-bar :auth="auth"></v-top-bar>
        <div class="container mt-5">
            <router-view></router-view>
        </div>
        <v-loader></v-loader>
    </main>
</template>

<script>
    import TopBar from './TopBar';
    import Loader from './Loader';
    import Login from '../Auth/Login';
    export default {
        name: "MainApp",
        components: {
            "v-top-bar": TopBar,
            "v-loader": Loader,
            "v-login": Login,
        },
        data: () => ({
            auth: null
        }),
        updated() {
            if(this.auth === null) {
                this.auth = JSON.parse(localStorage.getItem('auth'));
            }
        },
    }
</script>

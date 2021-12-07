<template>
    <nav class="navbar navbar-expand-lg  navbar-dark bg-dark">
        <router-link class="navbar-brand" :to="{name: 'home'}">
            <img src="https://vuejs.org/images/logo.svg" alt="" width="30" height="24">
        </router-link>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto">
                <li v-if="auth !== null" class="nav-item dropdown btn btn-secondary">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {{ auth.user.name }}
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" @click="logout">Logout</a>
                    </div>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    name: "TopBar",
    props: {
        auth: null,
    },
    methods: {
        logout: function() {
            let self = this;
            this.$EventBus.$emit('setLoaderVisibility', true);
            this.axios.post('api/auth/logout')
            .then(function(response) {
                localStorage.removeItem('auth');
                self.$router.push({name: 'login'});
                self.$EventBus.$emit('setLoaderVisibility', false);
            })
            .catch(function (error) {
                self.$EventBus.$emit('setLoaderVisibility', false);
            });
        }
    }
}
</script>

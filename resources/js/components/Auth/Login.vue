<template>
    <div>
        <div class="card">
            <div class="card-header">Login</div>

            <div class="card-body">
                <form>
                    <div class="form-group">
                        <label for="login_name">Usuario</label>
                        <input ref="name" type="text" class="form-control" id="login_name" placeholder="Usuario" required>
                    </div>
                    <div class="form-group">
                        <label for="login_password">Contraseña</label>
                        <input ref="password" type="password" class="form-control" id="login_password" placeholder="Contraseña" required>
                    </div>
                    <br>
                    <button @click="login" class="btn btn-primary">Acceder</button>
                    <small ref="name_error" class="text-danger">{{ name_error }}</small>
                    <small ref="password_error" class="text-danger">{{ password_error }}</small>
                </form>
            </div>
        </div>
        <div class="row">
            <div class="col-md-2">
                <a href="" @click="goToRegister">Registrarse</a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'login',
        data: () => ({
            name_error: null,
            password_error: null,
        }),
        methods: {
            async login(event) {
                event.preventDefault();
                let name = this.$refs.name.value;
                let password = this.$refs.password.value;
                let self = this;
                this.$EventBus.$emit('setLoaderVisibility', true);

                await this.axios.get('/sanctum/csrf-cookie');

                this.axios.post(
                'api/auth/login',
                {name, password}
                )
                .then(function(response) {
                    localStorage.setItem('auth', JSON.stringify(response.data));
                    self.$router.push({name: 'home'});
                    self.$EventBus.$emit('setLoaderVisibility', false);
                })
                .catch(function (error) {
                    if (error.response) {
                        console.log(error.response.data);
                        self.showErrors(error.response.data);
                    } else if (error.request) {
                        console.log(error.request);
                    } else {
                        console.error(error.message);
                    }
                });
            },
            goToRegister(event) {
                event.preventDefault();
                this.$router.push({name: 'register'})
            },
            showErrors(data) {
                if(typeof(data.errors) !== typeof(undefined)) {
                    for(let fieldName in (data.errors)) {
                        this.showFieldError(fieldName, data.errors[fieldName]);
                    }
                }
            },
            showFieldError(field, errors) {
                this[field + "_error"] = errors.join('\n');
                console.log(field, errors);
            }
        }
    }
</script>

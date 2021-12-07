<template>
    <div class="card">
        <div class="card-header">Registro</div>

        <div class="card-body">
            <form>
                <div class="form-group">
                    <label for="login_name">Usuario</label>
                    <input ref="name" type="text" class="form-control" id="login_name" placeholder="Usuario" required>
                    <small ref="name_error" class="text-danger">{{ name_error }}</small>
                </div>
                <div class="form-group">
                    <label for="login_email">Email</label>
                    <input ref="email" type="text" class="form-control" id="login_email" placeholder="Email" required>
                    <small ref="email_error" class="text-danger">{{ email_error }}</small>
                </div>
                <div class="form-group">
                    <label for="login_password">Contraseña</label>
                    <input ref="password" type="password" class="form-control" id="login_password" placeholder="Contraseña" required>
                    <small ref="password_error" class="text-danger">{{ password_error }}</small>
                </div>
                <div class="form-group">
                    <label for="login_password_confirmation">Confirme la contraseña</label>
                    <input ref="password_confirmation" type="password" class="form-control" id="login_password_confirmation" placeholder="Confirme contraseña" required>
                    <small ref="password_confirmation_error" class="text-danger">{{ password_confirmation_error }}</small>
                </div>
                <br>
                <button @click="register" class="btn btn-primary">Registrarse</button>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'register',
        data: () => ({
            name_error: null,
            email_error: null,
            password_error: null,
            password_confirmation_error: null,
        }),
        methods: {
            async register(event) {
                event.preventDefault();
                let name = this.$refs.name.value;
                let email = this.$refs.email.value;
                let password = this.$refs.password.value;
                let password_confirmation = this.$refs.password_confirmation.value;
                let self = this;
                this.axios.post(
                    'api/auth/register',
                    {name, email, password, password_confirmation})
                .then(function(data) {
                    self.$router.push({name: 'login'})
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

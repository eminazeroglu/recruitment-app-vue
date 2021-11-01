<template>
    <div class="h-full flex items-center justify-center">
        <div class="w-96 bg-white p-4 rounded">
            <div class="flex flex-col items-center space-y-4 border-b border-gray-200 pb-3">
                <img :src="photos.admin_logo_color" class="w-28 h-28 rounded-full">
                <h1 class="text-xl font-medium text-center">{{ translate('login.Head.Text') }}</h1>
            </div>
            <form @submit.prevent="post">
                <div class="p-4">
                    <grid>
                        <form-group label="login.Label.Email" name="email">
                            <form-text v-model="form.email"/>
                        </form-group>

                        <form-group label="login.Label.Password" name="password">
                            <form-text type="password" v-model="form.password"/>
                        </form-group>

                        <app-button type="submit" property="success" class="justify-center">
                            {{ translate('button.Login') }}
                        </app-button>
                    </grid>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
/*
 * Import Components
 * */
import {mapActions} from 'vuex'

export default {
    name: "AuthLogin",
    data() {
        return {
            form: {
                email: null,
                password: null
            }
        }
    },
    methods: {
        ...mapActions('AuthStore', ['login']),
        post() {
            this.login(this.form)
        }
    }
}
</script>

<style scoped>

</style>

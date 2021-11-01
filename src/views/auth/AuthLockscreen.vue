<template>
    <div class="bg-gray-500 h-full flex items-center justify-center">
        <div class="w-96 bg-white p-4 rounded">
            <div class="flex flex-col items-center space-y-4 border-b border-gray-200 pb-3">
                <img :src="userData.photo" class="w-28 h-28 rounded-full">
                <h1 class="text-xl font-medium text-center">{{ userData.fullname }}</h1>
            </div>
            <form @submit.prevent="post">
                <div class="p-4">
                    <grid>
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
            userData: {},
            form: {
                email: null,
                password: null
            }
        }
    },
    created() {
        this.userData = localStorage.lockScreen ? JSON.parse(this.crypto('decode', localStorage.lockScreen, 'LockScreen')) : {};
        this.form.email = this.userData.email;
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

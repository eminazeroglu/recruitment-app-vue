<template>
    <div>
        <dropdown class="py-2">
            <dropdown-button :arrow="false" class="text-left" style="background: transparent; border: none; padding: 0">
                <div class="text-white">
                    <p class="text-sm font-medium">{{ user.fullname }}</p>
                    <small class="text-xs">{{ user.permission.name }}</small>
                </div>
                <div class="ml-4">
                    <img :src="user.photo" class="w-10 h-10 object-cover rounded-full" alt="">
                </div>
            </dropdown-button>
            <dropdown-items title-class=" border-b border-gray-200 mb-2">

                <template v-slot:title>
                    <div class="text-center w-full">
                        <p class="text-sm font-medium">{{ user.fullname }}</p>
                        <small class="text-xs">{{ user.permission.name }}</small>
                    </div>
                </template>

                <dropdown-item @click="userModal">
                    <i class="icon icon-user"></i>
                    {{ translate('crm.Header.Label.Profile') }}
                </dropdown-item>
                <dropdown-item @click="lockScreen">
                    <i class="icon icon-lock-1"></i>
                    {{ translate('crm.Header.Label.LockScreen') }}
                </dropdown-item>
                <dropdown-item @click="userLogout">
                    <i class="icon icon-log-out"></i>
                    {{ translate('crm.Header.Label.Logout') }}
                </dropdown-item>
            </dropdown-items>
        </dropdown>

        <modal id="userProfileModal" size="xs">
            <modal-head>
                <modal-title>{{ user.fullname }}</modal-title>
            </modal-head>
            <modal-body>
                <form @submit.prevent="userFormSave">
                    <grid>

                        <form-group :label="translateKey + '.Label.Name'" name="name">
                            <form-text v-model="userForm.name"/>
                        </form-group>

                        <form-group :label="translateKey + '.Label.Surname'" name="surname">
                            <form-text v-model="userForm.surname"/>
                        </form-group>

                        <form-group :label="translateKey + '.Label.Language'" name="language">
                            <form-tree-select :options="appLanguages" valueExpr="code" v-model="userForm.language"/>
                        </form-group>

                        <form-group :label="translateKey + '.Label.CurrentPassword'" name="old_password">
                            <form-text type="password" v-model="userForm.old_password"/>
                        </form-group>

                        <form-group :label="translateKey + '.Label.NewPassword'" name="new_password">
                            <form-text type="password" v-model="userForm.new_password"/>
                        </form-group>

                        <app-button class="justify-center" property="success" type="submit">
                            {{ translate('button.Save') }}
                        </app-button>
                    </grid>
                </form>
            </modal-body>
        </modal>
    </div>
</template>

<script>
/*
 * Import Components
 * */
import {mapActions} from 'vuex'

const translateKey = 'crm.User';

export default {
    name: "AppHeaderUserDropdown",
    data() {
        return {
            translateKey,
            userInfoModal: false,
            userForm: {}
        }
    },
    methods: {
        ...mapActions('AppStore', ['setErrors', 'setLanguage']),
        ...mapActions('AuthStore', ['logout', 'profile']),
        /*
         * User Modal
         * */
        userModal() {
            this.setErrors([]);
            this.modal('userProfileModal');
            this.userForm = {
                name: this.user?.name || null,
                surname: this.user?.surname || null,
                old_password: null,
                new_password: null,
                photo: null,
                language: this.user?.language || null,
            }
        },
        /*
         * User Form Save
         * */
        userFormSave() {
            this.profile(this.userForm)
            .then(r => {
                this.setLanguage(this.userForm.language);
                this.$tabs.reset();
                this.modal('userProfileModal');
            })
        },
        /*
         * User Logout
         * */
        userLogout() {
            this.logout()
            .then(r => {
                window.location.reload();
            })
        },
        /*
         * Lock Screen
         * */
        lockScreen() {
            const user = this.user;
            this.logout()
            .then(r => {
                localStorage.lockScreen = this.crypto('encode', JSON.stringify(user), 'LockScreen');
                window.location.reload();
            })
        }
    }
}
</script>

<style scoped>

</style>

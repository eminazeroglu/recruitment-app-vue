<template>
    <div class="yv-photo">
        <figure class="yv-photo__item">
            <a class="yv-photo__item__close-button" @click="remove" v-if="(info.name && info.size) || $attrs.photo">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </a>
            <img :src="photo" alt="" v-bind="$attrs" :style="{'height': $attrs.imgHeight ? $attrs.imgHeight : '', ...$attrs.elementStyle}">
            <div class="yv-photo__item__info" v-if="(info.name && info.size) || error">
                <div v-if="info.name && info.size">
                    <p><b>{{ translate('component.FileName') }}:</b> {{ info.name }}</p>
                    <p><b>{{ translate('component.FileSize') }}:</b> {{ calculateSize(info.size) }}</p>
                </div>
                <div v-if="error">
                    <p class="yv-photo__item__info__error">{{ error }}</p>
                </div>
            </div>
        </figure>
        <div class="yv-photo__buttons">
            <label class="yv-photo__buttons__button">
                <input type="file" ref="photo" @change="upload" :accept="format.join(',')">
                {{ translate('button.SelectPhoto') }}
            </label>
        </div>
    </div>
</template>

<script>
/*
 * Import Components
 * */

import FormMixin from "../../../mixins/FormMixin";

export default {
    name: "FormPhoto",
    mixins: [FormMixin],
    data() {
        return {
            error: null,
            info: {},
            photo: null,
            format: ['image/jpeg', 'image/png', 'image/svg+xml']
        }
    },
    created() {
        this.photo = this.$attrs.photo ? this.$attrs.photo : this.photos.default
        if (this.$attrs.format) this.format = this.$attrs.format;
    },
    watch: {
        '$attrs.photo': function (val) {
            this.photo = val ? val : this.photos.default
        }
    },
    methods: {
        /*
         * Calculate Size
         * */
        calculateSize(bytes) {
            const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
            if (bytes === 0) return '0 Byte';
            const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
            return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
        },
        /*
         * Type Check
         * */
        typeCheck (type) {
            return this.format.indexOf(type);
        },
        /*
         * Upload
         * */
        upload(event) {
            this.error = null;
            const input = event.target;
            const info = input.files[0];
            if (input.files && input.files.length) {
                if (this.typeCheck(info.type) >= 0) {
                    const reader = new FileReader();
                    reader.onload = e => {
                        this.photo = e.target.result;
                        this.$emit('input', e.target.result)
                    }
                    this.info = info;
                    reader.readAsDataURL(input.files[0])
                }
                else {
                    this.error = this.translate('component.FileTypeError', {label: this.format.map(i => i.split('/')[1]).join(', ')})
                }
            }
        },
        /*
         * Remove
         * */
        remove() {
            this.error = null;
            this.photo = this.photos.default;
            this.$attrs.photo = null;
            this.info = {};
            this.$refs.photo.value = null;
            this.$emit('input', null)
        }
    }
}
</script>

<style scoped>
    @import "./FormPhoto.css";
</style>

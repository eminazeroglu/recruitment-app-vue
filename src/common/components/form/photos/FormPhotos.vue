<template>
    <div class="yv-photos w-full">
        <div class="yv-photos__content w-full">
            <grid cols="12">
                <grid-col :col="col" v-for="(item, index) in items" :key="'yv-photos' + index">
                    <div data-dragable="true" data-rotate="0" :class="['yv-photos__item']">
                        <figure class="yv-photos__item__photo">
                            <img :src="item.link" :style="{'height': imgHeight}" alt="">
                        </figure>
                        <div class="yv-photos__item__action">
                    <span
                        class="yv-photos__item__action__button"
                        @click="remove(index)"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </span>
                            <span
                                class="yv-photos__item__action__button"
                                v-if="item.rotate"
                                @click="rotate($event,90, index)"
                            >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-rotate-ccw"><polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path></svg>
                    </span>
                            <span
                                class="yv-photos__item__action__button"
                                v-if="item.rotate"
                                @click="rotate($event,-90, index)"
                            >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-rotate-cw"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
                    </span>
                        </div>
                    </div>
                </grid-col>
            </grid>
        </div>
        <div class="yv-photos__buttons">
            <label class="yv-photos__button">
                <input type="file" ref="yv-photos" multiple @change="upload" :accept="customFormat.join(',')">
                <svg v-if="isLoading" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin-right: 5px; background: rgba(255, 255, 255, 0); display: block; shape-rendering: auto;" width="23px" height="23px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                    <circle cx="50" cy="50" fill="none" stroke="#ffffff" stroke-width="7" r="35" stroke-dasharray="164.93361431346415 56.97787143782138">
                        <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="0.641025641025641s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
                    </circle>
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                {{ selectText ? selectText : translate('button.SelectPhotos') }}
            </label>
            <a class="yv-photos__button remove" v-if="items.length > 0" @click="removeAll">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
                {{ allRemoveText ? allRemoveText : translate('button.RemovePhotos') }}
            </a>
        </div>
    </div>
</template>

<script>
/*
 * Import Components
 * */
import FileManagementService from '../../../../services/fileManagement.service'

export default {
    name: "FormPhotos",
    props: {
        value: {
            default: null
        },
        col: {
            default: 12
        },
        imgHeight: {
            default: null
        },
        selectText: {
            default: null
        },
        allRemoveText: {
            default: null
        },
        path: {
            default: 'default',
        },
        itemPhotos: {
            default: null,
        },
        thumbnail: {
            default: null
        },
        format: {
            default: null
        }
    },
    data() {
        return {
            cacheRotate: 0,
            cacheItems: [],
            items: [],
            isLoading: false,
            customThumbnail: {width: 200, height: 200},
            customFormat: ['image/jpeg', 'image/png', 'image/svg+xml']
        }
    },
    watch: {
        itemPhotos(val) {
            this.items = val;
        },
        thumbnail(val) {
            this.customThumbnail = val || {width: 200, height: 200}
        },
        format(val) {
            this.customFormat = val || ['image/jpeg', 'image/png', 'image/svg+xml']
        }
    },
    methods: {
        /*
         * Upload
         * */
        upload(event) {
            const self = this;
            const input = event.target;
            const files = input.files;
            const fileCount = Array.from(files).length;
            if (files.length) {
                let count = 0;
                self.isLoading = true;
                Array.from(files).map(i => {
                    let type = i.type;
                    if (self.customFormat.indexOf(type) >= 0) {
                        const form = new FormData();
                        form.append('file', i);
                        form.append('path', self.path);
                        form.append('thumbnail', JSON.stringify(self.customThumbnail));
                        FileManagementService.post('photo/upload', form)
                        .then(r => {
                            self.items.push({
                                ...r.data.response,
                                rotate: true
                            });
                            self.cacheItems[self.items.length - 1] = form;
                            self.$emit('input', self.items.map(i => i.name));
                            count += 1;
                            if(fileCount === count) {
                                self.isLoading = false;
                            }
                        })


                    }
                })
                self.$refs['yv-photos'].value = null;
            }
        },
        /*
         * Remove
         * */
        rotate(event, deg, index) {
            const self = this;
            const obj = event.target.closest('.yv-photos__item__action__button') ? event.target.closest('.yv-photos__item__action__button') : event.target;
            const findCacheItem = self.cacheItems[index];
            const findItem = self.items[index];
            let rotate = parseFloat(obj.closest('.yv-photos__item').getAttribute('data-rotate'));


            if (deg < 0 && rotate > -270) rotate = rotate + deg;
            else if (deg > 0 && rotate < 270) rotate = rotate + deg;
            else rotate = 0;
            obj.closest('.yv-photos__item').setAttribute('data-rotate', rotate);

            if (findCacheItem) {
                findCacheItem.delete('degree');
                findCacheItem.delete('file_name');
                findCacheItem.delete('link');
                findCacheItem.append('degree', rotate);
                if (findItem) findCacheItem.append('file_name', findItem.name)
                FileManagementService.post('photo/upload', findCacheItem)
                .then(r => {
                    self.items[index] = {...r.data.response, rotate: true};
                    self.$emit('input', self.items.map(i => i.name))
                    self.$forceUpdate();
                })
            }
        },
        /*
         * Remove
         * */
        remove(index) {
            const self = this;
            const findItem = self.items[index];
            if (findItem) {
                self.items.splice(index, 1);
                self.cacheItems.splice(index, 1);
                this.$emit('input', self.items.map(i => i.name));
                if (findItem.hash) FileManagementService.post('photo/remove', {hash: findItem.hash})
            }
        },
        /*
         * Remove All
         * */
        removeAll() {
            const self = this;
            const hash = self.items.filter(i => i.hash).map(i => i.hash);
            self.items = [];
            self.cacheItems = [];
            this.$emit('input', []);
            if (hash.length) {
                FileManagementService.post('photo/remove-all', {hash});
            }
        }
    }
}
</script>

<style scoped>
    @import "./FormPhotos.css";
</style>

<template>
    <page>
        <page-head>
            <div class="w-60">
                <form-group>
                    <form-tree-select
                        valueExpr="key"
                        @select="selectKey"
                        :options="translateKeys || []"
                    />
                </form-group>
            </div>
        </page-head>

        <page-body>
            <DxDataGrid
                ref="dataGrid"
                width="100%"
                :data-source="translates"
                :show-column-lines="true"
                :show-row-lines="true"
                :show-borders="true"
                :remote-operations="true"
            >
                <DxColumnFixing :enabled="true"/>
                <DxFilterRow
                    :visible="true"
                />
                <DxPaging :enabled="true" :page-size="20"/>
                <DxPager
                    :show-page-size-selector="true"
                    :allowed-page-sizes="[20, 50, 100, 150]"
                    :show-info="true"
                />

                <DxColumn
                    v-for="(lang, index) in appLanguages"
                    :key="(index+4)*100"
                    :data-field="lang.code"
                    :width="appLanguages.length > 4 ? 300 : ''"
                    :fixed="lang.code === appLanguage"
                    :caption="lang.name"
                    :cell-template="'languageTemplate_'+lang.code"
                >
                </DxColumn>
                <template #[`languageTemplate_`+lang.code]="{data}" v-for="(lang, index) in appLanguages">
                    {{ translate(data.row.data[lang.code], {lang: lang.code}) }}
                </template>

                <DxColumn
                    :width="50"
                    :fixed="true"
                    fixed-position="right"
                    data-field="action"
                    css-class="action-td"
                    cell-template="actionTemplate"
                    :allowFiltering="false"
                    alignment="center"
                    caption=""
                />
                <template #actionTemplate="{data}">
                    <app-button
                        v-if="can(permission + '.update')"
                        @click="createModal(data.row.data)"
                        :sm="true"
                        :title="translate('button.Edit')"
                        icon="icon-edit-2"
                        property="primary"
                    />
                </template>

            </DxDataGrid>
        </page-body>

        <modal :id="modalId" size="xs">
            <modal-head>
                <modal-title>{{ currentPage.title }}</modal-title>
            </modal-head>
            <modal-body v-if="modelShow">
                <form @submit.prevent="save">
                    <grid>
                        <div v-for="(lang, index) in appLanguages" :key="index" v-if="form[lang.code]">
                            <form-group :label="lang.name" :name="lang.code + '.text'">
                                <form-text v-model="form[lang.code].text"/>
                            </form-group>
                        </div>

                        <app-button class="justify-center" property="success" type="submit">
                            {{ translate('button.Save') }}
                        </app-button>
                    </grid>
                </form>
            </modal-body>
        </modal>

    </page>
</template>

<script>
/*
 * Import Components
 * */
import {mapState, mapActions} from 'vuex'
import {
    DxDataGrid,
    DxColumn,
    DxColumnChooser,
    DxColumnFixing,
    DxFilterRow,
    DxPaging,
    DxPager,
} from 'devextreme-vue/data-grid';

const modalId = 'createModal';


export default {
    name: "LanguageTranslate",
    components: {
        DxDataGrid,
        DxColumn,
        DxColumnChooser,
        DxColumnFixing,
        DxFilterRow,
        DxPager,
        DxPaging
    },
    data() {
        return {
            modalId,
            modelShow: false,
            key: null,
            form: {}
        }
    },
    computed: {
        ...mapState('SystemLanguageStore', ['translates', 'translateKeys']),
        permission() {
            return this.currentPage.permission;
        },
        dxInstance() {
            return this.$refs['dataGrid'].instance;
        }
    },
    methods: {
        ...mapActions('AppStore', ['start']),
        ...mapActions('SystemLanguageStore', ['getTranslates', 'getTranslateKeys', 'setTranslate']),
        /*
         * Select Key
         * */
        selectKey(key) {
            this.key = key;
            this.getTranslates({key})
        },
        /*
         * Form Create
         * */
        formCreate(item = {}) {
            const self = this;
            const form = {};
            Object.keys(item).filter(i => {
                form[i] = {
                    key: item[i],
                    text: self.translate(item[i], {lang: i})
                }
            })
            self.form = form;
            self.modelShow = true;
        },
        /*
         * Create Modal
         * */
        createModal(item = {}) {
            this.modal(this.modalId);
            this.modelShow = false;
            this.resetError();
            this.formCreate(item);
        },
        /*
         * Save
         * */
        save() {
            this.setTranslate(this.form)
            .then(r => {
                if (r) {
                    this.modal(this.modalId);
                    this.getTranslates({key: this.key})
                    this.start();
                }
            })
        }
    },
    created() {
        this.getTranslates();
        this.getTranslateKeys();
    }
}
</script>

<style scoped>

</style>

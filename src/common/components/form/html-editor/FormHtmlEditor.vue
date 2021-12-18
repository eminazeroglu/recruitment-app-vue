<template>
    <html-editor
        class="form-element"
        v-model="element"
        v-bind="$props"
        :init="editorInit()"/>
</template>

<script>
/*
 * Import Components
 * */
import HtmlEditor from '@tinymce/tinymce-vue'
import FormMixin from "../../../mixins/FormMixin";

export default {
    name: "FormHtmlEditor",
    mixins: [FormMixin],
    components: {HtmlEditor},
    props: {
        height: {
            default: 500,
        },
        type: {
            default: 'full',
        },
    },
    watch: {
        '$attrs.value'(val) {
            this.element = val || '';
        }
    },
    methods: {
        editorInit() {
            const vm = this;
            let toolbar = [], plugins = [], menubar = true;
            /*
             * Minimum
             * */
            if (vm.type === 'minimum') {
                menubar = false;
                toolbar = ['bold italic'];
                plugins = [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen image',
                    'insertdatetime media table paste code help wordcount fullscreen'
                ]
            }
            /*
             * Simple
             * */
            else if (vm.type === 'simple') {
                menubar = false;
                toolbar = [
                    'undo redo | formatselect | bold italic backcolor | alignleft aligncenter | image | alignright alignjustify | bullist numlist outdent indent | fullscreen',
                ];
                plugins = ['fullscreen lists'];
            }
            /*
             * Mail
             * */
            else if (vm.type === 'mail') {
                menubar = false;
                toolbar = [
                    'undo redo | bold italic underline | alignleft aligncenter alignright alignjustify hr | bullist numlist outdent indent |' +
                    'link unlink anchor styleselect',
                ];
                plugins = [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen image',
                    'insertdatetime media table paste code help wordcount fullscreen'
                ]
            }
            /*
             * Full
             * */
            else {
                toolbar = [
                    'undo redo | bold italic underline | template save insertdatetime | alignleft aligncenter alignright alignjustify hr | bullist numlist outdent indent | styleselect',
                    '| responsivefilemanager | link unlink anchor | file image media  | forecolor backcolor  | print preview code | emoticons charmap | fullscreen'
                ];
                plugins = [
                    "advlist autolink link image quickbars advlist charmap emoticons hr insertdatetime lists template save charmap print preview hr anchor pagebreak",
                    "searchreplace wordcount visualblocks visualchars insertdatetime media nonbreaking",
                    "table directionality emoticons paste code fullscreen"
                ]
            }
            return {
                height: vm.height,
                toolbar: toolbar,
                toolbar_sticky: true,
                plugins: plugins,
                menubar: menubar,
                templates: [],
                automatic_uploads: true,
                allow_conditional_comments: true,
                language: 'en',
                images_upload_url: process.env.VUE_APP_API_URL + '/file-management/photo/editor-upload',
            };
        }
    }
}
</script>

<style scoped>
@import "./FormHtmlEditor.css";
</style>

/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import Ckeditor from './components/Ckeditor.vue';
import ImageSelector from './components/ImageSelector.vue';

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
let newPage = {
    title: '',
    sub_title: '',
    slug: '',
    content: '',
    meta_title: '',
    meta_description: '',
    meta_keywords: '',
    page_id: '',
    is_published: false,
    view: 'default',
    images: [],
    formatted: false,
    custom: []
};
const createMode = typeof page === 'undefined';
const app = new Vue({
    el: '#page-app',
    data: {
        pages: typeof pages === 'undefined' ? [] : pages,
        templates: typeof templates === 'undefined' ? [] : templates,
        page: createMode ? newPage : Object.assign({}, newPage, page),
        new_image: {
            pivot: {
                slug: ''
            },
            title: '',
            thumbnail: ''
        },
        new_custom: {
            slug: '',
            value: ''
        },
        deleted_image_ids: [],

        editor: {
            mini: {
                toolbarGroups: [
                    {"name": "basicstyles", "groups": ["basicstyles"]},
                    {"name": "links", "groups": ["links"]},
                    {"name": "paragraph", "groups": ["list", "blocks"]},
                    {"name": "document", "groups": ["mode"]},
                    {"name": "insert", "groups": ["insert"]},
                    {"name": "styles", "groups": ["styles"]},
                    {"name": "about", "groups": ["about"]}
                ],
                allowedContent: true,
                removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar',
                height: 250,
                extraPlugins: 'divarea,oembed,image2',
                filebrowserImageBrowseUrl: '/mari-filemanager?type=Images',
                filebrowserImageUploadUrl: '/mari-filemanager/upload?type=Images&_token=',
                filebrowserBrowseUrl: '/mari-filemanager?type=Files',
                filebrowserUploadUrl: '/mari-filemanager/upload?type=Files&_token='
            },
            full: {
                allowedContent: true,
                height: 500,
                extraPlugins: 'divarea,oembed,image2',
                filebrowserImageBrowseUrl: '/mari-filemanager?type=Images',
                filebrowserImageUploadUrl: '/mari-filemanager/upload?type=Images&_token=',
                filebrowserBrowseUrl: '/mari-filemanager?type=Files',
                filebrowserUploadUrl: '/mari-filemanager/upload?type=Files&_token='
            }
        }
    },
    mounted() {
    },
    watch: {
        'page.title': function (value) {
            if(createMode)
                this.page.slug = this.slugify(value)
        },
        'page.slug': function (value) {
            this.page.slug = this.slugify(value)
        }
    },
    methods: {
        addCustomField() {
            this.page.custom.push(Object.assign({}, this.new_custom));
        },
        addImageField() {
            this.page.images.push(Object.assign({}, this.new_image));
        },
        removeImage(k) {
            let removedImage = this.page.images[k];
            if (removedImage && removedImage.id)
                this.deleted_image_ids.push(removedImage.id);
            this.page.images.splice(k, 1);
        },
        removeCustomField(k) {
            this.page.custom.splice(k, 1);
        },
        slugify(text) {
            return text.toString().toLowerCase()
                .replace(/\s+/g, '-')           // Replace spaces with -
                .replace(/&/g, '')              // Replace & with empty
                .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
                .replace(/\-\-+/g, '-')         // Replace multiple - with single -
                .replace(/^-+/, '')             // Trim - from start of text
                .replace(/-+$/, '')             // Trim - from end of text
                .replace(/-$/, '');             // Remove last -
        }
    },
    components: {
        Ckeditor,
        ImageSelector
    }
});
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
 * the post. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

let defaults = {custom:{}};
post_type.alias.forEach(a => {
    defaults[a.slug] = a.default; 
});
post_type.custom.forEach(a => {
    defaults['custom'][a.slug] = a.default;
});
let newPost = {
    title: defaults.title,
    sub_title: defaults.sub_title,
    post_type_id: 3, // 3 for misc
    slug: defaults.slug,
    content: defaults.content,
    meta_title: '',
    meta_description: '',
    meta_keywords: '',
    view: defaults.view,
    images: [],
    is_published: defaults.is_published,
    is_featured: defaults.is_featured,
    custom: [],
    tags: [],
    post_type: null,
    event_on: null
};
const createMode = typeof post === 'undefined';
const app = new Vue({
    el: '#post-app',
    data: {
        post_type: typeof post_type === 'undefined' ? null : post_type,
        post_types: typeof post_types === 'undefined' ? [] : post_types,
        posts: typeof posts === 'undefined' ? [] : posts,
        templates: typeof templates === 'undefined' ? [] : templates,
        tags: typeof tags === 'undefined' ? [] : tags,
        post: createMode ? newPost : Object.assign({}, newPost, post),
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
                height: 250
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
        if (this.post_type) {
            let customData = [];

            this.post_type_non_images.map(field => {
                if(this.post.custom.length) {
                    this.post.custom.map(postCustom => {
                        if(field.slug == postCustom.slug)
                            customData.push(Object.assign(field, postCustom, {id: field.id})); // id to preserve custom_field id in case of post_type type
                    });
                } else {
                    customData.push(Object.assign(field));
                }
            });

            this.post.custom = customData;

            this.post_type_images.map(field => {
                if (!this.post.images.filter(c => c.slug == field.slug || (c.pivot && (c.pivot.slug == field.slug))).length) {
                    field.thumbnail = null;
                    this.post.images.push(Object.assign({}, field));
                }
            });
        }
    },
    watch: {
        'post.title': function (value) {
            if(createMode)
                this.post.slug = this.slugify(value)
        },
        'post.slug': function (value) {
            this.post.slug = this.slugify(value)
        },
        'post.post_type_id': function (value) {
            this.post.post_type = this.post_types.find(pt => pt.id == value);
        }
    },
    computed: {
        'post_type_images': function() {
            if(this.post_type)
                return this.post_type.custom.filter(pt => pt.type == 'image' || pt.type == 'multiple-images');
            return [];    
        },
        'post_type_non_images': function() {
            if(this.post_type)
                return this.post_type.custom.filter(pt => pt.type != 'image' && pt.type != 'multiple-images');
            return [];
        }
    },
    methods: {
        slugify(text) {
            return text.toString().toLowerCase()
                .replace(/\s+/g, '-')           // Replace spaces with -
                .replace(/&/g, '')              // Replace & with empty
                .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
                .replace(/\-\-+/g, '-')         // Replace multiple - with single -
                .replace(/^-+/, '')             // Trim - from start of text
                .replace(/-+$/, '')             // Trim - from end of text
                .replace(/-$/, '');             // Remove last -
        },
        addImageField(slug) {
            this.post.images.push(Object.assign({}, this.new_image, {pivot:{slug},slug, type:'multiple-images'}));
        },
        removeImageField(obj) {
            this.post.images = this.post.images.filter(i => i !== obj);
        },
    },
    components: {
        Ckeditor,
        ImageSelector
    }
});
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the post. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#post-type-app',
    data: {
        post_type: typeof post_type === 'undefined' ? {
            title: '',
            custom: [],
            alias: []
        } : post_type,
        post_types: typeof post_types === 'undefined' ? []: post_types,
        custom_types: [
            {
                'title': 'Multiple Images',
                'slug': 'multiple-images'
            }, {
                'title': 'Image',
                'slug': 'image'
            }, {
                'title': 'Formatted Text',
                'slug': 'formatted-text'
            }, {
                'title': 'Raw Text',
                'slug': 'raw-text'
            }, {
                'title': 'Number',
                'slug': 'number'
            }, {
                'title': 'Date',
                'slug': 'date'
            }, {
                'title': 'Select',
                'slug': 'select'
            }, {
                'title': 'Post Type',
                'slug': 'post-type'
            }
        ],
        aliases: [
            {
                'slug': 'title',
                'title': 'Title',
                'alias': 'Title',
                'required': true,
                'visible': true,
                'default': ''
            },
            {
                'slug': 'slug',
                'title': 'Slug',
                'alias': 'Slug',
                'required': false,
                'visible': true,
                'default': ''
            },
            {
                'slug': 'sub_title',
                'title': 'Sub Title',
                'alias': 'Sub Title',
                'required': false,
                'visible': true,
                'default': ''
            },
            {
                'slug': 'content',
                'title': 'Content',
                'alias': 'Content',
                'required': false,
                'visible': true,
                'default': ''
            },
            {
                'slug': 'is_published',
                'title': 'Is Published',
                'alias': 'Is Published',
                'required': false,
                'visible': true,
                'default': ''
            },
            {
                'slug': 'is_featured',
                'title': 'Is Featured',
                'alias': 'Is Featured',
                'required': false,
                'visible': true,
                'default': ''
            },
            {
                'slug': 'view',
                'title': 'Template',
                'alias': 'Template',
                'required': false,
                'visible': true,
                'default': ''
            },
            {
                'slug': 'tags',
                'title': 'Tags',
                'alias': 'Tags',
                'required': false,
                'visible': true,
                'default': ''
            },
            {
                'slug': 'meta',
                'title': 'Meta',
                'alias': 'Meta',
                'required': false,
                'visible': true
            }
        ],
        new_custom: {
            slug: '',
            type: '',
            title: '',
            options: '',
            default: ''
        }
    },
    mounted() {
        this.aliases.forEach(alias => {
            if (!(this.post_type.alias.length && this.post_type.alias.filter(a => a.slug == alias.slug).length))
                this.post_type.alias.push(Object.assign({}, alias));
        })
    },
    watch: {},
    methods: {
        addCustomField() {
            this.post_type.custom.push(Object.assign({}, this.new_custom));
        },
        removeCustomField(k) {
            this.post_type.custom.splice(k, 1);
        },
        getCustom(slug, prop) {
            let def = null;
            if (!this.post_type.custom)
                return def;
            let custom = this.post_type.custom.filter(a => a.slug == slug);

            if (custom.length && custom[prop])
                return custom[prop];

            return def;
        }
    }
});
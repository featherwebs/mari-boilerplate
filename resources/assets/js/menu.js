import draggable from "vuedraggable";

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
    el: '#menu-app',
    data: {
        menu: typeof menu === 'undefined' ? {
            title: '',
            slug: '',
            sub_menus: []
        }: menu,
        pages: pages,
        sub_menu: {
            title: 'Untitled',
            url: '',
            type: 'custom'
        },
        types: {
            'page': 'Page',
            'post': 'Post',
            'custom': 'Custom'
        },
        postTypes: postTypes,
        posts: posts
    },
    mounted() {
    },
    watch: {
        'menu.title': function (value) {
            this.menu.slug = value.toLowerCase().replace(/[^a-zA-Z0-9]/g, "_");
        }
    },
    methods: {
        addSubMenu() {
            let newSubMenu = Object.assign({}, this.sub_menu);
            this.menu.sub_menus.push(newSubMenu);
        },
        removeSubMenu(i) {
            this.menu.sub_menus.splice(i, 1);
        }
    },
    components: {
        draggable
    }

});
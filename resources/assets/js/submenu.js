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

import draggable from 'vuedraggable';

const app = new Vue({
    el: '#menu-app',
    data: {
        menu: menu,
        pages: pages,
        sub_menu: {
            title: 'Untitled',
            url: ''
        }
    },
    watch: {},
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
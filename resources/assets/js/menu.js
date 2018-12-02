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
        } : menu,
        pages: pages,
        new_sub_menu: {
            order: '',
            title: 'Untitled',
            url: '',
            sub_menus: [],
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
        addSubMenu(addto) {
            if (!addto)
                addto = this.menu;
            let order = 0;
            addto.sub_menus.map(item => {
                if (order < item.order)
                    order = item.order;
            });
            addto.sub_menus.push({...this.new_sub_menu, sub_menus: [], order: order + 1});
        },
        removeSubMenu(i, removeFrom) {
            if (!removeFrom)
                removeFrom = this.menu;
            removeFrom.sub_menus.splice(i, 1);
        },
        swap(arr, from, to) {
            let tmp = arr[to]['order'];
            arr[to]['order'] = arr[from]['order'];
            arr[from]['order'] = tmp;
        }
    },
    components: {
        draggable
    }

});
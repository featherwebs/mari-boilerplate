/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import ImageSelector from './components/ImageSelector.vue';
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the post. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

let newUser = {
    name: '',
    username: '',
    email: '',
    is_active: false,
    role: null,
    roles:[],
    image: {
        thumbnail: null
    }
};
const app = new Vue({
    el: '#user-app',
    data: {
        roles: typeof rolesArr === 'undefined' ? false: rolesArr,
        changePassword: false,
        user: typeof user === 'undefined' ? newUser : Object.assign(newUser, user),
    },
    mounted() {
        if(this.roles.length)
            this.user.role = this.roles.find(r => r.id == user.roles[0]['id']).id;
    },
    watch: {
        'user.username': function (value) {
            this.user.username = value.replace(/[^a-zA-Z0-9]/g, "");
        }
    },
    methods: {},
    components: {
        ImageSelector
    }
});
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import Ckeditor from './components/Ckeditor.vue';

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the post. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#notice-app',
    data: {
        degrees: typeof degrees === 'undefined' ? [] : degrees,
        notice: typeof notice === 'undefined' ? {
            title: '',
            message: '',
            degree_id: null,
            year: null,
            semester: null,
            has_recipients: false
        } : notice,
    },
    computed: {},
    methods: {},
    components: {
        Ckeditor
    }
});
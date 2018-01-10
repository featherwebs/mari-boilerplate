/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
import ImageSelector from './components/ImageSelector.vue';

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the post. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
student.image = student.image ? student.image : {thumbnail: null};

const app = new Vue({
    el: '#student-app',
    data: {
        degrees: typeof degrees === 'undefined' ? [] : degrees,
        student: typeof student === 'undefined' ? {
            name: '',
            symbol: '',
            email: '',
            dob: '',
            degree_id: null,
            year: null,
            semester: null,
            enrolled_on: null,
            graduated_on: null,
            image: {
                thumbnail: null
            },
        } : student,
    },
    computed: {
        generatedPassword: function () {
            return this.student.dob.split('-').join('');
        }
    },
    methods: {},
    components: {
        ImageSelector
    }
});
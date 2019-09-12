/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import Ckeditor from './components/Ckeditor.vue';
import ImageSelector from './components/ImageSelector.vue';
import MapLocationSelector from './components/MapLocationSelector.vue';

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the post. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

let defaults = {custom: {}};
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
  posts: [],
  tags: [],
  post_type: null,
  event_on: null
};
const createMode = typeof post === 'undefined';

window.postapp = new Vue({
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
      allowedContent: true,
      height: 500
    }
  },
  mounted() {
    if (this.post_type) {
      let customData = [];

      this.post_type_non_images.map(field => {
        if (this.post.custom.length) {
          this.post.custom.map(postCustom => {
            if (field.slug == postCustom.slug)
              customData.push({...field, ...postCustom, id: field.id, title: field.title}); // id to preserve custom_field id in case of post_type type
          });
        } else {
          if (field.slug == 'map')
            customData.push({...field, value: ','});
          else
            customData.push({...field, value: ''});
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
      if (createMode)
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
    'post_type_images': function () {
      if (this.post_type)
        return this.post_type.custom.filter(pt => pt.type == 'image' || pt.type == 'multiple-images');
      return [];
    },
    'post_type_non_images': function () {
      if (this.post_type)
        return this.post_type.custom.filter(pt => pt.type != 'image' && pt.type != 'multiple-images');
      return [];
    },
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
      this.post.images.push(Object.assign({}, this.new_image, {
        pivot: {slug},
        slug,
        type: 'multiple-images',
        id: Math.random().toString(36).substring(6)
      }));
    },
    removeImageField(obj) {
      this.post.images = this.post.images.filter(i => i.id !== obj.id);
    },
    locationupdated(latlng, slug, name) {
      let value = latlng.lng + ',' + latlng.lat;
      this.post.custom.find(c => c.slug== slug).value = value;

      $('[name="'+ name+'"]').val(value);
    },
    addPostsRelation(slug, id, multiple) {
      var relatedPost = this.posts.find(p => p.id == id);
      if (multiple)
        this.post.posts = [...this.post.posts, {...relatedPost, pivot: {slug}}];
      else
        this.post.posts = [...this.post.posts.filter(p => p.pivot.slug != slug), {...relatedPost, pivot: {slug}}]
    },
    removePostsRelation(slug, id) {
      this.post.posts = this.post.posts.filter(p => p.pivot.slug == slug && p.id != id);
    },
    getCustomValue(slug, def) {
      if(def === undefined)
        def = null;

      let custom = this.post.custom.find(c => c.slug == slug);
      if (custom)
        return custom.value;


      let posts = this.post.posts.filter(p => p.pivot.slug == slug);
      if(posts.length)
        return posts.map(p => p.id);

      return def;
    }
  },
  components: {
    Ckeditor,
    ImageSelector,
    MapLocationSelector
  }
});
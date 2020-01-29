/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import ImageSelector from './components/ImageSelector.vue';
import MapLocationSelector from './components/MapLocationSelector.vue';
import {VueEditor} from "vue2-editor";


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

let customData = [];
let imageData = [];
let postTypeData = typeof post_type === 'undefined' ? null : post_type;
let postData = createMode ? newPost : Object.assign({}, newPost, post);

postTypeData.custom.map(field => {
  let data = {...field, value: ""};
  switch (field.type) {
    case 'image':
    case 'multiple-images':
      let images = postData.images.filter(i => i.slug == field.slug || (i.pivot && (i.pivot.slug == field.slug)));
      if (images.length) {
        imageData.push(...images.map(i => ({thumbnail: '', url: '', ...field, ...i, slug: field.slug})));
      } else {
        imageData.push({...field, thumbnail: '', url: '', slug: field.slug});
      }
      break;
    case 'map':
      let mapData = postData.custom.find(p => field.slug == p.slug);
      if (mapData) {
        data = {
          ...data,
          ...mapData
        }
      } else {
        data = {...data, value: ','};
      }
      customData.push(data);
      break;
    case 'post-type':
      let cc = postData.posts.find(p => field.slug == p.pivot.slug);

      if (cc) {
        data = {
          ...field,
          ...cc,
          slug: field.slug,
          id: field.id,
          value: cc.id
        };
      }
      customData.push(data);
      break;
    case 'post-type-multiple':
      let c = postData.posts.filter(p => field.slug == p.pivot.slug);
      if (c.length) {
        data = {
          ...field,
          ...c,
          id: field.id,
          value: c.map(c => c.id)
        };
      } else {
        data = {...data, value: []}
      }
      customData.push(data);
      break;
    default:
      let defaultData = postData.custom.find(p => field.slug == p.slug);
      if (defaultData) {
        data = {
          ...data,
          ...defaultData
        };
      }
      customData.push(data);
  }
});
postData.custom = customData;
postData.images = imageData;

window.postapp = new Vue({
  el: '#post-app',
  data: {
    content: '',
    post_type: postTypeData,
    post_types: typeof post_types === 'undefined' ? [] : post_types,
    posts: typeof posts === 'undefined' ? [] : posts,
    templates: typeof templates === 'undefined' ? [] : templates,
    tags: typeof tags === 'undefined' ? [] : tags,
    post: postData,
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
    },

    customToolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['link'],
      [{'align': []}],
      ['blockquote', {'header': [1, 2, 3, 4, 5, 6, false]}],
      [{'indent': '-1'}, {'indent': '+1'}],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      [{'font': []}],
      [{'color': []}, {'background': []}],
    ],
  },
  mounted() {
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
    'post_type_p_images': function () {
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
      this.post.images = this.post.images.filter(i => i !== obj);
    },
    locationupdated(latlng, slug, name) {
      let value = latlng.lng + ',' + latlng.lat;
      this.post.custom.find(c => c.slug == slug).value = value;

      $('[name="' + name + '"]').val(value);
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
    }
  },
  components: {
    ImageSelector,
    MapLocationSelector,
    VueEditor
  }
});
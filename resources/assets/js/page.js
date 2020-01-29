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
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const newPage = {
  title: '',
  sub_title: '',
  slug: '',
  content: '',
  meta_title: '',
  meta_description: '',
  meta_keywords: '',
  page_id: '',
  is_published: false,
  view: '',
  images: [],
  formatted: false,
  page_type: null,
  custom: [],
  posts: [],
};
const createMode = typeof page === 'undefined';
const defaultPageType = {
  'id': null,
  'title': 'Default',
  'slug': 'default',
  'custom': [
    {
      "pivot":
        {
          "slug": "photo"
        },
      "slug": "photo",
      "type": "image",
      "title": "Image",
      "default": null,
    }
    ,
  ],
  'alias':
    [
      {
        "visible": "true",
        "alias": "Title",
        "slug": "title",
        "title": "Title",
        "required": "true",
        "default": null,
      },
      {
        "visible": "false",
        "alias": "Slug",
        "slug": "slug",
        "title": "Slug",
        "required": "false",
        "default": null,
      },
      {
        "visible": "true",
        "alias": "Sub Title",
        "slug": "sub_title",
        "title": "Sub Title",
        "required": "false",
        "default": null,
      },
      {
        "visible": "true",
        "alias": "Content",
        "slug": "content",
        "title": "Content",
        "required": "false",
        "default": null,
      },
      {
        "visible": "true",
        "alias": "Is Published",
        "slug": "is_published",
        "title": "Is Published",
        "required": "false",
        "default": "true",
      },
      {
        "visible": "false",
        "alias": "Is Featured",
        "slug": "is_featured",
        "title": "Is Featured",
        "required": "false",
        "default": null,
      },
      {
        "visible": "true",
        "alias": "Meta",
        "slug": "meta",
        "title": "Meta",
        "required": "false",
        "default": null,
      }
    ]
};

let pd = createMode ? newPage : Object.assign({}, newPage, page);

function getPageData(pageData, pageType) {
  let customData = [];
  let imageData = [];

  if(!pageType)
    return pageData;

  pageType.custom.map(field => {
    let data = {...field, value: ""};
    switch (field.type) {
      case 'image':
      case 'multiple-images':
        let images = pageData.images.filter(i => i.slug == field.slug || (i.pivot && (i.pivot.slug == field.slug)));
        if (images.length) {
          imageData.push(...images.map(i => ({thumbnail: '', url: '', ...field, ...i, slug: field.slug, title: field.title})));
        } else {
          imageData.push({...field, thumbnail: '', url: '', slug: field.slug, title: field.title});
        }
        break;
      case 'map':
        let mapData = pageData.custom.find(p => field.slug == p.slug);
        if (mapData) {
          data = {
            ...data,
            ...mapData,
            title: field.title
          }
        } else {
          data = {...data, value: ',', title: field.title};
        }
        customData.push(data);
        break;
      case 'post-type':
        let cc = pageData.posts.find(p => field.slug == p.pivot.slug);

        if (cc) {
          data = {
            ...field,
            ...cc,
            slug: field.slug,
            id: field.id,
            value: cc.id,
            title: field.title
          };
        }
        customData.push(data);
        break;
      case 'post-type-multiple':
        let c = pageData.posts.filter(p => field.slug == p.pivot.slug);
        if (c.length) {
          data = {
            ...field,
            ...c,
            id: field.id,
            value: c.map(c => c.id),
            title: field.title
          };
        } else {
          data = {...data, value: [], title: field.title}
        }
        customData.push(data);
        break;
      default:
        let defaultData = pageData.custom.find(p => field.slug == p.slug);

        if (defaultData) {
          data = {
            ...data,
            ...defaultData,
            title: field.title
          };
        }
        customData.push(data);
    }
  });
  pageData.custom = customData;
  pageData.images = imageData;

  return pageData;
}

window.pageapp = new Vue({
  el: '#page-app',
  data: {
    page: getPageData(pd, pd.page_type),
    page_types: [{...defaultPageType}, ...page_types],
    posts,
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
    // set the default post type
    if (!this.page.page_type && this.page_types.length)
      this.page.page_type = this.page_types[0];

  },
  watch: {
    'page.title': function (value) {
      if (createMode)
        this.page.slug = this.slugify(value)
    },
    'page.slug': function (value) {
      this.page.slug = this.slugify(value)
    },
    'page.view': function (value) {
      this.page.page_type = this.page_types.find(t => t.id == value);
    },
    'page.page_type': function (value) {
      this.page = getPageData(this.page, value);
      this.page.view = value.id;
      this.updateSelect2();
    }
  },
  computed: {
    'page_type_images': function () {
      if (this.page.page_type)
        return this.page.page_type.custom.filter(pt => pt.type == 'image' || pt.type == 'multiple-images');
      return [];
    }
  },
  methods: {
    addCustomField() {
      this.page.custom.push(Object.assign({}, this.new_custom));
    },
    removeCustomField(k) {
      this.page.custom.splice(k, 1);
    },
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
    alias(slug) {
      let a = null;
      if (this.page.page_type && this.page.page_type.alias)
        a = this.page.page_type.alias.find(a => a.slug == slug);

      if (a)
        return a.alias;

      return '';
    },
    alias_visible(slug) {
      let a = null;
      if (this.page.page_type && this.page.page_type.alias)
        a = this.page.page_type.alias.find(a => a.slug == slug);

      if (a)
        return a.visible === 'true' || a.visible === true;

      return false;
    },
    addImageField(slug) {
      this.page.images.push(Object.assign({}, this.new_image, {
        pivot: {slug},
        slug,
        type: 'multiple-images',
        id: Math.random().toString(36).substring(6)
      }));
    },
    removeImageField(obj) {
      this.page.images = this.page.images.filter(i => i !== obj);
    },
    locationupdated(latlng, slug, name) {
      let value = latlng.lng + ',' + latlng.lat;
      this.page.custom.find(c => c.slug == slug).value = value;
      $('[name="' + name + '"]').val(value);
    },
    addPostsRelation(slug, id, multiple) {
      var relatedPost = this.posts.find(p => p.id == id);
      if (multiple)
        this.page.posts = [...this.page.posts, {...relatedPost, pivot: {slug}}];
      else
        this.page.posts = [...this.page.posts.filter(p => p.pivot.slug != slug), {...relatedPost, pivot: {slug}}]
    },
    removePostsRelation(slug, id) {
      this.page.posts = this.page.posts.filter(p => p.pivot.slug == slug && p.id != id);
    },
    updateSelect2() {
      let app = this;
      setTimeout(function () {
        $('.select2').each(function () {
          let that = this;
          let multiple = $(that).attr('multiple') !== undefined;
          $(that).select2().on('select2:select', function (e) {
            app.addPostsRelation($(that).data('slug'), e.params.data.id, multiple);
          }).on('select2:unselect', function (e) {
            app.removePostsRelation($(that).data('slug'), e.params.data.id);
          });
        });
      }, 500);
    },
    getCustomValue(slug, def) {
      if (def === undefined)
        def = null;

      let custom = this.page.custom.find(c => c.slug == slug);
      if (custom)
        return custom.value;


      let posts = this.page.posts.filter(p => p.pivot.slug == slug);
      if (posts.length)
        return posts.map(p => p.id);

      return def;
    }
  },
  components: {
    ImageSelector,
    MapLocationSelector,
    VueEditor
  }
});
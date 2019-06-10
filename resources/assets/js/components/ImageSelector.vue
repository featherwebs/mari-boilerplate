<template>
	<div>
		<div v-if="type!='file'" class="thumbnail" :id="'holder-wrapper-'+id" :data-input="'thumbnail-'+id"
				 :data-preview="'holder-'+id">
			<img :id="'holder-'+id" :src="value">
		</div>
		<div class="input-group">
			<div class="input-group-btn">
				<a v-if="type == 'file'" :id="'btn-file-'+id" :data-input="'thumbnail-'+id" :data-preview="'holder-'+id" class="btn btn-primary">
					<i class="fa fa-file-o"></i> Choose
				</a>
				<a v-else :id="'btn-'+id" :data-input="'thumbnail-'+id" :data-preview="'holder-'+id"
					 class="btn btn-primary">
					<i class="fa fa-picture-o"></i> Choose
				</a>
			</div>
			<input :id="'thumbnail-'+id" class="form-control"
						 :type="hidevalue === false ? 'text': 'hidden'"
						 :name="name"
						 v-model="value">
		</div>
	</div>
</template>

<script>
  export default {
    props: ['name', 'value', 'type', 'hidevalue'],
    data() {
      return {
        id: Math.random().toString(36).substring(8),
        def: 'http://via.placeholder.com/250x250?text=x'
      };
    },
    mounted() {
      if (typeof this.value == 'string') {
        this.img = this.value;
      } else if (this.value && typeof this.value == 'object' && this.value.path) {
        this.img = this.value.url;
      } else if (this.type != 'file') {
        this.img = this.def;
      }
      $('#btn-' + this.id).filemanager('image');
      $('#btn-file-' + this.id).filemanager('file');
      $('#holder-wrapper-' + this.id).filemanager('image');
      $('#holder-file-wrapper-' + this.id).filemanager('file');
    },
    methods: {},
    watch: {
      value(value) {
        this.$emit('input', value);
      }
    }
  }
</script>
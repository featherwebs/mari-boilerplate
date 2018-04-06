<template>
	<div>
		<div>
			<div class="thumbnail">
				<img :id="'holder-'+id" :src="value ? value : 'http://via.placeholder.com/250x250'" :data-input="'thumbnail-'+id" :data-preview="'holder-'+id">
			</div>
			<a v-if="type == 'file'" :id="'btn-file-'+id" :data-input="'thumbnail-'+id" :data-preview="'holder-'+id" class="btn btn-primary">
				<i class="fa fa-file-o"></i> Choose
			</a>
			<a v-else :id="'btn-'+id" :data-input="'thumbnail-'+id" :data-preview="'holder-'+id"
			   class="btn btn-primary">
				<i class="fa fa-picture-o"></i> Choose
			</a>
			<input :id="'thumbnail-'+id" class="form-control" type="hidden" :name="name" :value="value">
		</div>
	</div>
</template>

<script>
    export default {
        props: ['name', 'value', 'type'],
        data() {
            return {
                id: Math.random().toString(36).substring(8)
            };
        },
        mounted() {
            $('#btn-' + this.id).filemanager('image');
            $('#btn-file-' + this.id).filemanager('file');
            $('#holder-' + this.id).filemanager('image');
        },
        methods: {
        }
    }
</script>
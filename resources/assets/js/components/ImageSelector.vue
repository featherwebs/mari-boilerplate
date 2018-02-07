<template>
	<div>
		<button type="button" class="mdl-button mdl-js-button" @click="openModal">
			<i class="material-icons">perm_media</i>
			Add Image
		</button>
		<div v-if="mode=='select'">
			<input type="hidden" :name="name" :value="imageSelected ? imageSelected.id: ''" />
		</div>
		<div v-if="mode=='upload'">
			<input type="file" class="hidden" id="image-selector" :name="fileName ? fileName : name"
				   accept="image/jpeg,image/png,image/bmp" @change="showPreview($event)"
				   :id="fileid" />
		</div>
		<div class="modal-mask" v-show="modalVisible">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h4 class="modal-title">Insert Images</h4>
						<a class="fw-close" href="javascript:void(0);" @click="closeModal(true)">
							&times;
						</a>
					</div>
					<div class="modal-body" v-if="loading">
						Loading...
					</div>
					<div class="modal-body" v-if="!loading">
						<div>
							<!-- Nav tabs -->
							<ul class="nav nav-pills fw-nav" role="tablist">
								<li role="presentation"
									class="active"><a href="#select-image" data-toggle="tab"
													  @click="mode='select'">Media
									Library</a></li>
								<li role="presentation"><a href="#upload-new" data-toggle="tab" @click="mode='upload'">
									Upload File</a></li>
							</ul>

							<!-- Tab panes -->
							<div v-if="mode=='select'">
								<div class="row">
									<div class="col-sm-9">
										<div class="row" v-for="chunk in lodash.chunk(images, 6)">
											<div class="col-sm-2 img-previews" v-for="image in chunk"
												 @click="toggleSelectedImage(image)">
												<img :src="image.thumbnail" class="img-responsive"
													 :class="{'active': imageSelected == image}" />
											</div>
										</div>
									</div>
									<div class="col-sm-3">
										<div v-if="imageSelected">
											<div class="row">
												<div class="col-xs-12">
													<div class="row">
														<div class="col-xs-5">
															<img :src="imageSelected.thumbnail" class="img-responsive">
														</div>
														<div class="col-xs-7">
															<div class="mdl-chip" title="Title">
																<span class="mdl-chip__text">
																	{{ imageSelected.title }}
																</span>
															</div>
															<div class="mdl-chip" title="Created Date">
																<span class="mdl-chip__text">
																	{{ imageSelected.created_at }}
																</span>
															</div>
															<div class="mdl-chip" title="Dimensions">
																<span class="mdl-chip__text">
																	{{ imageSelected.width }}x{{ imageSelected.height }}
																</span>
															</div>
														</div>
													</div>
												</div>
												<div class="col-xs-12">
													<div class="form-group">
														<label for="image-title"></label>
														<input id="image-title" :value="imageSelected.title" class="form-control"
															   readonly />
													</div>
													<div class="form-group">
														<label for="image-url"></label>
														<input id="image-url" :value="imageSelected.url" class="form-control"
															   readonly />
													</div>
												</div>
											</div>
										</div>
										<div v-else>
											Select an Image
										</div>
									</div>
								</div>
							</div>
							<div v-if="mode=='upload'">
								<label :for="fileid" class="fw-upload">Select a file</label>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="mdl-button mdl-button--colored pull-right"
										@click="closeModal(false)" v-if="imageSelected || base64">
							Use Selected Image
						</button>
						<button type="button" class="mdl-button mdl-button--colored pull-right mdl-color-text--red"
										@click="closeModal(true)">
							Cancel
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
    let inc = new Date().getTime();
    let lodash = require('lodash');

    export default {
        name: 'image-selector',
        props: ['name', 'fileName', 'id'],
        data() {
            return {
                fileid: '',
                lodash: lodash,
                loading: false,
                mode: 'select',
                modalVisible: false,
                destroyed: false,
                images: [],
                imageSelected: null,
                base64: null
            };
        },
		mounted() {
            if(this.id)
                this.fileid = this.id;
            else
                this.fileid = this.getRandom();
		},
		watch: {
            base64 : function() {
				this.closeModal(false);
            }
		},
        methods: {
            onChange() {
                let html = this.instance.getData();
                if (html !== this.value) {
                    this.$emit('input', html);
                }
            },
            onBlur() {
                this.$emit('blur', this.instance);
            },
            onFocus() {
                this.$emit('focus', this.instance);
            },
            closeModal(cancel) {
                if (cancel) {
                    this.mode = '';
                } else {
                    if (this.imageSelected)
                        this.$emit('change', this.imageSelected.thumbnail);
                    else if (this.base64)
                        this.$emit('change', this.base64);
                }
                this.modalVisible = false;
            },
            openModal() {
                let p = this;
                p.loading = true;
                p.mode = 'select';
                p.modalVisible = true;
                $('.modal-mask').detach().appendTo('body');
                axios.post('/api/media').then(({data}) => {
                    p.images = data;
                    p.loading = false;
                }).catch((err) => {
                    p.loading = false;
                });
            },
            doNotCloseModal(e) {
                e.stopPropagation();
            },
            toggleSelectedImage(image) {
                if (this.imageSelected == image)
                    this.imageSelected = null;
                else
                    this.imageSelected = image;
            },
            showPreview(event) {
                let p = this;
                let input = event.target;

                if (input.files && input.files[0]) {
                    let reader = new FileReader();

                    reader.onload = function (e) {
                        p.base64 = e.target.result;
                    };

                    reader.readAsDataURL(input.files[0]);
                }
            },
            getRandom() {
                return Math.random().toString(36).substring(8);
            }
        }
    }
</script>
<style>
	.modal-mask {
		position: fixed;
		z-index: 99999999999999;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .9);
		display: table;
		transition: opacity .3s ease;
	}

	.modal-dialog {
		width: 95% !important;
	}

	.modal-body {
		height: 400px;
		overflow-y: scroll;
	}

	.img-previews img {
		border: 1px solid transparent;
	}
	.img-previews img.active {
		border: 1px solid #677efe;
	}

	.fw-upload {
		width: 100%;
		border: 2px dashed black;
		display: block;
		text-align: center;
		padding: 100px;
		font-size: 20px;
		cursor: pointer;
		font-weight: normal;
	}

	.fw-nav {
		padding: 15px 0;
	}

	.fw-close {
		position: absolute;
		right: 15px;
		padding: 10px;
		top: 15px;
		font-size: 29px;
	}
</style>
<section id="card__banner">
  <div class="container">
    <div class="cardbanner__main">
      <ul id="elasticstack" class="elasticstack">
        @foreach(fw_posts_by_category('blog', 3, true)->featured()->get() as $slider)
          <li>
            <div class="cb__contents">
              <figure>
                  <img src="{!! fw_thumbnail($slider, 425) !!}" alt="{!! $slider->title !!}">
              </figure>
              <div class="cb__desc">
                <div class="cb__desc--center">
                  <a href="{!! route('post', $slider) !!}">
                    <h5>{!! $slider->title !!}</h5>
                  </a>
                  <p>
                    {!! str_limit(strip_tags($slider->content), 200)  !!}
                  </p>
                </div>
              </div>
            </div>
          </li>
        @endforeach
			</ul>
    </div>
    <a href="javascript:void(0);" class="elastistack__trigger--js btn d-none d-lg-block">Next</a>
  </div>
</section>

@push('scripts')
    <script>
    	var scroll = new SmoothScroll('a[href*="#"]');
      var elastic = new ElastiStack( document.getElementById( 'elasticstack' ), {
        // distDragBack: if the user stops dragging the image in a area that does not exceed [distDragBack]px
        // for either x or y then the image goes back to the stack
        distDragBack : 200,
        // distDragMax: if the user drags the image in a area that exceeds [distDragMax]px
        // for either x or y then the image moves away from the stack
        distDragMax : 400,
        // callback
        onUpdateStack : function( current ) {
          $('.cardbannerslide--desc').removeClass('active');
          $('.cardbannerslide--desc:eq('+current+')').addClass('active');
        }
      });
      
      $(document).on('click', '.elastistack__trigger--js', function() {
        elastic.next();
      });
    </script>
@endpush
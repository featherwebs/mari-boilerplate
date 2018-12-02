<section id="fresh__sterilizer--main">
  <div class="container">
    <header>
      <h1 class="header-frontline">Fresh From the sterilizer</h1>
    </header>
    <div class="fresh__sterilizer s__main--wrapper">
      @foreach(fw_posts_by_category('blog', 10) as $post)
      <div class="s__contents">
        <figure>
          <a href="{!! route('post', $post)!!}">
            <img src="{!! fw_thumbnail($post, 300)!!}" alt="{!! $post->title !!}">
          </a>
        </figure>
        <div class="s__contents--desc">
          <h2>
            <a href="{!! route('blog', $post)!!}">
              {!! $post->title !!}
            </a>
          </h2>
          <p>
            {!! str_limit(strip_tags($post->content), 200) !!}
          </p>
          <div class="s__contents--date">
            <div class="s__date">
              <p>{!! $post->created_at->format('M d Y') !!}</p>
              <p>{!! estimated_reading_time($post) !!} read</p>
            </div>
            <div class="s__date--tite">
              @if($category=fw_post_by_id($post->getCustom('category')))
                <a href="{!! route('category', $category) !!}">{!! $category->title !!}</a>
              @endif
            </div>
          </div>
        </div>
      </div>
      @endforeach
    </div>
  </div>
</section>
<div class="blog__shelf">
  <header>
    <h1 class="header-frontline">Fresh From the Shelf</h1>
  </header>
  <div class="blog__shelflist--wrapper">
    @foreach(fw_posts_by_category('blog', 5) as $blog)
      <div class="s__contents">
        <figure>
          <a href="{!! route('blog', $blog) !!}">
            <img src="{!! fw_thumbnail($blog, 303) !!}" alt="{!! $blog->title !!}">
          </a>
        </figure>
        <div class="s__contents--desc">
          <h2>
            <a href="{!! route('blog', $blog) !!}">
              {!! $blog->title !!}
            </a>
          </h2>
          <p>
            {!! str_limit(strip_tags($blog->content), 150) !!}
          </p>
          <div class="s__contents--date">
            <div class="s__date">
              <p>{!! $blog->created_at->format('M d Y') !!}</p>
              <p>{!! estimated_reading_time($blog) !!} read</p>
            </div>
            <div class="s__date--tite">
              @if($c=fw_post_by_id($blog->getCustom('category')))
                <a href="{!! route('category', $c) !!}">{!! $c->title !!}</a>
              @endif
            </div>
          </div>
        </div>
      </div>
    @endforeach
  </div>
</div>
<div class="blog__shelf">
  <header>
    <h1 class="header-frontline">Fresh From the Shelf</h1>
  </header>
  <div class="blog__shelflist--wrapper">
    @foreach(fw_posts_by_category('story', 5) as $story)
      <div class="s__contents">
        <figure>
          <a href="{!! route('story', $story) !!}">
            <img src="{!! fw_thumbnail($story, 303) !!}" alt="{!! $story->title !!}">
          </a>
        </figure>
        <div class="s__contents--desc">
          <h2>
            <a href="{!! route('story', $story) !!}">
              {!! $story->title !!}
            </a>
          </h2>
          <p>
            {!! str_limit(strip_tags($story->content), 150) !!}
          </p>
          <div class="s__contents--date">
            <div class="s__date">
              <p>{!! $story->created_at->format('M d Y') !!}</p>
              <p>{!! estimated_reading_time($story) !!} read</p>
            </div>
            <div class="s__date--tite">
              @if($c=fw_post_by_id($story->getCustom('series')))
                <a href="{!! route('series', $c) !!}">{!! $c->title !!}</a>
              @endif
            </div>
          </div>
        </div>
      </div>
    @endforeach
  </div>
</div>
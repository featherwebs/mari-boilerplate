@if($featured=fw_posts_by_category('story',1,true)->featured()->first())
<section id="story__boards">
  <div class="container">
    <div class="row">
      <div class="col-lg-6 order-2 order-lg-1 d-flex justify-content-center align-items-center">
        <div class="story__boards--desc">
          <header>
            <h6>
              <a href="{!! route('post', $featured) !!}">
                Story
              </a>
            </h6>
            <h1>
              <a href="{!! route('story', $featured) !!}">
                {!! $featured->title !!}
              </a>
            </h1>
            <p>{!! estimated_reading_time($featured) !!} read</p>
          </header>
          <p>
            {!! str_limit(strip_tags($featured->content), 500) !!}
          </p>
        </div>
      </div>
      <div class="col-lg-6 order-1 order-lg-2 d-flex justify-content-center">
        <figure>
          <a href="{!! route('story', $featured) !!}">
            <img src="{!! fw_thumbnail($featured, 490) !!}" alt="story">
          </a>
        </figure>
      </div>
    </div>
  </div>
</section>
@endif
<section id="story__boards--lastweek">
  <div class="container">
    <header>
      <h1 class="header-backline">From the last week</h1>
    </header>
    <div class="row">
      @foreach(fw_posts_by_category('story', 4, true)->latest()->where('id', '<>', $featured ? $featured->id: '')->get() as $story)
        <div class="col-lg-6">
        <div class="last__week--storywrapper">
          <div class="last__week--contents">
            <h2>
              <a href="{!! route('story', $story) !!}">
                {!! $story->title !!}
              </a>
            </h2>
            <p>
              {!! str_limit(strip_tags($story->content), 200) !!}
            </p>
            <div class="l__week--date">
              <p>{!! $story->created_at->format('M d Y') !!}</p>
              <p>{!! estimated_reading_time($story) !!} read</p>
            </div>
          </div>
          <figure>
            <a href="{!! route('story', $story) !!}">
              <img src="{!! fw_thumbnail($story, 150) !!}" alt="{!! $story->title !!}">
            </a>
          </figure>
        </div>
      </div>
      @endforeach
    </div>
  </div>
</section>
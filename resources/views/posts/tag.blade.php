@extends('layouts.app')

@section('content')
  <section id="blog">
    <div class="container">
      <div class="row">
        <div class="col-lg-8">
          <div class="blog__left--wrapper">
            <div class="blog__lb--wrapper">
              @if($blogs=fw_posts_by_tag($tag->slug, false, true)->paginate(10))
                @forelse($blogs as $blog)
                  <div class="blog__list--wrapper bl__style--wrapper">
                    <figure>
                      <a href="{!! route('blog', $blog)!!}">
                        <img src="{!! fw_thumbnail($blog, 250) !!}" alt="{!! $blog->title !!}">
                      </a>
                    </figure>
                    <div class="blog__list--contents bl__style--contents">
                      <header>
                        <h6>
                          @if($c=fw_post_by_id($blog->getCustom('category')))
                            <a href="{!! route('category', $c) !!}">{!! $c->title !!}</a>
                          @endif
                        </h6>
                        <h3>
                          <a href="{!! route('blog', $blog)!!}">
                            {!! $blog->title !!}
                          </a>
                        </h3>
                        <div class="blog__list--date bl__style--date">
                          <p>{!! $blog->created_at->format('M d Y') !!}</p>
                          <p>{!! estimated_reading_time($blog) !!} read</p>
                        </div>
                      </header>
                      <div class="blog__list--desc bl__style--desc">
                        <p>
                          {!! str_limit(strip_tags($blog->content), 320) !!}
                        </p>
                      </div>
                    </div>
                  </div>
                @empty
                  <div class="blog__list--wrapper bl__style--wrapper">
                    <div class="blog__list--contents bl__style--contents">
                      No Posts
                    </div>
                  </div>
                @endforelse
                {!! $blogs->render() !!}
              @endif
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          @include('partials.blog-sidebar')
        </div>
      </div>
    </div>
  </section>
@stop
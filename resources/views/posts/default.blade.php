@extends('layouts.app')

@section('content')
    <section id="single__blog">
        <div class="single__blog--banner">
            <div class="container">
                <header class="jumbo__header">
                    <h1>{!! $post->title !!}</h1>
                    <div class="sb__date--wrapper jumbo__header--date">
                        <p>{!! $post->created_at ? $post->created_at->format('M d Y'): '' !!}</p>
                        <p>{!! estimated_reading_time($post) !!} read</p>
                    </div>
                </header>

            </div>
            <figure class="single__blog--bannerimg">
                <img src="{!! fw_thumbnail($post, 1905) !!}" alt="{!! $post->title !!}">
            </figure>
        </div>
        <div class="single__blog--desc--wrapper">
            <div class="container">
                <div>
                    {!! $post->content !!}
                </div>
                <div class="tag__contents--wrapper">
                    <ul class="tag__contents">
                        @foreach($post->tags as $tag)
                            <li><a href="{!! route('tag', $tag) !!}">{!! $tag->title !!}</a></li>
                        @endforeach
                    </ul>
                    <div class="social__contents">
                        <a href="mailto:?subject={!! fw_meta_title($post) !!}body={!! request()->url() !!}" class="s_sl"><img src="{!! asset('images/linkshare.svg') !!}" alt="linkshare"></a>
                        <a href="https://twitter.com/intent/tweet/?url={!! request()->url() !!}" class="s_tweet" target="_blank"><img src="{!! asset('images/twitter.svg') !!}" alt="tweeter"></a>
                        <a href="https://www.facebook.com/sharer/sharer.php?u={!! request()->url() !!}" class="s_fb" target="_blank"><img src="{!! asset('images/facebook.svg') !!}" alt="facebook"></a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    @include('partials.blogs')
@endsection
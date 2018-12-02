@php
    $instagram = Cache::get('instagram_'.date('Y-m-d-H'), new Vinkla\Instagram\Instagram(env('INSTAGRAM_ACCESS_TOKEN')));
    $self = Cache::get('instagram_self_'.date('Y-m-d-H'), $instagram->self());
    $medias = Cache::get('instagram_medias_'.date('Y-m-d-H'), $instagram->media());
@endphp

<section id="insta__page">
  <div class="container">
    <div class="row">
      <div class="col-lg-3">
        <div class="insta__profile--wrapper">
          <div class="insta__pimg--wrapper">
            <figure>
              <img src="{!! $self->profile_picture !!}" alt="insta user">
            </figure>
          </div>

          <div class="insta--desc--wrapper">
            <header>
              <p class="insta--nick">{!! $self->username !!}</p>
              <p class="insta--name">{!! $self->full_name !!}</p>
            </header>
            <p class="insta--desc d-none d-lg-block">
              {!! $self->bio !!}
            </p>
            <div class="insta--postfollows">
              <p class="insta--post">{!! $self->counts->media !!} posts</p>
              <p class="insta--followers">{!! $self->counts->followed_by !!} followers</p>
            </div>
            <div class="insta__follow-btn--wrapper">
              <a href="https://instagram.com/{!! $self->username !!}" class="insta__follow-btn" name="button" target="_blank">Follow</a>
            </div>
          </div>
        </div>

      </div>
      <div class="col-lg-9">
        <div class="insta--photo-wrapper">
          <div class="insta--photo-info">
              <p>{!! $self->counts->media !!} Instagram Photos</p>
          </div>
          <div class="insta--photos--slick">
            <div class="insta--carousal">
              @foreach($medias as $media)
                @if($media->images)
                  <a href="{!! $media->link !!}" target="_blank">
                    <img src="{!! $media->images->standard_resolution->url !!}" alt="{!! $media->caption ? str_limit($media->caption->text, 25): ''!!}">
                  </a>
                @endif
              @endforeach
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

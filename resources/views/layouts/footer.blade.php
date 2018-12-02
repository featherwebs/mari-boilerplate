<footer id="footer__main">
  <div class="container">
    <div class="row">
      <div class="col-xl-3 col-wrapper">
        <figure class="footer__logo">
          <a href="{{ url('/') }}"><img src="{{ fw_setting('logo') }}" alt="footer logo"></a>

        </figure>
      </div>
      <div class="col-xl-6 col-wrapper">
        <div class="footer__menu--wrapper">
          <ul>
            @if($menu = fw_menu('main'))
              @foreach($menu->subMenus as $item)
                <li>
                  <a data-scroll href="{{ $item->url }}">{{ ucwords($item->title) }}</a>
                </li>
              @endforeach
            @endif
          </ul>

        </div>
      </div>
      <div class="col-xl-3 col-wrapper">
        <div class="footer__social--link-wrapper">
          <a href="{{ fw_setting('instagram') }}" target="_blank">
            <img src="{{ asset('images/instagram.svg') }}" alt="instagram">
          </a>
          <a href="{{ fw_setting('facebook') }}" target="_blank">
            <img src="{{ asset('images/facebook.svg') }}" alt="facebook">
          </a>
          <a href="{{ fw_setting('twitter') }}" target="_blank">
            <img src="{{ asset('images/twitter.svg') }}" alt="twitter">
          </a>
      </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-wrapper">
        <div class="footer__copyright">
          <p>&copy; {{ date('Y') }} <span class="footer__copyright--text">All Rights Reserved</span></p>
        </div>
      </div>
    </div>
  </div>
</footer>
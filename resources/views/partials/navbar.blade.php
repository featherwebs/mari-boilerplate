<nav class="navbar navbar-expand-lg navbar-light ">
  <div class="container nav_main--wrapper">
    <div class="brand_and_btn--wrapper">
      <a class="navbar-brand" href="{!! url('/') !!}">
        <img src="{!! fw_setting('logo') !!}" class="img-fluid" alt="logo">
      </a>
      <button class="navbar-toggler" type="button" >
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
    </div>
    <div class="" id="navbarNav">
        <ul class="navbar-nav container">
          @if($menu = fw_menu('main'))
            @foreach($menu->subMenus as $item)
              <li class="nav-item">
                <a class="nav-link" href="{!! $item->url !!}">{!! ucwords($item->title) !!}</a>
              </li>
            @endforeach
          @endif
        </ul>
      </div>
  </div>
</nav>
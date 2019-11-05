<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="{{ url('/') }}">{{ fw_setting('title') }}</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
            @if(fw_menu('main'))
                @foreach(fw_menu('main')->subMenus as $menu)
                    <li class="nav-item"><a href="{{ url($menu->url) }}">{{ $menu->title }}</a></li>
                @endforeach
            @endif
        </ul>
    </div>
</nav>

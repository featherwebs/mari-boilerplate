<!DOCTYPE html>
<html lang="{!! app()->getLocale() !!}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <meta name="title" content="{!! fw_meta_title($post ?? $page ?? false) !!}">
    <meta name="description" content="{!! fw_meta_desc($post ?? $page ?? false) !!}">
    <meta name="keywords" content="{!! fw_meta_keywords($post ?? $page ?? false) !!}">

    <meta property="og:title" content="{!! fw_meta_title($post ?? $page ?? false) !!}">
    <meta property="og:description" content="{!! fw_meta_desc($post ?? $page ?? false) !!}">
    <meta property="og:image" content="{!! fw_meta_image($post ?? $page ?? false) !!}">
    <meta property="og:url" content="{!! request()->url() !!}">
    <meta property="og:site_name" content="{!! fw_setting('title') !!}">

    <meta name="twitter:title" content="{!! fw_meta_title($post ?? $page ?? false) !!}">
    <meta name="twitter:description" content="{!! fw_meta_desc($post ?? $page ?? false) !!}">
    <meta name="twitter:image" content="{!! fw_meta_image($post ?? $page ?? false) !!}">
    <meta name="twitter:card" content="summary_large_image">

<!-- CSRF Token -->
    <meta name="csrf-token" content="{!! csrf_token() !!}">

    <title>{!! config('app.name', 'Laravel') !!}</title>

    <!-- Bootstrap -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap-reboot.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.css" />
    <link href="https://fonts.googleapis.com/css?family=Merriweather" rel="stylesheet">
    <link rel="stylesheet" href="{!! asset('css/main_stylesheet.css') !!}" />
    <!-- Styles -->

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
    @stack('styles')
    <script src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js"></script>
</head>
<body>
@include('partials.navbar')
@yield('content')
<!-- Scripts -->
@include('layouts.footer')
<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
<script src="https://code.jquery.com/jquery-3.3.1.js"></script>
<!-- Include all compiled plugins (below), or include individual files as needed -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/js/bootstrap.bundle.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/smooth-scroll/15.1.0/smooth-scroll.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.touchswipe/1.6.19/jquery.touchSwipe.min.js"></script>
<script src="{!! asset('js/draggabilly.pkgd.min.js') !!}"></script>
<script src="{!! asset('js/elastiStack.js') !!}"></script>
<script src="{!! asset('js/custom.js') !!}"></script>
@stack('scripts')
</body>
</html>

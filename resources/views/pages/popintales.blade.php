@extends('layouts.app')

@section('content')
  <section class="popintales__banner">
    <div class="container">
      <header>
        <h1>{!! $page->getCustom('quote') !!}</h1>
        <h5 class="p--author">{!! $page->getCustom('quoted_by') !!}</h5>
      </header>
      <div class="popintales__social">
        <a href="#">
          <img src="{!! asset('images/facebook.svg') !!}" alt="facebook">
        </a>
        <a href="#">
          <img src="{!! asset('images/twitter.svg') !!}" alt="tweeter">
        </a>
      </div>
    </div>
  </section>
  <section class="popintales__blog">
    <div class="container">
      <header>
        <h1>{!! $page->title !!} <span class="subheader--color">{!! $page->sub_title !!}</span></h1>
      </header>
      <div class="row">
        <div class="col-xl-5 order-xl-2">
          <figure>
            <img src="{!! fw_thumbnail($page, 403) !!}" alt="{!! $page->title !!}">
          </figure>
        </div>
        <div class="col-xl-7 order-xl-1">
          {!! $page->content !!}
        </div>
      </div>
    </div>
  </section>
  <section class="contact__form--wrapper" id="contact__us">
    <div class="container">
      <div class="row">
        <div class="col-xl-6">
          <header>
            <h1>Get in touch</h1>
            <h5>I’M ALWAYS THRILLED TO HEAR FROM YOU</h5>
          </header>
          @include('partials.alerts')
          <form class="styled--form-wrapper" action="{{ route('contact') }}" method="POST">
            {{ csrf_field() }}
            <div class="input-wrapper">
              <input class="input" placeholder="Full Name" type="text" name="name">
              <span class="underline"></span>
            </div>
            <div class="input-wrapper">
              <input class="input" placeholder="Email" type="email" name="email">
              <span class="underline"></span>
            </div>
            <div class="input-wrapper">
              <textarea class="input" placeholder="We love hearing from you - type your message here" type="text" name="message"></textarea>
              <span class="underline"></span>
            </div>
            <button type="submit" class="btn" name="button">SEND</button>
            <div class="form-check">
              <input type="checkbox" class="form-check-input" id="subscription" name="subscribe">
              <label class="form-check-label" for="subscription">Yes, I’d like to receive emails from Popintales</label>
            </div>
            <div class="subsciption__note">
              <h5>Can we email you?</h5>
              <p>
                will use the information you provide on this form to stay in touch, send you updates, and send marketing emails about our products and services. You can unsubscribe at any time through a link in the footer of an email from us. For more information, please read our Privacy Policy
              </p>
            </div>
          </form>
        </div>
        <div class="col-xl-6 d-none d-xl-block">
          <figure class="contact__image">
            <img src="{!! fw_thumbnail($page, 380, null, 'contact') !!}" alt="contact image">
          </figure>
        </div>
      </div>
    </div>
  </section>
@stop
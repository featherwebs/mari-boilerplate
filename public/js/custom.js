$(document).ready(function(){
  'use strict';

   var c, currentScrollTop = 0,
       navbar = $('nav');

   $(window).scroll(function () {
      var a = $(window).scrollTop();
      var b = navbar.height();

      currentScrollTop = a;

      if (c < currentScrollTop && a > b + b) {
        navbar.addClass("scrollUp");
        navbar.addClass("boxShadow");
      } else if (c > currentScrollTop && !(a <= b)) {
        navbar.removeClass("scrollUp");
      }else if (currentScrollTop) {
        navbar.removeClass("boxShadow");
      }

      c = currentScrollTop;

  });

  function navigation(){

    $('nav').on('click','.navbar-toggler', function(){
      $(this).closest('nav').find('#navbarNav').toggleClass('open-nav');
      $(this).toggleClass('x');
      $('html, body').toggleClass('hide-overflow');
    });

    $('nav').on('click','.nav-item', function(){
      $(this).closest('.navbar-nav').find('.active').removeClass('active');
      $(this).addClass('active');
    });

    $('nav').on('click','.nav-item', function(){
      var ashes=$('.nav_main--wrapper').find('.open-nav');
      if(ashes.length>0){
        $( ".navbar-toggler" ).trigger( "click" );
      }
    });

    window.addEventListener('resize', function () {
      var docSize=$(document).width();
      if(docSize>991){
        $('nav').find('#navbarNav').removeClass('open-nav');
        $('nav').find('.navbar-toggler').removeClass('x');
        $('body').removeClass('hide-overflow');
      }
    });
  }
  function s_slider() {
    $('.fresh__sterilizer').slick({
      dots: false,
      arrows:false,
      infinite: true,
      speed: 300,
      centerMode: true,
      variableWidth: true,
      swipeToSlide:true,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            dots:true
          }
        }

      ]
    });
    $('.insta--carousal').slick({
      arrows:false,
      dots: true,
      slidesPerRow: 3,
      rows: 2,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesPerRow: 2,
            rows: 2,
          }
        },
        {
          breakpoint: 530,
          settings: {
            slidesPerRow: 1,
            rows: 1,

          }
        }
      ]
    });

    $(".bs--wrapper").slick({
     dots: false,
     arrows:false,
     infinite: true,
     slidesToShow: 3,
     autoplay: false,
     autoplaySpeed:5000,
     variableWidth: true,
     responsive:[
       {
         breakpoint: 768,
         settings: {
        slidesToShow: 2

         }
       },
       {
         breakpoint: 413,
         settings: {
           slidesToShow: 1

         }
       }

     ]
    });
  }
  function floatingMargin(){
    $(".imageleft--wrapper, .imageright--wrapper, .coverimage").prev().css({"margin-bottom": "40px"});
  }
  navigation();
  s_slider();
  floatingMargin();
});

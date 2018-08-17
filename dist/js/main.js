/**
 * Global variabless
 */
"use strict";

var userAgent = navigator.userAgent.toLowerCase(),
  initialDate = new Date(),
  $html = $('html'),
  isIE = userAgent.indexOf("msie") != -1 ? parseInt(userAgent.split("msie")[1]) : userAgent.indexOf("trident") != -1 ? 11 : userAgent.indexOf("edge") != -1 ? 12 : false,
  isDesktop = $html.hasClass('desktop'),
  isIEBrows = navigator.appVersion.indexOf("MSIE") != -1 || navigator.appVersion.indexOf('Trident/') > 0,
  isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
  isTouch = "ontouchstart" in window,
  $document = $(document),
  plugins = {
    pointerEvents: isIE && isIE < 11 ? 'js/pointer-events.min.js' : false,
    navbar: $('.rd-navbar'),
    customWaypoints: $('[data-custom-scroll-to]'),
    googleMap: $('#google-map'),


  },
  i = 0;
/**
 * Initialize All Scripts
 */

$(function () {
  if (isIE) {

    if (isIE < 10) {
      $html.addClass("lt-ie-10");
    }

    if (isIE < 11) {
      if (plugins.pointerEvents) {
        $.getScript(plugins.pointerEvents)
          .done(function () {
            $html.addClass("ie-10");
            PointerEventsPolyfill.initialize({});
          });
      }
    }

    if (isIE === 11) {
      $("html").addClass("ie-11");
    }

    if (isIE === 12) {
      $("html").addClass("ie-edge");
    }
  }

  /**
   * @module       UIToTop
   * @author       Matt Varone
   * @see          http://www.mattvarone.com/web-design/uitotop-jquery-plugin/
   * @license      MIT License
   */
  if (isDesktop) {
    $().UItoTop({
      easingType: 'easeOutQuart',
      containerClass: 'ui-to-top fa fa-angle-up'
    });
  }
  /*wow js*/
  if (isDesktop && $html.hasClass("wow-animation") && $(".wow").length) {
    new WOW().init();
  }

  /*rd-navbar*/
  if (plugins.navbar.length) {
    plugins.navbar.RDNavbar({
      stickUpClone: false,
      stickUpOffset: 30
    });
  }

  /**
   * Custom Waypoints
   */
  if (plugins.customWaypoints.length) {
    var i;
    for (i = 0; i < plugins.customWaypoints.length; i++) {
      var $this = $(plugins.customWaypoints[i]);

      $this.on('click', function (e) {
        e.preventDefault();
        $("body, html").stop().animate({
          scrollTop: $("#" + $(this).attr('data-custom-scroll-to')).offset().top
        }, 1000, function () {
          $(window).trigger("resize");
        });
      });
    }
  }

  var swiperAnimation = new SwiperAnimation();
  var mySwiper = new Swiper('.swiper-slider', {
    //loop: true,
    speed: 600,
    effect: 'fade',
    /*autoplay: {
      delay: 6000,
    },*/
    on: {
      init: function () {
        swiperAnimation.init(this).animate();
      },
      slideChange: function () {
        swiperAnimation.init(this).animate();
      }
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });



  if (plugins.googleMap.length) {
    plugins.googleMap.googleMap({
      styles: [{
        "featureType": "landscape",
        "stylers": [{"hue": "#FFBB00"}, {"saturation": 43.400000000000006}, {"lightness": 37.599999999999994}, {"gamma": 1}]
      }, {
        "featureType": "road.highway",
        "stylers": [{"hue": "#FFC200"}, {"saturation": -61.8}, {"lightness": 45.599999999999994}, {"gamma": 1}]
      }, {
        "featureType": "road.arterial",
        "stylers": [{"hue": "#FF0300"}, {"saturation": -100}, {"lightness": 51.19999999999999}, {"gamma": 1}]
      }, {
        "featureType": "road.local",
        "stylers": [{"hue": "#FF0300"}, {"saturation": -100}, {"lightness": 52}, {"gamma": 1}]
      }, {
        "featureType": "water",
        "stylers": [{"hue": "#0078FF"}, {"saturation": -13.200000000000003}, {"lightness": 2.4000000000000057}, {"gamma": 1}]
      }, {
        "featureType": "poi",
        "stylers": [{"hue": "#00FF6A"}, {"saturation": -1.0989010989011234}, {"lightness": 11.200000000000017}, {"gamma": 1}]
      }]
    });
  }

  /**
   * year copyright
   */
  var now = new Date();
  var getYear = now.getFullYear();
  var elCopyrightYear = document.getElementById('copyright-year');
  if (elCopyrightYear) {
    elCopyrightYear.innerHTML = getYear;
  }

})

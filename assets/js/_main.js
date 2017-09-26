/* ==========================================================================
   jQuery plugin settings and other scripts
   ========================================================================== */

$(document).ready(function(){

  // Sticky footer
  var bumpIt = function() {
      $('body').css('margin-bottom', $('.page__footer').outerHeight(true));
    },
    didResize = false;

  bumpIt();

  $(window).resize(function() {
    didResize = true;
  });
  setInterval(function() {
    if(didResize) {
      didResize = false;
      bumpIt();
    }
  }, 250);

  // FitVids init
  $("#main").fitVids();

  // Follow menu drop down
  $(".author__urls-wrapper button").on("click", function() {
    $(".author__urls").toggleClass("is--visible");
    $(".author__urls-wrapper button").toggleClass("open");
  });

  // init smooth scroll
  $("a").smoothScroll({offset: -20});

  // add lightbox class to all image links
  $("a[href$='.jpg'],a[href$='.jpeg'],a[href$='.JPG'],a[href$='.png'],a[href$='.gif']").addClass("image-popup");

  // Magnific-Popup options
  $(".image-popup").magnificPopup({
    // disableOn: function() {
    //   if( $(window).width() < 500 ) {
    //     return false;
    //   }
    //   return true;
    // },
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">Image #%curr%</a> could not be loaded.',
    },
    removalDelay: 500, // Delay in milliseconds before popup is removed
    // Class that is added to body when popup is open.
    // make it unique to apply your CSS animations just to this exact popup
    mainClass: 'mfp-zoom-in',
    callbacks: {
      beforeOpen: function() {
        // just a hack that adds mfp-anim class to markup
        this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
      }
    },
    closeOnContentClick: true,
    midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
  });

  if((window.location.href.indexOf("/he_IL/") > -1) || (window.location.href.indexOf("/ar_SA/") > -1)) {
    $("body").css("direction", "rtl");

    $("nav.greedy-nav .nav-selector").css("left", "2.5rem");
    $("nav.greedy-nav .lang-selector").css("left", ".2rem");
    
    $("nav.greedy-nav .links-menu").css("right", "auto");
    $("nav.greedy-nav .lang-menu").css("right", "auto");

    $("nav.greedy-nav .links-menu").css("left", "2.5rem");
    $("nav.greedy-nav .lang-menu").css("left", ".2rem");

    $("nav.greedy-nav .visible-links").css("padding-right", "0");
    $("nav.greedy-nav .visible-links").css("padding-left", "2rem");

    $("nav.greedy-nav .visible-links li:first-child a").css("margin-right", "0");
    $("nav.greedy-nav .visible-links li:first-child a").css("margin-left", "1rem");

    $("nav.greedy-nav .visible-links li:first-child").css("padding-right", "0");
    $("nav.greedy-nav .visible-links li:first-child").css("padding-left", "2em");

    $("nav.greedy-nav .visible-links li:last-child a").css("margin-right", "1rem");
    $("nav.greedy-nav .visible-links li:last-child a").css("margin-left", "0");

    // for some reason js cannot directly modify :before and :after pseudo-elements' css
    $('nav.greedy-nav').prepend('<style>.hidden-links:before{right:inherit !important;}</style>');
    $('nav.greedy-nav').prepend('<style>.hidden-links:before{left:5px !important;}</style>');

    $('nav.greedy-nav').prepend('<style>.hidden-links:after{right:inherit !important;}</style>');
    $('nav.greedy-nav').prepend('<style>.hidden-links:after{left:5px !important;}</style>');
  }

  var sidebar_shown = true;
  var sidebar_hidden_pages = ["a9lh-to-b9s", "credits", "donations", "f3-(linux)", "f3x-(mac)",  
                              "faq", "file-extensions-(windows)", "get-started", "h2testw-(windows)", 
                              "region-changing", "site-navigation", "uninstall-cfw", "updating-b9s", "why-ads"];
  
  for(var i = 0; i < sidebar_hidden_pages.length; i++){
    if(window.location.href.indexOf(sidebar_hidden_pages[i]) > -1) {
      sidebar_shown = false;
    }
  }

  var devices = {
    "get-started-(old-3ds)": "0",
    "get-started-(new-3ds)": "1",
  };

  var methods = {
    "installing-boot9strap-(2xrsa)": "0",
    "installing-boot9strap-(mset)": "1",
    "installing-boot9strap-(browser)": "2",
    "homebrew-launcher-(soundhax)": "3",
    "installing-boot9strap-(dsiware)": "4",
    "ntr-and-cubic-ninja": "5",
    "ntrboot": "6",
    "installing-boot9strap-(hardmod)": "7",
  };

  for(var device in devices){
    if(window.location.href.indexOf(device) > -1) {
      localStorage.setItem('device', devices[device]);
    }
  }

  for(var method in methods){
    if(window.location.href.indexOf(method) > -1) {
      localStorage.setItem('method', methods[method]);
    }
  }

  var device, method;
  if(!((device = localStorage.getItem('device')) && (method = localStorage.getItem('method')))){
    sidebar_shown = false;
  }

  if(sidebar_shown){
    var ol = $('.sidebar.sticky .nav__list .nav__items ol');

    ol.append("<li><a href='/'>Home</a></li>");
    
    if(device == "0"){
      ol.append("<li><a href='get-started-(old-3ds)'>Get Started (Old 3DS)</a></li>");
      switch (method){
        case "0":
          ol.append("<li><a href='installing-boot9strap-(2xrsa)'>Installing boot9strap (2xrsa)</a></li>");
          ol.append("<li><a href='finalizing-setup'>Finalizing Setup");
          break;
        case "1":
          break;
        case "2":
          break;
        case "3":
          ol.append("<li><a href='installing-boot9strap-(homebrew-launcher)'>Installing boot9strap (Homebrew Launcher)</a></li>");
          ol.append("<li><a href='finalizing-setup'>Finalizing Setup");
          break;
        case "4":
          break;
        case "5":
          break;
        case "6":
          break;
        case "7":
          break;
      }
    } else if(device == "1") {
      ol.append("<li><a href='get-started-(new-3ds)'>Get Started (New 3DS)</a></li>");
      switch (method){
        case "0":
          ol.append("<li><a href='installing-boot9strap-(2xrsa)'>Installing boot9strap (2xrsa)</a></li>");
          ol.append("<li><a href='godmode9-usage#restoring-a-nand-backup'>NAND Restore</a></li>");
          ol.append("<li><a href='finalizing-setup'>Finalizing Setup");
          break;
        case "1":
          break;
        case "2":
          break;
        case "3":
          ol.append("<li><a href='installing-boot9strap-(homebrew-launcher)'>Installing boot9strap (Homebrew Launcher)</a></li>");
          ol.append("<li><a href='finalizing-setup'>Finalizing Setup");
          break;
        case "4":
          break;
        case "5":
          break;
        case "6":
          break;
        case "7":
          break;
      }
    }

    $('.sidebar.sticky').css("display", "inherit");
  }
  

});

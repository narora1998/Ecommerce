var prevScrollpos = document.documentElement.scrollTop;
window.onscroll = function() {
var currentScrollPos = document.documentElement.scrollTop;
  if (prevScrollpos > currentScrollPos) {
    $("body").removeClass("nav-bar");
	  prevScrollpos = currentScrollPos + 1;
  } else {
    $("body").addClass("nav-bar");
	  prevScrollpos = currentScrollPos;
  }
  
}

$('.home-spotlights').slick({
  dots: true,
   arrows: false,
  infinite: true,
    speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
});
$('.gallery-main').slick({
  dots: false,
   arrows: true,
  infinite: false,
    speed: 400,
  slidesToShow: 2,
  slidesToScroll: 1,
   responsive: [
    {
      breakpoint: 620,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
});



$('#nav-icon3').click(function(){
		$(this).toggleClass('open');
		$(".nav-mob").toggleClass('open');
	});
$('.first-nav li > a').click(function(){
	$(this).toggleClass('active');
	$(this).next('.first-nav').slideToggle();
	});
$('.second-nav li > a').click(function(){
	$(this).toggleClass('active');
	$(this).next('.sub-link').slideToggle();
	});
//$('footer .foot-box .f-heading').click(function(){
//	$(this).toggleClass('active');
//	$(this).next('ul').slideToggle();
//	});

$('.search.icn-sprite a').click(function(){
	$('.searchBox').fadeToggle();
});

$('.searchClose').click(function(){
	$('.searchBox').fadeOut();
});

/***************** About div replacements ************/
var winWidth = $(window).width();
function mymenu()
{ 
if(winWidth<959){
	$( ".spotlight-image" ).insertAfter( $( ".spotlight-content" ) );
}
else
{
	$( ".spotlight-image" ).insertBefore( $( ".spotlight-content" ) );
}
}
mymenu();
$( window ).resize(function() {
	winWidth=$(window).width();
	mymenu();	
});
/***************** End About div replacements ************/
if(winWidth<959){
$('.aw-Tab ul').slick({
  dots: false,
   arrows: true,
  infinite: false,
    speed: 400,
	slide: 'li',
  slidesToShow: 3,
  slidesToScroll: 1,
});
}
function tab(obj){
	for(i=0;i<=$(".tabber ul li").length;i++){
	$(".tabContent:eq("+i+")").hide();	
	$(".tabber ul li:eq("+i+") a").removeClass("actv");	
	}
	$(".tabContent:eq("+obj+")").show();	
	$(".tabber ul li:eq("+obj+") a").addClass("actv");	
}

$('.news-updates').slick({
  dots: true,
   arrows: false,
  infinite: true,
    speed: 400,
  slidesToShow: 4,
  slidesToScroll: 4,
	responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
});


$('.news-updates').slick({
  dots: true,
   arrows: false,
  infinite: true,
    speed: 400,
  slidesToShow: 4,
  slidesToScroll: 4,
	responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
});


//$('.read-btn a').click(function(){
//	$(".nice").niceScroll({touchbehavior:false,autohidemode:false,cursorborder:"", background:"#908f8f",cursorcolor:"#fff",cursorwidth:"4px"});
//	$(".nice").getNiceScroll().resize();
//	$('.director-desc').toggleClass('fullContent');
//	$(this).text('Read Less');
//});

$(".director-desc").mCustomScrollbar();

$('.read-btn a').click(function() {
  $(this).parent().siblings().find(".hide-desc").css("display","block");
  if ($(this).text() == "Read More") {
    $(this).text("Read Less")
	$(this).parent().parent().addClass('active'); 
  } else {
    $(this).text("Read More")
	$(this).parent().siblings().find(".hide-desc").css("display","none");
	$(this).parent().parent().removeClass('active');
  }
});

$('.yearTab').click(function(){
	$('.filter').toggleClass('yearsBar');
	$('.filter').removeClass('mnthBar');
	$('.yearTab').addClass('actTab');
	$('.mnthTab').removeClass('actTab');
	$('.slick-slider').slick('refresh');
});

$('.mnthTab').click(function(){
	$('.filter').toggleClass('mnthBar');
	$('.filter').removeClass('yearsBar');
	$('.yearTab').removeClass('actTab');
	$('.mnthTab').addClass('actTab');
	$('.slick-slider').slick('refresh');
});


$('.yearFil').slick({
  dots: false,
   arrows: false,
  infinite: false,
  speed: 400,
  slidesToShow: 8,
  slidesToScroll: 1,
responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 6,
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 4,
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
      }
    }
  ]
});

$('.yearmnth').slick({
  dots: false,
   arrows: false,
  infinite: false,
  speed: 400,
  slidesToShow: 12,
	responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 8,
        slidesToScroll: 4,
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 3
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1
      }
    }
  ]
});
$('.latest-news').slick({
  dots: false,
   arrows: true,
  infinite: false,
  speed: 400,
  slidesToShow: 4,
	slidesToScroll: 1,
	responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      }
    }
  ]
});
$('.filterBy input').each(function(){
	if($(this).is(':checked')) {
$(this).parent().addClass( "flt" );
}
});
	
$(".filterBy input").change(function(){
	$(this).parent().toggleClass( "flt" );
});


$(".filters-left .filterBy .flt-type").click(function() {
    1 != $(this).hasClass("active") ? ($(this).parent().parent().find(".filters:visible").slideUp(), $(this).next(".filters").slideDown(), $(".filters-left .filterBy .flt-type").removeClass("active"), $(this).addClass("active")) : ($(".filters-left .filterBy .flt-type").removeClass("active"), $(this).next(".filters").slideUp())
});	

$(".productListing .productBox").mouseenter(function(){
  $(this).find(".proThumbs").slick({dots: true, arrows: false,infinite: true, speed: 600, slidesToShow: 1, slidesToScroll: 1,autoplay: true,autoplaySpeed: 600,lazyLoad: 'ondemand',ease : 'Pow4.easeIn', pauseOnHover:false,
});
});
$(".productListing .productBox").mouseleave(function(){
  $(this).find(".proThumbs").slick('unslick');
});

$('.sort a').click(function(){
	$('.filters-left').fadeOut();
	$('.sorting').fadeToggle();
});
$('.filtr a').click(function(){
	$('.sorting').fadeOut();
	$('.filters-left').fadeToggle();
});
$('.close a').click(function(){
	$('.sorting, .filters-left').fadeOut();
});

$(window).on('scroll', function() {
  $(".mile-stone").each(function() {
    if (isScrolledIntoView($(this))) {
      $(this).addClass("show");
	  $(this).css({"opacity": "1"});
    }
     else{
	  $(this).removeClass("show");	 
}
  });
});

function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top-200;
    var elemBottom = elemTop + $(elem).height()+200;

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

$('#horizontalTab').easyResponsiveTabs({
type: 'default', //Types: default, vertical, accordion           
width: 'auto', //auto or any width like 600px
fit: true,   // 100% fit in a container
closed: 'accordion', // Start closed if in accordion view
activate: function(event) { // Callback function if tab is switched
var $tab = $(this);
var $info = $('#tabInfo');
var $name = $('span', $info);
$name.text($tab.text());
$info.show();
}
});
$('#verticalTab').easyResponsiveTabs({
type: 'vertical',
width: 'auto',
fit: true
});

$('.pr-thumbs').slick({
  dots: false,
   arrows: true,
  infinite: false,
  speed: 400,
  slidesToShow: 4,
  slidesToScroll: 1,
	vertical:true,
	verticalSwiping:true,
	asNavFor: '.pr-Big',
	focusOnSelect: true
});
$('.pr-Big').slick({
  dots: false,
   arrows: false,
	swipe:false,
  infinite: false,
  speed: 400,
  slidesToShow: 1,
  slidesToScroll: 1,
	asNavFor: '.pr-thumbs',
});



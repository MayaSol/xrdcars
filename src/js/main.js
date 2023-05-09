const Choices = require('choices.js');
const closest = require('closest');
const makeEllipsis = require('./utils/ellipsis.js');
const autosize = require('autosize');
var throttle = require('lodash.throttle');
import 'lazysizes';

jQuery(function ($) {
    'use strict';

    const svg4everybody = require('svg4everybody');

	svg4everybody();
	
	// Header Sticky
	$(window).on('scroll',function() {
		if ($(this).scrollTop() > 120){  
			$('.navbar-area').addClass("is-sticky");
		}
		else{
			$('.navbar-area').removeClass("is-sticky");
		}
	});

	// Mean Menu
	jQuery('.mean-menu').meanmenu({
		meanScreenWidth: "1199",
		meanExpand: "<span class='bx bx-chevron-down'></span>",
		meanContract: "<span class='bx bx-chevron-down'></span>"
	});
	
	// Others Option For Responsive JS
	$(".others-option-for-responsive .dot-menu").on("click", function(){
		$(".others-option-for-responsive .container .container").toggleClass("active");
	});

	// Button Hover JS
	$('.default-btn, .optional-btn')
	.on('mouseenter', function(e) {
		var parentOffset = $(this).offset(),
		relX = e.pageX - parentOffset.left,
		relY = e.pageY - parentOffset.top;
		$(this).find('span').css({top:relY, left:relX})
	})
	.on('mouseout', function(e) {
		var parentOffset = $(this).offset(),
		relX = e.pageX - parentOffset.left,
		relY = e.pageY - parentOffset.top;
		$(this).find('span').css({top:relY, left:relX})
	});

	// Home Slides
	// $('.home-slides').owlCarousel({
	// 	loop: true,
	// 	nav: false,
	// 	dots: true,
	// 	autoplayHoverPause: false,
	// 	items: 1,
	// 	animateOut: 'fadeOut',
	// 	animateIn: 'fadeIn',
	// 	smartSpeed: 100,
	// 	autoplay: false,
	// });

	var regionChooseSlider = $('.choose-item__inner');
	if (regionChooseSlider.length > 0) {
		//Region Page Choose Slides
		var prevClientWidth = 1000;
		setUpOwlCarousel(regionChooseSlider, {})();
		// if (document.documentElement.clientWidth < 768) {
		// 	regionChooseSlider.addClass('owl-carousel');
		// 	regionChooseSlider.addClass('owl-theme');

		// 	regionChooseSlider.owlCarousel({
		// 		loop: true,
		// 		nav: true,
		// 		dots: false,
		// 		autoplayHoverPause: true,
		// 		items: 1,
		// 		autoplay: false,
		// 		navText: [
		// 			"<i class='flaticon-left-arrow'></i>",
		// 			"<i class='flaticon-right-arrow'></i>"
		// 		],
		// 	});
		// } else {
		// 	regionChooseSlider.removeClass('owl-carousel');
		// 	regionChooseSlider.removeClass('owl-theme');
		// }
	}

	function setUpOwlCarousel(owlElement, config) {
		return function() {
			if (document.documentElement.clientWidth < 768 && prevClientWidth >= 768) {
				console.log('1');
				owlElement.addClass('owl-carousel');
				owlElement.addClass('owl-theme');
				owlElement.owlCarousel({
					loop: true,
					nav: true,
					dots: false,
					autoplayHoverPause: true,
					items: 1,
					autoplay: false,
					navText: [
						"<i class='flaticon-left-arrow'></i>",
						"<i class='flaticon-right-arrow'></i>"
					],
				});
			}
			else if (document.documentElement.clientWidth >= 768 && prevClientWidth < 768)
			{
				console.log('2');
				owlElement.removeClass('owl-carousel owl-theme owl-loaded');
				owlElement.owlCarousel('destroy'); 
			    owlElement.find('.owl-stage-outer').children().unwrap();
			    owlElement.removeData();
			}
			prevClientWidth = document.documentElement.clientWidth;
		}
	}

	window.addEventListener('resize', throttle(setUpOwlCarousel(regionChooseSlider, {})));
	
	// // Models Slides
	$('.models-slides').owlCarousel({
		loop: true,
		nav: false,
		dots: true,
		autoplayHoverPause: true,
		items: 1,
		animateOut: 'fadeOut',
		animateIn: 'fadeIn',
		smartSpeed: 200,
		autoplay: true,
	});
	
	// Testimonials Slides
	$('.testimonials-slides').owlCarousel({
		loop: true,
		nav: true,
		dots: false,
		autoplayHoverPause: true,
		autoplay: true,
		mouseDrag: true,
		animateOut: 'fadeOut',
		animateIn: 'fadeIn',
		margin: 0,
		items: 1,
		navText: [
			"<i class='flaticon-left-arrow'></i>",
			"<i class='flaticon-right-arrow'></i>"
		],
	});

	// Partner Slides
	$('.partner-slides').owlCarousel({
		loop: true,
		nav: true,
		dots: false,
		smartSpeed: 500,
		margin: 30,
		autoplayHoverPause: true,
		autoplay: true,
		navText: [
			"<i class='flaticon-left-arrow'></i>",
			"<i class='flaticon-right-arrow'></i>"
		],
		responsive: {
			0: {
				items: 2
			},
			576: {
				items: 2
			},
			768: {
				items: 3
			},
			1024: {
				items: 4
			},
			1200: {
				items: 5
			}
		}
	});

	// Listing Slides
	// $('.listing-slides').owlCarousel({
	// 	loop: true,
	// 	nav: true,
	// 	dots: false,
	// 	autoplayHoverPause: true,
	// 	items: 1,
	// 	margin: 5,
	// 	smartSpeed: 200,
	// 	autoplay: true,
	// 	navText: [
	// 		"<i class='flaticon-left-arrow'></i>",
	// 		"<i class='flaticon-right-arrow'></i>"
	// 	],
	// });
	
	// Popup Video
	$('.popup-youtube').magnificPopup({
		disableOn: 320,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false
	});

	// Наш блог 
	//!!! makeEllipsis('.blog-desc.ellipsis');

	makeEllipsis('.compare-card__desc-inner.ellipsis');

	//Преимущества
	 if (document.querySelector('.advantages__info-wrapper') && document.documentElement.clientWidth >= 768 && document.documentElement.clientWidth <=991) {
	    var floatBlock = new StickySidebar('.advantages__info-wrapper', {
	      containerSelector: '.advantages__aside',
	      innerWrapperSelector: '.advantages__info',
	      resizeSensor: true,
	      topSpacing: 60,
	    //   bottomSpacing: 20
	    }); 
  	}

  	//Регион фильтр на мобиле
  	$('[data-open="#filter-aside"]').on('click', function(event) {
        var collapseSelector = $(this).data('open');
        var collapseElement = $(collapseSelector);
        var collpaseInstance = bootstrap.Collapse.getOrCreateInstance(collapseElement);

        if (!collapseElement.hasClass('show')) {
            collpaseInstance.show();
        }
        else {
            collpaseInstance.hide();
        }
    });


	// Subscribe form
	// $(".newsletter-form").validator().on("submit", function (event) {
	// 	if (event.isDefaultPrevented()) {
	// 		formErrorSub();
	// 		submitMSGSub(false, "Please enter your email correctly.");
	// 	} 
	// 	else {
	// 		event.preventDefault();
	// 	}
	// });
	// function callbackFunction (resp) {
	// 	if (resp.result === "success") {
	// 		formSuccessSub();
	// 	}
	// 	else {
	// 		formErrorSub();
	// 	}
	// }
	// function formSuccessSub(){
	// 	$(".newsletter-form")[0].reset();
	// 	submitMSGSub(true, "Thank you for subscribing!");
	// 	setTimeout(function() {
	// 		$("#validator-newsletter").addClass('hide');
	// 	}, 4000)
	// }
	// function formErrorSub(){
	// 	$(".newsletter-form").addClass("animated shake");
	// 	setTimeout(function() {
	// 		$(".newsletter-form").removeClass("animated shake");
	// 	}, 1000)
	// }
	// function submitMSGSub(valid, msg){
	// 	if(valid){
	// 		var msgClasses = "validation-success";
	// 	} 
	// 	else {
	// 		var msgClasses = "validation-danger";
	// 	}
	// 	$("#validator-newsletter").removeClass().addClass(msgClasses).text(msg);
	// }

	// AJAX MailChimp
	// $(".newsletter-form").ajaxChimp({
	// 	url: "https://envytheme.us20.list-manage.com/subscribe/post?u=60e1ffe2e8a68ce1204cd39a5&amp;id=42d6d188d9", 
	// 	callback: callbackFunction
	// });

	// // Tabs
	$('.tab ul.tabs').addClass('active').find('> li:eq(0)').addClass('current');
	$('.tab ul.tabs li a').on('click', function (g) {
		var tab = $(this).closest('.tab'), 
		index = $(this).closest('li').index();
		tab.find('ul.tabs > li').removeClass('current');
		$(this).closest('li').addClass('current');
		tab.find('.tab_content').find('div.tabs_item').not('div.tabs_item:eq(' + index + ')').slideUp();
		tab.find('.tab_content').find('div.tabs_item:eq(' + index + ')').slideDown();
		g.preventDefault();
	});

	// Nice Select JS
	$('select.nice-select').niceSelect();

	//Choices.js
	const choices = [];
	const choiceElements = document.querySelectorAll('.js-choice');
	for (let element of choiceElements) {
		let id = element.id ? element.id : '';
	  	let choiceObj = {};
	  	choiceObj.id = id;
	  	choiceObj.choice = new Choices(element, {
	  		searchEnabled: false,
            shouldSort: false,
	  	});
	  	choices.push(choiceObj);
	}

	
	// // Odometer JS
	// $('.odometer').appear(function(e) {
	// 	var odo = $(".odometer");
	// 	odo.each(function() {
	// 		var countNumber = $(this).attr("data-count");
	// 		$(this).html(countNumber);
	// 	});
	// });

	// FAQ Accordion
	// $('.accordion').find('.accordion-title').on('click', function(){
	// 	// Adds Active Class
	// 	$(this).toggleClass('active');
	// 	// Expand or Collapse This Panel
	// 	$(this).next().slideToggle('fast');
	// 	// Hide The Other Panels
	// 	$('.accordion-content').not($(this).next()).slideUp('fast');
	// 	// Removes Active Class From Other Titles
	// 	$('.accordion-title').not($(this)).removeClass('active');		
	// });

	// Range Slider
	// $( "#range-slider" ).slider({
	// 	range: true,
	// 	min: 0,
	// 	max: 100000,
	// 	values: [0, 100000],
	// 	slide: function( event, ui ) {
	// 		$( "#price-amount" ).val( "$" + ui.values[ 0 ] + "-$" + ui.values[ 1 ] );
	// 	}
	// });
	// $( "#price-amount" ).val( "$" + $( "#range-slider" ).slider( "values", 0 ) +
	// " - $" + $( "#range-slider" ).slider( "values", 1 ) );  

	// Count Time 
	// function makeTimer() {
	// 	var endTime = new Date("September 13, 2022 18:00:00 PDT");			
	// 	var endTime = (Date.parse(endTime)) / 1000;
	// 	var now = new Date();
	// 	var now = (Date.parse(now) / 1000);
	// 	var timeLeft = endTime - now;
	// 	var days = Math.floor(timeLeft / 86400); 
	// 	var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
	// 	var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600 )) / 60);
	// 	var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));
	// 	if (hours < "10") { hours = "0" + hours; }
	// 	if (minutes < "10") { minutes = "0" + minutes; }
	// 	if (seconds < "10") { seconds = "0" + seconds; }
	// 	$("#days").html(days + "<span>Days</span>");
	// 	$("#hours").html(hours + "<span>Hours</span>");
	// 	$("#minutes").html(minutes + "<span>Minutes</span>");
	// 	$("#seconds").html(seconds + "<span>Seconds</span>");
	// }
	// setInterval(function() { makeTimer(); }, 0);
	
	// Products Details Image Slides
	// $('.car-details-main').slick({
	// 	slidesToShow: 1,
	// 	slidesToScroll: 1,
	// 	arrows: false,
	// 	autoplay: true,
	// 	fade: true,
	// 	asNavFor: '.car-details-preview',
	// });
	// $('.car-details-preview').slick({
	// 	slidesToShow: 5,
	// 	slidesToScroll: 1,
	// 	asNavFor: '.car-details-main',
	// 	dots: false,
	// 	centerMode: false,
	// 	focusOnSelect: true,
	// 	arrows: true,
	// 	autoplay: true,
	// });
	
	// Input Plus & Minus Number JS
	// $('.input-counter').each(function() {
	// 	var spinner = jQuery(this),
	// 	input = spinner.find('input[type="text"]'),
	// 	btnUp = spinner.find('.plus-btn'),
	// 	btnDown = spinner.find('.minus-btn'),
	// 	min = input.attr('min'),
	// 	max = input.attr('max');
		
	// 	btnUp.on('click', function() {
	// 		var oldValue = parseFloat(input.val());
	// 		if (oldValue >= max) {
	// 			var newVal = oldValue;
	// 		} else {
	// 			var newVal = oldValue + 1;
	// 		}
	// 		spinner.find("input").val(newVal);
	// 		spinner.find("input").trigger("change");
	// 	});
	// 	btnDown.on('click', function() {
	// 		var oldValue = parseFloat(input.val());
	// 		if (oldValue <= min) {
	// 			var newVal = oldValue;
	// 		} else {
	// 			var newVal = oldValue - 1;
	// 		}
	// 		spinner.find("input").val(newVal);
	// 		spinner.find("input").trigger("change");
	// 	});
	// });
	
	// Go to Top
	$(window).on('scroll', function(){
		var scrolled = $(window).scrollTop();
		if (scrolled > 600) $('.go-top').addClass('active');
		if (scrolled < 600) $('.go-top').removeClass('active');
	});  
	$('.go-top').on('click', function() {
		$("html, body").animate({ scrollTop: "0" },  500);
	});

	autosize(document.querySelectorAll('textarea'));
	
	// WOW JS
	// $(window).on ('load', function (){
	// 	if ($(".wow").length) { 
	// 		var wow = new WOW({
	// 		boxClass:     'wow',      // animated element css class (default is wow)
	// 		animateClass: 'animated', // animation css class (default is animated)
	// 		offset:       20,          // distance to the element when triggering the animation (default is 0)
	// 		mobile:       true, // trigger animations on mobile devices (default is true)
	// 		live:         true,       // act on asynchronously loaded content (default is true)
	// 		});
	// 		wow.init();
	// 	}
	// });

	// Buy Now Btn
	// $('body').append("<a href='https://themeforest.net/checkout/from_item/29758982?license=regular&support=bundle_6month&_ga=2.241839045.634514020.1646539215-1425290503.1590986634' target='_blank' class='buy-now-btn'>Купить</a>");

	// Switch Btn
	// $('body').append("<div class='switch-box'><label id='switch' class='switch'><input type='checkbox' onchange='toggleTheme()' id='slider'><span class='slider round'></span></label></div>");

}(jQuery));

// // function to set a given theme/color-scheme
// function setTheme(themeName) {
//     localStorage.setItem('mund_theme', themeName);
//     document.documentElement.className = themeName;
// }
// // function to toggle between light and dark theme
// function toggleTheme() {
//     if (localStorage.getItem('mund_theme') === 'theme-dark') {
//         setTheme('theme-light');
//     } else {
//         setTheme('theme-dark');
//     }
// }
// // Immediately invoked function to set the theme on initial load
// (function () {
//     if (localStorage.getItem('mund_theme') === 'theme-dark') {
//         setTheme('theme-dark');
//         document.getElementById('slider').checked = false;
//     } else {
//         setTheme('theme-light');
//       document.getElementById('slider').checked = true;
//     }
// })();
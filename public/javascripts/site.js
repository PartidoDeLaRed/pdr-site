$(function(){


	// $('.splash .').css('top', );

	$('a[href*="#"]').click(function(event){
		//prevent the default action for the click event
		event.preventDefault();
 
		//get the full url - like mysitecom/index.htm#home
		var full_url = this.href;
 
		//split the url by # and get the anchor target name - home in mysitecom/index.htm#home
		var parts = full_url.split("#");
		var trgt = parts[1];
 
		//get the top offset of the target anchor
		var target_offset = $("#"+trgt).offset();
		var target_top = target_offset.top;

		$('.navbar li').removeClass('active');

		$(this).addClass('active').parent().addClass('active');
 
		//goto that anchor by setting the body scroll top to anchor top
		$('html, body').animate({scrollTop:target_top}, 500);
	});


	$('section.section.splash .section-content').animate({opacity: 1}, 3000);


	var new_height = $(window).height();

	$('section.section.splash').delay(300).animate({height: new_height}, 1000, function(){
		$('.navbar').scrollspy();
	});

	$(window).resize(function() {

		var new_height = $(window).height();

		$('section.section.splash').animate({height: new_height}, 10);
	});

	// $(window).scroll(function() {
	// 	if ($(window).scrollTop() >= 1700) {
	// 		$('.point-1').animate({opacity: 1, top: 0}, 1000);
	// 		$('.point-2').animate({opacity: 1, top: 0}, 1500);
	// 		$('.point-3').animate({opacity: 1, top: 0}, 2000);
	// 		$('.point-4').animate({opacity: 1, top: 0}, 2500);
	// 	}
	// });

	$('.dot').popover({trigger: 'hover'})

	$('.dot').hover(function(){
		$(this).children('.mapMarkGlow').hide();
	});

});




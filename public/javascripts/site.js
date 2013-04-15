$(function(){

	$('.members a').popover({
		trigger: 'hover',
		placement: function (tip, element) {
			var offset = $(element).offset()
				, width = $(document).outerWidth()
				, horiz = 0.5 * width - offset.left
				, horizPlacement = horiz > 0 ? 'right' : 'left'
			return horizPlacement;
		}
	});


	$('#subForm').submit(function (e) {
    e.preventDefault();
    $.getJSON(
    this.action + "?callback=?",
    $(this).serialize(),
    function (data) {
      if (data.Status === 400) {
          alert("Error: " + data.Message);
      } else { // 200

        $('#myModal').html('<h3 class="thanks-message">Gracias por sumarte, pronto recibiras noticias de nosotros!</h3>').delay(2000);

        setTimeout(function(){ $('#myModal').modal('hide'); }, 4000);
      }
    });
  });

	$('.videos-section .modal').bind('hide', function () {
		var iframe = $(this).children('div.modal-body').find('iframe');
		var src = iframe.attr('src').replace("?rel=0&autoplay=1", '');
		// alert($(this).children('div.modal-body').html());
		iframe.attr('src', '');
		iframe.attr('src', src);
	});

	$('.videos-section .modal').bind('show', function () {
		var iframe = $(this).children('div.modal-body').find('iframe');
		var src = iframe.attr('src');
		// alert($(this).children('div.modal-body').html());
		iframe.attr('src', '');
		iframe.attr('src', src + '?rel=0&autoplay=1');
	});


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

	$('.dot').popover({trigger: 'hover'})

	$('.dot').hover(function(){
		$(this).children('.mapMarkGlow').hide();
	});


	$('.members a').popover({trigger: 'hover'})

	$('.popover-ajax').each(function(index){

    var el=$(this);

    $.get(el.attr('data-load'),function(d){
        el.popover({content: d});       
    });     

});

});




$(document).ready(function() {
	// Back to top
		$("#toTop").hide();
	    $(function () {
	        $(window).scroll(function () {
	            if ($(this).scrollTop() > 1) {
	                $('#toTop').fadeIn();
	            } else {
	                $('#toTop').fadeOut();
	            }
	        });
			$('#toTop').click(function () {
	            $('body,html').stop(true,true).animate({
	                scrollTop: 0
	            }, 500);
	            return false;
	        });
	    });
});
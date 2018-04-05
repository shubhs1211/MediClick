$(function() {

  /* Jquery for Doctor images slideshow */
	var slideshow_image_count = $('.banner-images-wrapper .doc-images-slideshow img').length;
	if( slideshow_image_count && slideshow_image_count > 1) {
    $('.banner-images-wrapper .doc-images-slideshow').cycle({
      //fx:     'fade',
      speed:    300,
      fit:1,
      height: 355,
      timeout: 4000,
      pager:  '.nav',
      pagerAnchorBuilder: function(idx, slide) {
        return '.nav li:eq(' + idx + ') a';
      }
    });

    // Pause slideshow on mouseover
    $('.banner-images-wrapper .doc-images-slideshow').hover(function() {
      $('.banner-images-wrapper .doc-images-slideshow').cycle('pause');
      },
      function() {
        $('.banner-images-wrapper .doc-images-slideshow').cycle('resume');
    });
  };

	$(".appointment-info .hospital-address-wrapper").click(function() {

		//if has class then remove it and hide info
		//used when clicked twice
		if ($(this).parents('.view-row').hasClass('opened')) {
			$(this).parents('.view-row').removeClass('opened');
			$(this).parents('.view-row').children('.hidden-location-wrapper').slideUp('slow');
		}
		else {
			//remove all the opened class used when
			//one div open still click on second div
			$(this).parents('.appointment-info').children('.view-row').each(function(){
				if ($(this).hasClass('opened')) {
					$(this).removeClass('opened');
					$(this).children('.hidden-location-wrapper').slideUp('slow');
				}
			});
			//show second divs
			$(this).parents('.view-row').addClass('opened');
			$(this).parents('.view-row').children('.hidden-location-wrapper').slideDown('slow');

			var curr_map_id = $(this).attr('data-map-id');
			generate_map($('#' + curr_map_id));
		}

	});


	// open ailment popup on select
	$(".ailment-link").click(function() {
		var url = $(this).attr('data-url');
		$("#ailment-popup-iframe").attr('src', url);

		var select_list_options = $(this).attr('data-options').split(',');


		var select_list_html = '<select name="lang" id="ailment-lang-select-list">';
		$(select_list_options).each(function(key, value) {
			select_list_html = select_list_html + '<option value="' + value + '">' + value.toUpperCase() + '</option>';
		});
		select_list_html = select_list_html + '</select>';
		$("#ailment-dialog-select").html(select_list_html);
		$("#ailment-popup-box").dialog({
			width: 1020,
			height: 950,
			modal: true,
			dialogClass: 'ailment-dialog-popup',
			close: function () {
				$("#ailment-popup-iframe").attr('src', "about:blank");
				//reset curr lang
				$("#ailment-popup-iframe").attr('data-curr-lang', 'english');

			}
		});


		//change iframe content depend on lang selected
		$('#ailment-lang-select-list').change(function() {
			//get the curr url
			var curr_url = $("#ailment-popup-iframe").attr('src');
			var curr_lang = $("#ailment-popup-iframe").attr('data-curr-lang');
			var selected_lang =  $(this).val();

			$("#ailment-popup-iframe").attr('src', curr_url.replace(curr_lang, selected_lang));
			$("#ailment-popup-iframe").attr('data-curr-lang', selected_lang);
		});
	});




	//about me more link
	$('.morelink').click(function() {
		$(this).parents('.text-with-show-more').children('.less-text').hide();
		$(this).parents('.text-with-show-more').children('.more-text').show();
	});

	$('.lesslink').click(function() {
		$(this).parents('.text-with-show-more').children('.more-text').hide();
		$(this).parents('.text-with-show-more').children('.less-text').show();
	});

	$(window).bind("load", function() {
		/* Appointment Information (Hospital Date Table) */
		$('.appointment-info .view-row ').each(function(){
			var height = $(this).find('.hospital-address-wrapper').outerHeight();
			var top = $(this).find('.hospital-address-wrapper').outerHeight() - 2;
			$(this).find('.hospital-time-table').height(height);
			$(this).find('.hospital-timing').css('top', top);

			$(this).find('.block-inner div.hospital-date-table').each(function(){
				$(this).find('td.active').each(function(){
					$(this).prev('td.active').addClass('border-right');
				});
			});
		});
	});

	$('.show-more-data').click(function() {
		var more_data_id = $(this).attr('data-id');
		var wrapper_class = $(this).attr('data-wrapper-class');
		$('#'+more_data_id).slideDown();
		$('.'+wrapper_class + ' .show-more-data').fadeOut();
	});

	$('.hide-more-data').click(function() {
		var hide_data_id = $(this).attr('data-id');
		var wrapper_class = $(this).attr('data-wrapper-class');
		$('#'+hide_data_id).slideUp("slow");
		$('.'+wrapper_class + ' .show-more-data').fadeIn();
	});

	$(".fancybox-thumb").fancybox({
		prevEffect	: 'none',
		nextEffect	: 'none',
		helpers	: {
			title	: {
				type: 'outside'
			},
			media : {},
			thumbs	: {
				width	: 50,
				height	: 50
			}
		}
	});
	// for SPECIALISATION 
	var headerHeight = $('.header-wrapper').outerHeight();
	var specialisationHeight = 400 - headerHeight;
	console.log(headerHeight);
	$('.menu-wrapper .specialization-wrapper .specialization-block').css('min-height', specialisationHeight);
});

function generate_map(map_item) {
	if (!map_item.length) {
		return false;
	}
  var flag = false;
  if (!map_item.hasClass('processed')) {
    map_item.addClass('processed');
    flag = true;
  }

  if (flag) {

    var curr_map_id = map_item.attr('id');
    var latitude = map_item.attr('data-map-latitude');
    var longitude = map_item.attr('data-map-longitude');
    var address = map_item.attr('data-map-address');
    //reset all the params
    map_item.attr('data-map-latitude', '');
    map_item.attr('data-map-longitude', '');
    map_item.attr('data-map-address', '');

    var pos = new google.maps.LatLng(latitude, longitude);

    var mapOptions = {
      zoom: 17,
      center: pos,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    
    var map = new google.maps.Map(document.getElementById(curr_map_id), mapOptions);
    map.setCenter(pos);
    
    var marker = new google.maps.Marker({
      position: pos,
      draggable:false,
      map: map
    });
    
    var infowindow = new google.maps.InfoWindow({
     content: address,
     maxWidth: 200
     });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map,marker);
    });
     
    google.maps.event.addListenerOnce(map, 'idle', function(){
      google.maps.event.trigger(map, 'resize');
      map.setCenter(pos);
    });
  }
}

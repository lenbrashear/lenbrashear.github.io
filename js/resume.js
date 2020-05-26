/* 
Resume.js:
  - Using Flickr's REST API, dymanically restrieves a list the last 100 flickr images in my feed
  - Randomly display the results as background images
  - Stores the photo list and images to reduce api calls
  - preloads images for smoother animations/transitions
*/

		var publicPhotoData; /* stores image list */
		var MyInt; /* stores interval */
		var apiKey = "78445fa40757fe6a4d5c5acdb517a8f6"; // replace this with your API key
		var url_to_a_photo_head = "https://api.flickr.com/services/rest?method=flickr.photos.getSizes&api_key="+apiKey+"&photo_id=";
		var url_to_a_photo_tail = "&format=json&jsoncallback=?";

//gets last 100 public images from flickr
//easily could feed in image limit
function getPicture(the_user_id, your_div_selector){

		// get an array of random photos
		$.getJSON(
			"https://api.flickr.com/services/rest/",
			{
				method: 'flickr.people.getPublicPhotos',
				api_key: apiKey,
				user_id: the_user_id,
				format: 'json',
				nojsoncallback: 1,
				per_page: 100// you can increase this to get a bigger array, this is the max api calls per page load
			},
			function(data){
				// if everything went good
				if(data.stat == 'ok'){
					//store data to eliminate api calls
					publicPhotoData=data;
					clearInterval(MyInt);
					MyInt=setInterval("loadRandomImage('127768800@N08','.site-wrapper-overlay')", 8000);
				}
				else{
					console.log(" The request to get the array was not good :( ");
				}
			}
		
		);
        
	}

	function loadRandomImage(the_user_id, your_div_selector)
	{
					var photoId = publicPhotoData.photos.photo[ Math.floor( Math.random() * publicPhotoData.photos.photo.length ) ];
					if($('#'+photoId["id"]+'').length>0){
						var the_url=$('#'+photoId["id"]+'').attr('src');
						//check if image already loaded, if so animate and load
						$(your_div_selector).fadeOut( 400, function() {
							// Animation complete.
							$(your_div_selector).css('background-image', "url('" + the_url + "')");
							 }).promise().done(function(){
							$(your_div_selector).fadeIn(400);
						});
					}
					
					else{
						
						//  call the flickr API and get the picture with a nice size, 
						$.getJSON(
							"https://api.flickr.com/services/rest/",
							{
								method: 'flickr.photos.getSizes',
								api_key: apiKey,							
								photo_id: photoId["id"],
								format: 'json',
								nojsoncallback: 1
							},
							function(response){
								if(response.stat == 'ok'){
									var the_url = response.sizes.size[response.sizes.size.length-2].source;														
									$.when( preloadImages(the_url, photoId["id"]) ).done(function() {
										//check if image is loaded
										//while(!IsImageOk( $('#'+photoId["id"]+'') )){
										//	setTimeout(function(){ console.log(" Waiting on image to download :\ "); },2000);
										//}
										//console.log(" Waiting on image to download :\ ");
									    $("#"+photoId["id"]+"").on('load',function(){
											$(your_div_selector).fadeOut( 400, function() {
												// Animation complete.
												$(your_div_selector).css('background-image', "url('" + the_url + "')");
											  }).promise().done(function(){
											   $(your_div_selector).fadeIn(400);
											   clearInterval(MyInt);
											   MyInt=setInterval("loadRandomImage('127768800@N08','.site-wrapper-overlay')", 8000);
											   //console.log(" 8 secs started :\ ");
											});
										});	
										
									});
									
								}
								else{
									console.log(" The request to get the picture was not good :\ ")
								}
							}
						);
						}
	}

	function preloadImages(arg, phid){
		//add image to preloaddiv, use flickr id
		$('#preloaddiv').prepend("<img id='"+phid+"' src='"+arg+"' />");

	  }
	function IsImageOk(img) {	
	// During the onload event, IE correctly identifies any images that
		// weren’t downloaded as not complete. Others should too. Gecko-based
		// browsers act like NS4 in that they report this incorrectly.
		if (!img.complete) {
			return false;
		}
	
		// However, they do have two very useful properties: naturalWidth and
		// naturalHeight. These give the true size of the image. If it failed
		// to load, either of these should be zero.
	
		if (typeof img.naturalWidth !== "undefined" && img.naturalWidth === 0) {
			return false;
		}
	
		// No other way of checking: assume it’s ok.
		return true;
	}
	//Driver
	//one call to get image list
	getPicture('127768800@N08','.site-wrapper-overlay');
    //start loading images set interval to download, store, and display random images, now inside getPicture
    
	function toggleDivs(divid){	
		if($('#'+divid+'').is(":visible")){$('#'+divid+'').fadeOut( 'slow');}
		
		else{
			//toggle buttons
			$('#educationDiv').fadeOut( 'slow', function(){
				$('#experienceDiv').fadeOut( 'slow', function(){
					$('#contactDiv').fadeOut( 'slow', function(){
						$('#'+divid+'').fadeToggle( 'fast');
				})})});
		}
	}
<script>


! function() {
 
$(document).ready(function(){
	console.log("setting close iframe")
	$(document).on('click',"#return-to-record",function(){
		$("#iframeOverlay").slideUp(1000,function(){
			$("#externalsite-iframe").hide();
		});
	});

   
	// add the item to the comparanda list
	$(document).on('click',"#add-item",function(){
		
		// add the thumb to the thumb strip
		var thumb_display_sel = "#iframe-thumb"
		var thumb = $("#add-item").data('eu_item').thumb;
		$(thumb_display_sel).append('<img src="'+thumb+'"/>');
		// add data to savable data list
		// TODO -- this should be saved to localstore NOT to DOM. 
		//     --   in  a k/v that saves info for each url. 
		// use the thumb url as the key
		
		var items = $(document).data('eu-items');
		items[thumb] = $("#add-item").data('eu_item');

		// save it to localstorage as well 
		var storage=$.localStorage;
		// init if not yet
		// TODO do this in a real init
		if (! storage.isSet('eu_items'))
			storage.set('eu_items','{}');
		
//		var eu_items_ls = JSON.parse(storage.get('eu_items'));
//		eu_items_ls[thumb] = items[thumb] = $("#add-item").data('eu_item');
//		storage.set('eu_items',JSON.stringify(eu_items_ls));
		
		// NOTE: very important -- these need to be grouped with the comparand !!!
		// add to comparanda strip
		var thumbs = $("#comparanda-thumbs").data('thumbs');
		if (thumbs === undefined) {
			thumbs = {};
		}
		if (! thumbs[thumb]) {
			$("#comparanda-thumbs").append('<img src="'+thumb+'"/>');
			thumbs[thumb] = "";
			$("#comparanda-thumbs").data('thumbs',thumbs);
		}
		
	}
	  	)
})
}()
</script>

<div id="iframeOverlay">

		<iframe id="externalsite-iframe" src=""> </iframe>
		<div id="iframeOverlay-infostrip">
			<div id="iframe-info">
			Ure<br/>Record<br/>Info
			</div>
			<div id="iframe-accnum">
				${accnum}
			</div>
			<div id="iframe-short-title">
				${short_title}
			</div>
			<div id="iframe-date">
				${date }&nbsp;
			</div>
			<div id="iframe-thumb">
				<img src="${thumbnail}"></img>&nbsp;
			</div>
			<button id="return-to-record" data-placement="top" data-toggle="tooltip" title="close" class="btn btn-info btn-large glyphicon glyphicon-remove-sign">
			</button>
			<button id="add-item" data-placement="top" data-toggle="tooltip" title="add to comparanda" class="btn btn-info btn-large glyphicon glyphicon-plus">
			</button>
		</div>

</div>

<!--  thumbnail2 ${bla} -->
<style>
#iframeOverlay {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 5000;
	background: black;
	display: none; 
	height: 190vh 
	min-width: 100%;
}

#iframe-info {
font-weight: bold;
color: red;
background: #555;
width: 5% !important;
}

#iframeOverlay img {
height: 40px;

}
#iframeOverlay-infostrip {
	 color: #FFFFCC;
	 margin-top: 53%;
	 font-size: 14px;
	 
}
#iframeOverlay-infostrip button {
display: inline;
vertical-align: center;
postion: relative;
top: -20px;

}
#iframeOverlay-infostrip>div {
	display: inline-block;
	background: #333;
	margin-right: 10px;
	padding: 3px 15px 3px 15px;
	overflow: hidden;
	border-radius: 3px 3px 3px 3px;
	width: 20%;
	
	min-height: 60px;
}

#iframeOverlay-infostrip>div>a {
	display: inline;
}



#iframeOverlay-wrapper {
	
}

#externalsite-iframe {
	min-width: 100%;
	min-height: 90%;
	position: fixed;
}

 /* Tooltip */
  #iframeOverlay-infostrip  .tooltip > .tooltip-inner {
      background-color: #cc6633; 
      color: #FFFFFF; 
      border: 1px solid #cc6630; 
      padding: 15px;
      font-size: 20px;
  }
  /* Tooltip on top */
  #iframeOverlay-infostrip  .tooltip.top > .tooltip-arrow {
      border-top: 15px solid #cc6633;
  }
  /* Tooltip on bottom */
  #iframeOverlay-infostrip  .tooltip.bottom > .tooltip-arrow {
      border-bottom: 5px solid #cc6633;
  }
  /* Tooltip on left */
  #iframeOverlay-infostrip  .tooltip.left > .tooltip-arrow {
      border-left: 5px solid #cc6633;
  }
  /* Tooltip on right */
  #iframeOverlay-infostrip  .tooltip.right > .tooltip-arrow {
      border-right: 5px solid #cc6633;
  }
</style>
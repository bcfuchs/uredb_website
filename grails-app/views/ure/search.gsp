<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
        "http://www.w3.org/TR/1999/REC-html401-19991224/loose.dtd">
<html>
<head>
<title>Ure Museum Database</title>
<meta name="layout" content="ure/main" />     
<script src="${resource(dir:'js/vendor/freewall',file:'freewall.js')}"></script>
<script src="${resource(dir:'js',file:'home_image_grid.js')}"></script>
<script src="${resource(dir:'js',file:'thumb_to_rec.js')}"></script>
<script>
$(document).ready(function(){
  // make search tab active
  $("#navbar-search").addClass("navbar-item-active");
  
  $("#left-nav").removeClass("col-md-2").hide();;
  $("#main").removeClass("col-md-10").addClass("col-md-12");
  
  
var doMap = function() {

  	$("#thumbmap").delay(10000).show();

	$("#thumb-data area").click(function(e){
		e.preventDefault();
		var html = $(this).attr('href');
		var url = "/record/" + ure_thumb_to_rec[html]
		console.log(url);
		window.location = url
  
})
}

  $( "#thumb-data" ).load( "${resource(dir:'html',file:'thumb_image_map.html')}",doMap );
// get an index jpg -> record
// make the search bar draggable
var draggableSearchbar = function() {
    $("#searchbar_container").mouseenter(function(){
      	$("#searchbar_container").prepend('<div id="sc-overlay">&nbps;</div>');
      });
    $("#searchbar_container").click(function(){
      $("#sc-overlay").remove();
    });
    $("#searchbar_container").mouseup(function(){
      $("#sc-overlay").remove();
      });
    
    $("#searchbar_container").draggable();
}
draggableSearchbar();
  
});

</script>
<style>
#sc-overlay {
position:absolute;
    z-index:3000;
    height: 100%;
    width: 100%;
}

#searchbar_container input{
    position:relative;
    z-index:1;
}


#main {
/**
	background-image: url(http://uredb.reading.ac.uk/ure/pixdir/thumbs_new_small.jpg);
	background-size: cover;
*/
	min-height: 1200px !important;
	padding: 0;
	margin: 0;
	overflow: hidden;

}

.cell {
	background-size: cover;
	border: 2px solid gray;
	background-position: 50% 50%;
	background-repeat: no-repeat;
	color: #000;
}

#big-grid {
	margin-top: 20px;
}

.image-infobox {
	background: black;
	color: white;
	opacity: 0.6;
	padding-left: 30px;
}

.image-infobox div {
	line-height: normal;
	padding-bottom: 10px;
}

.image-infobox  .short_title {
	font-style: italic;
	font-weight: bold;
}

.hide-infodiv {
	display: none;
}

.image-infobox .desc {
	line-height: 10px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

#thumbmap {
	position: absolute;
	top: -5px;
	left: -30px;
	z-index: 100;
	display:none;
}
#left_nav {
display:none;

}
</style>
</head>
<body>
<div id="thumb-data" style="display:none;"></div>
	<img id="thumbmap" usemap="#thumbs_new2" src="http://uredb.reading.ac.uk/ure/pixdir/thumbs_fit.jpg" style="border: 0;" alt="Image map" />
	<div id="home2">
		<content tag="header"> </content>
		<div id="infobox-store" style="display: none;">
			<div class="image-infobox hide-infodiv">
				<div class="name">
					<a href=""></a>
				</div>
				<div class="short_title"></div>
				<div class="date"></div>
				<div class="caption"></div>
			</div>
		</div>
		<!-- 
		<h3><span id="gridOptions">Ure</span> Museum Database</h3>
		 -->
		<div class="container">
			<div class="row">
				<div id="left-content" class="col-md-10">
				<style>
				.stylish-input-group {
				 
				 
				}
				#searchableForm {
				
				height: 60px;
				width: 600px;
			
				}
				#searchbar_container {
				position: relative;
				top: 250px;
				z-index: 2000;
				}
				</style>
					<g:render template="/taglibTemplates/searchbar2"/>
					<div id="big-grid0"></div>
					<div id="mobile-grid0"></div>
				</div>
				<div class="col-md-2"></div>
			</div>
		</div>
	</div>

</body>
</html>
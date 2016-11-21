<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
        "http://www.w3.org/TR/1999/REC-html401-19991224/loose.dtd">
<html>
<head>
<title>Ure Museum Database</title>
<meta name="layout" content="ure/main" />
<script src="${resource(dir:'js/vendor/freewall',file:'freewall.js')}"></script>
<script src="${resource(dir:'js',file:'home_image_grid.js')}"></script>
<script src="${resource(dir:'js',file:'thumb_to_rec.js')}"></script>
<script src="${resource(dir:'js',file:'home2.js')}"></script>
<link rel="stylesheet" href="${resource(dir:'css/ure',file:'home2.css')}" />
</head>
<body>
	
	<div id="thumb-data" style="display: none;"></div>
	<img id="thumbmap" usemap="#thumbs_new2" src="http://uredb.reading.ac.uk/ure/pixdir/thumbs_fit.jpg" style="border: 0;"
		alt="Image map" />
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
		<div class="container">
			<div class="row">
				<div id="left-content" class="col-md-10">
					<g:render template="/taglibTemplates/searchbar2" />
					<div id="big-grid0"></div>
					<div id="mobile-grid0"></div>
				</div>
				<div class="col-md-2"></div>
			</div>
		</div>
	</div>
</body>
</html>
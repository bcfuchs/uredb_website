<!DOCTYPE html>
<html>
<!-- quickstart2.tmpl -->
<head>
<title>Ure Museum | Collection</title>
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
<!-- 
                         .-.                                       
  _     .-.                 /|/|                                    
 '     (  ).--..-.         /   | )  (   .    .-.  )  ( .  .-. .-.   
  /     )/   ./.-'_       /    |(    ) / \ ./.-'_(    ) )/   )   )  
 (     //    (__.'   .-' /     | `--':/ ._)(__.'  `--':'/   /   (   
  `._.'             (__.'      `.    /                           `-

...
 -->
 <script src="//cdn.polyfill.io/v2/polyfill.min.js"></script>
<script src="//code.jquery.com/jquery-1.11.3.js"></script>
<script src="//code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
<script src="//cdn.bootcss.com/camanjs/4.1.2/caman.full.js"></script>


<g:layoutHead />
<!--  hack until we can figure out why this isnt working with resources plugin -->
<script src="${resource(dir:'js/vendor/jquery',file:'jquery.storageapi.js')}"></script>
<script src="${resource(dir:'js/vendor/filesaverjs',file:'FileSaver.js')}"></script>
<script src="${resource(dir:'js',file:'lighttable.js')}"></script>
<!-- Le HTML5 shim, for IE6-8 support of HTML elements -->
<!--[if lt IE 9]>
		<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
<link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet">
<link href="//maxcdn.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css" rel="stylesheet">
<link rel="shortcut icon" href="/favicon.ico?v=2" type="image/x-icon" />
<link rel="stylesheet" href="${resource(dir:'css/ure',file:'earth.old.css')}" />
<link rel="stylesheet" href="${resource(dir:'css/ure',file:'quickstart2.css')}" />
<r:layoutResources />

</head>
<body onload="${pageProperty(name:'body.onload')}">
	<sec:ifLoggedIn>
	<g:render template="/shared/ure/topnav"></g:render>
	</sec:ifLoggedIn>
	<div id="wrapper">
		<div id="horiz">
			<div id="skipnav">
				<a href="http://www.rdg.ac.uk">
					<img src="${resource(dir:'assets',file:'web-black.gif')}" alt="[ University Home Page ]" style="float: left; margin: 0 0 0 0; border: 0;">
				</a>
				<a href="http://www.rdg.ac.uk/Ure/index.php">
					<img src="${resource(dir:'images',file:'urelogo1.gif')}" alt="[ Ure Museum Home Page ]" style="float: right; margin: 0 0 0 0; border: 0;">
				</a>
				<br style="clear: both;">
				<a name="top"></a>
				<a href="#main" class="skip">[ Skip main navigation menu ]</a>
			</div>
			<div id="top2_nav">
				<h1>Ure Museum Database</h1>
			</div>
			<!-- Start of Breadcrumbs -->
			<div id="breadcrumb-nav" class="ure-nav newpage-breadcrumb">
			<div class="nav-item-left">
		
				<div id="breadcrumb-items-left" class="nav-item"></div>
				<div class="nav-links np2-navlinks">
					<div class="nav-item">
						<a id="navbar-home" href="/">Home</a>
					</div>
										<div class="nav-item">
						<a id="navbar-search" href="/search">Search</a>
					</div>
					<div class="nav-item">
						<a id="navbar-browse" href="/fieldlist">Browse</a>
					</div>
					<div class="nav-item">
						<a href="http://www.reading.ac.uk/Ure/collection/index.php">About</a>
					</div>
					<div class="nav-item">
						<a id="navbar-permissions" href="/permissions">Permissions</a>
					</div>
					<div class="nav-item">
						<a id="navbar-urehome" href="http://www.reading.ac.uk/Ure/index.php">Ure Museum Home</a>
					</div>
				</div>
				</div>
			</div>
			<!-- End of Breadcrumbs -->
		</div>
		<div id="blocky" class="container">
			<div class="row">
				<div id="left_nav" class="col-md-2">
					<div class="left_nav1" id="left-nav-search" style="display: none;">
						<form action="/searchable" method="get" id="searchableForm" name="searchableForm">
							<input type="text" name="q" value="" size="50" id="q" />
							<input type="hidden" name="max" value="100" id="max" />
							<input type="hidden" name="suggestQuery" value="true" id="suggestQuery" />
							<input type="submit" value="Search" />
						</form>
					</div>
					<div class="left_nav1">
						<a class="left1" href="http://www.rdg.ac.uk/Ure/">Ure Museum Home</a>
					</div>
					<div class="left_nav1">
						<a class="left1" href="/">Database Home</a>
					</div>
					<div class="left_nav1">
						<a class="left1" href="/">Database Search</a>
					</div>
					<div class="left_nav1">
							Browse
							<div class="left_nav2">
								<a class="left1" href="/fieldlist">Records</a>
							</div>
							<div class="left_nav2">
								<a class="left1" href="/imagelist">Images</a>
							</div>
					</div>
					<div id="comparanda" class="left_nav1" data-placement="top" data-toggle="tooltip" title="drag europeana images here to add to comparanda" >
						Your comparanda
						<div id="comparanda-thumbs"></div>
						<div class="left_nav2 lighttable-controls2">
							<span id="view-comps" data-toggle="tooltip" title="I do nothing!" class="ure-control-btn glyphicon glyphicon-eye-open"></span>
							<span id="clear-comps" data-toggle="tooltip" title="clear" class="ure-control-btn glyphicon glyphicon-remove-circle"></span>	
							<span id="load-comps" data-toggle="tooltip" title="load" class="ure-control-btn glyphicon glyphicon-upload"></span>
							<span id="save-comps" data-toggle="tooltip" title="download" class="ure-control-btn glyphicon glyphicon-download-alt"></span>
							<span id="save-comps-as-html" data-toggle="tooltip" title="download as html" class="ure-control-btn glyphicon glyphicon-file"></span>
						     	<input style="display: none" type="file" id="lt-file" name="lt-file" />
							</div>
					</div>
					<div id="lighttable-links" 
						class="left_nav1"
						data-placement="top" data-toggle="tooltip" title="drag object images here to add to lighttable">
							Lighttable
							<div id="lighttable-thumbs"></div>
						<!-- 
							<div class="left_nav2">
								<span class="lt-control left1 ure-control-btn" id="view-lighttable">View Lighttable</span>
								<br>
							</div>
							
							<div class="left_nav2 ure-control-btn">
								<span class="lt-control" id="clear-lighttable"> Clear Lighttable </span>
							</div>
							<div class="left_nav2 ure-control-btn">
								<span class="lt-control" id="save-lighttable"> Save Lighttable </span>
							</div>
							<div class="left_nav2 ure-control-btn">
								<span class="lt-control" id="load-lighttable"> Load Lighttable </span>
								<input style="display: none" type="file" id="lt-file" name="lt-file" />
							</div>
							<div class="left_nav2 ure-control-btn">
								<span class="lt-control" id="save-lighttable-as-html"> Save as html</span>
							</div>
						-->
							<div class="left_nav2 lighttable-controls2">
							<span id="view-lighttable" data-toggle="tooltip" title="view" class="ure-control-btn glyphicon glyphicon-eye-open"></span>
							<span id="clear-lighttable" data-toggle="tooltip" title="clear" class="ure-control-btn glyphicon glyphicon-remove-circle"></span>	
							<span id="load-lighttable" data-toggle="tooltip" title="load" class="ure-control-btn glyphicon glyphicon-upload"></span>
							<span id="save-lighttable" data-toggle="tooltip" title="download" class="ure-control-btn glyphicon glyphicon-download-alt"></span>
							<span id="save-lighttable-as-html" data-toggle="tooltip" title="download as html" class="ure-control-btn glyphicon glyphicon-file"></span>
						     	<input style="display: none" type="file" id="lt-file" name="lt-file" />
							</div>
							
							<style>
							.lighttable-controls > div {
							display:inline;
							
							}
							
							.lighttable-controls span {
							margin-left: 3px;	
							}
							</style>
						</div>
					</div>
					<!--END OF NAVIGATION MENU -->
					<div id="main" class="col-md-10">
						<g:layoutBody />
					</div>
				</div>
			</div>
			<div id="banner"></div>
			<div id="uor">
				The Ure Museum is part of<br>The University of Reading, Whiteknights, PO Box 217, Reading, RG6 6AH
			</div>
		</div>
		<g:render template="/ure/lighttable_widget"></g:render>
		<r:layoutResources />
		<script>
// enable tooltips
		! function() {
		  $(document).ready(function(){
			$('[data-toggle="tooltip"]').tooltip();
		  });
		}();
	</script>
</body>
</html>

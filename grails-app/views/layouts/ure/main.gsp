
<!DOCTYPE html>
<html>
<!-- main.tmpl -->
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


 -->
<script src="//cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.en"></script>
<script src="//code.jquery.com/jquery-1.11.3.js"></script>
<script src="//code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
<script src="//cdn.bootcss.com/camanjs/4.1.2/caman.full.js"></script>

<g:layoutHead />

<!--  hack until we can figure out why this isnt working with resources plugin -->
<script src="${resource(dir:'js/vendor/jquery',file:'jquery.storageapi.js')}"></script>
<script src="${resource(dir:'js/vendor/filesaverjs',file:'FileSaver.js')}"></script>
<script src="${resource(dir:'js',file:'lighttable.js')}"></script>
<script src="${resource(dir:'js',file:'messages.js')}"></script>
<!-- Le HTML5 shim, for IE6-8 support of HTML elements -->
<!--[if lt IE 9]>
		<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->

<link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet">
<link href="//maxcdn.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css" rel="stylesheet">
<link rel="shortcut icon" href="/favicon.ico?v=2" type="image/x-icon" />
<link rel="stylesheet" href="${resource(dir:'css/ure',file:'earth.old.css')}" />
<link rel="stylesheet" href="${resource(dir:'css/ure',file:'main.css')}" />
<r:layoutResources />


</head>
<body onload="${pageProperty(name:'body.onload')}">
	<sec:ifLoggedIn>
		<g:render template="/shared/ure/topnav"></g:render>
	</sec:ifLoggedIn>
	<div id="wrapper">
		<g:render template="/ure/horiz"></g:render>
		
		<div id="blocky" class="container">
			<div class="row">
				<div id="left_nav" class="col-md-2">
					<g:render template="/ure/left_nav"></g:render>
				</div>
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
	<!-- 
	DBO
<%
    
 flash.lastURI = request.forwardURI 
 flash.lastQuerystring =  request.getQueryString();
println flash.lastURI
 %>
 -->
 <div class="alert" role="alert" id="alert-modal" style="display:none"> 

	    <button type="button" class="close" id="alert-modal-close" aria-label="Close">
		<span aria-hidden="true">&times;</span></button>
	    <div class="alert-body"></div>
</div>	
</body>
</html>

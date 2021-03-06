<!DOCTYPE html><%@ page import="java.util.Properties"%>
<html lang="en">
<!-- main.tmpl -->
<head>
<title><g:layoutTitle default="Ure Museum | Collection" /></title>
<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0" />
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
<script src="http://code.jquery.com/ui/1.11.3/jquery-ui.js" integrity="sha256-0vBSIAi/8FxkNOSKyPEfdGQzFDak1dlqFKBYqBp1yC4="
	crossorigin="anonymous"></script>
<script src="//cdn.bootcss.com/camanjs/4.1.2/caman.full.js"></script>
<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"
	integrity="sha256-KXn5puMvxCw+dAYznun+drMdG1IFl3agK0p/pqT9KAo= sha512-2e8qq0ETcfWRI4HJBzQiA3UoyFk6tbNyG+qSaIBZLyW9Xf3sWZHN/lxe9fTh1U45DpPf07yj94KsUHHWe4Yk1A=="
	crossorigin="anonymous"></script>
<g:layoutHead />
<% def uredb_wskey = System.getenv("WSKEY");if (uredb_wskey == null) { uredb_wskey = System.getProperty("WSKEY");}%>
<% def gapi_client_id = System.getenv("GAPI_CLIENT_ID");if (gapi_client_id == null) {
    gapi_client_id = System.getProperty("GAPI_CLIENT_ID");
    if (gapi_client_id == null)
    	gapi_client_id = '';
    }%>
<script>
var uredb_wskey = "${uredb_wskey}";
var gapi_client_id = "${gapi_client_id}";
window.ure = {}
window.ure.isAnonUser = false;  // set to false in ure_gapi if user logs in.
</script>
<meta name="uredb_wskey" content="${uredb_wskey}">
<meta name="google-signin-client_id" content="${gapi_client_id}" />
<script src="${resource(dir:'js/vendor/jquery',file:'jquery.storageapi.js')}"></script>
<script src="https://apis.google.com/js/client:platform.js" async defer></script>
<script src="${resource(dir:'js/vendor/gdad',file:'gdad.js')}"></script>
<script src="${resource(dir:'js',file:'ure_data.js')}"></script>
<script src="${resource(dir:'js',file:'ure_component.js')}"></script>
<script src="${resource(dir:'js',file:'ure_gapi.js')}"></script>
<script src="${resource(dir:'js/vendor/filesaverjs',file:'FileSaver.js')}"></script>
<script src="${resource(dir:'js',file:'egg.js?v=2')}"></script>
<script src="${resource(dir:'js',file:'lighttable.js')}"></script>
<script src="${resource(dir:'js',file:'messages.js')}"></script>
<script src="${resource(dir:'js',file:'media.js')}"></script>
<script src="${resource(dir:'js',file:'global.js?v=2')}"></script>
<!-- Le HTML5 shim, for IE6-8 support of HTML elements -->
<!--[if lt IE 9]>
		<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
<link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet">
<link href="//maxcdn.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css" rel="stylesheet">
<link rel="shortcut icon" href="/favicon.ico?v=2" type="image/x-icon" />
<link rel="stylesheet" href="${resource(dir:'css/ure',file:'main.css')}" />
<r:layoutResources />
</head>
<body onload="${pageProperty(name:'body.onload')}">
	<div id="beta-warning">
		This is a beta trial version of the UreDB. Go to
		<a href="http://uredb.reading.ac.uk/db">http://uredb.reading.ac.uk/db</a>
		for the real thing.
	</div>
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
	<div id="versioninfo" style="display: none">
		version:
		<g:meta name="app.version" />
		<br /> grails:
		<g:meta name="app.grails.version" />
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
	
<%
    
 flash.lastURI = request.forwardURI 
 flash.lastQuerystring =  request.getQueryString();
 println flash.lastURI
 %>

 -->
	<div class="alert" role="alert" id="alert-modal" style="display: none">
		<button type="button" class="close" id="alert-modal-close" aria-label="Close">
			<span aria-hidden="true">&times;</span>
		</button>
		<div class="alert-body"></div>
	</div>
	<div id="templates-main" style="display: none">
		<div id="template-comp-dropdown" class="dropdown"></div>
	</div>
	<%  
		def ga_script = System.getenv("GA_SCRIPT")
		if (ga_script == null) {
        	// tomcat needs properties
		    ga_script = System.getProperty("GA_SCRIPT");
        	if (ga_script == null) {
        		ga_script = 'false'
        	}
		}
        ga_script = ga_script.toBoolean();
	%>
	<g:if test="${ga_script == true }">
		<g:render template="/ure/ga"></g:render>
	</g:if>
</body>
</html>

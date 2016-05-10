<%@ page import="grails.converters.*"%>
<!DOCTYPE html>
<html>
<head>
<title>Ure Museum Database: options</title>
<meta name="layout" content="ure/main" />
<script src="${resource(dir:'js',file:'image-modal.js')}"></script>
<style>
/** hide left nav on param s */
#left_nav { <
	g: if test="${params.s == 'noleftnav'}"> 
			display:none; </
	g: if>
}

#left-nav-search {
	display: block !important;
}

.container a {
color: black;

}
</style>
</head>
<body>
	<!--  Options page 
	  This is a series of 

 -->
	<div class="container">
		<h1>Options</h1>
		<div class="panel panel-default">
		
			<div class="panel-body">
				<a href="/manage/related">Manage related items search</a>
			</div>
		</div>
		
	</div>
</body>
<html>
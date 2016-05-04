
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
        "http://www.w3.org/TR/1999/REC-html401-19991224/loose.dtd">
<html lang="en">
<!-- selpicdir.tmpl -->
<head>

<meta http-equiv="content-type" content="text/html; charset=iso-8859-1">
<title>Ure Database Editor</title>
<meta name="generator" content="BBEdit 6.5.2">
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>

<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>
<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">

<link href="/bootstrap/css/bootstrap-responsive.css" rel="stylesheet">
<link href="/bootstrap/css/bootstrap-modal.css" rel="stylesheet">

<link rel="stylesheet" class="theme-link"
	href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/themes/flick/jquery-ui.css"
	type="text/css" media="screen" />

<link rel="stylesheet" href="${resource(dir:'css',file:'/ure/editor.css')}" />
<link rel="shortcut icon" href="favicon.ico?v=2" type="image/x-icon">

<g:layoutHead />
<style type="text/css">

</style>
<script>
	$(document).ready(function() {

		$("#wrapper .dirlist a").button();
		//		$("a").corner();
		//		$("#session-msg").corner("dogfold");
		//		$(".firsttitle").corner();

	});
</script>
</head>
<body>
	<g:render template="/shared/ure/topnav" model="[type:'editor']"></g:render>
	<div id="editor_nav_bar" class="ure-nav"></div>
	<span id="cms-page">Editor /layouts/ure</span>
	<div id="wrapper" class="container">
		
		<div id="content" >
			<g:layoutBody />
		</div>
	</div>
</body>
</html>

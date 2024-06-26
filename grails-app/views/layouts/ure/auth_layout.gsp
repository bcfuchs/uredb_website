<!DOCTYPE html>
<%-- <html lang="${org.springframework.web.servlet.support.RequestContextUtils.getLocale(request).toString().replace('_', '-')}"> --%>
<html lang="${session.'org.springframework.web.servlet.i18n.SessionLocaleResolver.LOCALE'}">
<head>
<title><g:layoutTitle default="${meta(name:'app.name')}" /></title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="">
<meta name="author" content="">
<link rel="shortcut icon" href="" type="image/x-icon" />
<link rel="apple-touch-icon" href="assets/ico/apple-touch-icon.png">
<link rel="apple-touch-icon" href="assets/ico/apple-touch-icon-72x72.png" sizes="72x72">
<link rel="apple-touch-icon" href="assets/ico/apple-touch-icon-114x114.png" sizes="114x114">
<%-- Manual switch for the skin can be found in /view/_menu/_config.gsp --%>
<!--  jquery -->
<r:require modules="jquery" />
<!--  bootstrap -->
<link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet">
<link href="//maxcdn.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css" rel="stylesheet">
<link rel="stylesheet" href="${resource(dir:'css/ure',file:'auth.css')}" />
<r:layoutResources />
<g:layoutHead />
<!-- Le HTML5 shim, for IE6-8 support of HTML elements -->
<!--[if lt IE 9]>
		<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
<%-- For Javascript see end of body --%>
</head>
<body>
	<!--  /ure/auth_layout  -->
	<div id="wrapper">
		<g:render template="/shared/ure/topnav"></g:render>
		<div id="content" class="container">
			<g:layoutBody />
		</div>
		<r:layoutResources />
	</div> 
</body>
</html>
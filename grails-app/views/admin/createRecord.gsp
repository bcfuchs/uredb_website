<%@ page import="org.ac.uk.reading.ure.uredb.*"%>
<html>
<head>
<meta name="layout" content="ure/editor" />
</head>
<body>
	<script>
		$(document).ready(function() {

			$("#editor_nav_bar").html($("#edit_nav_1"));
			$("#edit_nav_1").show();

		});
	</script>
	<style>
#edit_nav_1 a {
	font-size: 0.8em;
	text-decoration: none;
	text-transform: uppercase;
	color: #B68092;;
}

#edit_nav_1 a:hover {
	color: #B61148;
}
</style>
	<g:form url="[action:'create',controller:'record']">
	<input type="submit" value="create" ></input>
		<g:render template="/shared/ure/createRecord"></g:render>
	</g:form>
	<g:render template="/shared/ure/bootstrap"></g:render>
	
	
	
</body>
</html>

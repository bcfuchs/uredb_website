<%@ page import="org.ac.uk.reading.ure.uredb.*"%>
<html>
<head>
<meta name="layout" content="ure/editor" />


</head>
<body>
	<style>
.dirlistcell {
	width: 20px;
}

.dirlist a.ui-state-default {
	background-color: gray;
	width: 100px;
}
</style>
	<%

def med = Media.executeQuery('select distinct dir from Media').sort();

 %>
	<h4>Choose a picture group</h4>
	<table class="dirlist">
		<tr>
			<g:each status="i" var="m" in="${med}">
				<g:if test="${m}">
					<g:if test="${(i+1) % 8 == 0 }">
					</tr>
					<tr>
			</g:if>
			<td class="dirlistcell"><a
				onclick="$('#content').fadeOut('slow');"
				href="/admin/picsel?dir=${m}"> ${m}
			</a></td>
			</g:if>
			</g:each>

		</tr>
		</div>
</body>
</html>

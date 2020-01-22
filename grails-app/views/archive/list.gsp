
<%@ page import="org.ac.uk.reading.ure.uredb.Archive" %>
<!doctype html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta name="layout" content="editor"    />
	<g:set var="entityName" value="${message(code: 'archive.title', default: 'Labels')}" />
	<title><g:message code="default.list.label" args="[entityName]" /></title>
</head>

<body>
	
<section id="list-labels" class="first">

	<table class="table table-bordered">
		<thead>
			<tr>
			

			
				<g:sortableColumn property="title" title="${message(code: 'archive.title.label', default: 'Title')}" />
			
				<g:sortableColumn property="excavation_season" title="${message(code: 'archive.excavation_season', default: 'Excavation Season')}" />
			

			
			</tr>
		</thead>
		<tbody>
		<g:each in="${archiveInstanceList}" status="i" var="archiveInstance">
			<tr class="${(i % 2) == 0 ? 'odd' : 'even'}">

			
				<td>${fieldValue(bean: archiveInstance, field: "title")}</td>
			
				
			
				<td>${fieldValue(bean: archiveInstance, field: "excavation_season")}</td>

			
			</tr>
		</g:each>
		</tbody>
	</table>
	<div class="pagination">
		<bs:paginate total="${archiveInstanceTotal}" />
	</div>
</section>

</body>

</html>

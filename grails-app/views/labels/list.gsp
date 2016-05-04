
<%@ page import="org.ac.uk.reading.ure.uredb.Labels" %>
<!doctype html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta name="layout" content="editor"    />
	<g:set var="entityName" value="${message(code: 'labels.label', default: 'Labels')}" />
	<title><g:message code="default.list.label" args="[entityName]" /></title>
</head>

<body>
	
<section id="list-labels" class="first">

	<table class="table table-bordered">
		<thead>
			<tr>
			
				<g:sortableColumn property="clazz" title="${message(code: 'labels.clazz.label', default: 'Clazz')}" />
			
				<g:sortableColumn property="context" title="${message(code: 'labels.context.label', default: 'Context')}" />
			
				<g:sortableColumn property="dateCreated" title="${message(code: 'labels.dateCreated.label', default: 'Date Created')}" />
			
				<g:sortableColumn property="field" title="${message(code: 'labels.field.label', default: 'Field')}" />
			
				<g:sortableColumn property="label" title="${message(code: 'labels.label.label', default: 'Label')}" />
			
				<g:sortableColumn property="lastUpdated" title="${message(code: 'labels.lastUpdated.label', default: 'Last Updated')}" />
			
			</tr>
		</thead>
		<tbody>
		<g:each in="${labelsInstanceList}" status="i" var="labelsInstance">
			<tr class="${(i % 2) == 0 ? 'odd' : 'even'}">
			
				<td><g:link action="show" id="${labelsInstance.id}">${fieldValue(bean: labelsInstance, field: "clazz")}</g:link></td>
			
				<td>${fieldValue(bean: labelsInstance, field: "context")}</td>
			
				<td><g:formatDate date="${labelsInstance.dateCreated}" /></td>
			
				<td>${fieldValue(bean: labelsInstance, field: "field")}</td>
			
				<td>${fieldValue(bean: labelsInstance, field: "label")}</td>
			
				<td><g:formatDate date="${labelsInstance.lastUpdated}" /></td>
			
			</tr>
		</g:each>
		</tbody>
	</table>
	<div class="pagination">
		<bs:paginate total="${labelsInstanceTotal}" />
	</div>
</section>

</body>

</html>

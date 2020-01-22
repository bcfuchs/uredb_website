
<%@ page import="org.ac.uk.reading.ure.uredb.Labels" %>
<!doctype html>
<html>

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta name="layout" content="editor"    />
	<g:set var="entityName" value="${message(code: 'labels.label', default: 'Labels')}" />
	<title><g:message code="default.show.label" args="[entityName]" /></title>
</head>

<body>

<section id="show-labels" class="first">

	<table class="table">
		<tbody>
		
			<tr class="prop">
				<td valign="top" class="name"><g:message code="labels.clazz.label" default="Clazz" /></td>
				
				<td valign="top" class="value">${fieldValue(bean: labelsInstance, field: "clazz")}</td>
				
			</tr>
		
			<tr class="prop">
				<td valign="top" class="name"><g:message code="labels.context.label" default="Context" /></td>
				
				<td valign="top" class="value">${fieldValue(bean: labelsInstance, field: "context")}</td>
				
			</tr>
		
			<tr class="prop">
				<td valign="top" class="name"><g:message code="labels.dateCreated.label" default="Date Created" /></td>
				
				<td valign="top" class="value"><g:formatDate date="${labelsInstance?.dateCreated}" /></td>
				
			</tr>
		
			<tr class="prop">
				<td valign="top" class="name"><g:message code="labels.field.label" default="Field" /></td>
				
				<td valign="top" class="value">${fieldValue(bean: labelsInstance, field: "field")}</td>
				
			</tr>
		
			<tr class="prop">
				<td valign="top" class="name"><g:message code="labels.label.label" default="Label" /></td>
				
				<td valign="top" class="value">${fieldValue(bean: labelsInstance, field: "label")}</td>
				
			</tr>
		
			<tr class="prop">
				<td valign="top" class="name"><g:message code="labels.lastUpdated.label" default="Last Updated" /></td>
				
				<td valign="top" class="value"><g:formatDate date="${labelsInstance?.lastUpdated}" /></td>
				
			</tr>
		
		</tbody>
	</table>
</section>

</body>

</html>

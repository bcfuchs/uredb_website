
<%@ page import="org.ac.uk.reading.ure.uredb.Media" %>
<!DOCTYPE html>
<html>
	<head>
		<meta name="layout" content="main">
		<g:set var="entityName" value="${message(code: 'media.label', default: 'Media')}" />
		<title><g:message code="default.list.label" args="[entityName]" /></title>
	</head>
	<body>
		<a href="#list-media" class="skip" tabindex="-1"><g:message code="default.link.skip.label" default="Skip to content&hellip;"/></a>
		<div class="nav" role="navigation">
			<ul>
				<li><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></li>
				<li><g:link class="create" action="create"><g:message code="default.new.label" args="[entityName]" /></g:link></li>
			</ul>
		</div>
		<div id="list-media" class="content scaffold-list" role="main">
			<h1><g:message code="default.list.label" args="[entityName]" /></h1>
			<g:if test="${flash.message}">
			<div class="message" role="status">${flash.message}</div>
			</g:if>
			<table>
				<thead>
					<tr>
					
						<g:sortableColumn property="type" title="${message(code: 'media.type.label', default: 'Type')}" />
					
						<g:sortableColumn property="caption" title="${message(code: 'media.caption.label', default: 'Caption')}" />
					
						<g:sortableColumn property="description" title="${message(code: 'media.description.label', default: 'Description')}" />
					
						<g:sortableColumn property="resource_id" title="${message(code: 'media.resource_id.label', default: 'Resourceid')}" />
					
						<g:sortableColumn property="uri" title="${message(code: 'media.uri.label', default: 'Uri')}" />
					
						<g:sortableColumn property="uri_local" title="${message(code: 'media.uri_local.label', default: 'Urilocal')}" />
					
					</tr>
				</thead>
				<tbody>
				<g:each in="${mediaInstanceList}" status="i" var="mediaInstance">
					<tr class="${(i % 2) == 0 ? 'even' : 'odd'}">
					
						<td><g:link action="show" id="${mediaInstance.id}">${fieldValue(bean: mediaInstance, field: "type")}</g:link></td>
					
						<td>${fieldValue(bean: mediaInstance, field: "caption")}</td>
					
						<td>${fieldValue(bean: mediaInstance, field: "description")}</td>
					
						<td>${fieldValue(bean: mediaInstance, field: "resource_id")}</td>
					
						<td>${fieldValue(bean: mediaInstance, field: "uri")}</td>
					
						<td>${fieldValue(bean: mediaInstance, field: "uri_local")}</td>
					
					</tr>
				</g:each>
				</tbody>
			</table>
			<div class="pagination">
				<g:paginate total="${mediaInstanceTotal}" />
			</div>
		</div>
	</body>
</html>

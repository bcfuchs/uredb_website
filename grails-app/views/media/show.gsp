
<%@ page import="org.ac.uk.reading.ure.uredb.Media" %>
<!DOCTYPE html>
<html>
	<head>
		<meta name="layout" content="main">
		<g:set var="entityName" value="${message(code: 'media.label', default: 'Media')}" />
		<title><g:message code="default.show.label" args="[entityName]" /></title>
	</head>
	<body>
		<a href="#show-media" class="skip" tabindex="-1"><g:message code="default.link.skip.label" default="Skip to content&hellip;"/></a>
		<div class="nav" role="navigation">
			<ul>
				<li><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></li>
				<li><g:link class="list" action="list"><g:message code="default.list.label" args="[entityName]" /></g:link></li>
				<li><g:link class="create" action="create"><g:message code="default.new.label" args="[entityName]" /></g:link></li>
			</ul>
		</div>
		<div id="show-media" class="content scaffold-show" role="main">
			<h1><g:message code="default.show.label" args="[entityName]" /></h1>
			<g:if test="${flash.message}">
			<div class="message" role="status">${flash.message}</div>
			</g:if>
			<ol class="property-list media">
			
				<g:if test="${mediaInstance?.type}">
				<li class="fieldcontain">
					<span id="type-label" class="property-label"><g:message code="media.type.label" default="Type" /></span>
					
						<span class="property-value" aria-labelledby="type-label"><g:fieldValue bean="${mediaInstance}" field="type"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${mediaInstance?.caption}">
				<li class="fieldcontain">
					<span id="caption-label" class="property-label"><g:message code="media.caption.label" default="Caption" /></span>
					
						<span class="property-value" aria-labelledby="caption-label"><g:fieldValue bean="${mediaInstance}" field="caption"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${mediaInstance?.description}">
				<li class="fieldcontain">
					<span id="description-label" class="property-label"><g:message code="media.description.label" default="Description" /></span>
					
						<span class="property-value" aria-labelledby="description-label"><g:fieldValue bean="${mediaInstance}" field="description"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${mediaInstance?.resource_id}">
				<li class="fieldcontain">
					<span id="resource_id-label" class="property-label"><g:message code="media.resource_id.label" default="Resourceid" /></span>
					
						<span class="property-value" aria-labelledby="resource_id-label"><g:fieldValue bean="${mediaInstance}" field="resource_id"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${mediaInstance?.uri}">
				<li class="fieldcontain">
					<span id="uri-label" class="property-label"><g:message code="media.uri.label" default="Uri" /></span>
					
						<span class="property-value" aria-labelledby="uri-label"><g:fieldValue bean="${mediaInstance}" field="uri"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${mediaInstance?.uri_local}">
				<li class="fieldcontain">
					<span id="uri_local-label" class="property-label"><g:message code="media.uri_local.label" default="Urilocal" /></span>
					
						<span class="property-value" aria-labelledby="uri_local-label"><g:fieldValue bean="${mediaInstance}" field="uri_local"/></span>
					
				</li>
				</g:if>
			
			</ol>
			<g:form>
				<fieldset class="buttons">
					<g:hiddenField name="id" value="${mediaInstance?.id}" />
					<g:link class="edit" action="edit" id="${mediaInstance?.id}"><g:message code="default.button.edit.label" default="Edit" /></g:link>
					<g:actionSubmit class="delete" action="delete" value="${message(code: 'default.button.delete.label', default: 'Delete')}" onclick="return confirm('${message(code: 'default.button.delete.confirm.message', default: 'Are you sure?')}');" />
				</fieldset>
			</g:form>
		</div>
	</body>
</html>

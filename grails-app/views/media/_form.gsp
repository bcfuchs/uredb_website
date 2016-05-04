<%@ page import="org.ac.uk.reading.ure.uredb.Media" %>



<div class="fieldcontain ${hasErrors(bean: mediaInstance, field: 'type', 'error')} ">
	<label for="type">
		<g:message code="media.type.label" default="Type" />
		
	</label>
	<g:select name="type" from="${mediaInstance.constraints.type.inList}" value="${mediaInstance?.type}" valueMessagePrefix="media.type" noSelection="['': '']"/>
</div>

<div class="fieldcontain ${hasErrors(bean: mediaInstance, field: 'caption', 'error')} ">
	<label for="caption">
		<g:message code="media.caption.label" default="Caption" />
		
	</label>
	<g:textField name="caption" value="${mediaInstance?.caption}"/>
</div>

<div class="fieldcontain ${hasErrors(bean: mediaInstance, field: 'description', 'error')} ">
	<label for="description">
		<g:message code="media.description.label" default="Description" />
		
	</label>
	<g:textField name="description" value="${mediaInstance?.description}"/>
</div>

<div class="fieldcontain ${hasErrors(bean: mediaInstance, field: 'resource_id', 'error')} ">
	<label for="resource_id">
		<g:message code="media.resource_id.label" default="Resourceid" />
		
	</label>
	<g:textField name="resource_id" value="${mediaInstance?.resource_id}"/>
</div>

<div class="fieldcontain ${hasErrors(bean: mediaInstance, field: 'uri', 'error')} ">
	<label for="uri">
		<g:message code="media.uri.label" default="Uri" />
		
	</label>
	<g:textField name="uri" value="${mediaInstance?.uri}"/>
</div>

<div class="fieldcontain ${hasErrors(bean: mediaInstance, field: 'uri_local', 'error')} ">
	<label for="uri_local">
		<g:message code="media.uri_local.label" default="Urilocal" />
		
	</label>
	<g:textField name="uri_local" value="${mediaInstance?.uri_local}"/>
</div>


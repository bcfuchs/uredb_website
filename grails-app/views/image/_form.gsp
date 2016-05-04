<%@ page import="org.ac.uk.reading.ure.uredb.Image" %>



<div class="fieldcontain ${hasErrors(bean: imageInstance, field: 'resource_id', 'error')} required">
	<label for="resource_id">
		<g:message code="image.resource_id.label" default="Resourceid" />
		<span class="required-indicator">*</span>
	</label>
	<g:textField name="resource_id" required="" value="${imageInstance?.resource_id}"/>
</div>


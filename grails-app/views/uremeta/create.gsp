<%@ page import="org.ac.uk.reading.ure.uredb.Uremeta" %>
<!doctype html>
<html>

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta name="layout" content="editor"/>
	<g:set var="entityName" value="${message(code: 'uremeta.label', default: 'Record')}" />
	<title>UreDB: Add an Object</title>
</head>

<body>

<section id="create-uremeta" class="first">
	
	<g:hasErrors bean="${uremetaInstance}">
	<div class="alert alert-error">
		<g:renderErrors bean="${uremetaInstance}" as="list" />
	</div>
	</g:hasErrors>
	
	<g:form action="save" class="form-horizontal" >
		<fieldset class="form">
			<g:render template="form"/>
		</fieldset>
		<div class="form-actions">
			<g:submitButton name="create" class="btn btn-primary" value="${message(code: 'default.button.create.label', default: 'Create')}" />
            <button class="btn" type="reset"><g:message code="default.button.reset.label" default="Reset" /></button>
		</div>
	</g:form>
	
</section>
		
</body>

</html>

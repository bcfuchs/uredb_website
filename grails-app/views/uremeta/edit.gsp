<%@ page import="org.ac.uk.reading.ure.uredb.Uremeta"%>
<!doctype html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="layout" content="/editor"/>
<style>

 
 
#editor-msg {
	position: relative;
	left: 180px;
	height: 20px;
	width: 320px;
	padding: 5px;
	margin: 0 0 10px 0;
	border: 3px solid silver;
	font-size: 10pt;
	background-color: pink;
	-webkit-border-radius: 4px;
	-moz-border-radius: 4px;
	border-radius: 4px;
}

.username {
	font-weight: bold;
}
</style>


<g:set var="entityName" value="${message(code: 'uremeta.label', default: 'Uremeta')}" />
<title><g:message code="default.edit.label" args="[entityName]" /></title>
</head>
<body>
	<section id="edit-uremeta" class="first">
	
	<ure:isSimulEdit>
			<div id="editor-msg">
				Warning!  
				<span class="username">
					${application.currentEditor} 
				</span>
				is editing this record right now. 
			</div>
	
		</ure:isSimulEdit>
		<g:hasErrors bean="${uremetaInstance}">
			<div class="alert alert-error">
				<g:renderErrors bean="${uremetaInstance}" as="list" />
			</div>
		</g:hasErrors>
	
		<g:form method="post" class="form-horizontal">
		<div class="form-actions">
				<g:actionSubmit class="btn btn-sm btn-primary" action="update"
					value="${message(code: 'default.button.update.label', default: 'Update')}" />
				<g:actionSubmit class="btn btn-sm btn-danger" action="delete"
					value="${message(code: 'default.button.delete.label', default: 'Delete')}"
					onclick="return confirm('${message(code: 'default.button.delete.confirm.message', default: 'Are you sure?')}');" />
				<button class="btn btn-sm" type="reset">
					<g:message code="default.button.reset.label" default="Reset" />
				</button>
			</div>
			<g:hiddenField name="id" value="${uremetaInstance?.id}" />
			<g:hiddenField name="version" value="${uremetaInstance?.version}" />
			<fieldset id="uremeta-form" class="form">
				<g:render template="form" />
				<div style="clear:both"/>
			</fieldset>
			<div class="form-actions">
				<g:actionSubmit class="btn btn-primary" action="update"
					value="${message(code: 'default.button.update.label', default: 'Update')}" />
				<g:actionSubmit class="btn btn-danger" action="delete"
					value="${message(code: 'default.button.delete.label', default: 'Delete')}"
					onclick="return confirm('${message(code: 'default.button.delete.confirm.message', default: 'Are you sure?')}');" />
				<button class="btn" type="reset">
					<g:message code="default.button.reset.label" default="Reset" />
				</button>
			</div>
		</g:form>
	</section>
</body>
</html>

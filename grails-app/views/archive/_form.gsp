<%@ page import="org.ac.uk.reading.ure.uredb.Archive" %>



			<div class="control-group fieldcontain ${hasErrors(bean: ArchiveInstance, field: 'clazz', 'error')} ">
				<label for="clazz" class="control-label"><g:message code="Archive.clazz.label" default="Clazz" /></label>
				<div class="controls">
					<g:textField name="clazz" value="${ArchiveInstance?.clazz}"/>
					<span class="help-inline">${hasErrors(bean: ArchiveInstance, field: 'clazz', 'error')}</span>
				</div>
			</div>

			<div class="control-group fieldcontain ${hasErrors(bean: ArchiveInstance, field: 'id', 'error')} ">
				<label for="context" class="control-label"><g:message code="Archive.context.label" default="Context" /></label>
				<div class="controls">
					<g:textField name="context" value="${ArchiveInstance?.id}"/>
					<span class="help-inline">${hasErrors(bean: ArchiveInstance, field: 'id', 'error')}</span>
				</div>
			</div>




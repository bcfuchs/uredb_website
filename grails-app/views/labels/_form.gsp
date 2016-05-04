<%@ page import="org.ac.uk.reading.ure.uredb.Labels" %>



			<div class="control-group fieldcontain ${hasErrors(bean: labelsInstance, field: 'clazz', 'error')} ">
				<label for="clazz" class="control-label"><g:message code="labels.clazz.label" default="Clazz" /></label>
				<div class="controls">
					<g:textField name="clazz" value="${labelsInstance?.clazz}"/>
					<span class="help-inline">${hasErrors(bean: labelsInstance, field: 'clazz', 'error')}</span>
				</div>
			</div>

			<div class="control-group fieldcontain ${hasErrors(bean: labelsInstance, field: 'context', 'error')} ">
				<label for="context" class="control-label"><g:message code="labels.context.label" default="Context" /></label>
				<div class="controls">
					<g:textField name="context" value="${labelsInstance?.context}"/>
					<span class="help-inline">${hasErrors(bean: labelsInstance, field: 'context', 'error')}</span>
				</div>
			</div>

			<div class="control-group fieldcontain ${hasErrors(bean: labelsInstance, field: 'field', 'error')} ">
				<label for="field" class="control-label"><g:message code="labels.field.label" default="Field" /></label>
				<div class="controls">
					<g:textField name="field" value="${labelsInstance?.field}"/>
					<span class="help-inline">${hasErrors(bean: labelsInstance, field: 'field', 'error')}</span>
				</div>
			</div>

			<div class="control-group fieldcontain ${hasErrors(bean: labelsInstance, field: 'label', 'error')} ">
				<label for="label" class="control-label"><g:message code="labels.label.label" default="Label" /></label>
				<div class="controls">
					<g:textField name="label" value="${labelsInstance?.label}"/>
					<span class="help-inline">${hasErrors(bean: labelsInstance, field: 'label', 'error')}</span>
				</div>
			</div>


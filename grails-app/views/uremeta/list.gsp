
<%@ page import="org.ac.uk.reading.ure.uredb.Uremeta" %>
<!doctype html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta name="layout" content="/editor"    />
	<g:set var="entityName" value="${message(code: 'uremeta.label', default: 'Uremeta')}" />
	<title><g:message code="default.list.label" args="[entityName]" /></title>
</head>

<body>
<div class="container">
<div class="pagination">
		<g:paginate max="100" total="${uremetaInstanceTotal}" />
	</div>
<section id="list-uremeta" class="first">

	<table id="uremeta-table" class="table table-bordered table-striped">
		<thead>
			<tr>
				<g:sortableColumn property="accession_number" title="${message(code: 'uremeta.accession_number.label', default: 'Accession Number')}" />
				
				<g:sortableColumn property="artist" title="${message(code: 'uremeta.description.label', default: 'Description')}" />
				<g:sortableColumn property="shape" title="${message(code: 'uremeta.shape.label', default: 'Shape')}" />
			
				<g:sortableColumn property="shape_details" title="${message(code: 'uremeta.shape_details.label', default: 'Shape details')}" />
			
				<g:sortableColumn property="material" title="${message(code: 'uremeta.material.label', default: 'Material')}" />
			
				<g:sortableColumn property="fabric" title="${message(code: 'uremeta.fabric.label', default: 'Fabric')}" />
			
				<g:sortableColumn property="fabric_description" title="${message(code: 'uremeta.fabric_description.label', default: 'Fabric description')}" />
			
				<g:sortableColumn property="munsell_color" title="${message(code: 'uremeta.munsell_color.label', default: 'Munsellcolor')}" />
			
			</tr>
		</thead>
		<tbody>
		<g:each in="${uremetaInstanceList}" status="i" var="uremetaInstance">
			<tr class="${(i % 2) == 0 ? 'odd' : 'even'}">
			<%
            def a = fieldValue(bean: uremetaInstance, field: "munsell_color");
            if (a.length() > 10) {a = a[1..10]}
            
             %>
				<td class="accnum"><g:link action="show" id="${uremetaInstance.id}">${fieldValue(bean: uremetaInstance, field: "accession_number")}</g:link></td>
				<td>${fieldValue(bean: uremetaInstance, field: "description")}</td>
				<td>${fieldValue(bean: uremetaInstance, field: "shape")}</td>
			
				<td>${fieldValue(bean: uremetaInstance, field: "shape_details")}</td>
			
				<td>${fieldValue(bean: uremetaInstance, field: "material")}</td>
			
				<td>${fieldValue(bean: uremetaInstance, field: "fabric")}</td>
			
				<td>${fieldValue(bean: uremetaInstance, field: "fabric_description")}</td>
			
				<td>${a}</td>
			
			</tr>
		</g:each>
		</tbody>
	</table>
	
</section>

</div>
</body>

</html>

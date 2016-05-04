
<%@ page import="org.ac.uk.reading.ure.uredb.Uremeta" %>
<!doctype html>
<html>

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta name="layout" content="editor"    />
	<g:set var="entityName" value="${message(code: 'uremeta.label', default: 'Uremeta')}" />
	<title><g:message code="default.show.label" args="[entityName]" /></title>
</head>

<body>

<section id="show-uremeta" class="first">

	<table class="table">
		<tbody>
		
			<tr class="prop">
				<td valign="top" class="name"><g:message code="uremeta.shape.label" default="Shape" /></td>
				
				<td valign="top" class="value">${fieldValue(bean: uremetaInstance, field: "shape")}</td>
				
			</tr>
		
			<tr class="prop">
				<td valign="top" class="name"><g:message code="uremeta.shape_details.label" default="Shapedetails" /></td>
				
				<td valign="top" class="value">${fieldValue(bean: uremetaInstance, field: "shape_details")}</td>
				
			</tr>
		
			<tr class="prop">
				<td valign="top" class="name"><g:message code="uremeta.material.label" default="Material" /></td>
				
				<td valign="top" class="value">${fieldValue(bean: uremetaInstance, field: "material")}</td>
				
			</tr>
		
			<tr class="prop">
				<td valign="top" class="name"><g:message code="uremeta.fabric.label" default="Fabric" /></td>
				
				<td valign="top" class="value">${fieldValue(bean: uremetaInstance, field: "fabric")}</td>
				
			</tr>
		
			<tr class="prop">
				<td valign="top" class="name"><g:message code="uremeta.fabric_description.label" default="Fabricdescription" /></td>
				
				<td valign="top" class="value">${fieldValue(bean: uremetaInstance, field: "fabric_description")}</td>
				
			</tr>
		
			<tr class="prop">
				<td valign="top" class="name"><g:message code="uremeta.munsell_color.label" default="Munsellcolor" /></td>
				
				<td valign="top" class="value">${fieldValue(bean: uremetaInstance, field: "munsell_color")}</td>
				
			</tr>
		
			<tr class="prop">
				<td valign="top" class="name"><g:message code="uremeta.description.label" default="Description" /></td>
				
				<td valign="top" class="value">${fieldValue(bean: uremetaInstance, field: "description")}</td>
				
			</tr>
		
			<tr class="prop">
				<td valign="top" class="name"><g:message code="uremeta.inscriptions.label" default="Inscriptions" /></td>
				
				<td valign="top" class="value">${fieldValue(bean: uremetaInstance, field: "inscriptions")}</td>
				
			</tr>
		
			<tr class="prop">
				<td valign="top" class="name"><g:message code="uremeta.condition_object.label" default="Conditionobject" /></td>
				
				<td valign="top" class="value">${fieldValue(bean: uremetaInstance, field: "condition_object")}</td>
				
			</tr>
		
			<tr class="prop">
				<td valign="top" class="name"><g:message code="uremeta.technique.label" default="Technique" /></td>
				
				<td valign="top" class="value">${fieldValue(bean: uremetaInstance, field: "technique")}</td>
				
			</tr>
		
			<tr class="prop">
				<td valign="top" class="name"><g:message code="uremeta.provenience.label" default="Provenience" /></td>
				
				<td valign="top" class="value">${fieldValue(bean: uremetaInstance, field: "provenience")}</td>
				
			</tr>
		
			<tr class="prop">
				<td valign="top" class="name"><g:message code="uremeta.acquisition.label" default="Acquisition" /></td>
				
				<td valign="top" class="value">${fieldValue(bean: uremetaInstance, field: "acquisition")}</td>
				
			</tr>
		
			<tr class="prop">
				<td valign="top" class="name"><g:message code="uremeta.period.label" default="Period" /></td>
				
				<td valign="top" class="value">${fieldValue(bean: uremetaInstance, field: "period")}</td>
				
			</tr>
		
			<tr class="prop">
				<td valign="top" class="name"><g:message code="uremeta.date.label" default="Date" /></td>
				
				<td valign="top" class="value">${fieldValue(bean: uremetaInstance, field: "date")}</td>
				
			</tr>
		
			<tr class="prop">
				<td valign="top" class="name"><g:message code="uremeta.daterange_start.label" default="Daterangestart" /></td>
				
				<td valign="top" class="value"><g:formatDate date="${uremetaInstance?.daterange_start}" /></td>
				
			</tr>
		
			<tr class="prop">
				<td valign="top" class="name"><g:message code="uremeta.daterange_end.label" default="Daterangeend" /></td>
				
				<td valign="top" class="value"><g:formatDate date="${uremetaInstance?.daterange_end}" /></td>
				
			</tr>
		
			<tr class="prop">
				<td valign="top" class="name"><g:message code="uremeta.daterange_type.label" default="Daterangetype" /></td>
				
				<td valign="top" class="value">${fieldValue(bean: uremetaInstance, field: "daterange_type")}</td>
				
			</tr>
		
			<tr class="prop">
				<td valign="top" class="name"><g:message code="uremeta.dating.label" default="Dating" /></td>
				
				<td valign="top" class="value">${fieldValue(bean: uremetaInstance, field: "dating")}</td>
				
			</tr>
		
			<tr class="prop">
				<td valign="top" class="name"><g:message code="uremeta.dating_details.label" default="Datingdetails" /></td>
				
				<td valign="top" class="value">${fieldValue(bean: uremetaInstance, field: "dating_details")}</td>
				
			</tr>
		
			<tr class="prop">
				<td valign="top" class="name"><g:message code="uremeta.artist.label" default="Artist" /></td>
				
				<td valign="top" class="value">${fieldValue(bean: uremetaInstance, field: "artist")}</td>
				
			</tr>
		
			<tr class="prop">
				<td valign="top" class="name"><g:message code="uremeta.attribution.label" default="Attribution" /></td>
				
				<td valign="top" class="value">${fieldValue(bean: uremetaInstance, field: "attribution")}</td>
				
			</tr>
		
			<tr class="prop">
				<td valign="top" class="name"><g:message code="uremeta.comparanda.label" default="Comparanda" /></td>
				
				<td valign="top" class="value">${fieldValue(bean: uremetaInstance, field: "comparanda")}</td>
				
			</tr>
		
			<tr class="prop">
				<td valign="top" class="name"><g:message code="uremeta.comments.label" default="Comments" /></td>
				
				<td valign="top" class="value">${fieldValue(bean: uremetaInstance, field: "comments")}</td>
				
			</tr>
		
			<tr class="prop">
				<td valign="top" class="name"><g:message code="uremeta.bibliography.label" default="Bibliography" /></td>
				
				<td valign="top" class="value">${fieldValue(bean: uremetaInstance, field: "bibliography")}</td>
				
			</tr>
		
			<tr class="prop">
				<td valign="top" class="name"><g:message code="uremeta.archive_ref.label" default="Archiveref" /></td>
				
				<td valign="top" class="value">${fieldValue(bean: uremetaInstance, field: "archive_ref")}</td>
				
			</tr>
		
			<tr class="prop">
				<td valign="top" class="name"><g:message code="uremeta.beazley_db.label" default="Beazleydb" /></td>
				
				<td valign="top" class="value">${fieldValue(bean: uremetaInstance, field: "beazley_db")}</td>
				
			</tr>
		
			<tr class="prop">
				<td valign="top" class="name"><g:message code="uremeta.height.label" default="Height" /></td>
				
				<td valign="top" class="value">${fieldValue(bean: uremetaInstance, field: "height")}</td>
				
			</tr>
		
			<tr class="prop">
				<td valign="top" class="name"><g:message code="uremeta.diameters.label" default="Diameters" /></td>
				
				<td valign="top" class="value">${fieldValue(bean: uremetaInstance, field: "diameters")}</td>
				
			</tr>
		
			<tr class="prop">
				<td valign="top" class="name"><g:message code="uremeta.handle_height.label" default="Handleheight" /></td>
				
				<td valign="top" class="value">${fieldValue(bean: uremetaInstance, field: "handle_height")}</td>
				
			</tr>
		
			<tr class="prop">
				<td valign="top" class="name"><g:message code="uremeta.other_dims.label" default="Otherdims" /></td>
				
				<td valign="top" class="value">${fieldValue(bean: uremetaInstance, field: "other_dims")}</td>
				
			</tr>
		
			<tr class="prop">
				<td valign="top" class="name"><g:message code="uremeta.location.label" default="Location" /></td>
				
				<td valign="top" class="value">${fieldValue(bean: uremetaInstance, field: "location")}</td>
				
			</tr>
		
			<tr class="prop">
				<td valign="top" class="name"><g:message code="uremeta.geolocation.label" default="Geolocation" /></td>
				
				<td valign="top" class="value"><g:link controller="geolocation" action="show" id="${uremetaInstance?.geolocation?.id}">${uremetaInstance?.geolocation?.encodeAsHTML()}</g:link></td>
				
			</tr>
		
			<tr class="prop">
				<td valign="top" class="name"><g:message code="uremeta.edited_by.label" default="Editedby" /></td>
				
				<td valign="top" class="value">${fieldValue(bean: uremetaInstance, field: "edited_by")}</td>
				
			</tr>
		
			<tr class="prop">
				<td valign="top" class="name"><g:message code="uremeta.date_edited.label" default="Dateedited" /></td>
				
				<td valign="top" class="value">${fieldValue(bean: uremetaInstance, field: "date_edited")}</td>
				
			</tr>
		
			<tr class="prop">
				<td valign="top" class="name"><g:message code="uremeta.date_edited_cal.label" default="Dateeditedcal" /></td>
				
				<td valign="top" class="value"><g:formatDate date="${uremetaInstance?.date_edited_cal}" /></td>
				
			</tr>
		
			<tr class="prop">
				<td valign="top" class="name"><g:message code="uremeta.accession_number.label" default="Accessionnumber" /></td>
				
				<td valign="top" class="value">${fieldValue(bean: uremetaInstance, field: "accession_number")}</td>
				
			</tr>
		
			<tr class="prop">
				<td valign="top" class="name"><g:message code="uremeta.media.label" default="Media" /></td>
				
				<td valign="top" style="text-align: left;" class="value">
					<ul>
					<g:each in="${uremetaInstance.media}" var="m">
						<li><g:link controller="media" action="show" id="${m.id}">${m?.encodeAsHTML()}</g:link></li>
					</g:each>
					</ul>
				</td>
				
			</tr>
		
		</tbody>
	</table>
</section>

</body>

</html>

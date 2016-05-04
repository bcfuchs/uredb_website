<%@ page import="org.ac.uk.reading.ure.uredb.Uremeta" %>


			<div class="container-left fields-container col-md-6">
			<div class="control-group fieldcontain ${hasErrors(bean: uremetaInstance, field: 'accession_number', 'error')} ">
				<label for="accession_number" class="control-label"><g:message code="uremeta.accession_number.label" default="Accession number" /></label>
				<div class="controls">
					<g:textField class="form-control" name="accession_number" value="${uremetaInstance?.accession_number}"/>
					<span class="help-inline">
					${hasErrors(bean: uremetaInstance, field: 'accession_number', 'error')} 
					</span>
				</div>
			</div>
			<div class="control-group fieldcontain ${hasErrors(bean: uremetaInstance, field: 'shape', 'error')} ">
				<label for="shape" class="control-label"><g:message code="uremeta.shape.label" default="Shape" /></label>
				<div class="controls">
					<g:textField class="form-control" name="shape" value="${uremetaInstance?.shape}"/>
					<span class="help-inline">${hasErrors(bean: uremetaInstance, field: 'shape', 'error')}</span>
				</div>
			</div>

			<div class="control-group fieldcontain ${hasErrors(bean: uremetaInstance, field: 'shape_details', 'error')} ">
				<label for="shape_details" class="control-label"><g:message code="uremeta.shape_details.label" default="Shape details" /></label>
				<div class="controls">
					<g:textArea class="form-control para-small" name="shape_details" value="${uremetaInstance?.shape_details}"/>
					<span class="help-inline">${hasErrors(bean: uremetaInstance, field: 'shape_details', 'error')}</span>
				</div>
			</div>

			<div class="control-group fieldcontain ${hasErrors(bean: uremetaInstance, field: 'material', 'error')} ">
				<label for="material" class="control-label"><g:message code="uremeta.material.label" default="Material" /></label>
				<div class="controls">
					<g:textField class="form-control" name="material" value="${uremetaInstance?.material}"/>
					<span class="help-inline">${hasErrors(bean: uremetaInstance, field: 'material', 'error')}</span>
				</div>
			</div>

			<div class="control-group fieldcontain ${hasErrors(bean: uremetaInstance, field: 'fabric', 'error')} ">
				<label for="fabric" class="control-label"><g:message code="uremeta.fabric.label" default="Fabric" /></label>
				<div class="controls">
					<g:textField class="form-control" name="fabric" value="${uremetaInstance?.fabric}"/>
					<span class="help-inline">${hasErrors(bean: uremetaInstance, field: 'fabric', 'error')}</span>
				</div>
			</div>

			<div class="control-group fieldcontain ${hasErrors(bean: uremetaInstance, field: 'fabric_description', 'error')} ">
				<label for="fabric_description" class="control-label"><g:message code="uremeta.fabric_description.label" default="Fabric description" /></label>
				<div class="controls">
					<g:textField class="form-control" name="fabric_description" value="${uremetaInstance?.fabric_description}"/>
					<span class="help-inline">${hasErrors(bean: uremetaInstance, field: 'fabric_description', 'error')}</span>
				</div>
			</div>

			<div class="control-group fieldcontain ${hasErrors(bean: uremetaInstance, field: 'munsell_color', 'error')} ">
				<label for="munsell_color" class="control-label"><g:message code="uremeta.munsell_color.label" default="Munsell color" /></label>
				<div class="controls">
					<g:textField class="form-control" name="munsell_color" value="${uremetaInstance?.munsell_color}"/>
					<span class="help-inline">${hasErrors(bean: uremetaInstance, field: 'munsell_color', 'error')}</span>
				</div>
			</div>

			<div class="control-group fieldcontain ${hasErrors(bean: uremetaInstance, field: 'description', 'error')} ">
				<label for="description" class="control-label"><g:message code="uremeta.description.label" default="Description" /></label>
				<div class="controls">
					<g:textArea class="form-control para" name="description" value="${uremetaInstance?.description}"/>
					<span class="help-inline">${hasErrors(bean: uremetaInstance, field: 'description', 'error')}</span>
				</div>
			</div>

			<div class="control-group fieldcontain ${hasErrors(bean: uremetaInstance, field: 'inscriptions', 'error')} ">
				<label for="inscriptions" class="control-label"><g:message code="uremeta.inscriptions.label" default="Inscriptions" /></label>
				<div class="controls">
					<g:textField class="form-control" name="inscriptions" value="${uremetaInstance?.inscriptions}"/>
					<span class="help-inline">${hasErrors(bean: uremetaInstance, field: 'inscriptions', 'error')}</span>
				</div>
			</div>

			<div class="control-group fieldcontain ${hasErrors(bean: uremetaInstance, field: 'condition_object', 'error')} ">
				<label for="condition_object" class="control-label"><g:message code="uremeta.condition_object.label" default="Condition object" /></label>
				<div class="controls">
					<g:textField class="form-control" name="condition_object" value="${uremetaInstance?.condition_object}"/>
					<span class="help-inline">${hasErrors(bean: uremetaInstance, field: 'condition_object', 'error')}</span>
				</div>
			</div>

			<div class="control-group fieldcontain ${hasErrors(bean: uremetaInstance, field: 'technique', 'error')} ">
				<label for="technique" class="control-label"><g:message code="uremeta.technique.label" default="Technique" /></label>
				<div class="controls">
					<g:textField class="form-control" name="technique" value="${uremetaInstance?.technique}"/>
					<span class="help-inline">${hasErrors(bean: uremetaInstance, field: 'technique', 'error')}</span>
				</div>
			</div>

			<div class="control-group fieldcontain ${hasErrors(bean: uremetaInstance, field: 'provenience', 'error')} ">
				<label for="provenience" class="control-label"><g:message code="uremeta.provenience.label" default="Provenience" /></label>
				<div class="controls">
					<g:textField class="form-control" name="provenience" value="${uremetaInstance?.provenience}"/>
					<span class="help-inline">${hasErrors(bean: uremetaInstance, field: 'provenience', 'error')}</span>
				</div>
			</div>

			<div class="control-group fieldcontain ${hasErrors(bean: uremetaInstance, field: 'acquisition', 'error')} ">
				<label for="acquisition" class="control-label"><g:message code="uremeta.acquisition.label" default="Acquisition" /></label>
				<div class="controls">
					<g:textField class="form-control" name="acquisition" value="${uremetaInstance?.acquisition}"/>
					<span class="help-inline">${hasErrors(bean: uremetaInstance, field: 'acquisition', 'error')}</span>
				</div>
			</div>

			<div class="control-group fieldcontain ${hasErrors(bean: uremetaInstance, field: 'period', 'error')} ">
				<label for="period" class="control-label"><g:message code="uremeta.period.label" default="Period" /></label>
				<div class="controls">
					<g:textField class="form-control" name="period" value="${uremetaInstance?.period}"/>
					<span class="help-inline">${hasErrors(bean: uremetaInstance, field: 'period', 'error')}</span>
				</div>
			</div>

			<div class="control-group fieldcontain ${hasErrors(bean: uremetaInstance, field: 'date', 'error')} ">
				<label for="date" class="control-label"><g:message code="uremeta.date.label" default="Date" /></label>
				<div class="controls">
					<g:textField class="form-control" name="date" value="${uremetaInstance?.date}"/>
					<span class="help-inline">${hasErrors(bean: uremetaInstance, field: 'date', 'error')}</span>
				</div>
			</div>

			<div class="control-group fieldcontain ${hasErrors(bean: uremetaInstance, field: 'daterange_start', 'error')} ">
				<label for="daterange_start" class="control-label"><g:message code="uremeta.daterange_start.label" default="Daterange start" /></label>
				<div class="controls">
					<bs:datePicker name="daterange_start" precision="day"  value="${uremetaInstance?.daterange_start}" default="none" noSelection="['': '']" />
					<span class="help-inline">${hasErrors(bean: uremetaInstance, field: 'daterange_start', 'error')}</span>
				</div>
			</div>

			<div class="control-group fieldcontain ${hasErrors(bean: uremetaInstance, field: 'daterange_end', 'error')} ">
				<label for="daterange_end" class="control-label"><g:message code="uremeta.daterange_end.label" default="Daterange end" /></label>
				<div class="controls">
					<bs:datePicker name="daterange_end" precision="day"  value="${uremetaInstance?.daterange_end}" default="none" noSelection="['': '']" />
					<span class="help-inline">${hasErrors(bean: uremetaInstance, field: 'daterange_end', 'error')}</span>
				</div>
			</div>

			<div class="control-group fieldcontain ${hasErrors(bean: uremetaInstance, field: 'daterange_type', 'error')} ">
				<label for="daterange_type" class="control-label"><g:message code="uremeta.daterange_type.label" default="Daterange type" /></label>
				<div class="controls">
					<g:textField class="form-control" name="daterange_type" value="${uremetaInstance?.daterange_type}"/>
					<span class="help-inline">${hasErrors(bean: uremetaInstance, field: 'daterange_type', 'error')}</span>
				</div>
			</div>

			<div class="control-group fieldcontain ${hasErrors(bean: uremetaInstance, field: 'dating', 'error')} ">
				<label for="dating" class="control-label"><g:message code="uremeta.dating.label" default="Dating" /></label>
				<div class="controls">
					<g:textField class="form-control" name="dating" value="${uremetaInstance?.dating}"/>
					<span class="help-inline">${hasErrors(bean: uremetaInstance, field: 'dating', 'error')}</span>
				</div>
			</div>

			<div class="control-group fieldcontain ${hasErrors(bean: uremetaInstance, field: 'dating_details', 'error')} ">
				<label for="dating_details" class="control-label"><g:message code="uremeta.dating_details.label" default="Dating details" /></label>
				<div class="controls">
					<g:textArea class="form-control para-small" name="dating_details" value="${uremetaInstance?.dating_details}"/>
					<span class="help-inline">${hasErrors(bean: uremetaInstance, field: 'dating_details', 'error')}</span>
				</div>
			</div>

			<div class="control-group fieldcontain ${hasErrors(bean: uremetaInstance, field: 'artist', 'error')} ">
				<label for="artist" class="control-label"><g:message code="uremeta.artist.label" default="Artist" /></label>
				<div class="controls">
					<g:textField class="form-control" name="artist" value="${uremetaInstance?.artist}"/>
					<span class="help-inline">${hasErrors(bean: uremetaInstance, field: 'artist', 'error')}</span>
				</div>
			</div>

			<div class="control-group fieldcontain ${hasErrors(bean: uremetaInstance, field: 'attribution', 'error')} ">
				<label for="attribution" class="control-label"><g:message code="uremeta.attribution.label" default="Attribution" /></label>
				<div class="controls">
					<g:textField class="form-control" name="attribution" value="${uremetaInstance?.attribution}"/>
					<span class="help-inline">${hasErrors(bean: uremetaInstance, field: 'attribution', 'error')}</span>
				</div>
			</div>

			<div class="control-group fieldcontain ${hasErrors(bean: uremetaInstance, field: 'comparanda', 'error')} ">
				<label for="comparanda" class="control-label"><g:message code="uremeta.comparanda.label" default="Comparanda" /></label>
				<div class="controls">
					<g:textField class="form-control" name="comparanda" value="${uremetaInstance?.comparanda}"/>
					<span class="help-inline">${hasErrors(bean: uremetaInstance, field: 'comparanda', 'error')}</span>
				</div>
			</div>

			<div class="control-group fieldcontain ${hasErrors(bean: uremetaInstance, field: 'comments', 'error')} ">
				<label for="comments" class="control-label"><g:message code="uremeta.comments.label" default="Comments" /></label>
				<div class="controls">
					<g:textField class="form-control" name="comments" value="${uremetaInstance?.comments}"/>
					<span class="help-inline">${hasErrors(bean: uremetaInstance, field: 'comments', 'error')}</span>
				</div>
			</div>

			<div class="control-group fieldcontain ${hasErrors(bean: uremetaInstance, field: 'bibliography', 'error')} ">
				<label for="bibliography" class="control-label"><g:message code="uremeta.bibliography.label" default="Bibliography" /></label>
				<div class="controls">
					<g:textField class="form-control" name="bibliography" value="${uremetaInstance?.bibliography}"/>
					<span class="help-inline">${hasErrors(bean: uremetaInstance, field: 'bibliography', 'error')}</span>
				</div>
			</div>

			<div class="control-group fieldcontain ${hasErrors(bean: uremetaInstance, field: 'archive_ref', 'error')} ">
				<label for="archive_ref" class="control-label"><g:message code="uremeta.archive_ref.label" default="Archive-ref" /></label>
				<div class="controls">
					<g:textField class="form-control" name="archive_ref" value="${uremetaInstance?.archive_ref}"/>
					<span class="help-inline">${hasErrors(bean: uremetaInstance, field: 'archive_ref', 'error')}</span>
				</div>
			</div>

			<div class="control-group fieldcontain ${hasErrors(bean: uremetaInstance, field: 'beazley_db', 'error')} ">
				<label for="beazley_db" class="control-label"><g:message code="uremeta.beazley_db.label" default="Beazley db number" /></label>
				<div class="controls">
					<g:textField class="form-control" name="beazley_db" value="${uremetaInstance?.beazley_db}"/>
					<span class="help-inline">${hasErrors(bean: uremetaInstance, field: 'beazley_db', 'error')}</span>
				</div>
			</div>

			<div class="control-group fieldcontain ${hasErrors(bean: uremetaInstance, field: 'height', 'error')} ">
				<label for="height" class="control-label"><g:message code="uremeta.height.label" default="Height" /></label>
				<div class="controls">
					<g:textField class="form-control" name="height" value="${uremetaInstance?.height}"/>
					<span class="help-inline">${hasErrors(bean: uremetaInstance, field: 'height', 'error')}</span>
				</div>
			</div>

			<div class="control-group fieldcontain ${hasErrors(bean: uremetaInstance, field: 'diameters', 'error')} ">
				<label for="diameters" class="control-label"><g:message code="uremeta.diameters.label" default="Diameters" /></label>
				<div class="controls">
					<g:textField class="form-control" name="diameters" value="${uremetaInstance?.diameters}"/>
					<span class="help-inline">${hasErrors(bean: uremetaInstance, field: 'diameters', 'error')}</span>
				</div>
			</div>

			<div class="control-group fieldcontain ${hasErrors(bean: uremetaInstance, field: 'handle_height', 'error')} ">
				<label for="handle_height" class="control-label"><g:message code="uremeta.handle_height.label" default="Handle height" /></label>
				<div class="controls">
					<g:textField class="form-control" name="handle_height" value="${uremetaInstance?.handle_height}"/>
					<span class="help-inline">${hasErrors(bean: uremetaInstance, field: 'handle_height', 'error')}</span>
				</div>
			</div>

			<div class="control-group fieldcontain ${hasErrors(bean: uremetaInstance, field: 'other_dims', 'error')} ">
				<label for="other_dims" class="control-label"><g:message code="uremeta.other_dims.label" default="Other dimensions" /></label>
				<div class="controls">
					<g:textField class="form-control" name="other_dims" value="${uremetaInstance?.other_dims}"/>
					<span class="help-inline">${hasErrors(bean: uremetaInstance, field: 'other_dims', 'error')}</span>
				</div>
			</div>

			<div class="control-group fieldcontain ${hasErrors(bean: uremetaInstance, field: 'location', 'error')} ">
				<label for="location" class="control-label"><g:message code="uremeta.location.label" default="Location" /></label>
				<div class="controls">
					<g:textField class="form-control" name="location" value="${uremetaInstance?.location}"/>
					<span class="help-inline">${hasErrors(bean: uremetaInstance, field: 'location', 'error')}</span>
				</div>
			</div>
			
			<div class="control-group fieldcontain ${hasErrors(bean: uremetaInstance, field: 'geolocation', 'error')} ">
				<label for="geolocation" class="control-label"><g:message code="uremeta.geolocation.label" default="Geolocation" /></label>
				<div class="controls">
					<g:select id="geolocation" name="geolocation.id" from="${org.ac.uk.reading.ure.uredb.Geolocation.list()}" optionKey="id" value="${uremetaInstance?.geolocation?.id}" class="many-to-one" noSelection="['null': '']"/>
					<span class="help-inline">${hasErrors(bean: uremetaInstance, field: 'geolocation', 'error')}</span>
				</div>
			</div>

			<div class="control-group fieldcontain ${hasErrors(bean: uremetaInstance, field: 'edited_by', 'error')} ">
				<label for="edited_by" class="control-label"><g:message code="uremeta.edited_by.label" default="Edited by" /></label>
				<div class="controls">
					<g:textField name="edited_by" value="${uremetaInstance?.edited_by}"/>
					<span class="help-inline">${hasErrors(bean: uremetaInstance, field: 'edited_by', 'error')}</span>
				</div>
			</div>

			<div class="control-group fieldcontain ${hasErrors(bean: uremetaInstance, field: 'date_edited', 'error')} ">
				<label for="date_edited" class="control-label"><g:message code="uremeta.date_edited.label" default="Date edited" /></label>
				<div class="controls">
					<g:textField class="form-control" name="date_edited" value="${uremetaInstance?.date_edited}"/>
					<span class="help-inline">${hasErrors(bean: uremetaInstance, field: 'date_edited', 'error')}</span>
				</div>
			</div>

			<div class="control-group fieldcontain ${hasErrors(bean: uremetaInstance, field: 'date_edited_cal', 'error')} ">
				<label for="date_edited_cal" class="control-label"><g:message code="uremeta.date_edited_cal.label" default="Date edited cal" /></label>
				<div class="controls">
					<bs:datePicker name="date_edited_cal" precision="day"  value="${uremetaInstance?.date_edited_cal}" default="none" noSelection="['': '']" />
					<span class="help-inline">${hasErrors(bean: uremetaInstance, field: 'date_edited_cal', 'error')}</span>
				</div>
			</div>
		</div>
		<div class="container-right fields-container col-md-5">

			<div class="control-group fieldcontain ${hasErrors(bean: uremetaInstance, field: 'media', 'error')}  uremeta-media">
				<label for="media" class="control-label"><g:message code="uremeta.media.label" default="Media" /></label>
				<div class="controls">
				<%
                    def uris = [];
                   	uris =  uremetaInstance.media.collect { it.uri }
                    	 %>
					<ure:gridWidgetForImageUris uris="${uris}" gridid="recordedit-media-grid" width="90px" height="90px">
					</ure:gridWidgetForImageUris>
					
					
					<span class="help-inline">${hasErrors(bean: uremetaInstance, field: 'media', 'error')}</span>
				</div>
			</div>
		</div>
			
			
			
<!-- 
			
			 -->


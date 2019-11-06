	

<%
def fields = [:];
record.each {
 	def out2 = [:];
    out2['content'] = it.content;
   	out2['label'] = it.label;
  fields[it.field] = out2
        
}
 %>


<div class="container" id="meta2">
	<!--  images -->
	<div id="ure-images-container" class="row ure-images">
		<div id="ure-images">
		<div class="col-md-12"> 
		<h2 style="text-align:center;color: white;display:none;">Images go here in grid delivered by a tag.</h2>
		<%
		def media;
            
        def images = [];
                if (fields.media) {
    					media = fields.media; 
            			media.content.each { m->   
        					images.push(m.uri);
            			}
            }
            if (images.size() > 8) { images = images[0..8] }
         def keywords = fields.short_title.content.split();
         %>
         
    
	<ure:gridWidgetForImageUris 
		gridid="record-images" 
		klass="recordImageWidget" 
		uris="${images}" 
		displayInfobox="true" height="100px" width="100px" 
		addCellClick="false"
		type="freewall">
	</ure:gridWidgetForImageUris>
	<script src="${resource(dir:'js',file:'meta2.js?v=2')}"></script>
  	
	</div>
	</div>
	</div>
	<!--  technical details -->
	<div class="row ure-technical-details repair">
		<div class="col-md-6">
			<div class="row">
				<div class="col-md-4 ure-record-col-left">Title</div>
				<div class="col-md-8  ure-title">
					${fields.short_title.content}
				</div>
			</div>
			<div class="row">
				<div class="col-md-4 ure-record-col-left">
					${fields.accession_number.label}
				</div>
				<div class="col-md-8 ure-accnum">
					${fields.accession_number.content}
				</div>
			</div>
			<div class="row">
				<div class="col-md-4 ure-record-col-left ">
				<a href="/fieldlist/artist">Artist</a></div>
				<div class="col-md-8 ure-artist">
					${fields.artist.content}
				</div>
			</div>
			<div class="row">
				<div class="col-md-4 ure-record-col-left ">
					${fields.period.label}
				</div>
				<div class="col-md-8 ure-period">
					${fields.period.content}
				</div>
			</div>
			<div class="row">
				<div class="col-md-4 ure-record-col-left">
					${fields.date.label}
				</div>
				<div class="col-md-8 ure-date">
					${fields.date.content}
				</div>
			</div>
			
			</div>
			<!--  1 row 2 cols      end column -->
			<div class="col-md-6">
			<div class="row">
				<div class="col-md-4 ure-record-col-left">
					${fields.technique.label}
				</div>
				<div class="col-md-8  ure-technique">
					${fields.technique.content}
				</div>
			</div>
			<div class="row" data-ure-record-field="shape">
				<div class="col-md-4 ure-record-col-left">
					${fields.shape.label}
				</div>
				<div class="col-md-8 ure-shape">
					${fields.shape.content}
				</div>
			</div>
			<div class="row" data-ure-record-field="material">
				<div class="col-md-4 ure-record-col-left">
					${fields.material.label}
				</div>
				<div class="col-md-8 ure-material">
					${fields.material.content}
				</div>
			</div>
			<div class="row">
				<div class="col-md-4 ure-record-col-left">
					${fields.fabric.label}
				</div>
				<div class="col-md-8 ure-fabric">
					${fields.fabric.content}
				</div>
			</div>
			<!-- 
			<div class="row">
				<div class="col-md-4 ure-record-col-left">
					${fields.diameters.label}
				</div>
				<div class="col-md-8 ure-diameters">
					${fields.diameters.content}
				</div>
			</div>
			<div class="row">
				<div class="col-md-4 ure-record-col-left">
					${fields.height.label}
				</div>
				<div class="col-md-8 ure-height">
					${fields.height.content}
				</div>
			</div>
			<div class="row">
				<div class="col-md-4 ure-record-col-left">
					${fields.handle_height.label}
				</div>
				<div class="col-md-8 ure-handle-height">
					${fields.handle_height.content}
				</div>
			</div>
			-->
			
		</div>
	</div>
	<!--  Description -->
	<div id="ure-description" class="row ure-description ure-record-data repairdiv" data-ure-record-field="description">
		<div class="col-md-12 ure-content">
			${fields.description.content}
		</div>
	</div>
	<!--  bibliography and other details a tabbed view -->
	<!-- 
	http://getbootstrap.com/javascript/#tabs-usage
	
	 -->
	<div id="ure-other-details" class="row ure-other-details">
		<div class="col-md-12" id="other-details-col-outer">
			<div id="other-details-container" class="container">
				
				<ul class="nav nav-tabs">
					<li class="active"><a data-toggle="tab" href="#bibliography">Bibliography</a></li>
					<li><a data-toggle="tab" href="#curation">Curation</a></li>
					<li><a data-toggle="tab" href="#inmuseum">In the Museum</a></li>
					<li><a data-toggle="tab" href="#details">Details</a></li>
				</ul>
				<div class="tab-content repair">
					<div id="bibliography" class="tab-pane fade in active">
						
						<p>${fields.bibliography.content}</p>
					</div>
					<div id="curation" class="tab-pane fade">
					
						<div class="container ure-edited_by">
							<div class="row">
								<div class="col-md-4 ure-record-col-left">
									${fields.edited_by.label}
								</div>
								<div class="col-md-8 ">
									${fields.edited_by.content}
								</div>
							</div>
							<div class="row ure-date_edited">
								<div class="col-md-4 ure-record-col-left">
									${fields.date_edited.label}
								</div>
								<div class="col-md-8 ">
									${fields.date_edited.content}
								</div>
							</div>
						</div>
						
					</div>
					<div id="inmuseum" class="tab-pane fade">
						
						<div class="container ure-location">
							<div class="row">
								<div class="col-md-4 ure-record-col-left">
									${fields.location.label}
								</div>
								<div class="col-md-8 ">
								<!--  LOCXX
								<% 
                                	def loc = fields.location.content;
                                    if (loc =~ /choolloans/) {
                                        println fields.location.content
                                        fields.location.content = "RMS Loans Online";
                                    }
                                 %>
                                 -->
									${fields.location.content}
								</div>
							</div>
						</div>
					</div>
					<div id="details" class="tab-pane fade">
						
						<div class="container ure-dating">
							<div class="row">
								<div class="col-md-4 ure-record-col-left">
									${fields.dating.label}
								</div>
								<div class="col-md-8 ">
									${fields.dating.content}
								</div>
							</div>
						</div>
						<div class="container ure-munsell_color">
							<div class="row">
								<div class="col-md-4 ure-record-col-left">
									${fields.munsell_color.label}
								</div>
								<div class="col-md-8 ">
									${fields.munsell_color.content}
								</div>
							</div>
						</div>
						<div class="container ure-shape_details">
							<div class="row">
								<div class="col-md-4 ure-record-col-left">
									${fields.shape_details.label}
								</div>
								<div class="col-md-8 ">
									${fields.shape_details.content}
								</div>
							</div>
						</div>
						<div class="container ure-condition_object">
							<div class="row">
								<div class="col-md-4 ure-record-col-left">
									${fields.condition_object.label}
								</div>
								<div class="col-md-8 ">
									${fields.condition_object.content}
								</div>
							</div>
						</div>
						<div class="container ure-inscriptions">
							<div class="row">
								<div class="col-md-4 ure-record-col-left">
									${fields.inscriptions.label}
								</div>
								<div class="col-md-8 ">
									${fields.inscriptions.content}
								</div>
							</div>
						</div>
						<div class="container ure-provenience">
							<div class="row">
								<div class="col-md-4 ure-record-col-left">
									${fields.provenience.label}
								</div>
								<div class="col-md-8 ">
									${fields.provenience.content}
								</div>
							</div>
						</div>
						
						
						
						
						
						<div class="container ure-dating_details">
							<div class="row">
								<div class="col-md-4 ure-record-col-left">
									${fields.dating_details.label}
								</div>
								<div class="col-md-8 ">
									${fields.dating_details.content}
								</div>
							</div>
						</div>
						<div class="container ure-attribution">
							<div class="row">
								<div class="col-md-4 ure-record-col-left">
									${fields.attribution.label}
								</div>
								<div class="col-md-8 ">
									${fields.attribution.content}
								</div>
							</div>
						</div>
						<div class="container ure-diameters">
							<div class="row">
								<div class="col-md-4 ure-record-col-left">
									${fields.diameters.label}
								</div>
								<div class="col-md-8 ure-diameters">
									${fields.diameters.content}
								</div>
							</div>
							<!-- 
							<div class="row">
								<div class="col-md-4 ure-record-col-left">
									${fields.height.label}
								</div>
								<div class="col-md-8 ure-height">
									${fields.height.content}
								</div>
							</div>
							<div class="row">
								<div class="col-md-4 ure-record-col-left">
									${fields.handle_height.label}
								</div>
								<div class="col-md-8 ure-handle-height">
									${fields.handle_height.content}
								</div>
							</div>
							-->
						</div>
						
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
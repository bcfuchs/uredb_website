<%
	/** 
	handle metadata for record items
	*/
     
	// get list of field -> val from model
	// exclude or hide
	// TODO we should get these from options
	def excludes = [
        'dating',
        'acquisition'
                	]	
    	def skip = false;
        if (t.field in excludes) { skip = true }
		def hideme_class = "";
		def content
		
				if (t.content == null || t.content == "" || t.content == " ") {
					hideme_class = "ure_hidden";
				}
				else {
                  
					hideme_class = ""
					content = t.content
                   
				}	

			 %>
<g:if test="${skip == false}">
<%
// fix labels -- probably shold be done in caller
if (t.label =~ /(?i)dateCreated/ ) {
    t.label = "Date created";
    
}
if (t.label =~ /(?i)lastUpdated/ ) {
    t.label = "Last updated";
    
}

 %>
 
<tr class="${hideme_class}" data-ure-record-field="${t.field}">
	<td class="reccellhead"><strong>
		<a class="${t.field}" href="/fieldlist/${t.field}">${t.label}</a></strong>
	</td>
	<td class="reccellcontent ure-record-${t.field}">
		<g:if test="${t.field == 'media' }">
			<table class=contentlist>
				<g:each var="i" in="${t.image}">
					<tr>
						<td class="contentlistcell">
						<a href="${i.base}/xlarge/${i.filename}" target="_blank"><img
								src="${i.base}/thumb/${i.filename}" alt="${i.filename}"></a> <br />
							<font size="1"> ${i.filename}</font>
							 <br /> <br />
							 <div class="rec_caption">${i.caption}</div></td>
						<td class="contentlistcontent"><br>-><span class="lighttable-link" href="" 
						data-lighttable-filename="${i.filename}"
						data-lighttable-base="${i.base}"
						data-lighttable-recordid="${recordId}"
						data-lighttable-accession_number="${accnum}">add to myUre</span></td>
					</tr>
				</g:each>
			</table>
		</g:if> <g:else>
			<%
		// fix defects from bad data entry
        //TODO do as a filter
		//TODO repair in db!!!
        //TODO this will fail on t.content being other than string, so cast it. 
		def s = t.content as String;
        
		 if (t.content && t.content) {
			 s = s.replaceAll(/\\n/,'<br/>');
			 s = s.replaceAll(/\\(.)/,'$1');

		 }
		 else {
			 // get rid of nulls
			 s = "";
		 }
		 %>${
             s
		 
		 }</g:else>
			</td>
</tr>
</g:if>
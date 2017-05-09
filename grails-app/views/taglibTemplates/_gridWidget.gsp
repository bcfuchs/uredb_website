<%@ page import="org.springframework.util.ClassUtils"%>
<%@ page import="grails.plugin.searchable.internal.lucene.LuceneUtils"%>
<%@ page import="grails.plugin.searchable.internal.util.StringQueryUtils"%>
<%@ page import="grails.converters.*"%>
<%@ page import="org.ac.uk.reading.ure.uredb.Uremeta"%>
<%@ page import="java.util.logging.Logger"%>
<script src="${resource(dir:'js/vendor/freewall',file:'freewall.js')}"></script>
<script src="${resource(dir:'js',file:'gridwidget.js')}"></script>
<script>
! function() {
  $(document).ready(function(){
    // export from js/gridwidget.js 2
    // ${addCellClick}
  	    $("#${gridid}").hide();
  	    $("#${gridid}").delay(1000).show();
        gridWidget("#${gridid}","${width}","${height}",${displayInfobox},${addCellClick})
   
  
    
  });
}();
</script>

<style>
#${gridid}  {

}
#${gridid} .cell {
	background-size: cover;
	border: 2px solid gray;
	background-position: 50% 50%;
	background-repeat: no-repeat;
	color: #000;
}

#${gridid} .image-infobox {
	background: black;
	color: white;
	opacity: 0.6;
	padding-left: 30px;
}

#${gridid} .image-infobox div {
	line-height: normal;
	padding-bottom: 10px;
}

#${gridid} .image-infobox  .short_title {
	font-style: italic;
	font-weight: bold;
}

#${gridid} .image-infobox .desc {
	line-height: 10px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

#${gridid} .hide-infodiv {
	display: none;
}

.fieldlist-img {
	height: 40px;

}
</style>

<script>
</script>

<div id="${gridid}" class="ure-grid ${klass }">
	<%   def hideInfodiv = (displayInfobox.toBoolean())?"hide-infodiv":"showtheinfobox" %>
	<g:each var="item" in="${info}">
		<% def uri = item.key 
				  def media = item.value.media
				  def rec = item.value.meta
				  def short_title = "--"
				  def showAccNum = false;
				  if (displayAccessionNumber && displayAccesionNumber.toBoolean()) { showAccNum = "display: none;" }
				
				  if (rec && rec.short_title ) {
				      short_title = rec.short_title
				  }
				  if (short_title == " ") { short_title = "title missing..."}
				def ure_image_url = media.uri_local + "/sm/"+ media.uri; 
                def back_url = "background-image: url(" + media.uri_local + "/sm/"+ media.uri +')';
			    if (media.uri_local.trim() == "") {
			       back_url = ""
                   ure_image_url = "";
			        
			    }

		%>
		<g:if test="${rec}">
			<div class="cell gridlist-cell draggable" 
			data-ure-uri="${media.uri}" 
			data-ure-image-url="${ure_image_url}" 
			data-ure-accnum="${rec.accession_number}" 
			data-ure-record="${rec.id}"
			
				style='width:${width}; height: ${height}; ${back_url }'>
				<div class="image-infobox ${hideInfodiv}">
					<div class="name" style="${showAccNum}" data-uri="/record/${rec.accession_number}">
						${rec.accession_number}
					</div>
					<div class="short_title">
						${short_title}
					</div>
					<div class="date">
						${rec.date}
					</div>
					<div class="caption" style="display: none;">
						${media.caption}
					</div>
				</div>
			</div>
		</g:if>
	</g:each>
</div>

<%@ page import="grails.converters.*"%>
<!DOCTYPE html>
<html>
<head>
	<title>Ure Museum Database: ${accnum}</title>
	<meta name="layout" content="ure/main" />  
	<script src="${resource(dir:'js',file:'image-modal.js')}"></script>
	<script src="${resource(dir:'js',file:'eu_comparanda.js?v=2')}"></script>
	
	<script>
		// set global js vars for highlighting text
		
		var  uredb_matcher_hasMatch = false;
		<g:if test="${session.uredb_hasMatch}">
			var uredb_matcher_matchfield = "${session.uredb_matchfield}";
			var uredb_matcher_matchval = "${session.uredb_matchval}";
			 uredb_matcher_hasMatch = true;
		</g:if>
		
		<%
		// now set hasMatch to false so a match is displayed only when there's actually a match. 
		session.uredb_hasMatch  = false;
		%>
		
		$(document).ready(function(){
		 // save data about this object to the DOM
		 $(document).data('ure-item',{accnum:'${accnum}'});
		 $(document).data('eu-items',{})
		 
		// add an item to menubar
		  	$("#breadcrumb-items-left").html('<a href="/fieldlist/accession_number">objects</a> > ${accnum}');
		  	$("#breadcrumb-items-left").css("margin-left","-85px")
		
		  
		})
	</script>
	<style>
		/** hide left nav on param s */
		#left_nav {
		<g:if test="${params.s == 'noleftnav'}">
			display:none;
		</g:if>
		
		}
		
	#left-nav-search {
	display:block !important;
	
}
	</style>
	<g:set var="recordId" value="${id}" scope="request" />
	<g:set var="nextRecordId" value="${nextid}" scope="request" />
	<g:set var="isRecordPage" value="true" scope="request" />
</head>
<body>

<span>
<%
    if (flash.lastURI =~ /searchable/) {
		flash.fromSearch = true
        
        def qs
        if (flash.lastQuerystring != null) {
            qs = "?"+flash.lastQuerystring
        }
        
        flash.searchUrl = flash.lastURI + qs
	}
    
 %>
 </span>
      
	<div id="record-page-wrapper" class="record-page-wrapper">
		<script src="${resource(dir:'js',file:'record.js')}"></script>
		<g:if test="${flash.fromSearch == true}">
			<span id="back2search">
				<a href="${flash.searchUrl}">back to search</a>
			</span>
		</g:if>
		
		<!--  #switcher -->
		<h2>
			${accnum}:
			${short_title}-
			${nextid}
		</h2>
		<div id="record-main">
		
			<div id="meta2">
				<g:render template="/shared/ure/meta2" var="t" model="[record:record]" />
			</div>
			<!--  #meta2 -->
			
			<g:render template="/ure/citationWidget" />
			<h2>Related content from Europeana</h2>
			<% 
           
              // keywords are created in the recordService
              // this is just dev code here
              // probably we need a complex query
              // e.g. (corinthian || (black && figure)
              //TODO -- keywords should be generated per object in db, and available to editor to change. 
			  // IN<-- records
              // OUT--> query, keywords.  
               def make_keywords = {record ->
	             def kw = []
	             def fields = []
	             def test3 = "nno"
	             def fabric = "greece"
	              record.each { rec->
	              	  fields << rec.field;
	                  if (rec.field == "short_title") {
	                  		if (rec.content =~ /red figure/) {
	    					 	kw <<'where:(red+AND+figure)'
	                        //    kw << 'figure'
                                
	                  		}
	                     	if (rec.content =~ /black figure/) {
	                          	kw << 'where:(black+AND+figure)'
	                       //     kw << 'figure'
	                     	}
	                  }
	                  if (rec.field == 'fabric') {
	                          rec.content.replaceAll("[^a-zA-Z ]", "").split().each {
                                 
	                              kw << it
	                          }
	                  }
	              }
		        if (kw.size() > 1) { 
	                keywords = kw
	                } 
		          def test4 = [];
	              
	              
	              if (keywords.size() < 1) {
	                  keywords = ['greece', 'black','figure']
                      keywords = ['where(greece+AND+black+AND+figure)']
                      
                      // where = a joined phrase
                      // so display as "greece, black figure" with one link.
	              }
              return keywords
              }
             def keywords = make_keywords(record)
             def test4 = [];
             keywords.each { test4 << it }
             %>
             
			${test4 }
			<!-- 
			<%
           
            def th = org.codehaus.groovy.grails.web.servlet.mvc.SynchronizerTokensHolder.store(session);
            def token = th.generateToken();
            session['token'] = token;
            %>
	
			
-->
<script src="${resource(dir:'js',file:'prefs_sync.js')}"></script>
<script>
! function(){
	syncRelated("${token}");
	console.log("${token}")
  
}()
</script>
			<div id="europeana-section" style="display:none;">
				<ure:europeanaWidget 
					accnum="${accnum}" 
					keywords="${keywords}" 
					gridid="euwidget" 
					klass="euwidget" 
					displayInfobox="true" 
					height="100px"
					width="100px" />
			</div>
		</div>
		<!-- #record-main -->
	</div>
	<!--  #record-page-wrapper -->
	<%
    	
    	def thumbnail = thumb?.base + "/thumb/"+ thumb?.filename ;
        def iframeModel = [accnum:accnum,short_title:short_title,thumbnail:thumbnail,bla:0]
     %>
     <!--  
     thumbnail : ${thumbnail} ${iframeModel}
      -->
     <g:form useToken="true"></g:form>
	<g:render template="/ure/iframeOverlay" model="${iframeModel}"/>
	<script>
		// set up the eucomparanda collection system
		EuComparanda("${accnum}");
     </script>
</body>
<html>
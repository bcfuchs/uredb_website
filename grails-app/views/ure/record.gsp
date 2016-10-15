<!DOCTYPE html>
<%@ page import="grails.converters.*"%>
<html>
<head>
<title>Ure Museum Database: ${accnum}</title>
<meta name="layout" content="ure/main" />
<% 
         flash.accnum = accnum
         session.accnum = accnum 
         flash.message  = "HI2"
%>
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
	display: block !important;
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
<sec:ifAnyGranted roles='ROLE_CURATOR'>
<a style="text-decoration: none" href="/uremeta/edit/${id}"><i class="icon-pencil"></i> Edit</a>
</sec:ifAnyGranted>
	<div id="record-page-wrapper" class="record-page-wrapper">
		<script src="${resource(dir:'js',file:'record.js')}"></script>
		<g:if test="${flash.fromSearch == true}">
			<span id="back2search">
				<a href="${flash.searchUrl}">back to search</a>
			</span>
		</g:if>

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
			<span style="padding-right: 5px">Europeana query: </span>
			
			<span id="keywords-display"></span>
			<span id="query-display" style="display: none;"></span>
			<g:render template="/ure/queryRetakeWidget" />
			
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
				window.eu_experimental = false;
				if (window.eu_experimental === true) { 
					syncRelated("${token}");
					console.log("${token}")
				}
				  
				}()
			</script>
			<div id="europeana-section" style="display: none;">
				<g:render template="/taglibTemplates/europeanaWidget"
					model='[height:"100px",width:"100px",accnum:accnum,gridid:"euwidget",klass:"euwidget",displayInfobox:true]'>
				</g:render>
			</div>
		
		</div>
		
		<!-- #record-main -->
	</div>
	<!--  #record-page-wrapper -->
	<%
    	def thumbnail = thumb?.base + "/thumb/"+ thumb?.filename ;
        def iframeModel = [accnum:accnum,short_title:short_title,thumbnail:thumbnail,bla:0]
     %>
	<g:form useToken="true"></g:form>
	<g:render template="/ure/iframeOverlay" model="${iframeModel}" />
	<script>
		// set up the eucomparanda collection system
		// this can only be called after grid has finished building!!!
		var signal = "doEuRelated_complete" // fired in europeana_widget.js
		$(window).on(signal, function (e, data) {
		   	EuComparanda("${accnum}");
        	
    });
		
     </script>
</body>
<html>
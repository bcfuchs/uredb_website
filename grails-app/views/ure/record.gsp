<%@ page import="grails.converters.*"%>
<html>
<head>
<title>Ure Museum | ${accnum}</title>
<meta name="layout" content="ure/main" />
<meta name="accnum" content="${accnum}" />
<meta name="nextid" content="${nextid}" />
<% def th = org.codehaus.groovy.grails.web.servlet.mvc.SynchronizerTokensHolder.store(session);def token = th.generateToken(); session['token'] = token;%><meta name="synctoken" content="${token}"/>
<script src="${resource(dir:'js',file:'image-modal.js')}"></script>
<% flash.accnum = accnum %><%  session.accnum = accnum %>
<g:render template="/ure/matcher"></g:render>
<style>
/** hide left nav on param s */
#left_nav { <g:if test="${params.s == 'noleftnav'}">     
				display:none; 
			</g: if>
}

#left-nav-search {
	display: block !important;
}
</style>
<g:set var="recordId" value="${id}" scope="request" /><g:set var="nextRecordId" value="${nextid}" scope="request" /><g:set var="isRecordPage" value="true" scope="request" />
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
		<a style="text-decoration: none" href="/uremeta/edit/${id}">
			<i class="icon-pencil"></i> Edit
		</a>
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
			<script src="${resource(dir:'js',file:'prefs_sync.js')}"></script>
			<div id="europeana-section">
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
	<script src="${resource(dir:'js',file:'eu_comparanda.js?v=2')}"></script>
	<script src="${resource(dir:'js',file:'tests/comparanda_tests.js?v=2')}"></script>
</body>
<html>
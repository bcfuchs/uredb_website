<%@ page import="grails.converters.*"%>
<%@ page import="java.util.logging.Logger"%>

<div id="europeanaWidget">
	<span style="text-decoration: underline; cursor: pointer;" id="filterbymuseum" data-target="#provider-filter"
		data-toggle="collapse">Filter by museum</span>
	<span style="text-decoration: underline; cursor: pointer;" id="relevance-vote" data-relevance-finish="finish tagging"
		data-relevance-toggle="off">Tag as not relevant</span>
	<a style="padding-left: 12px; color: #FFFFCC;" href="/manage/related">Manage search queries </a>
	<span id="query-retake-text" style="padding-left: 12px; text-decoration: underline; cursor: pointer;">custom eu search</span>
	
	<div class="pagination-widget" id="pagination-widget-top" style="display:none">
		<button class="btn btn-xs btn-default" id="firstchunk">&lt;&lt;</button>
		<button  class="btn btn-xs  btn-default"  id="prevchunk">&lt;</button>
		<div id="chunkindex-container"></div>
		<button class="btn btn-xs btn-default" id="nextchunk">&gt;</button>
		<button  class="btn btn-xs  btn-default"  id="lastchunk">&gt;&gt;</button>
		<div id="pager-meta">
		<span class="item-count-start"></span>-<span class="item-count-end"></span> 
		of <span class="total-results"></span>
		</div>
	</div>
	
	<div id="provider-filter" class="collapse controls span2"></div>
	<!--  ajax: populate this grid with data from server  -->
	<div id="eu-widget-meta" class="eu-widget-meta" style="display:none" 
		data-ure-accnum="${accnum}" 
		data-grid-id="${gridid}"
		data-grid-width="${width}"
		data-grid-height="${height}"
		data-display-infobox=true></div>
	<div id="${gridid}" class="ure-grid eu-grid ${klass_ }">
		<%   def hideInfodiv = (displayInfobox)?"hide-infodiv":"showtheinfobox" %>
		<!--  code from static grid in git master < commit ae8e06530236e16e8e0b411e43b7bd99b98ac325  -->
	</div>
</div>
<script id="europeana_widget_js" src="${resource(dir:'js',file:'ure_pager.js?v=2')}"></script>
<script id="europeana_widget_js2" src="${resource(dir:'js',file:'europeana_widget.js?v=2')}"></script>

<div id="gridTemplate" style="display: none;">
	<div class="cell gridlist-cell" data-ure-uri>
		<div class="image-infobox">
			<div class="short_title"></div>
			<div class="date"></div>
			<div class="caption"></div>
		</div>
	</div>
</div>


	
<div id="provider-label-template" style="display: none;">
	<label class="checkbox-inline provider-checklist" data-eu-provider-list='key'>
		<input class="cb-eu" type="checkbox" value='key' checked></input>
	</label>
</div>
<script src="${resource(dir:'js',file:'egg.js?v=2')}"></script>


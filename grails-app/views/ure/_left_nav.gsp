<div class="left_nav1 left-nav-search" id="left-nav-search" style="display: none;">
	<g:render template="/ure/searchbar_small" />
</div>
<div id="comparanda" class="left_nav1" data-placement="top" data-toggle="tooltip"
	title="drag europeana images here to add to comparanda">
	<div>Your comparanda for:</div>
	<div>
	 <span id="current-project-display" class="current-project-display"></span>
	<script>
		(function(){
			$(document).ready(function(){
			$("#current-project-display").html(ure_projects.current());
  		
  	
		})
		})()
	</script>
	</div>

	<div id="comparanda-thumbs"></div>
	<!--  clicks assigned in eu_comparanda.js -->
	<div class="left_nav2 lighttable-controls2">
		<span id="view-comps" data-toggle="tooltip" title="view comparanda page"
			class="ure-control-btn glyphicon glyphicon-eye-open"></span>
		<span id="clear-comps" data-toggle="tooltip" title="clear" class="ure-control-btn glyphicon glyphicon-remove-circle"></span>
		<span id="load-comps" data-toggle="tooltip" title="load" class="ure-control-btn glyphicon glyphicon-upload"></span>
		<span id="save-comps-as-json" data-toggle="tooltip" title="download"
			class="ure-control-btn glyphicon glyphicon-download-alt"></span>
		<span id="save-comps-as-html" data-toggle="tooltip" title="download as html"
			class="ure-control-btn glyphicon glyphicon-file"></span>
		<!-- 
		<span id="manage-related" data-toggle="tooltip" title="manage related items"
			class="ure-control-btn glyphicon glyphicon-wrench"></span>
			-->
		<div id="comps-nav-container" class="ure-dropdown">
			<span id="comps-nav" data-toggle="tooltip" title="comparanda list" class="ure-control-btn glyphicon glyphicon-th-list"
				data-original-title="clear"></span>
			<div id="comparanda-nav-list" class="ure-dropdown-content"></div>
		</div>
		<div id="comps-file-container" style="display: inline">
			<input style="display: none" type="file" id="comps-file" name="comps-file" />
		</div>
	</div>
</div>
<!--  #comparanda -->
<div id="lighttable-links" class="left_nav1 dev-features" data-placement="top" data-toggle="tooltip"
	title="drag object images here to add to lighttable">
	Lighttable
	<div id="lighttable-thumbs"></div>
	<div class="left_nav2 lighttable-controls2">
		<span id="view-lighttable" data-toggle="tooltip" title="view" class="ure-control-btn glyphicon glyphicon-eye-open"></span>
		<span id="clear-lighttable" data-toggle="tooltip" title="clear" class="ure-control-btn glyphicon glyphicon-remove-circle"></span>
		<span id="load-lighttable" data-toggle="tooltip" title="load" class="ure-control-btn glyphicon glyphicon-upload"></span>
		<span id="save-lighttable" data-toggle="tooltip" title="download" class="ure-control-btn glyphicon glyphicon-download-alt"></span>
		<span id="save-lighttable-as-html" data-toggle="tooltip" title="download as html"
			class="ure-control-btn glyphicon glyphicon-file"></span>
		<input style="display: none" type="file" id="lt-file" name="lt-file" />
	</div>
	<style>
.lighttable-controls>div {
	display: inline;
}

.lighttable-controls span {
	margin-left: 3px;
}
</style>
</div>
<!-- #lighttable-links -->
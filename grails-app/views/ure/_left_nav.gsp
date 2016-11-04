<div class="left_nav1 left-nav-search" id="left-nav-search" style="display: none;">
	<g:render template="/ure/searchbar_small" />
</div>
<div class="left_nav1" id="left-nav-project-bar" style="display:none"></div>
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
	<g:render template="/ure/comp_controls"></g:render>
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
<!DOCTYPE html>
<html>
<head>
<title>Ure Museum Database: ${accnum}</title>
<meta name="layout" content="ure/main" />
<script src="${resource(dir:'js',file:'image-modal.js')}"></script>
</head>
<body>
	<h2 class="toggler">Projects</h2>
	<div id="project-strip-container" style="display: none">
		<div id="project-strip"></div>
	</div>
	<div style="clear: both"></div>
	<g:render template="/ure/project_form_modal"></g:render>
	<div style="display: none;">
		<g:render template="/ure/projects_widget"></g:render>
	</div>
	<div id="comparanda-page-wrapper">
		<h2 id="comparanda_spinner">Loading...</h2>
		<div id="comparanda-main" class="comp-toggle" style="display:none;">
			<g:render template="/ure/project_title_display_widget">
			</g:render>
			<div id="project-controls">
				<a id="back-button" class="btn btn-sm" onclick="window.history.back()">&larr;back</a>
				<span id="save-project-edits" class="hand">save</span>
			</div>
			
			<div id="comparanda-list"> </div>
		</div>
	<!-- 
		<div id="projects-main" class="comp-toggle">
			<h2 class="toggler">Projects</h2>
			<a id="back-button" class="btn btn-sm" onclick="window.history.back()">&larr;back</a>
			<div id="projects-list"></div>
		</div>
		-->
		
	</div>
	<script>
    $(document).ready(function() {
      //   $(".toggler").click(function() {
      //     $(".comp-toggle").toggle();
      //      window.make_projects_list();
      //   })
    })
  </script>
	<div id="comp-templates" style="display: none">
		<div id="project-box" class="project-box">
			<div class="project-box-title"></div>
			<div class="project-box-items"></div>
		</div>
		<div id="project-box-item" class="project-box-item">
			<div class="project-box-item-image-container">
				<img src="" />
			</div>
			<div class="project-box-item-caption"></div>
		</div>
	</div>
	<div id="documentation" style="display: none">
	<ul>
	<li>Drag an image up/down to move it to another object area </li>
	<li>The black band 
	<li>Click on the black band to switch to another project </li>
	<li>To remove a project, drag it out of the black band.</li>
	<li>To change a project title, etc. </li>
	</ul>
	</div>
	<script src="${resource(dir:'js',file:'eu_comparanda.js')}?v=2	"></script>
	<script src="${resource(dir:'js',file:'comparanda_page.js')}?v=2"></script>
	
</body>
</html>
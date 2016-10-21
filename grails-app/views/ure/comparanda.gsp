
<!DOCTYPE html>
<html>
<head>
<title>Ure Museum Database: ${accnum}</title>
<meta name="layout" content="ure/main" />
<script src="${resource(dir:'js',file:'image-modal.js')}"></script>
<script src="${resource(dir:'js',file:'eu_comparanda.js?v=2')}"></script>
</head>
<body>
	<style>
	.comparanda-container {
		display: inline-block;
		width: 20%;
	}
		#comparanda-list img {
			max-height: 100px;
		}
		
		#projects-main {
			display: none;
		}
</style>
	<div id="project-strip"></div>
	<div style="clear:both"></div>
	<div style="display:none;">
	<g:render template="/ure/projects_widget"></g:render>
	</div>
	<div id="comparanda-page-wrapper">
		<div id="comparanda-main" class="comp-toggle">
			<h2 class="toggler">Comparanda</h2>
			<a id="back-button" class="btn btn-sm" onclick="window.history.back()">&larr;back</a>
			<div id="comparanda-list"></div>
		</div>
		<div id="projects-main" class="comp-toggle">
			<h2 class="toggler">Projects</h2>
			<a id="back-button" class="btn btn-sm" onclick="window.history.back()">&larr;back</a>
			<div id="projects-list"></div>
		</div>
	</div>
	<script src="${resource(dir:'js',file:'comparanda_page.js"?v=2')}"></script>
	<script>
    $(document).ready(function() {
      $(".toggler").click(function() {
        $(".comp-toggle").toggle();
        window.make_projects_list();
      })
    })
  </script>
	<div id="comp-templates" style="display: none">
		<div id="project-box" class="project-box">
			<div class="project-box-title"></div>
			<div class="project-box-items">
				
			</div>
		</div>
		<div id="project-box-item" class="project-box-item">
	
					<div class="project-box-item-image-container">
					<img src=""/></img>
					</div>
					<div class="project-box-item-caption"></div>
				</div>
	</div>
	<style>
	
	</style>
</body>
</html>

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
</style>
	<div id="comparanda-page-wrapper">

		<div id="comparanda-main" class="comp-toggle">
			<h2 class="toggler">Comparanda</h2>
			<a id="back-button" class="btn btn-sm" onclick="window.history.back()">&larr;back</a>
			<div id="comparanda-list"></div>
		</div>
		<div id="projects-main" class="comp-toggle">
			<h2  class="toggler">Projects</h2>
			<a id="back-button" class="btn btn-sm" onclick="window.history.back()">&larr;back</a>
			<div id="projects-list"></div>
		</div>
	</div>
	<style>
		#comparanda-list img {
			max-height: 100px;
		}
		
		#projects-main {
			display:none;
		}
</style>
	<script src="${resource(dir:'js',file:'comparanda_page.js"?v=2')}"></script>
	<script>
$(document).ready(function(){
  $(".toggler").click(function(){
  $(".comp-toggle").toggle();
  window.make_projects_list();
  })
})
	</script>
</body>
</html>
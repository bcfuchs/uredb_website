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
		<div id="comparanda-main">
			<h2>Comparanda</h2>
			<a id="back-button" class="btn btn-sm" onclick="window.history.back()">&larr;back</a>
			<div id="comparanda-list"></div>
		</div>
	</div>
	<style>
#comparanda-list img {
	max-height: 100px;
}
</style>
	<script src="${resource(dir:'js',file:'comparanda_page.js"?v=2')}"></script>
</body>
</html>
<html>
<head>

<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>

<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>
<link href="/bootstrap/css/bootstrap.css" rel="stylesheet">
<link href="/bootstrap/css/bootstrap-responsive.css" rel="stylesheet">
<link href="/bootstrap/css/bootstrap-modal.css" rel="stylesheet">
<link href="/bootstrap/css/fmn.css" rel="stylesheet">
</head>
<body>
	<a class="db_Modal" data-toggle="modal" href="#dbModal">show in db</a>
	
	<div id="dbModal" class=" modal container hide fade">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal"
				aria-hidden="true">×</button>
			<h3>Ure DB</h3>
		</div>
		<div class="modal-body">Hi!</div>
	</div>
	<g:render template="/shared/ure/bootstrap"></g:render>
</body>
</html>
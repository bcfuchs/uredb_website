<%@ page import="org.ac.uk.reading.ure.uredb.*"%>
<html>
<head>
<meta name="layout" content="ure/editor" />
</head>
<body>
	<div id="editor-greeting" class="jumbotron">
	<h2>
		Hello
		<sec:loggedInUserInfo field="username" />!
		</h2>
	
		<p>What would you like to do? </p>
	</div>
	<div class="clearboth"></div>
	
	<ul id="options-list" class="list-group">
		<li class="list-group-item">
			<a onclick="$('#content').fadeOut();" class="button ui-corner-all btn" href="/admin/selpicdir">Assign pictures to objects</a>
			<span class="glyphicon glyphicon-circle-arrow-right glyph-hide" style=""></span>
		</li>
		<li class="list-group-item">
			<a class="button btn" href="/uremeta/create">Create a new record</a>
			<span class="glyphicon glyphicon-circle-arrow-right glyph-hide" style=""></span>
		</li>
		<!-- 
		<li class="list-group-item">
		
			<a class="button ui-corner-all btn" href="#" data-href="urepix.multi.cgi?step=reasrec" target="_blank">delete/reassign
				accession numbers</a>
				<span class="glyphicon glyphicon-circle-arrow-right glyph-hide" style=""></span>
		</li>
		<li class="list-group-item">
			<a class="button ui-corner-all btn" href="" data-href="urepix.multi.cgi?step=piclist" target="_blank">delete/reassign
				pictures</a>
				<span class="glyphicon glyphicon-circle-arrow-right glyph-hide" style=""></span>
		</li>
		 -->
		<li class="list-group-item">		
			<a class="button ui-corner-all btn" href="/user" data-href="/user" target="_blank">Create/update users and roles</a>
				<span class="glyphicon glyphicon-circle-arrow-right glyph-hide" style=""></span>
		</li>
	</ul>
<script>
$(document).ready(function(){
$('#options-list li').hover(function () {
  console.log('hover')
  console.log( $(this).find(".glyphicon"))
  $(this).find(".glyphicon").removeClass('glyph-hide');

}, function () {
  $(this).find(".glyphicon").addClass('glyph-hide');
});
});

</script>
</body>
</html>

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
<h2>Comparanda </h2>
<div id="comparanda-list"></div>
</div>


</div>
<style>
#comparanda-list img {
max-height: 100px;


}

</style>
<script>

EuComparanda();
$(document).ready(function(){
$("#comparanda").hide();
  var eu = comparanda_getEUdata();
	for (var k in eu) {
	
		$("#comparanda-list").append("<div style='clear:both;'></div><hr/>")
		$("#comparanda-list").append('<a href="/record/'+k+'">'+"<h2>"+k+"</h2></a>")
		$("#comparanda-list").append('<img src="'+eu[k]['thumb']+'"/><br/>');
		
		for (var i in eu[k]) {
		  if (i === 'thumb') {
				continue;
			  }
		  var link = eu[k][i]['link']
		  var provider = eu[k][i]['provider']
			console.log(eu[k][i])
		  var item = '<div class="row"><img src="'+i+'"/></div>';	
		  var title = '<div class="row"><a href="'+link+'"><span>'+provider+'</span></a></div>'
		  var container = '<div class="container comparanda-container">'+item+title+'</div>' 
		  $("#comparanda-list").append(container);

			}
		}
  
})


</script>
</body>
</html>
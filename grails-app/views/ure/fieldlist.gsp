<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
        "http://www.w3.org/TR/1999/REC-html401-19991224/loose.dtd">
<html>
<head>
<title>Ure Museum Database</title>
<meta name="layout" content="ure/main" />     
<script src="${resource(dir:'bootstrap/js',file:'bootstrap-typeahead.js')}"></script>
<script src="${resource(dir:'js',file:'stops.js')}"></script>
<script src="${resource(dir:'js',file:'toggler.js')}"></script>

<script>
$(document).ready(function(){
  
   $(".wordcellhead[data-ure-field='munsell_color'] a").each(function(){

     $(this).attr('href',$(this).attr('href').replace("%5C%2F",'--'));
     $(this).html($(this).html().replace('\\/','/'));
  });

});


</script>
<style>
		.page_title_1 {
			margin: 0 0 20px 20px;
		}
		#list-toggler {
			margin: 0 0 20px -10px
		}
</style>	

</head>
<body>
	<!-- fieldlist.gsp -->
	
	
	<div class="page_title_1">
		Words in field "${rlist.f}"
	</div>
	<span class="flash_message">
		${flash.message}
	</span>
	<div id="list-toggler" class="container btn-group">
		<button class="list-toggler btn btn-default" data-toggler-target="#wordlistwidget-container">word list</button>
		<button class="list-toggler btn btn-default" data-toggler-target="#wormapwidget-container">bar chart</button>
	</div>
	<div id="wordlistwidget-container">
		<ure:wordlistWidget klass="wordlist-widget" words="${rlist.words}" wordcount="${rlist.wc}"  f="${rlist.f }" thumbs="${rlist.thumbs}"></ure:wordlistWidget>
	</div>
	<div id="wormapwidget-container">
		<ure:wordmapWidget klass="wordmap-widget" words="${rlist.wc}" max="30"></ure:wordmapWidget>
	</div>
</body>
<html>
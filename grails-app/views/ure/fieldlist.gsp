<!DOCTYPE html>
<html>
<head>

<title>Ure Museum | field</title>
<meta name="layout" content="ure/main" />     
<script src="${resource(dir:'bootstrap/js',file:'bootstrap-typeahead.js')}"></script>
<script src="${resource(dir:'js',file:'stops.js')}"></script>
<script src="${resource(dir:'js',file:'toggler.js')}"></script>
<script>
/** quickfix for db conversion error */
$(document).ready(function(){
  
   $(".wordcellhead[data-ure-field='munsell_color'] a").each(function(){

     $(this).attr('href',$(this).attr('href').replace("%5C%2F",'--'));
     $(this).html($(this).html().replace('\\/','/'));
  });

});
</script>
<link href="/css/ure/fieldlist.css" rel="stylesheet">

</head>
<body>
	<!-- fieldlist.gsp -->
	
	
	<div class="page_title_1">
		Words in field "${rlist.f}"
	</div>
	<span class="flash_message">
		${flash.message}
	</span>
	<div id="list-toggler" class="container">
		<span class="list-toggler list-toggler-item" data-toggler-target="#wordlistwidget-container">word list</span>
		<span class="list-toggler list-toggler-item" data-toggler-target="#wormapwidget-container">frequency chart</span>
	</div>
	<div id="wordlistwidget-container">
		<ure:wordlistWidget klass="wordlist-widget" words="${rlist.words}" wordcount="${rlist.wc}"  f="${rlist.f }" thumbs="${rlist.thumbs}"></ure:wordlistWidget>
	</div>
	<div id="wormapwidget-container">
		<ure:wordmapWidget klass="wordmap-widget" words="${rlist.wc}" max="30"></ure:wordmapWidget>
	</div>
</body>
<html>
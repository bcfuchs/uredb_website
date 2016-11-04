<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
        "http://www.w3.org/TR/1999/REC-html401-19991224/loose.dtd">
<html>
<head>

<title>Ure Museum | field</title>
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
		.list-toggler-item {
			padding-left: 5px;
			padding-right: 5px;
		}
		
		.list-toggler-item-on {
			color: white;
			text-decoration:underline;
		}
		
		.list-toggler-item-off {
		
			color: white;
		}
		
		.flash_message {
			display:none;
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
	<div id="list-toggler" class="container">
		<span class="list-toggler list-toggler-item" data-toggler-target="#wordlistwidget-container">word list</span>
		<span class="list-toggler list-toggler-item" data-toggler-target="#wormapwidget-container">chart</span>
	</div>
	<div id="wordlistwidget-container">
		<ure:wordlistWidget klass="wordlist-widget" words="${rlist.words}" wordcount="${rlist.wc}"  f="${rlist.f }" thumbs="${rlist.thumbs}"></ure:wordlistWidget>
	</div>
	<div id="wormapwidget-container">
		<ure:wordmapWidget klass="wordmap-widget" words="${rlist.wc}" max="30"></ure:wordmapWidget>
	</div>
</body>
<html>
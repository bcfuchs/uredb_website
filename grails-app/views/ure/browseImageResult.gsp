
<html>
<head>
<title>Ure Museum Database</title>
<meta name="layout" content="ure/main" />     


</head>
<body>

	<!-- browseImageResults.gsp -->
	<div id="results_title">
		${rlist.size() } result<g:if test="${ rlist.size() > 1 }">s</g:if> for <span>${val}</span> in field <span><a id="fieldlink" href="/imagelist/${f}">${f}</span>
		<g:if test="${ rlist.size() > 4 }"><span class="show_all" style="float:right;">show all...</span></g:if>
	</div>
	<g:render template="/ure/imagelist" model="[imagelist:rlist]"/>
<g:if test="${ rlist.size() > 4 }">
<script>
$(document).ready(function(){

  $(".show_all").click(function() {
    var more_text = "show all..."
    var less_text = "show less..."
    $(this).html() === more_text ? $(this).html(less_text) : $(this).html(more_text)
    $(".browse_image_result.hideable").toggleClass("hideme");
  })

  
})
</script>
</g:if>
</body>
<html>
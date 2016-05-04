<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
        "http://www.w3.org/TR/1999/REC-html401-19991224/loose.dtd">
<html>
<head>
<title>Ure Museum Database</title>
<meta name="layout" content="ure/main" />     
<script>
  $(document).ready(function() {
    var doNotList = ${doNotList}
  
    $("#navbar-browse").addClass("navbar-item-active");
    $(".wordcellhead").each(function(i, v) {
      var f = $(v).attr('data-ure-field');

      if ($.inArray(f, doNotList) !== -1) {
        $(v).hide();

      } else {

      }
    })
  });
</script>
</head>
<body>
	<!-- broseRecords.gsp -->
	<div>
	<div id="fieldlist-title">
		Browse records according to:
	</div>
	<div>
	<ul class="recfields ">
		<g:each in="${rlist}" var="t">
			<li class="wordcellhead" data-ure-field="${t.key}"><a href="/fieldlist/${t.key}">
					${t.value}
				</a></li>
		</g:each>
	</ul>
	</div>
	</div>
</body>
</html>

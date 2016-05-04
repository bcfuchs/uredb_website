<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
        "http://www.w3.org/TR/1999/REC-html401-19991224/loose.dtd">
<html>
    <head>
        <title>Ure Museum Database</title>
        <meta name="layout" content="ure/main" />     
    </head>

<body>
<!-- browseImages.gsp -->
      <p>Browse images according to </p>

     

      <ul class="recfields">
		<g:each in="${rlist}" var="t">
		<li class="wordcellhead"><a href="/imagelist/${t.key}">${t.value}</a></li>
</g:each>
</ul>

      
</body>
</html>

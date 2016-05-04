<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
        "http://www.w3.org/TR/1999/REC-html401-19991224/loose.dtd">
<html>
    <head>
        <title>Ure Museum Database</title>
        <meta name="layout" content="ure/main" />     
    </head>
 <g:applyLayout name="ure/quickstart2">   
<body>
	<content tag="header">
		<!-- Empty Header -->
	</content>
	
  	<section id="Error" class="">
		<div class="big-message">
			<div class="container">
				<h1 style="text-align:left !important;">
					Page not found!
					
				</h1>
				<!-- 
				<h2>
					<g:message code="error.404.title"/>
				</h2>
				-->
				<p>
					<g:message code="error.404.callout" args="${error404callout}"/>
					
				</p>
				
				<div class="actions" style="margin-top:40px;">
					<a href="${createLink(uri: '/')}" class="">
						<i class="icon-chevron-left icon-white"></i>
						Back to home page
					</a>
								
				</div>
			</div>
		</div>
	</section>
  
  
  </body>
  </g:applyLayout>
</html>
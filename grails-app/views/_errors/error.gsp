<html>
	<head>
		<title>Uredb 500</title>
		<meta name="layout" content="ure/main"    />
		<g:set var="layout_nomainmenu"		value="${true}" scope="request"/>
		<g:set var="layout_nosecondarymenu"	value="${true}" scope="request"/>
		<style>
		#details { display:none}
		</style>
		
		<script>
		easterEgg('j',function(){
			$(document).ready(function(){
				$("#details").toggle();
			});
			})
		</script>
	</head>

  <body>
    
    <h1>We've run into a problem...</h1>
    <h2>Please return to the <a href="/">home page</a> and try again</h2>
    <div id="details">
	<section id="overview" class="">
    	<div class="alert alert-error">
			${request.'javax.servlet.error.message'.indexOf(':') != -1 ? request.'javax.servlet.error.message'?.substring(0, request.'javax.servlet.error.message'?.indexOf(':')).encodeAsHTML() : request.'javax.servlet.error.message'?.encodeAsHTML()}
			<g:if test="${request.'javax.servlet.error.message' == null}">
			</g:if>
			<g:elseif test="${request.'javax.servlet.error.message'.indexOf(':') != -1}">
				${request.'javax.servlet.error.message'?.substring(0, request.'javax.servlet.error.message'?.indexOf(':')).encodeAsHTML()}
			</g:elseif>
			<g:else>
				${request.'javax.servlet.error.message'?.encodeAsHTML()}
			</g:else>
			<g:if test="${exception}">
				${exception.className}
				has problem at line ${exception.lineNumber}
			</g:if>
 	   </div>
	</section>
		
	<section id="details" class="">
	    <h2>Error Details...</h2>
	  	<div class="message">
			<table class="table">
				<tbody>
					<tr>
						<td><strong>Error ${request.'javax.servlet.error.status_code'}</strong></td>
						<td>
							${request.'javax.servlet.error.message'.encodeAsHTML()}
						</td>
					</tr>
					<tr>
						<td><strong>Servlet</strong></td>
						<td>
							${request.'javax.servlet.error.servlet_name'}
						</td>
					</tr>
					<tr>
						<td><strong>URI</strong></td>
						<td>
							${request.'javax.servlet.error.request_uri'}
						</td>
					</tr>
				<g:if test="${exception}">
					<tr>
						<td><strong>Exception Message:</strong></td>
						<td>
							${exception.message?.encodeAsHTML()}
						</td>
					</tr>
					<tr>
						<td><strong>Caused by:</strong></td>
						<td>
							${exception.cause?.message?.encodeAsHTML()}
						</td>
					</tr>
					<tr>
						<td><strong>Class:</strong></td>
						<td>
							${exception.className}
						</td>
					</tr>
					<tr>
						<td><strong>At Line:</strong>
						</td>
						<td> [${exception.lineNumber}]</td>
					</tr>
			  		<tr>
						<td><strong>Code Snippet:</strong></td>
						<td>
				  		<div class="snippet">
				  			<g:each var="cs" in="${exception.codeSnippet}">
				  				${cs?.encodeAsHTML()}<br />
				  			</g:each>
				  		</div>
				  		</td>
					</tr>
				</g:if>
				</tbody>
			</table>
	  	</div>
	</section>

	<g:if test="${exception}">
		<section id="exception">
		    <h2>Stack Trace</h2>
		    <div class="stack">
		      <pre><g:each in="${exception.stackTraceLines}">${it.encodeAsHTML()}<br/></g:each></pre>
		    </div>
		</section>
	</g:if>
	</div>
  </body>
</html>
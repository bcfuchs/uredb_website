<html>
<head>
<title><g:message code="springSecurity.login.title" /></title>
<meta name="layout" content="/ure/auth_layout" />
<g:set var="layout_nomainmenu" value="${true}" scope="request" />
<g:set var="layout_nosecondarymenu" value="${true}" scope="request" />
<style>
</style>
</head>
<body>
	<!--  auth.gsp -->
	<section id="login" class="first content">
		<div id="login-form-container">
			<form id='loginForm' class='form-signin img-rounded' action='${postUrl}' method='POST' autocomplete='off'>
				<h2>
					<g:message code="uredb.login.header" />
				</h2>
				<label for='username' class="sr-only">
					<g:message code="springSecurity.login.username.label" />
					:
				</label>
				<input type='text' class='form-control' name='j_username' id='username' placeholder="username" />
				<label for="inputPassword" class="sr-only">Password</label>
				<input type='password' class='form-control' name='j_password' id='password' placeholder="password" />
				<div class="checkbox">
					<label>
						<input type="checkbox" name="${rememberMeParameter}" value="${hasCookie}">
						Remember me
					</label>
				</div>
				<button class="btn btn-lg btn-primary btn-block" type="submit">Log in</button>
			</form>
		</div>
	</section>
	<script type='text/javascript'>
  <!--
    (function() {
      document.forms['loginForm'].elements['j_username'].focus();
    })();
  // -->
  </script>
</body>
</html>


<div id="login-link-container" class="login-button-wrapper">
	<div id="login-button-wrapper" class="login-link">
		+
		<a id="login-button" data-toggle="modal" data-target="#login-modal"> login </a>
	</div>
	<div id="logged-in-info2" class="login-link">
		You are signed in as
		<span id="gplus-name"></span>
	</div>
	<div id="logout-button" class="login-link">
		<a href="#" onclick="onGoogleSignOut();">Sign out</a>
	</div>
</div>
<script>
  $(document).ready(function() {
    //reposition the new project button

    $(".login-choice").click(function() {
      $("#login-modal").modal('hide');

    })

  })
</script>
<!-- Modal -->
<div class="modal fade" id="login-modal" tabindex="-1" role="dialog" aria-labelledby="login-modal-label">
	<div class="modal-dialog">
		<div class="modal-content">
			<!-- Modal Header -->
			<div class="modal-header">
				<button type="button" id="close-modal" class="close" data-dismiss="modal">
					<span aria-hidden="true">&times;</span>
					<span class="sr-only">Close</span>
				</button>
				<h4 class="login-modal-title" id="login-modal-label">Sign in with Google</h4>
			</div>
			<!-- Modal Body -->
			<div class="login-modal-body">
				<div class="login-choice-container">
					<div id="g-signin-button" class="login-choice">
						<div class="g-signin2" id="g-signin2" data-cookiepolicy="single_host_origin" data-onsuccess="onGoogleSignIn"
							data-onfailure="onGoogleSignInFail" data-theme="dark" data-height="50" data-width="250"
							data-clientid="851919155896-p7ltpoc45oetrmpen0aghenut5am6vcu.apps.googleusercontent.com"
							data-scope="https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/drive.appdata"></div>
					</div>
					<div id="no-login" type="button" class="login-choice btn btn-primary">
						<span>No thanks!</span>
					</div>
				</div>
			</div>
			<!-- Modal Footer -->
			<div class="modal-footer">
				<!-- 
				<button id="new-project-save" type="button" class="btn btn-default">Submit</button>
				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				-->
			</div>
		</div>
	</div>
</div>

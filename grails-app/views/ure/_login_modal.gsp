
<style>
#login-link-container {
	position: relative;
	display: inline;
	width: 100%;
	font-size: 12px;
	background-color: black;
	color: grey;
	height: 10px;
	margin: 10px 10px 10px 10px;
	margin: 10px 10px 10px 40px;
	top: 20px;
	cursor: pointer;
}

.login-link {
		display: inline-block;
}

#login-modal {
	color: black;
}

.login-modal-body .form-horizontal .col-sm-2,.login-modal-body .form-horizontal .col-sm-10
	{
	width: 100%
}

.login-modal-body .form-horizontal .control-label {
	text-align: left;
}

.login-modal-body .form-horizontal .col-sm-offset-2 {
	margin-left: 15px;
}

#login-modal-label {
	color: black;
    font-size: 24pt;
    margin: 0 auto;
    width: 500px;
    text-align: center;
}

#logged-in-info {
	display: none;
}

.login-choice {
	display: inline-block;
//	text-decoration: underline;
}

.login-choice-container {
	margin: 0 auto;
	width: 500px;
}
.login-choice:hover {
	cursor: pointer;
}

#no-login {
      position: absolute;
    margin-left: 40px;
    font-size: 16px;
    height: 50px;
    width: 200px;
   background: #4285f4 !important;
}
#no-login:hover {
	border-color: rgba(82, 168, 236, 0.8);
	box-shadow: 0px 0px 8px rgba(82, 168, 236, 0.6);  
	background: #286090 !important;  
}

#no-login span {
	display: inline-block;
    position: absolute;
    left: 60px;
    top: 13px;
}
.abcRioButton.abcRioButtonBlue {
    /* background: pink; */
 
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    -webkit-box-shadow: none;
	-moz-box-shadow: none;
	box-shadow: none;
    }
.abcRioButtonContentWrapper:hover {
	background: #286090;
	border-color: rgba(82, 168, 236, 0.8) !important;
	box-shadow: 0px 0px 8px rgba(82, 168, 236, 0.6); 
}
    
#g-signin2  {
display: inline-block;
}
#g-signin2  div {
display: inline=block;
}
</style>

<div id="login-link-container" class="login-button-wrapper">
	
	<div id="login-button-wrapper" class="login-link">+
		<a id="login-button" data-toggle="modal" data-target="#login-modal"> login </a>
	</div>
	<div id="logged-in-info2" class="login-link">You are signed in as 
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
<div class="modal fade" id="login-modal" tabindex="-1" role="dialog" aria-labelledby="login-modal-label" are>
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
						<div class="g-signin2" id="g-signin2" 
							data-cookiepolicy="single_host_origin" 
							data-onsuccess="onGoogleSignIn"
							data-onfailure="onGoogleSignInFail"
							data-theme="dark"
							data-height="50"
							data-width="250"
							data-clientid="851919155896-p7ltpoc45oetrmpen0aghenut5am6vcu.apps.googleusercontent.com"
							data-scope="https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/drive.appdata"> 
						</div>
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
<script src=""><cookieStorage</script>
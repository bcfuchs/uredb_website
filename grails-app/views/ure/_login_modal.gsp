<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
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

.modal-body .form-horizontal .col-sm-2,.modal-body .form-horizontal .col-sm-10
	{
	width: 100%
}

.modal-body .form-horizontal .control-label {
	text-align: left;
}

.modal-body .form-horizontal .col-sm-offset-2 {
	margin-left: 15px;
}

.modal-title {
	color: black;
	font-size: 18pt;
}

#logged-in-info {
	display: none;
}

.login-choice {
	display: inline;
//	text-decoration: underline;
}

.login-choice:hover {
	cursor: pointer;
}

#no-login {
    position: absolute;
    margin-left: 10px;
    font-size: 12px;
}
</style>
<div id="login-link-container" class="login-button-wrapper">
	+
	<div id="login-button-wrapper" class="login-link">
		<a id="login-button" data-toggle="modal" data-target="#login-modal"> login </a>
	</div>
	<div id="logged-in-info" " class="login-link">Logged in info</div>
</div>
<style>
#new-project-button:hover {
	cursor: pointer;
}

#compwrap {
	margin-top: 40px;
}
</style>
<script>
  $(document).ready(function() {
    //reposition the new project button

    $(".login-choice").click(function() {
      $("#login-modal").modal('hide');

    })

  })
</script>
<!-- Modal -->
<div class="modal fade" id="login-modal" tabindex="-1" role="dialog" aria-labelledby="login-modal-label" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<!-- Modal Header -->
			<div class="modal-header">
				<button type="button" id="close-modal" class="close" data-dismiss="modal">
					<span aria-hidden="true">&times;</span>
					<span class="sr-only">Close</span>
				</button>
				<h4 class="modal-title" id="login-modal-label">Log In</h4>
			</div>
			<!-- Modal Body -->
			<div class="modal-body">
				<style>
</style>
				<div class="login-choice-container">
					<div id="g-signin-button" class="login-choice">
						<span class="g-signin" data-cookiepolicy="single_host_origin" data-callback="on3"
							data-clientid="851919155896-p7ltpoc45oetrmpen0aghenut5am6vcu.apps.googleusercontent.com"
							data-scope="https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/drive.appdata"> </span>
					</div>
					<div id="no-login" type="button" class="login-choice btn btn-primary">
					No thanks!
					</div>
				</div>
			</div>
			<!-- Modal Footer -->
			<div class="modal-footer">
				<button id="new-project-save" type="button" class="btn btn-default">Submit</button>
				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			</div>
		</div>
	</div>
</div>
<script>
  /**
   * 
   * 
   * Is the user signed in? 
   *   Start: assume not signed in, check
   * 	Yes: init, show logged in display
   * 	No: show the sign-in button,   
   *     
   *     [ Choose use google or continue anon]
   *
   */
  !function() {

    var signedIn = function() {
      console.log("signedIn");
    }

    var signInSignal = function() {
      var e = $.Event('ure_gapi_signed_in');
      $(window).trigger(e);

    }

    var on3 = function() {
      gapi.load('auth2', function() {
        gapi.auth2.init({
          fetch_basic_profile : false,
          scope : 'https://www.googleapis.com/auth/plus.login'

        }).then(function() {
          var auth2 = gapi.auth2.getAuthInstance();
          //auth2.isSignedIn.listen(function(d){console.log("signed in!<----")});
          //console.log(auth2.currentUser.get().getGrantedScopes());
          // broadcast the signed-in signal
          signInSignal();

        });
      });
    };

    window.on3 = on3;
    var init_login_box = function() {
      var signal = 'ure_gapi_signed_in';
      $(window).on(signal, function(e, d) {
        alert("signed in!")
    //    $("#login-button").hide();
    //    $("#logged-in-info").show();

      });
    }
    $(document).ready(function() {
      init_login_box();
    });
  }();
</script>

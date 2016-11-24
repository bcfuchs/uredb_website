!function() {
  /**
   * Gplus login behaviour: - on init:
   * 
   * check if session logged in. yes: login, no: logout - on login: show user
   * info + log out link send login signal - on logout: show log in link send
   * logged out signal
   * 
   * 
   */

  var gplus_auth = (function() {
    var user, auth2, id, name, email, nameSelector, config;

    config = {
      nameSelector : "#gplus-name",
      loginButtonSelector : "#login-button-wrapper",
      logoutButtonSelector : "#logout-button",
      loggedInInfoSelector : "#logged-in-info2"
    };
    function init() {
      $(document).ready(function() {
        $(config.loginButtonSelector).show();
        $(config.logoutButtonSelector).hide();
        $(config.loggedInInfoSelector).hide();
      });
    }
    function onSignInFail() {
      alert("failed to sign you in");
    }

    function _signInSignal() {
      var e = $.Event('ure_gapi_signed_in');
      $(window).trigger(e);

    }
    function _signOutSignal() {
      var e = $.Event('ure_gapi_signed_out');
      $(window).trigger(e);
    }

    function onSignIn() {
      alert("Signed in!");
      auth2 = gapi.auth2.getAuthInstance();
      user = auth2.currentUser.get();
    
      setProfileInfo();
      _signInSignal();
      $(config.loginButtonSelector).hide();
      $(config.logoutButtonSelector).show();
      $(config.loggedInInfoSelector).show();

    }

    function onSignOut() {
      auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function() {
        alert("Signed out!")
        $(config.loginButtonSelector).show();
        $(config.logoutButtonSelector).hide();
        $(config.loggedInInfoSelector).hide();
        _signOutSignal()
      });
    }

    function setProfileInfo() {
      var profile = user.getBasicProfile();
      id = profile.getId();
      name = profile.getName();
      email = profile.getEmail();

      $(document).ready(function() {
        $(config.nameSelector).html(name);
        alert(name);
      });
    }
    // TODO--show nothing on init
    // show login only if init fails to log in. need timeout for this.
    init();
    window.onGoogleSignIn = onSignIn;
    window.onGoogleSignOut = onSignOut;
    window.onGoogleSignInFail = onSignInFail;

    return {
      config : config,
      init : init
    };

  })();
  window.ure_gplus_auth = gplus_auth;
}();
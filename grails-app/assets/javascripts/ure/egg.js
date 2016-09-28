!function() {

  var easterEgg = function(pass, f) {
    var easterEgg = pass;
    var eggLength = easterEgg.length;
    var keyHistory = '';
    var match;
    console.log('easterEgg '+ pass);
    jQuery(document).keypress(function(e) {
      keyHistory += String.fromCharCode(e.which);
      match = keyHistory.match(easterEgg);
      if (match) {
        f();

        keyHistory = match = '';
      } else if (keyHistory.length > 30) {
        keyHistory = keyHistory.substr((keyHistory.length - eggLength - 1));
      }
    });
  };

  window.easterEgg = easterEgg;
}();
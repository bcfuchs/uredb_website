!function() {
  var storage = $.localStorage;
  /**
   * 
   * @memberOf prefs_sync save eu_related prefs to server. --note: switching to
   *           saving on gdrive for each user.
   * 
   */
  function getRelatedPrefs() {

    var whitelist = storage.get('whitelist');
    // whitelist.data.push("Ministère de la culture et de la communication,
    // Musées de France")

    var skiplist = storage.get('skiplist');
    return {
      whitelist : whitelist,
      skiplist : skiplist
    };

  }
  // TODO make this part of the search POST.
  /**
   * 
   * @memberOf prefs_sync
   * 
   */
  function sendData(data, success) {

    var url = '/api/preferences/related';
    $.ajax({
      contentType : "application/json; charset=utf-8",
      url : url,
      dataType : "json",
      type : "POST",
      data : data
    }).done(success);
  }
  /**
   * 
   * @memberOf prefs_sync
   * 
   */
  function getMode() {
    var mode = "";
    mode = storage.get('search-mode');
    return mode;
  }

  /**
   * 
   * @memberOf prefs_sync
   * 
   */
  function syncRelated(token) {
    var success = function(d) {
      console.log(d);

    };
    var rel = getRelatedPrefs();
    var mode = getMode();
    var data = {
      data : rel,
      token : token,
      mode : mode
    };
    $(window).data("search_prefs", data);
    sendData(JSON.stringify(data), success);
  }

  $(document).ready(function() {
    window.eu_experimental = false;
    if (window.eu_experimental === true && $('meta[name=synctoken]').length) {
      var token = $('meta[name=synctoken]').attr("content");
      $('meta[name=synctoken]').attr("content");
      syncRelated(token);
      console.log(token);
    }
  });

  window.syncRelated = syncRelated;

}();
!function() {
  var storage = $.localStorage;
  /**
   * 
   * @memberOf prefs_sync
   * 
   */
  function getRelatedPrefs() {

    var whitelist = storage.get('whitelist');
 //   whitelist.data.push("Ministère de la culture et de la communication, Musées de France")
    
    var skiplist = storage.get('skiplist');
    return {
      whitelist : whitelist,
      skiplist : skiplist
    };

  }
//TODO make this part of the search POST. 
  /**
   * 
   * @memberOf prefs_sync
   * 
   */
  function sendData(data,success) {

    var url = '/api/preferences/related'
      $.ajax({
        contentType : "application/json; charset=utf-8",
        url : url,
        dataType : "json",
        type : "POST",
        data : data,
      }).done(success)
  }
  /**
   * 
   * @memberOf prefs_sync
   * 
   */
  function getMode() {
    var mode = ""
    mode = storage.get('search-mode')
    return mode
  }
 


  /**
   * 
   * @memberOf prefs_sync
   * 
   */
  function syncRelated(token) {
    var success = function(d) {
      console.log(d);

    }
    var rel =  getRelatedPrefs();
    var mode = getMode();
    var data = {data:rel,token:token,mode:mode}
    console.log(data)
    sendData(JSON.stringify(data),success);
  }
    

window.syncRelated = syncRelated

}();
!function() {
  var storage = $.localStorage;

  function getRelatedPrefs() {

    var whitelist = storage.get('whitelist');
  
    
    var skiplist = storage.get('skiplist');
    return {
      whitelist : whitelist,
      skiplist : skiplist
    };

  }

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
  
  function getMode() {
    var mode = ""
    mode = storage.get('search-mode')
    return mode
  }
 


  
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
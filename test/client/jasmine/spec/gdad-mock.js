/** gapi gdad mock */

!function() {
  var gdad = function(filename, app_id) {

    var store = {};
    store[filename] = null;
    function read() {
	console.log('read ' + filename);
	return new Promise(function(){
	    console.log("in promise");
	    return store[filename]})
      
    }
    function save(data) {

	store[filename] = data;
    }

    return {
      read : read,
      save : save

    }
  }
  window.gdad = gdad
}()

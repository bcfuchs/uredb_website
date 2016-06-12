! function() {
 /**
  *  Display collected items. 
  *  These include
  *  1. images from the  "lighttable" 
  *  2. images from comparanda + comp images. 
  */ 
 EuComparanda();
  var get_lt_items = function() {
    var storage;
    storage = $.localStorage;
    var lt_store = "uredb-property-lighttable";
    var lt = storage.get(lt_store);
    var out = {};
    for (var i = 0; i < lt.val.length; i++) {
      var item = lt.val[i];
      var id = item.accnum;
      item.type = "lighttable"
      if (!(id in out)) {
        out[id] = [];
      }
      out[id].push(item);
      
    }
    return out;
    
  };
  
  var make_lighttable_items = function() {
    var lt_items = get_lt_items();
    var eu = comparanda_getEUdata();
    console.log("----------------");
    console.log(lt_items);
    console.log(eu);
  
  };
  var join_items = function(eu,lt_items) {
   var eu_keys = Object.keys(eu);
   var eu_keys = Object.keys(lt_items);
   console.log(eu_keys)
  };
  
  var make_comparanda_page = function() {
    $("#comparanda").hide();
    var eu = comparanda_getEUdata(); // exported from eu_comparanda.js
    var lt_items = get_lt_items();
    var eu_new = join_items(eu,lt_items)
    for ( var k in eu) {
      var div = document.createElement('div')
      $(div).addClass("comparanda-target-container")
      $(div).append("<div style='clear:both;'></div><hr></hr>")
      $(div).append('<a href="/record/' + k + '">' + "<h2>" + k + "</h2></a>")
      $(div).append('<img src="' + eu[k]['thumb'] + '"/><br/>');

      for ( var i in eu[k]) {
        if (i === 'thumb') {
          continue;
        }
        var link = eu[k][i]['link']
        var provider = eu[k][i]['provider']
        console.log(eu[k][i])
        var item = '<div class="row"><img src="' + i + '"/></div>';
        var title = '<div class="row"><a href="' + link + '"><span>' + provider + '</span></a></div>'
        var container = '<div class="container comparanda-container">' + item + title + '</div>'
        $(div).append(container);

      }
      $("#comparanda-list").append(div)
    }
  };
  
  $(document).ready(function() {
    //TODO need to do this in a single pass...
    make_comparanda_page();
    make_lighttable_items();
  }); 
  
  
  
}();
!function() {

  EuComparanda(); // import from eu_comparanda.js loads the comparanda
  // --necessary? Yes

  var make_comparanda_page = function() {
    $("#comparanda").hide();
    var eu = comparanda_getEUdata(); // exported from eu_comparanda.js

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
    make_comparanda_page();
  });

}();
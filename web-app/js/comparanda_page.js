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
        var link = eu[k][i]['link'];
        var provider = eu[k][i]['provider'];
        console.log(eu[k][i])
        var item = '<div class="row"><img src="' + i + '"/></div>';
        var title = '<div class="row"><a href="' + link + '"><span>' + provider + '</span></a></div>'
        var container = '<div class="container comparanda-container">' + item + title + '</div>'
        $(div).append(container);

      }
      $("#comparanda-list").append(div)
     
    }
    
    var make_projects_list = function(){
      var myprojects = window.ure_projects;
      var projects = myprojects.list();
      console.log(projects)
     for (var i = 0; i < projects.length; i++) {
       var project = projects[i];
        console.log(projects[i])
        var link = "#"
          var div = '<div class="row"><a href="' + link + '"><span>' + project+ '</span></a></div>';
        $("#projects-list").append(div);
        var accs = myprojects.get(project);
        console.log(accs);
        for (acc in accs) {
          var accdiv = '<div class="row"><a href="/record/' + acc + '"><span>' + acc+ '</span></a></div>';
          $("#projects-list").append(accdiv);
          var pix = myprojects.get_by_accnum(project, acc)
          for (var pic in pix) {
            var picdiv = '<div class="row"><a href="/record/' + acc + '"><span>' + pic+ '</span></a></div>';
            $("#projects-list").append(picdiv);
          }
        }
       
        
      }
      
    }
    
    make_projects_list();
  };
  
  $(document).ready(function() {
    make_comparanda_page();
  });

}();
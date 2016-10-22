!function() {
  /*****************************************************************************
   * Tests
   */

  // don't evaluate until called by testing frame
  var jlog = function(m) {
    console.log(JSON.stringify(m))
  }
 var assert = function(test,m) {
    
    if (!(test()))
      {
      console.log(m + " failed!")
      }
    else {
      console.log(m+" passed");
    }
  }
  // don't evaluate except by calling from cli
  var project_tests = function() {
    console.log("loading tests");
    var original_projects;
    var tests = {};
    var project = window.ure_projects;
    console.log(project);
    
    // first, store the actual project list, to replace it later
    original_projects = project.get_all();
    $.localStorage.set('orig_projects',JSON.stringify(domain['data']))
    // add lots of projects
    
    tests['reset'] = function() {
      project.reset();
      console.log(JSON.stringify(project.get_all()));
    }
    var add_one_project = function(proj) {
      console.log('add one project');
      proj = proj || "project"
      project.create(proj);
      jlog(project.get(proj));
      jlog(project.proj);
    }
    
    tests["add projects then delete"] = function() {
      var projects = [];
      for (var i = 1; i < 11; i++) {
        var name = 'project_' + i;
        projects.push(name);
        for (var j = 1; j < 11; j++) {
          var accnum = "A_" + j;
          for (var k = 1; k < 11; k++) {
            project.put(name, accnum, 'pic' + k);
          }
        }
      }
      console.log(project.get_all)
      assert(function(){project.get_all.length === 10},"add projects then delete 1")
      console.log(JSON.stringify(project.get_all));
      projects.forEach(function(proj) {
        project['delete'](proj);

      });
      
      project.reset();  
    
    }

    tests["create empty projects then delete"] = function() {
      var projects = [];
      for (var i = 1; i < 10; i++) {
        var name = 'project_' + i;
        projects.push(name);
        project.create(name);
      }
      console.log(JSON.stringify(project.get_all()));
      projects.forEach(function(proj) {
        project['delete'](proj);

      });
      console.log(JSON.stringify(project.get_all()));

    }

    var run_tests = function() {

      for ( var n in tests) {
        tests[n]();
      }
      
      $.localStorage('projects',JSON.stringify(original_project))
    };

    return {
      tests : tests,
      run : run_tests,
      add_one_project : add_one_project
    };
  };

  window.project_tests = project_tests;
}();

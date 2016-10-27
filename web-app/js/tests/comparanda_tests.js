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
      console.log(m+" passed!");
    }
  }
  // don't evaluate except by calling from cli
 var original_projects;
  var project_tests = function() {
    console.log("loading tests");
    
    var tests = {};
    var project = window.ure_projects;
    
    
    // first, store the actual project list, to replace it later
    original_projects = project.get_all();
    $.localStorage.set('orig_projects',JSON.stringify(original_projects))
    // add lots of projects
    
    tests['reset'] = function() {
      project.reset();
 //     console.log(JSON.stringify(project.get_all()));
      console.log(project.list().length )
      assert(function() { return (project.list().length === 0); },'reset');
    };
    var add_one_project = function(proj) {
      console.log('add one project');
      proj = proj || "project"
   //   project.create(proj);
      //jlog(project.get(proj));
      //jlog(project.proj);
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
   console.log(project.list().length) 
      assert(function(){return (project.list().length === 10)},"add projects then delete 1")
      
      console.log(JSON.stringify(project.get_all));
      projects.forEach(function(proj) {
        project['delete'](proj);

      });
      
      project.reset();  
    
    }
 
    tests["create empty projects then delete"] = function() {
      var projects = [];
      for (var i = 1; i < 100; i++) {
        var name = 'project_' + i;
        projects.push(name);
        project.create(name);
      }
      console.log(JSON.stringify(project.get_all()));
      projects.forEach(function(proj) {
        project['delete'](proj);

      });
      console.log(JSON.stringify(project.get_all()));
      assert(function() { return (project.list().length === 0); },"create empty projects then delete");
    }
    
    tests["get current"] = function() {
     var name = "mybigproject"
     project.create(name);
      
     project.current(name)
     console.log(project.current())
     assert(function() { return (project.current() === name); },"get current");

     project['delete'](name);  
    var name2 = "mybigproject2";
      project.create(name2);
       
     
       assert(function() { return (project.current() !== name2); },"get current 2");
       project['delete'](name); 
       project['delete'](name2); 
   
      
    }

    var run_tests = function() {
      var i = 0;
      for ( var n in tests) {
        i++;
        console.log("\n"+i + ". "+ n+"\n")
        tests[n]();
      }
      
 //     $.localStorage.set('projects',JSON.stringify(original_projects));
    };

    return {
      tests : tests,
      run : run_tests,
      add_one_project : add_one_project
    };
  };

  window.project_tests = project_tests;
}();

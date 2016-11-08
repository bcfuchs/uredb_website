!function() {

  /**
   * outline eu_items object for data.js
   * 
   */
  // eu items Data
  // import singleton from global scope.
  var my_eu_items = ure_eu_items;
  function Component(selector, config) {
    this.config = config || {};
    this.selector = selector;
  }

  /*****************************************************************************
   * 
   * @memberOf comparanda_page.grid_component
   * 
   * 
   */
  
  var grid_component = (function() {
    var config = {
      component_selector : "#comparanda"
    }

    /***************************************************************************
     * 
     * @memberOf comparanda_page.grid_component
     * 
     * 
     */

    function build_grid() {
      var grid_sel = config.component_selector;
      $(grid_sel).hide();
      var eu = ure_eu_items.get_all();


	
	// TEST eu is undefined or length 0
      for ( var k in eu) {
        var div = document.createElement('div');
        $(div).addClass("comparanda-target-container");
        $(div).attr("data-ure-accnum", k);
        $(div).append("<div style='clear:both;'></div><hr></hr>");
        $(div).append('<a href="/record/' + k + '">' + "<h2>" + k + "</h2></a>");
        $(div).append('<img src="' + eu[k]['thumb'] + '"/><br/>');

        for ( var i in eu[k]) {
          if (i === 'thumb') {
            continue;
          }

	    
          var link = eu[k][i]['link'];
          var provider = eu[k][i]['provider'];

          var item = '<div class="row"><img src="' + i + '"/></div>';
          var title = '<div class="row"><a href="' + link + '"><span>' + provider + '</span></a></div>'
          var container = '<div class="container comparanda-container">' + item + title + '</div>';
          $(div).append(container);

        }

        $("#comparanda-list").append(div);

      }
    }
    function load() {
      build_grid();
    }
    return {
      load : load,
      config : config

    }
  })();
  /***************************************************************************
   * 
   * @memberOf comparanda_page.project_strip_component
   * 
   * 
   */
  var project_strip = (function() {
    var myprojects = window.ure_projects;
    var config = {
      component_selector : "#project-strip"
    };
    /***************************************************************************
     * 
     * @memberOf comparanda_page.project_strip_component
     * 
     * 
     */

    function make_projects_list() {
    }
    /***************************************************************************
     * 
     * @memberOf comparanda_page.project_strip_component
     * 
     * 
     */
    function show_project_items(project) {
      

      // set the selected project in the persistent object
      myprojects.current(project);

      // get all the accnums for this project.
      var accnums =  myprojects.get_accnums(project);
      $(".comparanda-target-container").show();
      if (project === "--all--" || typeof project === 'undefined')
        return 0;
      $(".comparanda-target-container").each(function() {
        var accnum = $(this).data('ure-accnum');

        // hide all the objects that aren't in this project
        if (accnums !== 'undefined' && accnums.indexOf(accnum) < 0) {
          $(this).hide();
        }

      });

    }
    /***************************************************************************
     * 
     * @memberOf comparanda_page.project_strip_component
     * 
     * 
     */
    function display_selected_project(sel) {
      // get the selected project from the selected element
      var project = $(sel).data('ure-project');
      
      // highlight the correct project in the strip
      $(".project-box").removeClass("project-box-selected");
      $(sel).addClass("project-box-selected");

     

      // display the items for this project
      show_project_items(project);

      // set the title
      $(".project-selected-title").html(project);
      $(".project-selected-before").html("Project: ");

    }
    /***************************************************************************
     * 
     * @memberOf comparanda_page.project_strip_component
     * 
     * 
     */
    function make_projects_strip () {

      var myprojects = window.ure_projects;
      var projects = myprojects.list();
      // remove all current click handlers
      // $(".project-box").off('click');
      // clear the div and remove the handlers
      $(config.component_selector).empty();

      // show the project strip only if there are projects.
      if (projects.length > 0) {
        $("#project-strip-container").show();
      }
      for (var i = 0, z = projects.length; i < z; i++) {
        var box = $("#project-box").clone().attr('id', '');
        var project = projects[i];
        $(box).attr('data-ure-project', project);
        $(box).find(".project-box-title").html(project);
        console.log(project)

        // accession numbers
        var accs = myprojects.get(project);
        // Test -- no project / no accs
        for (acc in accs) {
          var itembox = $("#project-box-item").clone().attr('id', '');
          var thumburl = my_eu_items.get_thumb_for_accnum(acc);
          $(itembox).find(".project-box-item-caption").html(acc);
          $(itembox).find(".project-box-item-image-container img").attr("src", thumburl)
          $(box).find(".project-box-items").append(itembox);

        }

        $(config.component_selector).append(box);
      }

      setup_project_strip();
      
    };
    
    /***************************************************************************
     * 
     * @memberOf comparanda_page.project_strip_component
     * 
     * 
     */
    function setup_project_strip () {
      var pr = window.ure_projects;
      $(document).ready(function() {

        $(".project-box").click(function() {
          var el = $(this)
          if (this.constructor.name === 'jQuery.Event') {
            el = $(this).currentTarget;
          }
          display_selected_project(el);

        });
      });

    }
    
    function add(project) {
      make_projects_strip();
      set_project(project)
    }
    
    function set_project(project) {
      if (project !== "") {
        // test -- empty sel set
        var sel = $(".project-box[data-ure-project='" + project + "']");
        display_selected_project(sel);
        
      }
      
    }
    function load(){
      make_projects_strip(); 
    }
    return {
      config : config,
      load:load,
      add : add,
      set : set_project,
      selected:config.selected
    };

  })();
// todo -- put this stuff at the end!!!
window.ure_project_strip = project_strip;
  

var project_toggle = function(){
  /***************************************************************************
   * 
   * @memberOf comparanda_page
   */
  var make_project_toggle_impl = function(sel) {
    var prs = window.ure_projects;
    console.log("making project toggle...");
    var projects = prs.list();
    projects.forEach(function(project) {
      $(sel).append('<option value="' + project + '">' + project + "</option>");

    });

    $(sel).change(function() {
      var project = $(this).val();
      show_project_items(project, prs);

    })
  };
  /***************************************************************************
   * 
   * @memberOf comparanda_page
   */
  var make_project_toggle = function(sel) {
    $(document).ready(function() {
      make_project_toggle_impl(sel);
    })
  }
  make_project_toggle("#project-selector");
  
 
  
  
}
/***************************************************************************
 * 
 * @memberOf comparanda_page.dummy_projects
 */

var dummy_projects  = function() {

    /***************************************************************************
     * 
     * @memberOf comparanda_page.dummy_projects
     */
    var make_dummy_projects2 = function() {
	var pr = window.ure_projects;
	pr.reset();
	var items = ure_eu_items.get_all_eu_items();
	var proj = [ 'Dionysus', 'Skyphos', 'Mythology', 'Peplos', "Athens", "Classics 110" ];
	for (var i = 0,j = proj.length; i < j; i++) {
	    pr.create(proj[i]);
	}
	var proj_len = proj.length;
	var max = 4;
	for (var i = 0; i < max; i++) {
            for ( var item in items) {
		console.log(i)
		var p = proj[Math.floor(Math.random() * proj_len)];
		
		for (eupic in items[item]) {
		    // console.log(eupic);
		    if (eupic !== 'thumb') {
			pr.put(p, item, eupic);
			console.log(p + ":" + ":" + item + " : " + eupic);
		    }
		}
		
            }
	}

    };

    window.make_dummy_projects2 = make_dummy_projects2;
}

  /*****************************************************************************
   * 
   * @memberOf comparanda_page
   * 
   * This calls components for the page.
   */
  var make_comparanda_page = function() {
   
    // onLoad
    grid_component.load();
    //make_projects_list(); 
    project_strip.load();
    project_strip.set((function(){return $.qs('project') || ""})());
    project_toggle();

    return 0;
  };
  
  $(document).ready(function() {
    ure_gapi('eu_items.js').onReadComplete(function(){
      make_comparanda_page();
    });

  });
    window.comparanda_page = {
	grid_component:grid_component,
	dummy_projects: dummy_projects,
	project_strip:project_strip,
	project_toggle:project_toggle,
	Component:Component
    }
}();

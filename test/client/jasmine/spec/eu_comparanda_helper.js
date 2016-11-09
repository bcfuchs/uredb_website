! function(){
$(document.body).append($( '<div id="comparanda-nav-list"/>'));
$(document.body).append($( '<div id="comparanda-thumbs"/>'));
var comparanda_helper = function(){
    var comp = comparanda_page;
    var eugrid; 
    var grid = comp.grid_component;
    var complist,project_box_fixture;
    comp.dummy_projects();
    var eu = ure_eu_items;
    var url = 'http://hi.there'
    var thumb = url;
    var eu_id = "http://some_eu_url";
    var accnum = '1.2.3';
    var meta = {
	"guid" : "a",
	"provider" : "b",
	"ure_accnum" : accnum,
	"thumb" : "c",
	"link" : "d"
    };
    var make_eu_items = function(n){
	console.log("make_eu_items");
	var newaccnum = accnum;
	for (var i = 0; i < n; i++) {
	    
	    eu.create(newaccnum,thumb+i);

	    for (var k = 0; k < 10; k++) {
		eu.put(newaccnum,thumb+i+"_"+k,meta);
	    }
	    newaccnum = accnum + i;
	}

    }
    var make_projects = function() {
	
	make_eu_items(20);
	make_dummy_projects2();	
    }

    var add_eu_grid = function(){
	eugrid = $(grid);
	$(document.body).append(eugrid);

    }

    var remove_eu_grid = function(){
	eugrid.remove();
	eugrid = null;

    }
    
    return {
	make_projects:make_projects,
	add_eu_grid:add_eu_grid,
	remove_eu_grid:remove_eu_grid
	
    }
    
}

    window.comparanda_helper = comparanda_helper;
    comparanda_helper().make_projects();
}();

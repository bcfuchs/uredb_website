describe(
    'comparanda_page  functional  tests',

    function() {
	var comp = comparanda_page;
	var grid = comp.grid_component;
	var complist, project_box_fixture;
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
	var make_eu_items = function(n) {
            for (var i = 0; i < n; i++) {
		var newaccnum = accnum + i;
		eu.create(newaccnum, thumb + i);
		for (var k = 0; k < 10; k++) {
		    eu.put(newaccnum, thumb + i + "_" + k, meta);
		}
            }

	}
	var make_projects = function() {

            make_eu_items(20);
            make_dummy_projects2();
	}

	beforeEach(function() {
            eu.reset();

            complist = $('<div id="comparanda" class="comparanda-target-container">><div id="comparanda-list"></div>\
<select id="project-selector"></select>\
<div id="project-strip"></div></div>');
            $(document.body).append(complist);

            var project_box_html = '\
<div id="comp-templates">\
<div id="project-box" class="project-box">\
<div class="project-box-title"></div>\
<div class="project-box-items">\
</div>\
</div>\
<div id="project-box-item" class="project-box-item">\
<div class="project-box-item-image-container">\
<img src=""/></img>\
</div>\
<div class="project-box-item-caption"></div>\
</div>\
</div>'
            project_box_fixture = $(project_box_html);
            $(document.body).append(project_box_fixture);

            make_projects();
            grid.load();
	});

	it('grid.load', function() {

            expect($("#comparanda-list div").length).toEqual(640);

	})

	it('project_strip', function() {

            comp.project_strip.load();
            expect($('.project-box').length).toEqual(7);

	})

	it('project_strip click', function() {
            comp.project_strip.load();
            var el = $('.project-box')[0];
            $(el).click();
            expect($(el).hasClass("project-box-selected")).toBeTruthy();
	})

	it('project_strip click other project', function() {
            comp.project_strip.load();

            var el = $('.project-box')[0];
            var el2 = $('.project-box')[1];
            $(el).click();

            expect($(el2).hasClass("project-box-selected")).toBeFalsy();
	})

	it('project_toggle', function() {

            comp.project_toggle();
            var sel = "#project-selector option";
            var project_number = ure_projects.list().length;
            expect($(sel).length).toEqual(project_number);
	})

	it('select project strip', function() {
            comp.project_strip.load();
            comp.project_toggle();
            var sel = "#project-selector option";

            $(".comparanda-target-container").show();
            $($(sel)[3]).select();
            var out = $(sel).filter(":selected").length;
            console.log(out);
            var els = $(".comparanda-target-container:hidden");
            var els2 = $(".comparanda-target-container");
            console.log(els.length);
            console.log(els2.length);
            console.log("=====");
            $(".comparanda-target-container").hide();
            var els = $(".comparanda-target-container:hidden");
            var els2 = $(".comparanda-target-container");
            console.log(els.length);
            console.log(els2.length);

	})

	it('', function() {

	})
	it('remove_project no params', function() {
	    console.log("DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD");
	    expect(comp.project_strip.remove_project).toThrow();
	})
	it('remove_project', function() {

	    var project = ure_projects.list()[0];
	    var el = $('<div id="project1">project1</div>')
	    comp.project_strip.remove_project(project,el);
	})
	it('drag project out event', function() {
	    comp.project_strip.load();
	    var el = $(".project-box")[0];
	    var project = $(el).data('ure-project');
	    
	    var res  = $(".project-box[data-ure-project='"+project+"']")
	    var total = res.length;
	    comp.project_strip.onDragOut.call(el);
	    // check project has been removed from strip
	    var res2  = $(".project-box[data-ure-project='"+project+"']")
	    expect(res2.length).toEqual(total-1);
	})
	it('', function() {

	})

	afterEach(function() {

            complist.remove();
            complist = null;
            project_box_fixture.remove();
            project_box_fixture = null;
	});

    });

describe('comparanda_page  functional  tests',function(){
    var comp = comparanda_page;
    var grid = comp.grid_component;
    var complist,project_box_fixture;

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
	for (var i = 0; i < n; i++) {
	    var newaccnum = accnum + i;
	    eu.create(newaccnum,thumb);
	    for (var k = 0; k < 10; k++) {
		eu.put(newaccnum,thumb+"_"+k,meta);
	    }
	}

    }

    beforeEach(function(){
	complist  = $('<div id="comparanda"><div id="comparanda-list"></div>\
        <div id="project-strip"></div></div>');
	$(document.body).append(complist);

	var project_box_html = '\
<div id="comp-templates" style="display: none">\
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
    });

    
    it('grid.load',function(){
	
	make_eu_items(20);
	comp.dummy_projects();
	make_dummy_projects2();	
	grid.load();

	expect($("#comparanda-list div").length).toEqual(640);

	
    })

    it('project_strip',function(){
	comp.project_strip.load();
	expect($('.project-box').length).toEqual(7);

    })

    it('',function(){

    })

    it('',function(){

    })
    afterEach(function(){
	complist.remove();
	complist = null;
	project_box_fixture.remove();
	project_box_fixture = null;
    });

});

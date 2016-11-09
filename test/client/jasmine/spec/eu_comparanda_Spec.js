describe('eu_comparanda  functional  tests',function(){
    comparanda_helper().make_projects();
    var eu_json = JSON.parse(eu_json_string);
    var eucomp = ure_eu_comparanda;
    var eugrid;
    var gridcellcount = 34;
    var gridid="eu-grid";
    var width = "1000px";
    var height = "1000px";
    var accnum = "1.2.3";
    var thumb;
    EuComparanda(accnum);
    var testel;
    var ui = function(el) {

	return {

	    draggable: el
	}

    }
    beforeEach(function(){
	// load eugrid
	eugrid = $(grid);
	$(document.body).append(eugrid);
	testel = $(".gridlist-cell")[0]
	thumb = $(testel).attr("data-ure-image-url");
    })
    it('test grid loaded ok',function(){
	
	expect($(".gridlist-cell").length).toEqual(gridcellcount);
    })

    it('',function(){
	$("#view-comps").click();

    })
    
    it('',function(){
	$("#save-comps-as-html").click();

    })
    
    it('',function(){
	$("#load-comps").click();
	

    })
    
    it('',function(){
	$("#clear-comps").click();
	
    })
    
    it('',function(){
	
	eucomp.addToComparanda(testel,ui(testel));
    })
    
    it('',function(){
	file = "eu_items.js";
	var e = $.Event('ure_gapi_read_complete');
	$(window).trigger(e, {
            file : file
	});

    })
    it('',function(){
	$("#euwidget .cell").hover();
    })

    it('removecomp',function(){
	
	eucomp.removecomp(thumb);

    })
    it('load_comparanda',function(){

	eucomp.load_comparanda(eu_json);

    })
    it('save_comparanda_as_html',function(){
	eucomp.save_comparanda_as_html();

    });
    
    afterEach(function(){
	eugrid.remove();
	eugrid = null;

    })
    EuComparanda = null;
})

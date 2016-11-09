describe('eu_comparanda  unit+functional  tests',function(){
    // comparanda_helper.js
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
    
    
    var testel;
    var comp_bar;
    var ui = function(el) {

	return {

	    draggable: el
	}

    }
    EuComparanda(accnum);
    beforeEach(function(){
	// load eugrid
	eugrid = $(grid);
	$(document.body).append(eugrid);

	// load comparanda bar
	comp_bar = $(comparanda_bar);
	$(document.body).append(comp_bar);
	
	
	testel = $(".gridlist-cell")[0]
	thumb = $(testel).attr("data-ure-image-url");

    })
    it('test grid loaded ok',function(){
	
	expect($(".gridlist-cell").length).toEqual(gridcellcount);
    })
    it('test comp_bar loaded ok',function(){
	
	expect($("#load-comps").length).toEqual(1);
//	$("#save-comps-as-html").click();
    })
    
    it('move image',function() {
	console.log("move image")
	// need to set this here--moveImage is an event function.
	eucomp.moveImage.call(testel);
	fail();
    });
    
    it('view-comps click',function(){
	$("#view-comps").click();
	fail();
    })
    
    it('',function(){
	$("#save-comps-as-html").click();
	fail();
    })
    
    it('',function(){
	$("#load-comps").click();
		fail();

    })
    
    it('',function(){
	$("#clear-comps").click();
		fail();
    })
    
    it('addToComparanda',function(){
	
	$("#comparanda-thumbs").empty();
	eucomp.addToComparanda(testel,ui(testel));
	expect($("#comparanda-thumbs").length).toEqual(1);
    })
    
    it('',function(){
	file = "eu_items.js";
	var e = $.Event('ure_gapi_read_complete');
	$(window).trigger(e, {
            file : file
	});

    })
    it('onSignedIn',function(){

	var cb2 = jasmine.createSpy('callback');
	
	var  cb = function() {
	    cb2();
	}
	
	eucomp.onSignedIn(cb2);

	var send_signed_in_signal = function(){
	    var signal = 'ure_gapi_signed_in'
	    var e = $.Event(signal);
	    $(window).trigger(e);
	}
	send_signed_in_signal();
	expect(cb2).toHaveBeenCalled();

    })
    it('',function(){
	$("#euwidget .cell").hover();
	fail();
    })

    it('removecomp',function(){
	
	eucomp.removecomp(thumb);
	fail();
    })
    it('load_comparanda',function(){

	eucomp.load_comparanda(eu_json);

    })
    it('save_comparanda_as_html',function(){
	eucomp.save_comparanda_as_html();

    });

    it('save_comparanda_as_json',function(){
	eucomp.save_comparanda_as_json();

    });
    
    afterEach(function(){
	eugrid.remove();
	eugrid = null;
	comp_bar.remove();
	comp_bar = null;
    })
    EuComparanda = null;
})

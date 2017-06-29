! function() {
/** 
    selection builder/controller
*/
    var builder = (function (){
	var choices = {};
	var isInit = true;
	var cursor = 0; // where we are
	var total = 0;
	var this_data;
	var config = {
	    seljson:  "data/choices.json", // where to get the data.
	    templateSel : "#form-template",
	    frameSel: "#choice-frame",
	    radioSel: ".thumb-select",
	    thumb_titleSel: ".thumb-title",	    
	    itemSel: ".item",
	    paginateLink: ".paginate-link",
	    linkdivSel: "#page-links",
	    itemsPerPage: 100, // items to display per page
	    innerSel: ".innerItem",
	    localStoreName : "thumb_select",
	    endpoint : "" // where to post the data. 
	    
	};



         function build_grid(data){
	     // set data;
	     this_data = data;
	     console.log("data size :" + this_data.length);

	     // set total
	     total = data.length;


	     // get the local data

	     readLocal();

	     
	     // get group template

	     var t = $(config.templateSel).clone().attr("id","");
	     
	     var this_item = $(t).find(config.itemSel).remove()[0];
	     // get innerItem
	     
	     var this_inner = $(this_item).find(config.innerSel).remove()[0];
	     var f_cursor = cursor;
	     for (var i = f_cursor,z = config.itemsPerPage+ f_cursor;i < z; i++) {
		 
		 var id = data[i]['id'];
		 var group_id = id;
		 var selected_thumb = null;
		 var title = data[i]['title'];
		 var link= data[i]['link'];
		 var raw_items = data[i]['items'];
		 var item  = $(this_item).clone().attr("id",id);
		 $(item).find(".title").html(title);

		 $(item).find("a.item-link").attr('href',link)
		 $(item).find("a.item-link").html(id);


		 var items= [];
		 // get rid of nulls
		 for (var j  = 0,q = raw_items.length;j < q; j++)  {
		     if (!(raw_items[j]['link'].match(/null/))) {
			 items.push(raw_items[j])
		     }

		 }
		 // get the selected id if there is one
		 if (id in choices) {
		     selected_thumb = choices[id]
		 }
		 
		 // only do ones where there's a choice.
		 if (items.length > 1) {
		     for (var j  = 0,q = items.length;j < q; j++)  {
			 var checked = false;
			 var inner_id = items[j]['id']
			 var inner_url = items[j]['link']
			 // if no item has been selected by hand yet, check first one
			 if ( selected_thumb  === null) {
			     if (j === 0) {
				 checked = true;
			     }
			 }
			 // if an item has been selected, check that
			 else {
			     if (inner_id === selected_thumb) {

				 checked = true;
			     }

			 }


			 var inner = get_inner(inner_id,inner_url,checked,this_inner,group_id);
			 
			 if ( !(inner_url.match(/null/)) ) {
			     $(item).append(inner);
			 }
		     }
		 }

		 $(config.frameSel).append(item[0])
	 }
	     set_listener();
	     if (isInit === true)
	     {
		 // set the save link
		 $("#save2file").click(save2file);
		 $("#guide-toggle").click(
		     function(){
			 $("#instructions").slideToggle();

		     });
		 paginate();
	     }
	     highlight();
	     isInit  = false;
	 }
	function save2file() {
	    
	    var c = JSON.stringify(choices);
	    var blob = new Blob([c], {type: "text/plain;charset=utf-8"});
	    saveAs(blob, "europeana_choices.txt");

	}
	function paginate() {

	    for (var i = 0; i < total;) {

		var thisPage = i+1;
		var nextPage = thisPage + config.itemsPerPage
		var link = $('<span class="paginate-link" data-start="'+i+'">'+ thisPage + "-" + nextPage + '</span>');
		// set the underscore
		if (i === 0 )
		    $(link).addClass("underscore");
		$(config.linkdivSel).append(link);
		i = i + config.itemsPerPage;
	    }

	    // set the click
	    var f = function() {
		var itemNumber = $(this).data('start');
		$(config.paginateLink).removeClass("underscore");
		// underscore clicked link
		$(this).addClass("underscore");

		go_to_page(itemNumber);
	    }

	     $(config.paginateLink).click(f);


	}
	function readLocal() {
	    var name = config.localStoreName;
	    if (localStorage.getItem(name)) {
		choices = JSON.parse(localStorage.getItem(name));
		
	    }

	    

	}
	function save2local(resource_id,accnum) {
	    console.log("changed thumb for " + accnum + " to " + resource_id);
	    console.log(" 2 changed thumb for " + resource_id + " to " + accnum);
	    var name = config.localStoreName;
	    readLocal();

	    choices[accnum] = resource_id
	    localStorage.setItem(name, JSON.stringify(choices));
	    save2remote();
	}

	function save2remote() {
	    $.ajax({
		contentType : "application/json; charset=utf-8",
		url : "/api/selected_thumb",
		dataType : "json",
		type : "POST",
		data : JSON.stringify(choices)
	    });

	}
	function save_change(resource_id, accnum) {

	    save2local(resource_id,accnum);
	    // 
	    var postUrl = "/"
	    // $.post(postUrl,"hi");
	}
	function set_listener(){
	    var f = function() {
		$(this).parent().parent().find(".selected").removeClass("selected");
		console.log( $(this).parent().parent().find(".selected")[0]);
		var resource_id = $(this).attr("id");
		var accnum = $(this).attr("name");
		$(this).parent().addClass("selected");
		save_change(resource_id,accnum);
	    }
	    $(config.radioSel).change(f);

	}
	function get_inner(id,src,checked,this_inner,group_id) {
	    var inner = $(this_inner).clone().attr("id",id);
	    $(inner).find("img").attr("src",src).attr("alt",src);
	    
	    //	    console.log(inner);
	    $(inner).find(config.radioSel).attr("id",id);
	    $(inner).find(config.thumb_titleSSel).attr("id",id);
	    $(inner).find(config.radioSel).attr("name",group_id);
	    if (checked === true) {
		$(inner).find(config.radioSel).attr("checked",true);
	    }
	    return inner

	}
	function  highlight(){
	    console.log("highlight");
	    var a = $(".thumb-select:checked");
	    $(a).each(function(k,v) {
		$(v).parent().addClass("selected");;

	    })
	    
	}
	
	function go_to_page(itemNumber) {
	    // wipe the data
	    $(config.frameSel).html("");
//	    $(config.linkdivSel).html("");
	    // set the cursor
	    cursor = itemNumber;
	    
	    // re-use data. 
	    build_grid(this_data)

	}
	function init() {

	    $.getJSON(config.seljson,build_grid);
	}
	return {
	    init: init,
	    build_grid:build_grid,
	    get_inner:get_inner,
	    highlight:highlight,
	    set_listener:set_listener,
	    config:config
	}
		
		   
	})();
    $(document).ready(function(){
	
	builder.init();


	
    });
}();
    





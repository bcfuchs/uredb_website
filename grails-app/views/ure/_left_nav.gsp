
<div class="left_nav1 left-nav-search" id="left-nav-search" style="display: none;">
	<g:render template="/ure/searchbar_small" />
</div>
<div id="comparanda" class="left_nav1" data-placement="top" data-toggle="tooltip"
	title="drag europeana images here to add to comparanda">
	Your comparanda
	<div id="comparanda-thumbs"></div>
	<!--  clicks assigned in eu_comparanda.js -->
	<div class="left_nav2 lighttable-controls2">
		<span id="view-comps" data-toggle="tooltip" title="view comparanda page"
			class="ure-control-btn glyphicon glyphicon-eye-open"></span>
		<span id="clear-comps" data-toggle="tooltip" title="clear" class="ure-control-btn glyphicon glyphicon-remove-circle"></span>
		<span id="load-comps" data-toggle="tooltip" title="load" class="ure-control-btn glyphicon glyphicon-upload"></span>
		<span id="save-comps-as-json" data-toggle="tooltip" title="download"
			class="ure-control-btn glyphicon glyphicon-download-alt"></span>
		
		
		<span id="save-comps-as-html" data-toggle="tooltip" title="download as html"
			class="ure-control-btn glyphicon glyphicon-file"></span>
		<!-- 
		<span id="manage-related" data-toggle="tooltip" title="manage related items"
			class="ure-control-btn glyphicon glyphicon-wrench"></span>
			-->
		
		<div id="comps-nav-container" class="ure-dropdown">
			<span id="comps-nav"  title="comparanda list"
				class="ure-control-btn glyphicon glyphicon-th-list" data-original-title="clear"></span>
			<div id="comparanda-nav-list" class="ure-dropdown-content"></div>
		</div>
		<div id="comps-file-container" style="display: inline">
			<input style="display: none" type="file" id="comps-file" name="comps-file" />
		</div>
		
	</div>
	<script>
	! function() {
	var listsel = "#comparanda-nav-list"
	  var eu_items_store ="eu_items";
  	  var storage = $.localStorage;
	  var get_list = function() {
	     var items =  storage.get(eu_items_store);
	    //  console.log(items);
	      return items;
	  }


	  var make_list = function(listsel,items) {
	      var ul = document.createElement("ul");
	  	$(ul).addClass("comp-nav-list-group")
	      
	
	      for (var rec in items) {
	          var thumb = items[rec].thumb;
	          var img = '<img style="height: 20px" src="'+thumb+'"/>'
	          var url = "/record/"+rec;
	          var content = '<a href="'+url+'">'+rec+"&nbsp;"+img+'</a>'
	          console.log(content)
	          $(ul).append('<li>'+content+'</li>')
	      }

	      $(listsel).html(ul);
	  }
	  $(document).ready(function(){
	  	make_list(listsel,get_list());
	  });

		}();
	</script>
	<style>
.comp-nav-list-group {
 list-style-type: none;
    padding: 0;
    border: 1px solid #ddd;

}
.comp-nav-list-group img {
	margin: 0 0 0 3px;
}
.comp-nav-list-group  li {
	padding: 8px 16px;
    border-bottom: 1px solid #ddd;
    margin-left: 0 !important;
}

.comp-nav-list-group  li:last-child {

border-bottom:none;


}
.ure-dropdown {
	position: relative;
	display: inline-block;
}

.ure-dropdown-content {
	display: none;
	position: absolute;
	// background-color: #f9f9f9;
	min-width: 160px;
	box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
	padding: 12px 16px;
	
	left: -100px;
	z-index: 1;
}

.ure-dropdown:hover .ure-dropdown-content {
	display: block;
	
}
</style>
</div>
<!--  #comparanda -->
<div id="lighttable-links" class="left_nav1" data-placement="top" data-toggle="tooltip"
	title="drag object images here to add to lighttable">
	Lighttable
	<div id="lighttable-thumbs"></div>
	<div class="left_nav2 lighttable-controls2">
		<span id="view-lighttable" data-toggle="tooltip" title="view" class="ure-control-btn glyphicon glyphicon-eye-open"></span>
		<span id="clear-lighttable" data-toggle="tooltip" title="clear" class="ure-control-btn glyphicon glyphicon-remove-circle"></span>
		<span id="load-lighttable" data-toggle="tooltip" title="load" class="ure-control-btn glyphicon glyphicon-upload"></span>
		<span id="save-lighttable" data-toggle="tooltip" title="download" class="ure-control-btn glyphicon glyphicon-download-alt"></span>
		<span id="save-lighttable-as-html" data-toggle="tooltip" title="download as html"
			class="ure-control-btn glyphicon glyphicon-file"></span>
		<input style="display: none" type="file" id="lt-file" name="lt-file" />
	</div>
	<style>
.lighttable-controls>div {
	display: inline;
}

.lighttable-controls span {
	margin-left: 3px;
}
</style>
</div>
<!-- #lighttable-links -->
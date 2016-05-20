<%@ page import="grails.converters.*"%>
<!DOCTYPE html>
<html>
<head>
<title>Ure Museum Database: Related Items Manager</title>
<meta name="layout" content="ure/main" />
<script src="${resource(dir:'js',file:'image-modal.js')}"></script>
<style>
/** hide left nav on param s */
#left_nav { <
	g: if test="${params.s == 'noleftnav'}">   
			display:none; </
	g: if>
}

#left-nav-search {
	display: block !important;
}

.container a {
	color: black;
}

#provider-filter-row {
	display: none;
}

#related-wrapper .row h2 {
	text-align: left;
}

#goback:hover {
	cursor: pointer;
	text-decoration: underline;
}
</style>
</head>
<body>
	<!--  Options page 
	  This is a series of 

 -->
	<script>
    $(document).ready(function() {
      var toggle_setup = function() {
        $(document).on('click', '.rad', function() {
          var id = $(this).attr('id');
          if (id === "skiplist-toggle") {
            $("#provider-skiplist-row").show();
            $("#provider-whitelist-row").hide();

          } else {
            $("#provider-skiplist-row").hide();
            $("#provider-whitelist-row").show();
          }
        })
      }

      toggle_setup();

      $("#skiplist-toggle").click();
      $("#goback").click(function() {
        window.history.back();
      })

    })
  </script>
	<style>
.skiplist-list {
	display: none;
}
</style>
	<div id="related-wrapper" class="container">
		<h1>Related Item Management</h1>
		<h3 id="goback">&larr;back</h3>
		<div class="row">
			<h2>Manage Provider Lists</h2>
		</div>
		<div class="row">
			<div class="col-md-10">
				<div class="btn-group skiplists" role="group">
					<button type="button" id="skiplist-toggle" class="btn btn-default rad">Skiplist</button>
					<button type="button" id="whitelist-toggle" class="btn btn-default rad">Whitelist</button>
				</div>
			</div>
			<div class="col-md-2">
				<button type="button" id="manage-related-done" class="btn btn-success">Done</button>
			</div>
		</div>
		<div class="row">
			<div class="container">
				<div class="row skiplist-list" id="provider-skiplist-row">
					<h2>Skip these providers...</h2>
					<div id="provider-filter" class="collapse controls span2"></div>
				</div>
				<div class="row skiplist-list" id="provider-whitelist-row">
					<h2>Search only these providers...</h2>
					<div id="provider-filter-white" class="collapse controls span2 "></div>
				</div>
			</div>
		</div>
	</div>
	<div id="templates" style="display: none">
		<div id="provider-list-template">
			<label class="checkbox-inline provider-checklist" data-eu-provider-list=''> </label>
			<input class="cb-eu" type="checkbox" value='' checked></input>
			/div>
		</div>
		<script src="${resource(dir:'js',file:'related_management.js')}"></script>
</body>
<html>
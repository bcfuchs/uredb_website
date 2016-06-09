<%@ page import="grails.converters.*"%>
<!DOCTYPE html>
<html>
<head>
<title>Ure Museum Database: Related Items Manager</title>
<meta name="layout" content="ure/main" />
<script src="${resource(dir:'js',file:'image-modal.js')}"></script>
<link rel="stylesheet" href="${resource(dir:'css/ure',file:'related.css')}" />
</head>
<body>
	<!--  Options page 
	  This is a series of 

 -->
	<script>
	
    $(document).ready(function() {
      
      var storage = $.localStorage;
      if (storage.isSet('refresh') && storage.get('refresh') === true) {
        storage.set('refresh',false)
        location.reload();
         console.log('reloading...')
         
         
        }
      else {
		console.log('not reloading')
      }
      var toggle_setup = function() {
        $(document).on('click', '.rad', function() {
          var id = $(this).attr('id');
         
          if (id === "skiplist-toggle") {
            $("#provider-skiplist-row").show()
            $("#provider-whitelist-row").hide();
            // set to mode selected
            // TODO -- needs to be read on init and displayed. 
            storage.set('search-mode',"skiplist")
            

          } else {
            $("#provider-skiplist-row").hide()
            $("#provider-whitelist-row").show();
            storage.set('search-mode',"whitelist")
          }
        })
      }

      toggle_setup();

      $("#skiplist-toggle").click();
      $("#goback").click(function() {
     //   window.location.href = document.referrer;
        var accnum  = "${session.accnum}";
        window.location.href = "/record/" + accnum;

      })

    })
  </script>
	<!-- 
CHECK
<%
flash.message = "wow"
println "message:" + flash.message;
 
 
 
 println "flash: " +  flash.accnum
 println "session: " + session.accnum
%>

 -->
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
		<div class="row">
			<div class="col-md-8">
				<h2>Rerun related search with default keywords when search finds no items</h2>
			</div>
			<div class="col-md-4"></div>
		</div>
		<div class="row">
			<div class="col-md-10">
			
					<div class="radio" id="rerun-related">
						<label>
							<input type="radio" name="rerun" disabled>
							Off
						</label>
					
						<label>
							<input type="radio" name="rerun" checked disabled>
							On
						</label>
					</div>
					
				
			</div>
			<div class="col-md-2"></div>
		</div>
		<div class="row">
			<div class="col-md-8">
				<h2>Share search info</h2>
			</div>
			<div class="col-md-4"></div>
		</div>
		<div class="row">
			<div class="col-md-10">
			
					<div class="radio" id="options-share-search-info">
						<label>
							<input type="radio" name="share-search-info" disabled>
							Off
						</label>
					
						<label>
							<input type="radio" name="share-search-info" checked disabled>
							On
						</label>
					</div>
					
				
			</div>
			<div class="col-md-2"></div>
		</div>
	</div>
	<div id="templates" style="display: none">
		<div id="provider-list-template">
			<label class="checkbox-inline provider-checklist" data-eu-provider-list=''> </label>
			<input class="cb-eu" type="checkbox" value='' checked></input>
		</div>
		<div id="options-template"></div>
	</div>
	
		<script src="${resource(dir:'js',file:'related_management.js')}"></script>
</body>
<html>
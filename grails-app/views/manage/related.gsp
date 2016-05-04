<%@ page import="grails.converters.*"%>
<!DOCTYPE html>
<html>
<head>
<title>Ure Museum Database: Related Items Manager</title>
<meta name="layout" content="ure/main" />
<script src="${resource(dir:'js',file:'image-modal.js')}"></script>
<style>
/** hide left nav on param s */
#left_nav { 
<g:if test="${params.s == 'noleftnav'}"> 
			display:none; 
</g:if>

}

#left-nav-search {
	display: block !important;
}

.container a {
color: black;

}
#provider-filter-row {
	display:none;
}
#related-wrapper .row h2 {

text-align:left;


}
</style>
</head>

<body>
	<!--  Options page 
	  This is a series of 

 -->
 <script>
$(document).ready(function(){
  console.log("go")
	$(document).on('click', '.rad',function(){
		var id = $(this).attr('id');
		if (id === "skiplist-toggle") {
		  $("#provider-skiplist-row").show();
		  $("#provider-whitelist-row").hide();

		} 
		else 
		{
		  $("#provider-skiplist-row").hide();
		  $("#provider-whitelist-row").show();
		}
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
		<div class="row">
				<h2>Manage Provider Lists</h2>
			     <div class="btn-group skiplists" role="group" >
              
                    <button type="button" id="skiplist-toggle" class="btn btn-default rad"> Skiplist</button>
                
              
                    <button type="button" id="whitelist-toggle"  class="btn btn-default rad"> Whitelist</button>
              
                
            </div>
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
	
	<div id="templates" style="display:none">
		<div id="provider-list-template">
				<label class="checkbox-inline provider-checklist" data-eu-provider-list=''>
				</label>
				<input class="cb-eu" type="checkbox" value='' checked></input>
			/div>
	</div>
	<script>
      $(document)
          .ready(
              function() {
                /** 
                 * list blacklisted items in various ways
                  - by provider
                  - by query
                  - by object
                  let user choose to blacklist by provider
                  let user create a whitl
                 */
                var showBlacklist = function() {
                  console.log("showBlacklist");

                  // init
                  var storage, vate, blacklist, providerBlacklist,eu_items, 
                  	providerBlacklist_store, blacklist_store, eu_items_store,
                  	providerBlacklist_sel,providerWhitelist_sel;
				  
                  storage = $.localStorage;
                  providerBlacklist_sel = "#provider-filter"
                  providerWhitelist_sel = "#provider-filter-white"
                  eu_items_store = "eu_items"
                  blacklist_store = "vote"
                  providerBlacklist_store =    "providerBlacklist"
                    
                  // get the storage. 
                  if (storage.isSet(blacklist_store)) {
                    blacklist = storage.get(blacklist_store);
                  }
                  if (storage.isSet(providerBlacklist_store)) {
                    providerBlacklist = storage.get(providerBlacklist_store);
                    
                  }
                  if (storage.isSet(eu_items_store)) {
                    eu_items = storage.get(eu_items_store);
                    
                  }
				  var addCheckbox = function(sel,template_sel, labeltext,value,id,checked ) {
					  	var label = $(template_sel).find("label").first().clone();
	          		  	var input = $(template_sel).find("input").first().clone();
	         			
	            		$(label).attr("for",id);
	            		$(label).html(labeltext)
	            		$(input).attr("id",id)
	            		$(input).val(value)
	            		$(input).prop('checked',checked)
						$(sel).append(input);
	            		$(sel).append(label);
	            		$(sel).append("<br/>");
				  }
				  /** checkbox list for providers to skip */
                  var listProvidersSkipped = function(sel,template_sel) {
					var id = "prov_1_" 
					
			    	var pv = []
					for (var a in providerBlacklist) {
						pv.push({key:a,val:providerBlacklist[a]})
						}
					
					var pv_sorted = pv.sort(function (a, b) {
						console.log(a.val)
						return b.val - a.val;
				    	//return a.val.toString().localeCompare( b.val.toString() );
					});
					var i = 0;
					var checked = true;
					var checkedMin = 3;
					for (var a in pv_sorted) {
						i += 1;
						var item = pv_sorted[a]
						var title = item.key;
						var hits = item.val
						var labeltext = hits + ": " + title
					    checked = hits < checkedMin? false : true;
						// sel, template_sel, labeltext,input_value, id,Boolean isChecked
					  	addCheckbox(sel,template_sel,labeltext, title,id+i,checked);
					}
					
                   
                   
                    
                    $(sel).show();
                  } // listProvidersSkipped END
                  /**
                  * Provider whitelist
                  *
                  * The list is constructed from comparanda files   
                  */
                  var listProvidersSearched = function(sel,template_sel) {
          					var id = "provsearch_1_" 
          					var provs = {}
          					for (var accnum in eu_items) {
								 for ( var itemkey in  eu_items[accnum]) {
									var provider = eu_items[accnum][itemkey]['provider']
									
									if (provider in provs) {
										provs[provider] += 1	
										}
									else {
										if (provider !== undefined ) {
									  	provs[provider] = 1
										}
										}
								}
								 
								
            				}
            				
          			    	var pv = []
          					for (var a in provs) {
          						pv.push({key:a,val:provs[a]})
          						}
          					
          					var pv_sorted = pv.sort(function (a, b) {
          						console.log(a.val)
          						return b.val - a.val;
          				    	//return a.val.toString().localeCompare( b.val.toString() );
          					});
          					console.log(pv_sorted)
          					
          					var i = 0;
          					var checked = true;
          					var checkedMin = 0;
          					for (var a in pv_sorted) {
          						i += 1;
          						var item = pv_sorted[a]
          						var title = item.key;
          						var hits = item.val
          						var labeltext = hits + ": " + title
          					    checked = hits < checkedMin? false : true;
          						// sel, template_sel, labeltext,input_value, id,Boolean isChecked
          					  	addCheckbox(sel,template_sel,labeltext, title,id+i,checked);
          					}
          					
                             
                             
                              
                             $(sel).show();
                            } // listProvidersSearched END

                  listProvidersSkipped(providerBlacklist_sel,"#provider-list-template");
                  listProvidersSearched(providerWhitelist_sel,"#provider-list-template");

                } // showBlacklist END
                showBlacklist();

              })
    </script>
</body>
<html>
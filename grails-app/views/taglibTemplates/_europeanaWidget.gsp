<%@ page import="grails.converters.*"%>
<%@ page import="java.util.logging.Logger"%>
<div id="europeanaWidget">
	<!-- 
<%

def items = [];
def check = {a,k->
  
    if (a[k]) { return a[k][0]}
    return null;
}
// better would be just to return all values of all keys as a list.
def check2 = {a->
    	
     if (a) { 
    	if (a.def) {
         return a.def[0] ;  
    	}
        if (a.en) {
         return a.en[0];  
        }
        else {
            return a[0]
        }
     }
 }
def date = "";
def providers = [:];
def items2 = []
def items3 = [1]

items2 += info.items
more.each {
    items2 += it.items
    
}
// ajax -- send this list back to client

items2.each {
	
    def thumb, provider,title,link;
  	def tmlabel;
    def prov = check(it,'dataProvider');
    providers[prov] = "";
    // dcSubjectLangAware"
	items <<  [thumb:check(it,'edmPreview'),
        		provider:check(it,'dataProvider'),
                title:check(it,'title'),
        		link:check(it,'edmIsShownAt'),
                date: check(it,'edmTimespanLabel') ,
                dcSubject:check2(it.dcSubjectLangAware),
                period:check(it,'edmTimespanBroaderTerm'),
            	id:check(it,'id'),
                guid:check(it,'guid')]
                //record: it as JSON]
    
    // note: most items dont have date or period
  
}
System.err.println "WOW5.2"

%>
-->


	<span style="text-decoration: underline; cursor: pointer;" id="filterbymuseum" data-target="#provider-filter"
		data-toggle="collapse">Filter by museum</span>
	<span style="text-decoration: underline; cursor: pointer;" id="relevance-vote" data-relevance-finish="finish tagging"
		data-relevance-toggle="off">Tag as not relevant</span>
	<a style="padding-left: 12px; color: #FFFFCC;" href="/manage/related">Manage search queries </a>
	<span id="itemsCount" style="text-decoration: underline; cursor: pointer;"></span>
	<div id="provider-filter" class="collapse controls span2">
		
         
	</div>
	
	<script>
	
	</script>
	<!--  ajax: populate this grid with data from server  -->
	<script>
	<% 
  def  kw_json = "['attic','vase']";

  def error_1;
  try {
      kw_json = keywords as JSON;
  }
  catch(Exception e) {
  	error_1 = e;
      }

  %> 
! function() {
	/**
	* Set up Eu related grid and helper functions 
	*/

    // ${error_1}
	
		var make_eu_query_data= function() {
		var get_startrec = function(){
			var out = 1;
			if ('eu_cursor' in window){
				out = window.eu_cursor
				
				}
			
			return 1;
			}
		var startrec = get_startrec();
		
		// make data for eu related ajax call 
		var data = 	{accnum:"${accnum}", 
				keywords:${kw_json}, 
				gridid:"euwidget", 
				klass:"euwidget", 
				displayInfobox:"true",
				height:"100px",
				width:"100px",
				startrec:startrec} 
		return data;
		}
		var makeEuRelatedItems = function() {
			var data = make_eu_query_data();
			var templateSel = "#gridTemplate";
			var gridSel = "#${gridid}"
			europeanaWidget_doEuRelated(templateSel,gridSel,data);
			 // set up freewall grid and some other stuff
			europeanaWidget_makeGrid("#${gridid}","${width}","${height}",${displayInfobox},1100,"${accnum}")	
		// set up the voting. 
			europeanaWidget_voteSetup("#${gridid} .cell",'#relevance-vote',"${accnum}")
		}
		$(document).ready(function(){
			makeEuRelatedItems();
		});

	/**
	* More eu items
	*/
		$(document).on('click','#itemsCount',function(){
			// get the next batch..
			makeEuRelatedItems();
			})
	/** 
	 * Museum filter pane toggle
	 */
	$(document).on('click','.cb-eu',function(){
		console.log(this);
		console.log($(this).val())
		var mus = $(this).val();
		$('[data-eu-provider="'+mus+'"]').toggle();
		$(window).trigger("resize");
	  
	});
}()
	</script>
	
	<div id="${gridid}" class="ure-grid eu-grid ${klass_ }">
		<%   def hideInfodiv = (displayInfobox)?"hide-infodiv":"showtheinfobox" %>
		<!--  code from static grid in git master < commit ae8e06530236e16e8e0b411e43b7bd99b98ac325  -->
	</div>
</div>
<script src="${resource(dir:'js',file:'europeana_widget.js?v=2')}"></script>
<script>



! function() {
$(document).ready(function(){
   
	
});

   }()
</script>
<div id="gridTemplate" style="display: none;">
	<div class="cell gridlist-cell" data-ure-uri>
		<div class="image-infobox">
			<div class="short_title"></div>
			<div class="date"></div>
			<div class="caption"></div>
		</div>
	</div>
</div>
<div id="provider-label-template"  style="display: none;">
  <label class="checkbox-inline provider-checklist" data-eu-provider-list='key'>
            <input class="cb-eu" type="checkbox" value='key' checked></input>
  </label>
</div>

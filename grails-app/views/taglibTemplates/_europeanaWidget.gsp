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
	<span id="itemsCount" style="padding-left: 12px; text-decoration: underline; cursor: pointer;"></span>
	&nbsp;of&nbsp;
	<span id="total-results" style="padding-left: 12px;"></span>
	<div id="provider-filter" class="collapse controls span2"></div>
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
	$(document).ready(function(){

	init_euRelated("${accnum}", ${kw_json},"${gridid}","${width}","${height}",${displayInfobox}) 
	})		
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
<div id="provider-label-template" style="display: none;">
	<label class="checkbox-inline provider-checklist" data-eu-provider-list='key'>
		<input class="cb-eu" type="checkbox" value='key' checked></input>
	</label>
</div>

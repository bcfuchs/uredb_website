<%@ page import="grails.converters.*"%>
<%@ page import="java.util.logging.Logger" %>
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


%>
-->

<script>

</script>

 	<span style="text-decoration: underline; cursor:pointer;" id="filterbymuseum" data-target="#provider-filter"  data-toggle="collapse">Filter by museum</span>
 	<span style="text-decoration: underline; cursor:pointer;" id="relevance-vote" data-relevance-finish="finish tagging" data-relevance-toggle="off">tag as not relevant</span>
	<div id="provider-filter" class="collapse controls span2">
<!--  TODO move this to js	 -->
	<% providers.sort().each { 
        %>
        <label class="checkbox-inline provider-checklist" data-eu-provider-list='${it.key}'>
            <input class="cb-eu" type="checkbox" value='${it.key}' checked> ${it.key}</input>
       </label>
    <%  }   %>
       
    </div>
            
<div id="${gridid}" class="ure-grid ${klass_ }">
	<%   def hideInfodiv = (displayInfobox.toBoolean())?"hide-infodiv":"showtheinfobox" %>
	<g:each var="item" in="${items}">
<!--  $item.dcSubject -->
	<%
    
    def back_url = "background-image: url("+ item.thumb+ ')';
    
     %>
    
			<div class="cell gridlist-cell" data-ure-uri="${item.thumb}"  
			data-eu-all=''
			data-eu-provider='${item.provider}'
			data-eu-id="${item.id }"
			data-eu-guid="${item.guid }"
			data-eu-link="${item.link}" 
			data-ure-image-url="${item.thumb}" 
			data-dcSubject="${item.dcSubject }" 
				style='width:${width}; height: ${height}; ${back_url }'>
				<div class="image-infobox ${hideInfodiv}">
					
					<div class="short_title">
						${item.title}
					</div>
					<div class="date">
						${item.date?.def} ${item.period?.def} 
					</div>
					<div class="caption">
							${item.provider}
					</div>
				</div>
			</div>
	
	</g:each>
</div>
</div>
<script src="${resource(dir:'js',file:'europeana_widget.js?v=2')}"></script>
<script>

! function() {
$(document).ready(function(){
	europeanaWidget_makeGrid("#${gridid}","${width}","${height}",${displayInfobox},1100,"${accnum}")	
	europeanaWidget_voteSetup("#${gridid} .cell",'#relevance-vote',"${accnum}")
  
	
});

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

<style>
#relevance-vote {
	padding-left: 20px;
}
.voterbtn {
	position: absolute;
	bottom: 0;
}

#${gridid}  {

}
#${gridid} .cell {
	background-size: cover;
	border: 2px solid gray;
	background-position: 50% 50%;
	background-repeat: no-repeat;
	color: #000;
}

#${gridid} .image-infobox {
	background: black;
	color: white;
	opacity: 0.6;
	padding-left: 3px;
	font-size: 8px;
}

#${gridid} .image-infobox div {
	line-height: normal;
	padding-bottom: 10px;
}

#${gridid} .image-infobox  .short_title {
	font-style: italic;
	font-weight: bold;
}

#${gridid} .image-infobox .desc {
	line-height: 10px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

#${gridid} .hide-infodiv {
	display: none;
}
.fieldlist-img {
height: 40px;

}
</style>
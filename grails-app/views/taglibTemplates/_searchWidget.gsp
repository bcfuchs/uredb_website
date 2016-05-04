<%@ page import="org.springframework.util.ClassUtils"%>
<%@ page import="grails.plugin.searchable.internal.lucene.LuceneUtils"%>
<%@ page import="grails.plugin.searchable.internal.util.StringQueryUtils"%>
<%@ page import="grails.converters.*"%>
<%@ page import="org.ac.uk.reading.ure.uredb.Uremeta"%>	
<%@ page import="java.util.logging.Logger" %>
<style>
.image-infobox {
	background: black;
	color: white;
	opacity: 0.6;
	padding-left: 30px;
	
}
.image-infobox div {
	line-height: normal;
	padding-bottom: 10px;
}
 .image-infobox  .short_title {
 font-style: italic;
 font-weight: bold;
 }
.image-infobox .desc {
	
  line-height: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
<div id="header">
	<style>
	
	.disp1 {
	display: none;
	}
	</style>
	<span class="disp1" id="domasonry">masonry</span>
	<span class="disp1" id="dolist">list</span>
	<span class="disp1" id="dofreewall">freewall</span>
	
<%
flash.fromSearch  = true;
flash.searchUrl = 	"/searchable/?" + request.getQueryString();

 %>
 
	<div id="searchable-index-searchbar">
    <g:form useToken="true" url='[controller: "searchable", action: "index"]' id="searchableForm" name="searchableForm" method="get" style="color:black;">
        <g:textField name="q" value="${params.q}" size="50"/> 
        <input type="hidden" name="max" value="100" id="max" />
        <button id="qs-search" type="submit" name="submit" value="go"></button>
    </g:form>
    </div>
     
		<div style="clear: both; display: none;" class="hint">
			See
			<a href="http://lucene.apache.org/java/docs/queryparsersyntax.html">Lucene query syntax</a>
			for advanced queries
		</div>
	</div>
	
	<div id="searchpage-center" class="searchpage_widget ${klass}">
		
		<g:set var="haveQuery" value="${params?.q?.trim()}" />
		<g:set var="haveResults" value="${searchResult?.results}" />
	
		
		<div class="title">
			<span id="searchable-showing">
				<g:if test="${haveQuery && haveResults}">
				<script>
				
				
				var ure_searchResultTotal = ${searchResult.total};
				var ure_searchResultOffset = ${searchResult.offset};
				
				</script>
          Showing <strong id="searchable-showing-from"> ${searchResult.offset + 1}
					</strong> - <strong id="searchable-showing-to"> ${searchResult.results.size() + searchResult.offset}
					</strong> of <strong> ${searchResult.total}
					</strong>
          results for <strong> ${params.q}
					</strong>
				</g:if>
				<g:else>
				</g:else>
			</span>
		</div>
		<g:if test="${haveQuery && !haveResults && !parseException}">
			<p>
				Nothing matched your query - <strong> ${params.q}
				</strong>
			</p>
			<g:if test="${!searchResult?.suggestedQuery}">
				<p>Suggestions:</p>
				<ul>
					<li>Try a suggested query: <g:link controller="searchable" action="index"
							params="[q: params.q, suggestQuery: true,max:100]">Search again with the <strong>suggestQuery</strong> option</g:link><br />
						
					</em>
					</li>
				</ul>
			</g:if>
		</g:if>
		<g:if test="${searchResult?.suggestedQuery}">
			<p>
				Did you mean
				<g:link controller="searchable" action="index" params="[q: searchResult.suggestedQuery, max: 100]">
					${StringQueryUtils.highlightTermDiffs(params.q.trim(), searchResult.suggestedQuery)}
				</g:link>
				?
			</p>
		</g:if>
		<g:if test="${parseException}">
			<p>
				Your query - <strong> ${params.q}
				</strong> - is not valid.
			</p>
			<p>Suggestions:</p>
			<ul>
				<li>Fix the query: see <a href="http://lucene.apache.org/java/docs/queryparsersyntax.html">Lucene query syntax</a>
					for examples
				</li>
				<g:if test="${LuceneUtils.queryHasSpecialCharacters(params.q)}">
					<li>Remove special characters like <strong>" - [ ]</strong>, before searching, eg, <em><strong> ${LuceneUtils.cleanQuery(params.q)}
						</strong></em><br /> <em>Use the Searchable Plugin's <strong>LuceneUtils#cleanQuery</strong> helper method for this: <g:link
								controller="searchable" action="index" params="[q: LuceneUtils.cleanQuery(params.q)]">Search again with special characters removed</g:link></em>
					</li>
					<li>Escape special characters like <strong>" - [ ]</strong> with <strong>\</strong>, eg, <em><strong>
								${LuceneUtils.escapeQuery(params.q)}
						</strong></em><br /> <em>Use the Searchable Plugin's <strong>LuceneUtils#escapeQuery</strong> helper method for this: <g:link
								controller="searchable" action="index" params="[q: LuceneUtils.escapeQuery(params.q)]">Search again with special characters escaped</g:link></em><br />
						<em>Or use the Searchable Plugin's <strong>escape</strong> option: <g:link controller="searchable" action="index"
								params="[q: params.q, escape: true]">Search again with the <strong>escape</strong> option enabled</g:link></em>
					</li>
				</g:if>
			</ul>
		</g:if>
		<g:if test="${haveResults}">
			<div id="results" class="results" data-masonry-options='{ "itemSelector": ".result", "columWidth": 40 }'>
				<g:each var="result" in="${searchResult.results}" status="index">
					<div class="result">
						<g:set var="className" value="${ClassUtils.getShortName(result.getClass())}" />
						<g:set var="link"
							value="${createLink(controller: className[0].toLowerCase() + className[1..-1], action: 'show', id: result.id)}" />
						<g:if test="${className == 'Uremeta' }">
							
							<g:if test="${result.media.size() > 0}">
								<g:set var="media" value="${result.media as List}" />
								
								<table class="search_image" data-ure-id="${media[0].resource_id}">
									<tr>
										<td><img src="${media[0].uri_local.encodeAsHTML()}/thumb/${media[0].uri.encodeAsHTML()}"></img></td>
										<g:if test="${media.size() > 1}">
											<td><img src="${media[1].uri_local.encodeAsHTML()}/thumb/${media[1].uri.encodeAsHTML()}"></img></td>
										</g:if>
									</tr>
								</table>
								<%
								
								def u,uid,artist,short_title;
								
                                artist = "";
                                short_title = result.short_title;
								
                                %>
							
							
							<div class="image-infobox" data-ure-id="${media[0].resource_id}">
								<div class="name">
								<a href="${link}">
									${result.accession_number}
								</a>
							</div>
							
							<g:if test="${short_title}">
								<g:set var="short_title" value="${short_title.toString()}" />
								<g:if test="${short_title.size() > 120}">
									<g:set var="short_title" value="${short_title[0..120] + '...'}" />
								</g:if>
								<g:if test="${short_title == 'null'}">
									<g:set var="short_title" value="" />
								</g:if>
								<g:if test="${short_title != "" }">
								<div class="short_title">
									 ${short_title.encodeAsHTML()}
								</div>
								</g:if>
							</g:if>
							
							<g:set var="date" value="${result.date.toString()}" />
						
							<div class="date">
								${date.encodeAsHTML()}
								
							</div>
							
							
							<g:if test="${result.artist }">
							<g:set var="artist" value="${result.artist.toString()}" />
							<g:if test="${artist.size() > 120}">
								<g:set var="artist" value="${artist[0..120] + '...'}" />
							</g:if>
							</g:if>
							<div class="desc">
								${artist.encodeAsHTML()}
							</div>
							
							</div>
							</g:if>
						</g:if>
						<!--  XXXYYY uh oh we don't do anything with entries that don't have pics !!!! -->
						<g:if test="${className == 'Media' }">
							<%
								def result_resource_id = result.resource_id;
								def u,uid,artist,short_title,date;
								u = Uremeta.findByAccession_number(result.resource_id);
								def warn; 
                                artist = "";
                                short_title = "";
								if (u) { uid = u.id
                                    artist = u.artist;
                                    short_title = u.short_title;
                                    date = u.date;
                                    
                                }
								else { warn = "uh oh!"};
                        		
						 %>
							<g:if test="${u}">
								
								<div class="result-image" >
									<img src="${result.uri_local.encodeAsHTML()}/thumb/${result.uri.encodeAsHTML()}"></img>
									
								</div>
								<%--
								// the infobox to display on hover
								--%>
							<div class="image-infobox" data-ure-id="${result_resource_id}">
								<div class="name">
									<a href="/uremeta/show/${uid}">
										${ result.resource_id}
										${warn}
									</a>
								</div>
								
				
							
								
								<g:if test="${short_title}">
								<g:set var="short_title" value="${short_title.toString()}" />
								<g:if test="${short_title.size() > 120}">
									<g:set var="short_title" value="${short_title[0..120] + '...'}" />
								</g:if>
								<g:if test="${short_title == 'null'}">
									<g:set var="short_title" value="" />
								</g:if>
								<g:if test="${short_title != "" }">
								<div class="short_title">
									 ${short_title.encodeAsHTML()}
								</div>
								</g:if>
								</g:if>
								
								<div class="date">
								${date.encodeAsHTML()}
								
								</div>
								
								<g:set var="caption" value="${result.caption.toString()}" />
								<g:if test="${caption && caption.size() > 120}">
									<g:set var="caption" value="${caption[0..120] + '...'}" />
								</g:if>
								<g:if test="${caption == 'null'}">
									<g:set var="caption" value="" />
								</g:if>
								<div class="caption">
									${caption.encodeAsHTML()}
								</div>
								
							</div>
						</g:if>
						</g:if>
					</div>
				</g:each>
			</div>
			<div class="paging">
				<g:if test="${haveResults}">
					<span id="pagecap">Page:</span>
					<g:set var="totalPages" value="${Math.ceil(searchResult.total / searchResult.max)}" />
						<g:if test="${totalPages == 1}">
							<span class="currentStep">1</span>
						</g:if>
					<g:else>
						<g:paginate controller="searchable" action="index" params="[q: params.q,max: params.max]" total="${searchResult.total}"
							prev="&lt; previous" next="next &gt;" />
					</g:else>
				</g:if>
			</div>
		
		</g:if>
	</div>
	
	
	YYYYYY
	<div class="info-template" style="display:none">info here</div>
	
	<style>
	.hide-infodiv {
		display:none;
	
	}
	</style>
	<script>
    ! function(){
      var masonry_html = "";
      var freewall_html = "";
      var list_html = "";
	  var innards = "" ;	
	  var proc_items_fw = function(items) {

		var w = 200, h=200, html = '', limitItem = 49;
		var ids = {};
		for (var i = 0; i < items.length; i++) {
	  		var imgurl = $(items[i]).find('img').attr('src');
	  		
	        var infodiv = $(items[i]).find('.image-infobox')
	        var id = $(infodiv).attr("data-ure-id");
	      	var newinfo = $('<div>').append($(infodiv).clone()).html()  
	        $(infodiv).addClass("hide-infodiv");
	        // dont add if there's no image
	       if ( typeof imgurl !== "undefined" ) {
	  		var temp = "<div class='cell' style='width:{width}px; height: {height}px; background-image: url({url})'>"
		        + newinfo
		  		+"</div>";
	       	if (!(id in ids)) {
	   
  				html += temp.replace(/\{height\}/g, h).replace(/\{width\}/g, w).replace("{url}", imgurl).replace("/thumb","/sm");
				
			   ids[id] = ""
	       	}
	       	else {
	     
	     
		     }
	       }
		}
		$(html).find(".image-infobox").hide();
		
	return html;

	} 

	var proc_items_fw_old = function(items) {

		var w = 200, h=200, html = '', limitItem = 49;
		for (var i = 0; i < items.length; i++) {
	  		var imgurl = $(items[i]).attr('src');
	  		var temp = "<div class='cell' style='width:{width}px; height: {height}px; background-image: url({url})'></div>";
	  			html += temp.replace(/\{height\}/g, h).replace(/\{width\}/g, w).replace("{url}", imgurl).replace("/thumb","/sm");
			}
	return html;

	} 
  	  var dofreewall = function(){
      	  if (freewall_html !==  ""){
  					$('#results').html(freewall_html)
  					
  	     	}
      	  else {
      		var items = $(".result");
      		
		    html = proc_items_fw(items)
      	 	$("#results").html(html);
		    $("#results").find(".image-infobox").addClass("hide-infodiv")
      		$("#results").addClass("free-wall");
        	var wall = new Freewall("#results");
        wall.reset({
          selector : '.cell',
          animate : true,
          cellW : 200,
          cellH : 200,
          onResize : function() {
            wall.refresh();
           
              
            $(".results .cell").on("hover",function(){ $(this).find(".image-infobox").toggleClass("hide-infodiv");
				$(this).css("cursor","pointer");

            });
            $(".results .cell").each(function(k,v){
				var url = $(v).find(".name a").attr("href");
				$(v).click( function(){window.location = url});


              });
            var tot = $(".results .cell").length + ure_searchResultOffset;
      		$("#searchable-showing-to").html(tot);
      			
            
             
          }
        });
        wall.fitWidth();
        // for scroll bar appear;
        $(window).trigger("resize");
        freewall_html = $("#results").prop('innerHTML')
      }
       

      }
		$(document).ready(function(){
		// put the info in a box under the image
		
		  $(".result").each(function(i,v){
			    
			  // display info on hover
			  var d = 	$(v).find('.image-infobox');
				 var img  = $(v).find('img');
				$(v).hover(function(){
				//	$(d).toggle();
					// $(d).toggle();
				//	$(d).toggleClass('result-open');
					// expand the result box
					//$('.grid').masonry();
					
					});


			  })
			
	$("#dofreewall").click(function(){
	  if (freewall_html !==  ""){
			$('#results').html(freewall_html)
		
   			}
	  else {
  		dofreewall();
	  }
	}); 
		  $("#domasonry").click(function(){
		    if (masonry_html !==  ""){
					$('#results').html(masonry_html)
					
	     			}
		    else {
			$("#results").addClass("grid js-masonry");
			$("#results").masonry();
			$("#dolist").removeClass("disp1-on");
			$("#dofreewall").removeClass("disp1-on");
			$(this).addClass("disp1-on");
			masonry_html = $("#results").prop('innerHTML')
		    }
			
			  })
 $("#dolist").click(function(){
   			if (list_html !==  ""){
     			
				$('#results').html(list_html)
				console.log($('#results'))
				console.log("RESULTS")
   			}
   			else {
   				console.log("NO RESULTS")
   			}
   			
				$("#results").removeClass("grid").removeClass("js-masonry");
     			$("#results").removeClass("free-wall");
				$("#results").masonry('destroy');
				$("#domasonry").removeClass("disp1-on");
				$(this).addClass("disp1-on");
			 
				list_html = $("#results").prop('innerHTML')
				
				
   			
			  })
			  

			})
			
			$(document).ready(function(){
			 $("#domasonry").click()
			 $("#dolist").click()
			 $("#dofreewall").click()
			})
      }()

	</script>

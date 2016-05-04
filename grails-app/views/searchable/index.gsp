<%@ page defaultCodec="html"%>
<%@ page import="org.springframework.util.ClassUtils"%>
<%@ page import="grails.plugin.searchable.internal.lucene.LuceneUtils"%>
<%@ page import="grails.plugin.searchable.internal.util.StringQueryUtils"%>
<%@ page import="grails.converters.*"%>
<%@ page import="org.ac.uk.reading.ure.uredb.Uremeta"%>
<html>
<head>
<meta name="layout" content="ure/main" />     
<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
<title><g:if test="${params.q && params.q?.trim() != ''}">
		${params.q} - </g:if> Ure Museum Database | search</title>
<link rel="stylesheet" href="${resource(dir:'css/ure',file:'searchable.css')}" />
<script type="text/javascript">
  var focusQueryInput = function() {
    document.getElementById("q").focus();
  }
</script>
<script src="${resource(dir:'js/vendor/freewall',file:'freewall.js')}"></script>
</head>
<body onload="focusQueryInput();">
	<g:set var="haveQuery" value="${params?.q?.trim()}" />
	<g:set var="haveResults" value="${searchResult?.results}" />
	<div id="search-top-row" class="container">
		<div class="row">
			<div class="col-md-4">
				<div class="title2">
					<span id="searchable-showing">
						<g:if test="${haveQuery && haveResults}">
							<script>
               				 var ure_searchResultTotal =${searchResult.total};
      				          var ure_searchResultOffset =${searchResult.offset};
      				        </script>
          
 		         			Showing <strong id="searchable-showing-from"> ${searchResult.offset + 1}
							</strong> - <strong id="searchable-showing-to"> ${searchResult.results.size() + searchResult.offset}
							</strong> of <strong> ${searchResult.total}
							</strong>results for <strong> ${params.q}</strong>
						</g:if>
						<g:else>
						</g:else>
					</span>
				</div>
			</div>
			<div class="col-md-8">
			<div id="searchable-index-searchbar">
		<g:render template="/taglibTemplates/searchbar2" />
	</div>
			</div>
		</div>
	</div>
	
		
	
	
	<div style="clear: both; display: none;" class="hint">
		See
		<a href="http://lucene.apache.org/java/docs/queryparsersyntax.html">Lucene query syntax</a>
		for advanced queries
	</div>
	<div id="searchpage-center">
		
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
			<script>
        !function() {
          $(document).ready(function() {
            var html = $("#ure-suggest").html().replace(/&gt;/g, ">").replace(/&lt;/g, "<");
            $("#ure-suggest").html(html)
          })
        }()
      </script>
			<p id="ure-suggest">
				Did you mean
				<g:link controller="searchable" action="index" params="[q: searchResult.suggestedQuery, max: 100]">
					${StringQueryUtils.highlightTermDiffs(params.q.trim(), searchResult.suggestedQuery)}
				</g:link>
				?
			</p>
			<!--   
		 
		-->
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
		
		
		<div class="container">
				<div class="row">
					<div class="col-md-10">
						<ure:gridWidgetForSearchResults gridid="testgridw" klass="testwidget" results="${searchResult?.results}"
							displayInfobox="false" height="125px" width="125px">
						</ure:gridWidgetForSearchResults>
						<div class="paging">
							<g:if test="${haveResults}">
								<span id="pagecap">Page:</span>
								<g:set var="totalPages" value="${Math.ceil(searchResult.total / searchResult.max)}" />
								<g:if test="${totalPages == 1}">
									<span class="currentStep">1</span>
								</g:if>
								<g:else>
									<g:paginate controller="searchable" action="index" params="[q: params.q,max: params.max]"
										total="${searchResult.total}" prev="&lt; previous" next="next &gt;" />
								</g:else>
							</g:if>
						</div>
						<!-- .paging -->
					</div>
					<!--  .col-md-10 -->
					<div class="col-md-2"></div>
				</div>
				<!-- .row -->
			</div>
			<!--  .container -->
		</g:if>
	</div>
	<style>
#main {
min-height: 1200px;
}
#testgridw {
	font-size: 8px;
}

#testgridw .image-infobox {
	background: black;
	color: white;
	opacity: 0.6;
	padding-left: 3px;
}

#testgridw .image-infobox div {
	line-height: normal;
	padding-bottom: 10px;
}

#testgridw .image-infobox  .short_title {
	font-style: italic;
	font-weight: bold;
}

#testgridw .image-infobox .desc {
	line-height: 10px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	display: none;
}
</style>
</body>
</html>


	<div id="searchable-index-searchbar">
	
   		<g:render template="/taglibTemplates/searchbar2" />
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
			<!--   -->
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
	          <!--   RESULTS HERE -->
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
	RRRRR
	</div>
	
	

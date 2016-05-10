<style>

.kw-highlight {
color: white;
}

.img_link img {
max-height: 50px;
}
#kw-span {
color: white;
}

#words-in-context .row:hover {
background: salmon;
cursor: pointer;
}

#words-in-context td {

 padding: 5px 15px 0 0;
    text-align: left;

}
</style>

<script src="${resource(dir:'js',file:'listWidget.js')}"></script>
<span id="kw-span" style="display:none">${word}</span>
<span id="field-span" style="display:none">${field}</span>

<div id="words-in-context" class="container">
	<g:each in="${recs}" var="accnum">
	<a href="/record/${accnum}">
		<div class="row fieldlist-row" data-ure-accnum="${accnum}">
			<div class="col-md-2">
			
				${accnum}
			
			</div>
			<div class="col-md-6 context-col">
			<g:if test="${context}">
					<g:if test="${context[accnum]}">
						${context[accnum]} 
					</g:if>
				</g:if>
			</div>
			<div class="col-md-4 img-col">
		    	<img class="fieldlist-img" style="" src="${thumbnails[accnum]}"></img>
			</div>
		</div>
		</a>
	</g:each>
</div>

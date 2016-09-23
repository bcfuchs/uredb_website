<script src="//cdnjs.cloudflare.com/ajax/libs/clipboard.js/1.5.5/clipboard.min.js"></script> 
<script src="${resource(dir:'js',file:'citation_widget.js')}"></script>
<script>

</script>
<style>
#citationWidget-container button {
	display: inline;
}
.inline {
display:inline;
}

#citationWidget {
	display: inline;
	font-size: 10px;
}
</style>

<div id="citationWidget-container">
	<button class="btn btn-default btn-xs" id="getCitation">cite this page</button>
	<div id="citationWidget" class="hidden inline">
		Ure Museum Database, Amy C. Smith et al., edd.
		<span id="link"></span>
		(accessed
		<g:formatDate format=" d MMMMMMMM, yyyy" date="${new java.util.Date()}" />
		). University of Reading &lt;http: //www.reading.ac.uk/ure /&gt
	</div>
	<div id="copyme-container" class="inline hidden">
	<span id="copyme" data-clipboard-target="#citationWidget" class="glyphicon glyphicon-copy" ></span>
</div>
</div>
<div style="clear:both;"></div>


<!-- Trigger -->





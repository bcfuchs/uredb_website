<link rel="stylesheet" href="/css/ure/wordlistwidget.css"></link>
<script src="${resource(dir:'js',file:'wordlistwidget.js?v=2')}"></script>
<script>
! function(){
$(document).ready(function(){

  var make_sort_click = function(clickid,get_sortable) {
  	var asc = false;
	$(clickid).click(function(){
		
	  var chartsel = ".recfields"
	  var rowsel = ".wordcellhead"
	 
	  chartsorter(chartsel,rowsel,get_sortable,asc)
	   $(this).removeClass('ascdesc');
	 
	   (asc === false)?($(this).removeClass("asc").addClass("desc")):($(this).removeClass("desc").addClass("asc"))
	  asc = (asc === false)? true:false
	 
	  
	});
  }
 	var get_sortable = function(el) {
    	return $(el).attr("data-ure-wc") * 1;
	}

  make_sort_click("#freq-title",get_sortable);
  make_sort_click("#word-title",function(el){ return $(el).attr("data-ure-word")})
  $(".recfields-titles > .row > div").hover(function() { $(this).not.removeClass("ascdesc")   },function(){  $(this).not.addClass("ascdesc")});
  

  
});
  
}()

</script>

<div id="wordlist-widget" class="${klass} wordlistwidget">
	<g:render template="/ure/typeahead_widget" model="[filterclass:".searchable-typeahead .wordcellhead"]"></g:render>
	<div class="container recfields-titles">
	<div class="row">
	<div class="col-md-2 word ascdesc" id="word-title">word</div>
	<div class="col-md-4 wc ascdesc" id="freq-title">frequency</div>
	<div class="col-md-6 thumb"></div>
	</div>
	</div>
	<div class="container recfields searchable-typeahead">
		<g:each in="${words}" var="word">
			<% 
				def linktype = "record";
				if (type) {
					linktype = type;	
				}
			
		     %>
			<div class="row wordcellhead hideme" data-ure-word="${word}" data-ure-field="${f}" data-ure-wc="${wordcount[word]}">
				
						<div class="col-md-2 word">
						<a href="/${linktype}list/${f}/${word.encodeAsURL()}">
							${word}
						</a>
						</div>
						<div class="col-md-4 wc" >${wordcount[word]} </div>
						<div class="col-md-6">
						<g:if test="${thumbs}">
							<g:if test="${thumbs[word]}">
								<img class="fieldlist-thumb" src="${thumbs[word]}" />
							</g:if>
						</g:if>
						</div>
						
					
			</div>
		</g:each>
	</div>
</div>
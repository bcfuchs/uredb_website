
<style>
.${klass} .recfields-titles .row > div{
	color: white;
	font-weight: bold;
	cursor: pointer;
}

.${klass} .recfields-titles .row > div:hover {
	background: white;
	color: black;
	
}
.${klass} .wordcellhead {
	
 }
 
 .${klass} .wordcellhead.hideme {
 display: none;
 }

.${klass} #typeahead-box {
		color: black;
		}

.${klass} .fieldlist-thumb {
		 display: inline;
		 height: 20px;
		}
 .asc {
	background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAZ0lEQVQ4y2NgGLKgquEuFxBPAGI2ahhWCsS/gDibUoO0gPgxEP8H4ttArEyuQYxAPBdqEAxPBImTY5gjEL9DM+wTENuQahAvEO9DMwiGdwAxOymGJQLxTyD+jgWDxCMZRsEoGAVoAADeemwtPcZI2wAAAABJRU5ErkJggg==');
 background-repeat: no-repeat;

}

.desc {
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAZUlEQVQ4y2NgGAWjYBSggaqGu5FA/BOIv2PBIPFEUgxjB+IdQPwfC94HxLykus4GiD+hGfQOiB3J8SojEE9EM2wuSJzcsFMG4ttQgx4DsRalkZENxL+AuJQaMcsGxBOAmGvopk8AVz1sLZgg0bsAAAAASUVORK5CYII=');
 background-repeat: no-repeat;
}

.ascdesc {
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAQAAADYWf5HAAAAkElEQVQoz7X QMQ5AQBCF4dWQSJxC5wwax1Cq1e7BAdxD5SL+Tq/QCM1oNiJidwox0355mXnG/DrEtIQ6azioNZQxI0ykPhTQIwhCR+BmBYtlK7kLJYwWCcJA9M4qdrZrd8pPjZWPtOqdRQy320YSV17OatFC4euts6z39GYMKRPCTKY9UnPQ6P+GtMRfGtPnBCiqhAeJPmkqAAAAAElFTkSuQmCC');
 background-repeat: no-repeat;
}
		
</style>

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

<div id="wordlist-widget" class="${klass}">
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
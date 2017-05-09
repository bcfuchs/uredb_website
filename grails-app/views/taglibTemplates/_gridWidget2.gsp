<%@ page import="org.springframework.util.ClassUtils"%>
<%@ page import="grails.plugin.searchable.internal.lucene.LuceneUtils"%>
<%@ page import="grails.plugin.searchable.internal.util.StringQueryUtils"%>
<%@ page import="grails.converters.*"%>
<%@ page import="org.ac.uk.reading.ure.uredb.Uremeta"%>
<%@ page import="java.util.logging.Logger"%>
<script src="${resource(dir:'js/vendor/freewall',file:'freewall.js')}"></script>
<script src="${resource(dir:'js',file:'gridwidget.js')}"></script>
<% 
def meta_json = [recs:[]]
info.each {item->
    def uri = item.key
    def rec = item.value.meta
    def media = item.value.media
    rec['media'] = []
    meta_json['recs'] << [rec:rec,media:media]

}
%>


<script>
! function(){
  console.log("go")
  $(document).ready(function(){
    var templateSel = "#gridTemplate";
    var gridSel = "#gridTarget"
   	var meta_json = ${meta_json as JSON}
	var recs = meta_json['recs']
   for (var i = 0,z= recs.length; i < z; i++) {
     var t = $($(templateSel + " .gridlist-cell")[0]).clone();
		var item = recs[i];
		console.log(item)
		 $(t).find(".short_title").html(item.title);
		 $(gridSel).append(t);
     }
// get the template

// put stuff in the tempalte
function format_bootstrap = function(gridid, options) {
    console.log("format_bootstrap " + gridid);
    var cols_default = 9;
    var cols = options.cols || cols_default;
    var row = $('<div class="row"></div>');
    var cont = $('<div class="container-fluid"></div>');

    $(gridid + " .cell").each(function(i, v) {
      var cell = $(v).clone();
      row.append($(cell).addClass("col-md-2").addClass("col-sm-5").addClass("bs-cell"));
      // every $cols add to row
      if ((i + 1) % cols === 0) {
        cont.append(row);
        row = $('<div class="row"></div>');

      }
    });
    // left-overs...
    if (row.length > 0)
      cont.append(row);

    $(gridid).html(cont);

  }
  });
}()
</script>
<div id="gridTarget"></div>
<div id="gridWidgetTemplates" style="display: none;">
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
</div>

<style>
#${
gridid


}
{
}
#${
gridid


}
.cell {
	background-size: cover;
	border: 2px solid gray;
	background-position: 50% 50%;
	background-repeat: no-repeat;
	color: #000;
}

#${
gridid


}
.image-infobox {
	background: black;
	color: white;
	opacity: 0.6;
	padding-left: 30px;
}

#${
gridid


}
.image-infobox div {
	line-height: normal;
	padding-bottom: 10px;
}

#${
gridid


}
.image-infobox  .short_title {
	font-style: italic;
	font-weight: bold;
}

#${
gridid


}
.image-infobox .desc {
	line-height: 10px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

#${
gridid


}
.hide-infodiv {
	display: none;
}

.fieldlist-img {
	height: 40px;
}
</style>
<!-- 

-->
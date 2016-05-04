<%@ page import="org.ac.uk.reading.ure.uredb.*"%>
<html>
<head>
<meta name="layout" content="ure/editor" />
</head>
<body>
	<script>
		$(document).ready(function() {

			$("#editor_nav_bar").html($("#edit_nav_1"));
			$("#edit_nav_1").show();

		});
	</script>
	<style>
#edit_nav_1 a {
	font-size: 0.8em;
	text-decoration: none;
	text-transform: uppercase;
	color: #B68092;;
}

#edit_nav_1 a:hover {
	color: #B61148;
}
	</style>
	
<div id="edit_nav_1" style="display: none" class="nav2">
		<a href="/">Home</a>
		<a href="/admin/selpicdir">list</a>

</div>

<script>
$(document).ready(function(){
$("h3.firsttitle").click(function(){
	$('#debug_1').toggle();
});
	
})
</script>
	<% 
	def picid = params.id as int; // id of the image from the db
	
	def pic = Media.get(picid);
	// def accnums = Uremeta.executeQuery('select distinct accession_number from Uremeta');
	// def uremeta = Uremeta.list();
	def msg;
	// new page params in kv
	def kv = ['adddb':"save"]
	kv.caption = pic.caption;
	

	def info =[:];
	
	def assoc_save = {->
		pic.caption = params.caption;
		pic.resource_id = params.accnums;
		// save the pic info
		pic.save(flush:true);
		def meta = Uremeta.findByAccession_number(params.accnums);
		info['did_meta'] = meta.addToMedia(pic);
		info.meta_id = meta?.id;
		info['did_meta_media'] = meta.media;
		kv.caption = params.caption;
		kv.accnums = params.accnums;
		kv.adddb = "committed";
	// save the association and flush
		meta.save(flush:true);
	}
	
	if (params.accnums != "") {
		kv.accnums = params.accnums;
	}
	if (params.adddb == "save") {
		msg ="CONFIRM";
		kv.adddb = "confirm";
		kv.caption = params.caption;
		kv.accnums = params.accnums;
		
	}
	if (params.adddb == "confirm") {	
		
		assoc_save();
	}
	
	if (params.adddb == "committed") {
		kv.adddb = "committed";

	}
	%>
	<div id="debug_1" style="display:none;background-color:#333;color:#AAA	;padding:10px;">
	step ${msg}<br/>
	info ${info}
	<br/>
	${params}
	</div>
	
<div id="picassoc-content" class="container">
	<table class="ureent border=" 0" cellpadding="3" frame="above">
		<tr>
			<th class=imagehead>
				${pic.dir } / ${pic.uri}
			
		<tr>
			<td valign=top class="image"><img
				src="${pic.uri_local}/sm/${pic.uri}">
			</td>
			<td valign=top>
			
				<form action="/admin/picassoc2" method="post">
					<input type="hidden" name="img" value="${picid}" />
					<input type="hidden" name="id" value="${picid}" />
					<input type="hidden" name="step" value="confirm" />
		
					<table id="de" class="de">
						<tr>
							<td class=head>accession number <span id="accnum-show"></span></td>
						</tr>
						<tr>
							<td class=accnum valign=top>
							<g:if test="${kv.adddb == 'committed'}">
							accession number: ${kv.accnums }
							</g:if>
							<g:else>
							<g:select 
									id="accnums"
									name="accnums"
									from="${Uremeta.list()}" 
									value="${kv.accnums}"
									optionKey="accession_number"
									optionValue="accession_number"
									noSelection="['':'-Assign an accession number-']" />
							</g:else>
							</td>
							</tr>
						<tr>
							<td class="head">caption</td>
						</tr>
						<tr>
							<td class=caption><textarea name="caption" rows="6"
									cols="60" value="${kv.caption}">${kv.caption}</textarea> 
							</td>

						</tr>	
						<tr>
						<td id="save-btn-pic">
						<g:if test="${kv.adddb == 'committed'}">
						<a class="db_Modal" data-toggle="modal" href="#dbModal">show in database</a> 
						</g:if>
						<g:else>
						<input id="picsubmit" class="btn btn-primary  btn-lg"
								type="submit" name="adddb" value="${kv.adddb}" /> 
								<input
								type="hidden" name="dir" value="${pic.dir}" />
						</g:else>
						</td>
						</tr>
						<tr>
							<td class="recfrag"></td>
							</tr>
					</table>
					</form>
				
					</td>
					</tr>
					
	</table>
	</div>
	<script>
	
	$(document).ready(function(){

	function show_db(accnum) {
		$("#accnum-show").html(accnum)
		}
 	$('#accnums').change(function(e){
		//e.preventDefault(); // dont submit yet.
		// show the 
		console.log($( "#accnums option:selected" ).val());
 		show_db($( "#accnums option:selected" ).val());
 	 	});

		});

	</script>
	<g:if test="${kv.adddb == 'committed'}">
	
	<g:render template="/shared/ure/bootstrap"></g:render>
	<% def src1 = [src:"/uremeta/show/"+info.meta_id]; %>
	<g:render template="/shared/ure/modal_db" var="t" model="${src1}"></g:render>
	</g:if>
	
	
</body>
</html>

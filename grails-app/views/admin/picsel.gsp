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

.thumbcaption {
	font-size: 1;
	display: none;
}

#showcomms {
	
}
.instructions {
margin-left: 0;
width: 80%;
}
.td-left {
width: 50%;

}
.td-right {
	float: left;
}
</style>

	<div id="edit_nav_1" style="display: none" class="nav2">
		<a href="/admin/selpicdir">list</a>
		
	</div>

	<table width="100%">
		<tr>
		   <td class="td-left">
			<div class="container instructions">
					<ul class="list-group">
						<li class="list-group-item">Click on an image to assign it.</li>
						<li class="list-group-item">Images  with
							accession numbers have already been assigned. </li>
						<li class="list-group-item">Click on the eye icon to toggle comments.
							</li>
					</ul>
				</div>			
			</td>
			<script>
				$(document).ready(function() {
					//	alert('hi');

					$('#showcomms').click(function() {
						$('.thumbcaption').toggle();

					});

				})
			</script>
			<td class="toollink td-right" align="center" id="showcomms">
				<div id="showcomms">
					<span class="glyphicon glyphicon-eye-open"></span>
					
				</div>
			</td>

		</tr>
	</table>
	<% 
	//def dir = params.dir;
	
//	def med = Media.findAll("from Media as m where m.dir = ?",[dir]);
	
	// unassigned media are those without links
	%>

<g:set var="editor" bean="editorService"/>
	<table class=thumb>
		<!-- rows of 6 -->
		<tr>
			<g:each status="i" var="pics" in="${editor.picsel(params.dir)}">

				<td>
					<table>
						<tr>
							<!-- no resource id? then unassigned! -->
							<td height="14" align="left"><font size="1">
									${pics.resource_id}
							</font></td>
						</tr>
						<tr>
							<td align="left">
								<!--  only allow selection if it is unassigned
					= not in uremeta_media
					
					 --> <g:if test="${!pics.resource_id}">
									<a
										href="/admin/picassoc?id=${pics.id}&accnums=${pics.resource_id}">
								</g:if> <img src="${pics.uri_local}/thumb/${pics.uri}" /> <g:if
									test="${!pics.resource_id}">
									</a>
								</g:if>
							</td>
						</tr>
						<tr>
							<td class="thumbcaption">
								${pics.caption}
							</td>
						</tr>
						<tr>
							<td width="50"><font size="2"> <g:if
										test="${!pics.resource_id}">
										<b>
									</g:if> <font size="1">
										${pics.uri}<br>
								</font> <g:if test="${!pics.resource_id}">
										</b>
									</g:if></td>
						</tr>

					</table>
				</td>
				<g:if test="${(i + 1) % 6 == 0  }">
		</tr>
		<tr>
			</g:if>
			</g:each>
		</tr>

	</table>

</body>
</html>

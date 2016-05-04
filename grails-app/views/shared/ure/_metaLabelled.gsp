<!--  template for record -->
<%
		def hideme_class = "";
		def content
		
				if (t.content == null || t.content == "" || t.content == " ") {
					hideme_class = "ure_hidden";
			}
				else {
					
					hideme_class = "blablab"
					content = t.content;
				}	
			 %>

<tr class="${hideme_class}">
	<td class="reccellhead"><b><a class="${t.field}"
			href="/fieldlist/${t.field}"> ${t.label }
		</a></b></td>

	<td class="reccellcontent"><g:if test="${t.field == 'media' }">

			<table class=contentlist>
				<g:each var="i" in="${t.image}">
					<tr>
						<td class="contentlistcell"><a
							href="${i.base}/xlarge/${i.filename}" target="_blank"><img
								src="${i.base}/thumb/${i.filename}" alt="${i.filename}"></a> <br />


							<font size="1"> ${
 	i.filename
 }</font> <br /> <br /> ${i.caption}</td>

						<td class="contentlistcontent"><br>-><a href=""
							onClick="setCookie('image','{\x22type\x22:\x22ure\x22,\x22image\x22:\x222002.97.0311.jpg\x22}','','/');setCount();">
								add to myUre</a></td>

					</tr>

				</g:each>

			</table>
		</g:if> <g:else>
			<%
		// fix defects from bad data entry
		//TODO repair in db!!!
		def s = t.content;
		 if (t.content) {
			 s = s.replaceAll(/\\n/,'<br/>');
			 s = s.replaceAll(/\\(.)/,'$1');
			 
		 }
		 else {
			 // get rid of nulls
			 s = "";
		 }
		 %>
			${s.encodeAsHTML()}

		</g:else></td>
</tr>
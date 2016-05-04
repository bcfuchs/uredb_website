
<ul id="browse_image_list" class="recfields">
	<%
    					def images_to_show = 4;
                        def objects_to_show = 4;
                        def hideable_object = "";
                        def hide_more_objects_class = "";
                        
                %>
	<g:each in="${imagelist}" var="t" status="s">
		<%
        	if (s > (objects_to_show-1)) { 
                hideable_object = "hideable"
                hide_more_objects_class  = "hideme";
                
            }
         %>
		<li class="wordcellhead">
			<div class="browse_image_result ${hideable_object} ${hide_more_objects_class}">
				<span>
					<a href="/record/${t.accnum}">
						${t.accnum}
					</a>
				</span>
				<g:if test="${t.images.size() >  images_to_show }">
					<span class="show_more">show more...</span>
				</g:if>
				<div class="container image_table_${s}">
					<div class="row">
						<g:each in="${t.images}" status="i" var="img">
							<%
                          
                            
                             def hideable = "";   // hideable images
                             def hide_more_class = ""    // class to hide images
							if (i > (images_to_show - 1)) {
								hideable = "hideable"
								hide_more_class  = "hideme";
							}
							 %>
							<!-- the image + caption -->
							<div class="col-sm-3 browse_image_image ${hideable} ${hide_more_class}">
								<div>
									<a href="/record/${t.accnum}">
										<img src="${img.uri_local}/thumb/${img.uri}" />
									</a>
								</div>
								<div  class="caption">
									<span>
										${img.caption}
									</span>
								</div>
							</div>
							<% 
                                // start a new row 
									def tr = ""; 
									if ((i+1) % 4 ==0) { tr = '</div><div class="row">' }
								%>
							${tr}
						</g:each>
					</div>
				</div>
			</div> <!--  // div.browse_image_result -->
		</li>
	</g:each>
</ul>
<script>
  $(document).ready(function() {
    $(".show_more").click(function() {
      var more_text = "show more..."
      var less_text = "show less..."
      $(this).html() === more_text ? $(this).html(less_text) : $(this).html(more_text)
      $(this).parent().find(".hideable").toggleClass("hideme");
    })

  })
</script>
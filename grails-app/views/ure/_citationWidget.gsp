<!-- 
Ure Museum Web site, Amy C. Smith ed., date of last site update (see below). University of Reading: &gt;http: //www.reading.ac.uk/ure /&lt;

Herodotus, The Histories, trans. A. D. Godley (Cambridge: Harvard University Press, 1920), Perseus Digital Library. http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0126 (accessed April 17, 2012).

http://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
 -->
 <script src="//cdnjs.cloudflare.com/ajax/libs/clipboard.js/1.5.5/clipboard.min.js"></script>
 
<script>
  $(document).ready(function() {
    // init the copy button
    var clip = new Clipboard('#copyme');
    var shown = false;
    clip.on('success', function(e) {
      	$("#copyme-container").hide();
      	var html = $("#citationWidget").html();
      	$("#citationWidget").html("The citation has been copied to your clipboard!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")
      		.delay(1000)
      		.fadeOut(500)
      		
      		.queue(function(n) {
      		  e.clearSelection();
         		 $(this).html(html);
          		n();
      		}).fadeIn(1500)
    });
    
    $("#citationWidget").toggle();
    $("#link").html(window.location.href);
  
    $("#getCitation").click(function() {

  	  if (shown === false) {	
     		 $("#citationWidget").toggleClass("hidden").css("display","inline");
     	 	$("#copyme-container").toggleClass("hidden").css("display","inline");
      		$("#getCitation").text("hide");
     		shown = true;
	}
	else {
	// copy it by popping up a window
	  $("#getCitation").text("cite this page");
	  $("#citationWidget").toggleClass("hidden");
	  $("#copyme-container").toggleClass("hidden");
		shown = false;
		}

    })

  })
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





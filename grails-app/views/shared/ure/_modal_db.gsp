<div id="dbModal" class=" modal container hide fade">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal"
			aria-hidden="true">×</button>
		<h3>Ure Museum DB</h3>
	</div>
	<div class="modal-body">
		<iframe style="height:1000px; width:1400px;" src="${src}"> </iframe>
	</div>
</div>
<script>
$(document).ready(function(){
	$.fn.modal.defaults.maxHeight = function(){
	    // subtract the height of the modal header and footer
	    return $(window).height() - 165; 
	}

	
})
</script>
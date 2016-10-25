
<style>
.retake {
	display: inline;
	width: 200px;
	color: black;
}

.retake button {
	display: inline;
}

.retake input {
	display: inline;
}
</style>
<script>
// toggle retake widget by clicking on the query display. 
  $(document).ready(function() {
    $("#query-retake-text").click(function() {
      $("#retake-group").toggleClass("hidden");
    })

  })
</script>
<div id="retake-group" class="container hidden input-group input-group-sm retake">
	<div class="col-xs-1">
		<button id="retake-button" class="btn btn-default btn-xs">Submit</button>
	</div>
	<div class="col-xs-5">
		<input type="text" class="form-control keypress" data-keypress-target="#retake-button" id="retake-button-terms">
		<br/>
	</div>
</div>
<script>

</script>
<% 
def togglerId = (togglerId)?togglerId:"display-opts"

 %>
<div id="${togglerId}"  class="container">

<div class="btn-group" role="group" id="${togglerId}">
<button id="display-opts-list" type="button" class="btn  btn-default btn-sm" aria-label="Left Align">
  <span class="glyphicon glyphicon-th-list" aria-hidden="true"></span> List
</button>
<button id="display-opts-grid" type="button" class="btn  btn-default btn-sm active">
  <span class="glyphicon glyphicon-th" aria-hidden="true"></span> Grid
</button>
</div>
</div>


<script>
    !function() {
      $(document).ready(function() {
        $("#display-opts-list").click(function() {
          $("#display-opts-grid").removeClass("active") // not the right way, butit works
          $("#${listid}").show();
    //      $(this).css("text-decoration", "underline");
    //      $("#display-opts-grid").css("text-decoration", "none");
          $("#${gridid}").hide();

        })

          $("#display-opts-grid").click(function() {
          $("#${gridid}").show();
          
    //      $(this).css("text-decoration", "underline");
    //      $("#display-opts-list").css("text-decoration", "none");
          $("#${listid}").hide();

      })

    })
  }();
</script>
<style>
#${togglerId} div {
	color: black;
	
	
}
#${ listid} { 
	display:none;


}
</style>
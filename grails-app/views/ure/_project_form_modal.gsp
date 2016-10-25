<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<style>
#myModalNorm {
	color:black;
}
.modal-body .form-horizontal .col-sm-2,
.modal-body .form-horizontal .col-sm-10 {
    width: 100%
}

.modal-body .form-horizontal .control-label {
    text-align: left;
}
.modal-body .form-horizontal .col-sm-offset-2 {
    margin-left: 15px;
}
.modal-title {
color: black;
font-size: 18pt;
}
</style>

<button id="new-project-button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModalNorm">
    + Start a new  project
</button>
<script>
$(document).ready(function(){
//reposition the new project button
	$("#left-nav-project-bar").show();
	$("#left-nav-project-bar").prepend($("#new-project-button"))
	
	$("#new-project-save").click(function(){
		var title = $("#project-title-input").val();
		// add project to projects
		//TODO 
		// escape this data !
		try {
			ure_projects.create(title);
		}
		catch(e) {
			alert(e)
			}
		// update the strip
		// TODO
		ure_project_strip.add(title);
		$("#myModalNorm").modal('hide');
		
	
		
	})
  
})
</script>
<!-- Modal -->
<div class="modal fade" id="myModalNorm" tabindex="-1" role="dialog" 
     aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header">
                <button type="button" id="close-modal" class="close" 
                   data-dismiss="modal">
                       <span aria-hidden="true">&times;</span>
                       <span class="sr-only">Close</span>
                </button>
                <h4 class="modal-title" id="myModalLabel">
                   Create a Project
                </h4>
            </div>
            
            <!-- Modal Body -->
            <div class="modal-body">
                
                <form id="new-project-form" role="form">
                  <div class="form-group">
                    <label for="project-title-input">Project Title</label>
                      <input type="text" class="form-control keypress" data-keypress-target="#new-project-save"
                      id="project-title-input" placeholder="Enter a title"/>
                  </div>
                  <div class="form-group">
                    <label for="exampleInputPassword1">Description</label>
                      <input type="text" class="form-control"
                          id="exampleInputPassword1" placeholder="Short description"/>
                  </div>
                  <!-- 
                  <div class="checkbox">
                    <label>
                        <input type="checkbox"/> Check me out
                    </label>
                  </div>
                
                </form>
                -->
                
                
            </div>
            
            <!-- Modal Footer -->
            <div class="modal-footer">
              <button id="new-project-save"  type="button" class="btn btn-default">Submit</button>
                <button type="button" class="btn btn-default"
                        data-dismiss="modal">
                            Close
                </button>
               
            </div>
        </div>
    </div>
</div>

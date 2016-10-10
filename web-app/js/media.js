! function() {
$(document).ready(function(){
  /**
   * 
   * only screen 
and (min-device-width : 320px) 
and (max-device-width : 488px)
   */
  // change the bootstrap tabs to mobile list
  var fix_other_details_record_page = function() {
   
    $("#ure-other-details .nav").hide();
    $("#ure-other-details .tab-pane").removeClass('tab-pane fade');
    // remove the escape div
    $("#ure-description").removeClass('repairdiv');
    // re-order the divs
    var decoration = $("#ure-description").html();
    var inset = '<div class="col-md-4 ure-record-col-left">Decoration</div>'
                +'<div class="col-md-8  ure-decoration">'
                + decoration
                +'</div>';
    inset = $('<div class="row">'+inset+'</div>');
    $("#ure-description").html(inset);
    
  };
  
  
  if (window.matchMedia("(max-width: 488px)").matches === true) { 
    fix_other_details_record_page();
  }
  
});

}();
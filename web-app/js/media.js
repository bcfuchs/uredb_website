! function() {
$(document).ready(function(){
  /**
   * 
   * only screen 
and (min-device-width : 320px) 
and (max-device-width : 480px)
   */
  // change the bootstrap tabs to mobile list
  var fix_other_details_record_page = function() {
    var id2title = {};
    // get an object id-> title
    $("#ure-other-details .nav li a").each(function(){
        id2title[$(this).attr('href')] = $(this).html();
    });
    $("#ure-other-details .nav").hide();
   
    $("#ure-other-details .tab-pane").each(function(){
      // make a title
      var id = $(this).attr('id');
      var title = id2title['#'+id];
      // remove fade
      $(this).removeClass('tab-pane fade');
      // add title
//      $(this).prepend("<div>"+title+'</div>')
    });
    
    $("#ure-description").removeClass('repairdiv');
    var decoration = $("#ure-description").html();
    var inset = '<div class="col-md-4 ure-record-col-left">Decoration</div>'
                +'<div class="col-md-8  ure-decoration">'
                + decoration
                +'</div>';
    inset = $('<div class="row">'+inset+'</div>');
    $("#ure-description").html(inset)

 
    
    console.log($("#ure-description"))
    
  }
  var mql = window.matchMedia("(max-width: 480px)");
  
  if (mql.matches === true) {
 
    fix_other_details_record_page();
    
  }
  
});

}();
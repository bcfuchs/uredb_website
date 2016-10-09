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
   
    $("#ure-other-details .tab-pane").each(function(){
      // make a title
      var id = $(this).attr('id');
      var title = id2title['#'+id];
      // remove fade
      $(this).removeClass('tab-pane fade')
      // add title
      $(this).prepend("<div>"+title+'</div>')
    })
    
  }
  var mql = window.matchMedia("(max-width: 480px)");
  
  if (mql.matches === true) {
 
    fix_other_details_record_page();
    
  }
  
});

}();
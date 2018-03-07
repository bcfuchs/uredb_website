! function() {
$(document).ready(function(){
  // make search tab active
  $("#navbar-search").addClass("navbar-item-active");
  
  $("#left-nav").removeClass("col-md-2").hide();;
  $("#main").removeClass("col-md-10").addClass("col-md-12");
  
  
var doMap = function() {

    $("#thumbmap").delay(10000).show();

  $("#thumb-data area").click(function(e){
    e.preventDefault();
    var html = $(this).attr('href');
    var url = "/record/" + ure_thumb_to_rec[html]
    console.log(url);
    window.location = url
  
})
}

  $( "#thumb-data" ).load( window.thumb_image_map_url,doMap );
// get an index jpg -> record
// make the search bar draggable
var draggableSearchbar = function() {
    $("#searchbar_container").mouseenter(function(){
 //       $("#searchbar_container").prepend('<div id="sc-overlay">&nbsp;</div>');
      });
    $("#searchbar_container").click(function(){
 //     $("#sc-overlay").remove();
    });
    $("#searchbar_container").mouseup(function(){
//      $("#sc-overlay").remove();
      });
    
    $("#searchbar_container").draggable();
}
draggableSearchbar();
  
});
}();
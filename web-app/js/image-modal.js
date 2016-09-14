(function() {
/**
 * create a popover window
 */
 
  var imageModal = function(sel, img_callback,caption_callback,prevnext_callback) {
    var sel = typeof sel !== 'undefined' ? sel : ".contentlistcell a";
    var img_callback = typeof img_callback !== 'undefined' ? img_callback : 
        function(clicked){$(clicked).attr("href")}
    var caption_callback = typeof caption_callback !== 'undefined' ? caption_callback : function(clicked){};
    var prevnext_callback = typeof prevnext_callback !== 'undefined' ? prevnext_callback : function(clicked){return [[],[]]};
   
 
    $(document).ready(
        function() {
          
          var set_closer = function() {
            $('#close-image-button').click(function() {
              
              $('#overlay1').hide();
              $('#image-modal').hide();

            });

          };
          

          $("body").prepend('<div  id="image-modal"></div>');
          $("body").prepend('<div id="overlay1">&nbsp;</div>');

          $(sel).click(
              function(e) {
                e.preventDefault();
                var prevnext = prevnext_callback(this);
                var set_prevnext = function() {
                  $("#modalprev").click(function(e){
                    
                    e.preventDefault();
                     prevnext[0].click();
                    
                  });
                  
                  $("#modalnext").click(function(){
                    console.log("clicked modalnext");
                    console.log(prevnext);
                    e.preventDefault();
                    prevnext[1].click();
                   
                 });
                }
                
                
                var img = img_callback(this);
               
                /**
                 * on click prev , call the image modal function with new params
                 */
                var extlink = '<div id="extlink-container"><a id="extlink" target="_blank" href="' + img
                    + '"><i class="icon-external-link"></i></a></div>';
                var caption = caption_callback(this);
                var nav = '<a id="modalprev"><span class="glyphicon glyphicon-chevron-left"></span></a><a id="modalnext"><span class="glyphicon glyphicon-chevron-right"></span></a>'
                $('#image-modal')
                    .html(
                        '<div class="image-modal-container">'
                        +'<div class="image-modal-data-container">'
                        +'<img src="' + img+'"/>'
                        +'<div class="caption-container">'
                        + caption
                        + '</div>'
                        +'</div>'
                        +'<div class="image-modal-nav-container">'
                        + nav
                        + '</div>'
                       
                            +'<div class="close-image"><div id="close-image-button">X</div>' + extlink
                            + '</div></div>')
                // / simple overlay
                $('#overlay1').show();
                $('#image-modal').fadeIn();
                // set the prev next clicks
                set_prevnext();
                set_closer();

              });

        })
  }
  window.imageModal = imageModal
})()
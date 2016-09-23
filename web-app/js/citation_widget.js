! (function(){
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

    });

  });

})();
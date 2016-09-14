! function() {
  var gridWidget = function(gridid,width,height,displayInfobox,addCellClick) {
    
    if (addCellClick === undefined) {
      addCellClick = true;
    }
    var wall = new Freewall(gridid);
                wall.reset({
                  selector : '.cell',
                  delay: 25,
                  animate : true,
                  cellW : width,
                  cellH : height,
                  onResize : function() {
                    wall.refresh();
                  }
                });
                wall.fitWidth();
                // for scroll bar appear;
                $(window).trigger("resize");
                
               // $(gridid).delay(3000).show();

             // show the infobox on hover
              
                if (displayInfobox === true) {
                $(gridid + " .cell").hover(function(){ $(this).find(".image-infobox").toggleClass("hide-infodiv")});
                }
                $(gridid + " .cell").css("cursor","pointer");

             // click on image pops to record
             //TODO should be a callback
        if (addCellClick === true) {    
       
        $(gridid + " .cell").click(function() {
               var url = $(this).find(".name").attr("data-uri");
               window.location = url
               });  
    } 



    
  }
  window.gridWidget = gridWidget;

}()
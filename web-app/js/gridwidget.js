!function() {
  var gridWidget = function(gridid, width, height, displayInfobox, addCellClick) {
    console.log("gridWidget " + gridid)
    if (addCellClick === undefined) {
      addCellClick = true;
    }
    
    var format_freewall = function(gridid) {
      var wall = new Freewall(gridid);
      wall.reset({
        selector : '.cell',
        delay : 105,
        animate : true,
        cellW : width,
        cellH : height,
        onResize : function() {
          wall.refresh();
        }
      });
      wall.fitWidth();

      // for scroll bar appear;
      // $(window).trigger("resize");

      // $(gridid).delay(1000).show();

      // show the infobox on hover

      if (displayInfobox === true) {
        $(gridid + " .cell").hover(function() {
          $(this).find(".image-infobox").toggleClass("hide-infodiv")
        });
      }
      $(gridid + " .cell").css("cursor", "pointer");
    }
    var format_bootstrap = function(gridid, options) {
      console.log("format_bootstrap " + gridid);
      var cols_default = 7;
      var cols = options.cols || cols_default;
      var row = $('<div class="row"></div>');
      var cont = $('<div class="container-fluid"></div>');

      $(gridid + " .cell").each(function(i, v) {
        var cell = $(v).clone();
        row.append($(cell).addClass("col-md-2").addClass("col-sm-5").addClass("bs-cell"));
        // every $cols add to row
        if ((i + 1) % cols === 0) {
          cont.append(row);
          row = $('<div class="row"></div>');

        }
      });

      // left-overs...
      if (row.length > 0)
        cont.append(row);

      $(gridid).html(cont);
    }
    var formatGrid = function(gridid, options) {
      console.log("formatGrid")
      var type = options.type;
      switch (type) {
      case "freewall":
        format_freewall(gridid, options);
        break;
      case "bootstrap":
        format_bootstrap(gridid, options);
        break;
      }
 

    }; // formatGrid
    formatGrid(gridid,{type:"bootstrap"})
    // click on image pops to record
    // TODO should be a callback
    if (addCellClick === true) {

      $(gridid + " .cell").click(function() {
        var url = $(this).find(".name").attr("data-uri");
        window.location = url
      });
    }

  }
  window.gridWidget = gridWidget;

}()
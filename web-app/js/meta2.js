!function() {
  $(document).ready(function() {
    // add tooltips to object images
    $("#record-images .draggable").each(function() {
      $(this).attr('data-placement', 'bottom');
      $(this).attr('data-toggle', 'tooltip');
      $(this).attr('title', 'drag to add to lighttable');
      // data-placement="top" data-toggle="tooltip" title="

    });
    // enable dnd for images --> lighttable div
    var moveImage = function(e) {
      var url = $(this).attr('data-ure-image-url');
      var style = "background-image: url('" + url + "')";
      // add a helper class and hide the text.
      var out = $(this).clone().addClass("image-drag-helper");
      var a = out.find(".image-infobox");
      a.hide();
      // out = '<img class="image-drag-helper" src="'+url+'"/>"'

      return out;
    }
    // droppable is inited in lighttable.js

    $("#record-images .draggable").draggable({
      snap : "#lighttable-thumbs",
      cursor : "move",
      scope : "record-images",
      snap : "#lighttable-links",
      snapTolerance : 1000,
      helper : moveImage
    });
  });
}();

!(function() {
  $(document).ready(function() {
    $("#ure-images").delay(200).fadeIn(200);

    // fix text anomalies
    var repair = function(sel) {
      $(sel).each(function() {
        var text = $(this).text().replace(/\\'/g, "'");
        $(this).text(text)
      })
    }
    repair(".repair div.col-md-8, .repairdiv");

    // set up image modal
    var get_caption = function(el) {
      return $(el).find(".caption").html();
    }
    var get_image = function(el) {
      return $(el).attr("data-ure-image-url").replace('/sm/', '/xlarge/');
    }
    var get_prevnext = function(el) {
      var prev = $(el).prev();
      var next = $(el).next()
      // thinks tooltip is next sibling, so only count real siblings
      if (!($(next).is("[data-ure-uri]"))) {
        next = $(el).next().next()
      }
      // rollover -- but we could go on to the next object!
      if (prev.length < 1) {
        prev = $(el).siblings().last()
      }
      if (next.length < 1) {
        next = $(el).siblings().first()
      }
     

      return [ prev, next ]
    }
    // loaded in header
    imageModal("#record-images .cell", get_image, get_caption, get_prevnext)
    window.ure.meta2 = {
      get_caption:get_caption,
      get_image:get_image,
      get_prevnext:get_prevnext

    }
  });
})()
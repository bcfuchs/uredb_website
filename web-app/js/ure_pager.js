! function() {

  var content_widget = function(selector) {
    var content, template, chunks, config,current_chunk;
    current_chunk = 1;
    chunks = []
    /**
    * CONFIG ----------------- CONFIG ---------------------------------
    */
    config = {
      selector: selector,
      containerSelector: ".container",
      chunkIndexSelector: "#chunkindex-container",
      pageDepth: 20,
      chunkWindow: 5,
      selectedClass: "selected-chunk"
    }
    init();

    function init() {

      $(config.selector).append('<div class="container"></div>')

    }

    function _chunkify() {
      var chunk = [];
      for (var i = 0; i < content.length; i++) {
        chunk.push(content[i])
        if (i % config.pageDepth === 0) {
          chunks.push(chunk)
          chunk = []
        }
      }

      if (chunk.length > 0)
        chunks.push(chunk);

    }
    
    
    // make the link index
    // if current() => chunkStart + chunkWindow, move to next pageWindow
    // if current() <= chunkStart. move to previous page window. t

    function _indexify(){
    var start = 1;
    var end = start + chunks.length;
    var out =  _indexify_window(start,end);
     $(config.chunkIndexSelector).append(out.join(''));
     $(".chunklink").click(function(){
        var this_chunk = $(this).data('chunk');
        chunk(this_chunk);
     

      })
    }
    function _indexify_window(start,end) {

      // make a span link for each one
      var out = [];
      for (var i = start; i < end; i++) {
        var link = '<span class="chunklink" data-chunk="' + i + '">' + i + '</span>';
        out.push(link);
      }
      return out
     
    }

    function content(c) {
      content = c // an array of items  
      _chunkify();
   
      _indexify();
    }

    function template(t) {
      template = t // a callback for formatting the items in a chunk
    }

    function test(m) {
      $(config.containerSelector).append("<div>" + m + "</div>")
    }
    function _chunk_style(n) {
       $("."+config.selectedClass).removeClass(config.selectedClass)
       var this_chunk_el = $("[data-chunk='"+n+"']")
        $(this_chunk_el).addClass(config.selectedClass)
    }
    function chunk(n) {
      var this_chunk = chunks[n]
      current_chunk = n;
      $(config.containerSelector).empty();
      for (var i = 0, z = this_chunk.length; i < z; i++) {

        var item = this_chunk[i];
        var contentItem = template(item)
        $(config.containerSelector).append(contentItem)

      }
      _chunk_style(n);
     // _indexify();
    }
    function current() {
      return current_chunk;
    }
    function fill() {

      console.log(content)

      for (var i = 0; i < content.length; i++) {

        var item = content[i]
        var contentItem = template(item)
        $(config.containerSelector).append(contentItem);

      }

    }

    return {
      test: test,
      config: config,
      content: content,
      template: template,
      fill: fill,
      chunk: chunk,
      chunks: chunks,
      current: current,
      current_chunk:current_chunk

    }

  }

  var template = function(item, selector) {

    for (key in item) {
      var box = $('<div class="item-container"></div>')
      $(box).append('<div class="title">' + key + "</div>");
      $(box).append('<div class="content">' + item[key] + "</div>");

    }
    return box
  }
 // instantiate the content display tool... 
  var cw = content_widget("#content");
  // add content 
  cw.content(content);
  // add a template for displaying each content item.
  cw.template(template)
  
// pager takes a ref to the instantiated content tool...
  var pager = new Pager(cw);
  
  // widget for page navigation of a content tool 
  function Pager(cw) {
    var n = cw.chunks.length - 1;
    var chunk = 1;

    cw.chunk(chunk);
    
    $("#firstchunk").click(function() {
      chunk = 1
      cw.chunk(chunk)
    });

    $("#lastchunk").click(function() {
      chunk = n;
      cw.chunk(chunk)
    })

    $("#nextchunk").click(function() {


      chunk = cw.current() + 1;
        
      if (chunk > n) {
        chunk = 1;
      }
      cw.chunk(chunk);
    })

    $("#prevchunk").click(function() {
      chunk = cw.current() - 1;


      if (chunk == 0) {
        chunk = n;

      }
      cw.chunk(chunk);
    })
  }
  
  
}()
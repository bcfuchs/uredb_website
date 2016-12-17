//generate some content....
var content_gen = function(n) {

  var n2w = {
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six',
    7: 'seven',
    8: 'eight',
    9: 'nine',
    0: 'oh'
  }
  out = []

  for (var i = 1; i < n; i++) {
    var outa = {}
    var s = i.toString().split('')
    var outs = [];
    for (var j in s) {
      outs.push(n2w[s[j]]);
    }
    outa[i] = outs.join('-');
    out.push(outa)
  }
  return out;
}

var content = content_gen(10000);


var content_widget = function(selector) {
  var content, template, chunks, config, current_chunk, windows;
  var current_chunk = 1;
  chunks = []
  config = {
    selector: selector,
    containerSelector: ".container",
    chunkIndexSelector: "#chunkindex-container",
    pageDepth: 20,
    pageWindow: 10,
    chunkHatches: true,
    chunkHatchesMax: 5,
    hatchFactor: 2,
    indexOverlap: 1,
    lastChunkHatch: true,
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

  function _indexify() {
    var w = get_index_window();
    var start = w[0],
      end = w[1];
    $("#current").html(start);
    var out = _indexify_window(start, end);
    $(config.chunkIndexSelector).html(out.join(''));
    $(".chunklink").click(function() {
      var this_chunk = $(this).data('chunk');
      chunk(this_chunk);
    })

  }

  function get_index_window() {
    // what window is the current chunk in? 
    var this_window = Math.ceil(current_chunk / config.pageWindow);
    // get start, end
    var end = (this_window * config.pageWindow) + 1;
    var start = end - config.pageWindow;
    if (start === 0)
      start = 1
    return [start, end, this_window];
  }

  function _indexify_window(start, end) {
    var link = function(i) {
        return '<span class="chunklink" data-chunk="' + i + '">' + i + '</span>';
      }
      // make a span link for each one
    var out = [];
    end = end + config.indexEndOverlap;
    for (var i = start; i < end; i++) {
      out.push(link(i));
    }
    // add hatch marks for next pages. 
    // each page is end + pageWindow;
    if (config.chunkHatches === true) {
      var hatches = Math.floor((chunks.length - end) / config.pageWindow)
      hatches = (hatches > config.chunkHatchesMax) ? config.chunkHatchesMax : hatches

      for (var i = 1; i < hatches; i++) {
        var this_hatch = end + (i * config.pageWindow * config.hatchFactor) - 1;
        out.push(link(this_hatch));
      }

    }
    if (config.lastChunkHatch === true && end !== chunks.length)
      out.push(link(chunks.length - 1))
    return out;

  }

  function content(c) {
    content = c // an array of items  
    _chunkify();
  }

  function template(t) {
    template = t // a callback for formatting the items in a chunk
  }

  function test(m) {
    $(config.containerSelector).append("<div>" + m + "</div>")
  }

  function _chunk_style(n) {
    $("." + config.selectedClass).removeClass(config.selectedClass)
    var this_chunk_el = $("[data-chunk='" + n + "']")
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
    _indexify();
    _chunk_style(n);
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
    current_chunk: current_chunk

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
var cw = content_widget("#content");
cw.content(content);
cw.template(template)
var pager = new Pager(cw);

// widget for page navigation; 
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

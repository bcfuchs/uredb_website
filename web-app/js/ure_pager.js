!function() {

  // widget for page navigation;
  // Note: in this set-up, chunk length is static.
  function Pager(cw,opts) {
    if (typeof(opts) === 'undefined')  
      opts = {} 
    var onCompleted = opts.onCompleted || []
    var n = cw.chunks_length() - 1;
    var chunk = opts.firstChunk || 1;
    var count = opts.count || 1;
    // override in config
    var chunk_link = function(i) {
      return '<span class="chunklink" data-chunk="' + i + '">' + i + '</span>';
    }

    var config;
    config = {
      firstChunkSel : "#firstchunk",
      lastChunkSel : "#lastchunk",
      nextChunkSel : "#nextchunk",
      prevChunkSel : "#prevchunk",
      pageWindow : 5, // number of steps in an index
      chunkIndexSelector : "#chunkindex-container",
      chunkHatches : true,
      chunkHatchesMax : 5,
      hatchFactor : 2,
      indexOverlap : 1,
      lastChunkHatch : true,
      debug : false,
      meta: function(){},
      chunk_link : chunk_link,
      selectedClass : "selected-chunk"
    }
    // TODO -- incompatible with config --need opts!!!
    init();

    // bind paging to buttons...
    function init() {
      // register callbacks
      for (var i = 0, z = onCompleted.length; i < z; i++) {
        var cb = onCompleted[i]
        cw.queue('done',cb) 
      }
      // set debug to true if dev
      if ( window.location.href.match("ure.local") )
        config.debug = true
      // chunkSelect(chunk)
      _indexify();

      $(config.firstChunkSel).click(function() {
        chunkSelect(1)
      });

      $(config.lastChunkSel).click(function() {
        chunkSelect(cw.chunks_length() - 1)
      })

      $(config.nextChunkSel).click(function() {
        chunk = cw.current() + 1;
        if (chunk > n)
          chunk = 1;

        chunkSelect(chunk)
      })

      $(config.prevChunkSel).click(function() {
        chunk = cw.current() - 1;
        if (chunk == 0) {
          chunk = n;
        }
        chunkSelect(chunk)
      })
    }
    /**
     * @param chunk --
     *          chunk index
     */
    function chunkSelect(chunk) {
    
      cw.chunk(chunk);
      _indexify();
    }
    /**
     * @param n --
     *          index of chunk
     */

    function _index_style(n) {
      $("." + config.selectedClass).removeClass(config.selectedClass)
      var this_chunk_el = $("[data-chunk='" + n + "']")
      $(this_chunk_el).addClass(config.selectedClass)
    }

    function _indexify() {
      var current_chunk = cw.current();
      var w = get_index_window();
      var start = w[0], end = w[1];
      var deb = "current chunk: " + current_chunk + " window: " + w[2] + " " + current_chunk + " / "
          + config.pageWindow + " ||| "
      if (config.debug === true)
        $("#current").html(count + ": " + deb + " " + w.join("-")); // debug

      count = count + 1
      $(config.chunkIndexSelector).html(_indexify_window(start, end).join(''));

      $(".chunklink").click(function() {
        console.log(cw)
        var n = $(this).data('chunk');
        chunkSelect(n)
      })

      _index_style(cw.current());
      meta();

    }
    // maybe run a callback to fill in metadata. 
    // requires additions to content widget interface. 
    function meta()  {
      console.log(config.meta)
      config.meta(cw.meta());
      
    }
    function set_meta(m) {
      config.meta = m
    }
    function get_index_window() {

      // what window is the current chunk in?
      var this_window = Math.ceil(cw.current() / config.pageWindow);

      // get start, end
      var end = (this_window * config.pageWindow) + 1;
      var start = end - config.pageWindow;
      if (start === 0)
        start = 1
      return [ start, end, this_window ];
    }

    function _indexify_window(start, end) {
      var chunk_length = cw.chunks_length();
      var link = config.chunk_link;
      var out = [];

      end = end + config.indexOverlap;
      for (var i = start; i < end; i++) {
        out.push(link(i));
      }

      // add hatch marks for next pages.
      // each page is end + pageWindow;
      if (config.chunkHatches === true) {
        var hatches = Math.floor((chunk_length - end) / config.pageWindow)
        hatches = (hatches > config.chunkHatchesMax) ? config.chunkHatchesMax : hatches

        for (var i = 1; i < hatches; i++) {
          var this_hatch = end + (i * config.pageWindow * config.hatchFactor) - 1;
          out.push(link(this_hatch));
        }

      }
      if (config.lastChunkHatch === true && end !== chunk_length)
        out.push(link(chunk_length - 1))

      return out;

    }
    return {
      chunkSelect : chunkSelect,
      set_meta:set_meta,
      config : config,
    }
  }
  window.ure_pager = Pager;
}()

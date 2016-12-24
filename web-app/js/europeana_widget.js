/**
 
 * 
 * 
 * This module exports three functions with the prefix europeanaWidget_
 * 
 * makeGrid() -- make a grid of europeana thumbnails -exclude blacklisted items
 * 
 * doEuRelated() --fetch data from europeana queries, and turn into html divs
 * for use with makeGrid. Fire done signal "fire_EuComparanda", picked up by
 * eu_comparanda call.
 * 
 * voterSetup() -- set up relevance voting
 * 
 * 
 */
/** START */
!function() {
  'use strict';
  // reset the cache
  var eu_querycache_store = 'eu_querycache';
  if ($.localStorage.isSet(eu_querycache_store)) {
    $.localStorage.set(eu_querycache_store, {});
  }

  /**
   * @memberOf europeana_widget.init_euRelated
   */
  var get_search_extras = function() {
    var out = "";
    if ($(window).data("search_prefs") !== undefined) {
      var prefs = $(window).data("search_prefs");
      var mode = prefs.mode;
      if (mode === "whitelist") {
        var provs = prefs.data.whitelist.data;
        var f = get_whitelist_providers_facet(provs);
        out += f;
      }
    }
    return out;

  };

  window.get_search_extras = get_search_extras;
  /**
   * @memberOf europeana_widget.init_euRelated
   */
  var get_whitelist_providers_facet = function(providers) {

    var provs = [];
    // qf prov1 & qf prov2 is interpreted as an "AND" query
    // so use +OR+
    // http://www.europeana.eu/api/v2/search.json?wskey=api2demo&query=Corinthian+OR+late+OR+corinthian+OR+aryballos&thumbnail=true&rows=200&profile=rich&start=1&qf=provider_aggregation_edm_dataProvider:%22Fitzwilliam+Museum%22+OR+provider_aggregation_edm_dataProvider:%22The+European+Library%22
    console.log(providers);
    for (var i = 0, z = providers.length; i < z; i++) {
      var provider = providers[i];
      // provider = provider.replaceAll(/\s/,"%20")
      var provider_enc = encodeURIComponent(provider);
      var provf = "provider_aggregation_edm_dataProvider:%22" + provider_enc + "%22";
      provs.push(provf);
      console.log(provf);
    }
    var provider_facet = "&qf=" + provs.join("+OR+");

    return provider_facet;
  };
  window.make_whitelist_providers_query = get_whitelist_providers_facet;
}();

/**
 * 
 * START doEuRelated
 */
(function() {
  /**
   * 
   */

  /**
   * @memberOf europeana_widget.content_wrapper
   * Refactor Content wrapper interface to expose fields for ure_pager
   * 
   * wrapper to expose interface for pager component.
   */
  function eu_content_wrapper(accnum) {
    var config, chunk, chunks, current_chunk, chunks_length_val, total_results;
    current_chunk = 1;
    config = {
      paginationSize : 100,
      accnum : accnum

    };
      /**
       * @memberOf europeana_widget.content_wrapper
       */
    function current() {
      return current_chunk;
    }
    /**
     * @memberOf europeana_widget.content_wrapper
     */
    function _increment_cursor(n) {
      // increment cursor
      var cursor = (n - 1) * config.paginationSize;
      if (cursor < 1)
        cursor = 1;
      window.eu_cursor = cursor;
    }
    /**
     * @memberOf europeana_widget.content_wrapper
     * init the comparanda when a new batch is loaded...
     */
    
    function _init_comparanda() {
      var signal = 'ure_eu_new_batch';
      var e = $.Event(signal);
     $(window).trigger(e, {
       id : "new batch"
     });
    }
    /**
     * @memberOf europeana_widget.content_wrapper
    
     * display chunk $n , run the new query, init dnd for comparanda, set chunk to $n  
     */
    function chunk(n) {
      // TODO this needs to come from cursor info
      _increment_cursor(n);

      // get the data, format it and display it
     ure_makeEuRelatedItems(false);
     // useless -- needs to be called after 
     window.ure_is_new_batch  = true;
      
     //    _init_comparanda() 
      set_current_chunk(n)

    }
    /**
     * @memberOf europeana_widget.content_wrapper
     */
    function chunks_length() {
      return chunks_length;
    }
    /**
     * @memberOf europeana_widget.content_wrapper
     */
    function set_current_chunk(n) {
      current_chunk = n;
    }
    /**
     * @memberOf europeana_widget.content_wrapper
     */
    function set_chunks_length(n) {
      chunks_length = n;
    }
    /**
     * @memberOf europeana_widget.content_wrapper
     */
    function set_total_results(n) {
      total_results = n
    }
    
    /**
     * @memberOf europeana_widget.content_wrapper
     */
    function meta() {
      return {
        total : total_results,
        chunkStart : (current_chunk * config.paginationSize),
        chunkEnd : (current_chunk * config.paginationSize) + config.paginationSize - 1
      }
    }
    
    /**
     * @memberOf europeana_widget.content_wrapper
     * 
     * queue various callbacks
     */
    function queue(q,f) {
  
      if (!('ure_eu_oncompleted' in window)) {
        window.ure_eu_oncompleted = []
      }
      if (q === 'done') {
        window.ure_eu_oncompleted.push(f)
      }
      console.log( window.ure_eu_oncompleted)
      
    }

    return {
      chunk : chunk,
      current : current,
      set_current_chunk : set_current_chunk,
      set_chunks_length : set_chunks_length,
      chunks_length : chunks_length,
      paginationSize : config.paginationSize,
      set_total_results : set_total_results,
      totalResults : total_results,
      meta : meta,
      queue:queue

    // pageWindow: paginationSize
    }
  }
  // test code for pager -- to run in place of update_pagination
  /**
   * @memberOf europeana_widget.test_code_content_wrapper
   */
  var test_code = (function() {
    var test_code_init = true;
    var eumeta = $("#eu-widget-meta");
    var accnum = $(eumeta).data('ure-accnum')
    var euwrap = new eu_content_wrapper(accnum);
    var pager;
    var counter = 1;

    // test code for the pager
    // to put in existing pagination closure

    return function(totalResults, paginationSize) {

      var cursor = 1, current_chunk = 1;
      $(document).ready(function() {

        // set cursor to 1 if no cursor yet.
        if (!('eu_cursor' in window)) {
          cursor = 1
        } else {
          cursor = window.eu_cursor
        }

        // run only on init
        if (test_code_init === true) {
          // calculate chunks_length and set.
          var chunks_length = Math.ceil(totalResults / paginationSize)
          euwrap.set_chunks_length(chunks_length);
          euwrap.set_total_results(totalResults);
         
          // set up callbacks for content widget
         var pager_onCompleted = []
         pager_onCompleted.push(function(){
           $("#pagination-widget-top").show();
         })
          var pager_opts = {
            onCompleted: pager_onCompleted
          }
          // get a pager -- pass it the inited content interface instance
          pager = window.ure_pager(euwrap,pager_opts);
          set_meta({
            total : totalResults,
            chunkStart : cursor,
            chunkEnd : cursor + paginationSize - 1
          });
          pager.set_meta(set_meta);
          // don't run this again
          test_code_init = false;
          euwrap.set_current_chunk(current_chunk);
        }

        function set_meta(meta) {
          $("#pager-meta .item-count-start").html(meta.chunkStart);
          $("#pager-meta .item-count-end").html(meta.chunkEnd);
          $("#pager-meta .total-results").html(meta.total);
        }

      });

    }
  })();

  $(document).ready(function() {
    // test html
    $("span#query-display").after('<div id="current"></div>')
  })

  var update_pagination = function(incrementCursor, itemsCount, totalResults, paginationSize) {
    paginationSize = 100;

    test_code(totalResults, paginationSize);

  };


  /**
   * @memberOf europeana_widget.doEuRelated
   */
  var doEuRelated_retake;

  /**
   * @memberOf europeana_widget.doEuRelated
   */
  var doEuRelated = function() {
  };

  var doEuRelated_keywords = "";
  var retakeButtonSel = "#retake-button";
  var retake_count = 0;
  var retake_count_max = 2;

  doEuRelated = function(templateSel, gridSel, data, incrementCursor, completed_callback) {
    console.log("doEuRelated...");
    

    doEuRelated_keywords = data.keywords;
    window.europeanaWidget_keywords = data.keywords;

    var blank_image_100x100 = "/static/images/blank100x100.png";
    var titleWordLength = 10;
    var providerlist = {}; // provider list
    var template = $($(templateSel + " .gridlist-cell")[0]).clone();
    var retakeOnZero = true; // TODO move to top
    var default_keywords = [ 'greek', 'black', 'figure' ];

    /**
     * redo the query with default kws if the supplied kws return 0
     * 
     */
    doEuRelated_retake = function(keywords) {

      window.europeanaWidget_keywords = keywords;

      var d = JSON.parse(data); // original data
      d.keywords = keywords;
      d.startrec = 1;
      data = d; // reset data
      delete window.eu_cursor; // reset the cursor
      doEuRelated(templateSel, gridSel, data, incrementCursor, completed_callback);
    };

    /**
     * @memberOf europeana_widget.doEuRelated
     */
    var search_redo_button = function(keywords) {
      $("#retake-button-terms").val(keywords.join(" "));
      $(retakeButtonSel).click(function() {
        // get the terms from the input box
        var terms = $("#retake-button-terms").val();
        alert("querying Europeana for '" + terms + "'...");
        var keywords = terms.split(" ");

        doEuRelated_retake(keywords); // function reference reset w/ new data on
        // each call

      });
    };
    search_redo_button(data.keywords);

    // TODO -- is this still necessary? probably not!
    data = JSON.stringify(data);

    var image_preloader = function(url, sel) {
      console.log('image_preloader')
      var spin = '/static/images/giphy.gif';
      // url = spin;
      // $(sel).css('background-image', 'url('+spin+')');;

      var img = $('<img/>');
      img.attr('src', url);
      img.on('load', function() {
        console.log("loaded");
        $(this).remove();
        $(sel).attr('style', 'width:100px; height:100px;cursor:pointer;background-image: url(' + url + ');')
        // $(sel).css('background-image', 'url('+url+')');
      });
      img.onerror = function() {
        console.log("fail");
      };

    };
    /**
     * @memberOf europeana_widget.doEuRelated
     */
    // make style for each element.
    var makeStyle = function(w, h, thumburl) {
      var spin = '/static/images/giphy.gif';
      // return 'width:' + w + '; height:' + h + '; background-image: url(' +
      // thumburl + ')';
      return 'background-image: url(' + thumburl + ')';

    };

    /**
     * @memberOf europeana_widget.doEuRelated
     * 
     * make a date for overlay from europeana metadata return null if metadata
     * missing.
     */
    var getDate = function(item) {

      var out = "";
      if ('edmTimespanLabel' in item && item.edmTimespanLabel !== "")
        out += item.edmTimespanLabel[0].def + " ";
      if ('edmTimespanBroaderTerm' in item && item.edmTimespanBroaderTerm)
        out += item.edmTimespanBroaderTerm;
      return out;
    };

    /**
     * @memberOf europeana_widget.doEuRelated
     * 
     * NOT USED!!!
     */
    var getTitle = function(title) {
      var out = title[0];
      var t = out.split(" ");
      if (t.length > titleWordLength)
        out = t.splice(0, titleWordLength).join(" ");
      return out;
    };

    /**
     * @memberOf europeana_widget.doEuRelated
     */
    var makeProviderlist = function(provs) {
      console.log('makeng provider list... ');
      var providers = Object.keys(provs);
      console.log(providers.length);

      for (var i = 0, z = providers.length; i < z; i++) {
        var t = $($("#provider-label-template label")[0]).clone();

        var provider = providers[i];
        $(t).attr('data-eu-provider-list', provider);

        $(t).find('input').val(provider);
        $(t).append('<span class="provider">' + provider + '</span>');

        $("#provider-filter").append(t);
      }
    };

    /**
     * @memberOf europeana_widget.doEuRelated fill the grid with items called
     *           from ajax success
     */

    var fillGrid = function(items, width, height, displayInfobox) {
      console.log("fillGrid");
      var hideInfodiv = displayInfobox ? "hide-infodiv" : "showtheinfobox";
      for (var i = 0, z = items.length; i < z; i++) {

        var item = items[i];
        var provider = item.dataProvider;
        if (!(provider in providerlist))
          providerlist[provider] = provider;
        var t = $(template).clone();
        if ('edmPreview' in item) {
          item.thumb = item.edmPreview;
        } else {
          item.thumb = blank_image_100x100;
        }
        // set the background image
        var style = makeStyle(width, height, item.thumb);

        // image_preloader(testpic,t);
        $(t).attr('data-ure-uri', item.edmPreview);
        $(t).attr('data-eu-provider', item.dataProvider);
        $(t).attr('data-eu-id', item.id);
        $(t).attr('data-eu-guid', item.guid);
        $(t).attr('data-eu-link', item.edmIsShownAt);
        $(t).attr('data-ure-image-url', item.edmPreview);
        if ("dcSubjectLangAware" in item)
          $(t).attr('data-ure-dcSubject', item.dcSubjectLangAware.def);
        $(t).attr('style', style);
        $(t).find(".short_title").html(item.title);
        $(t).find(".caption").html(item.dataProvider);
        $(t).find(".date").html(getDate(item));

        $(t).addClass(hideInfodiv);

        $(gridSel).append(t);
      }

    }; // fillGrid

    /**
     * add a filter to skip providers.
     * 
     * @memberOf europeana_widget.doEuRelated remove items that are on the
     *           skiplist.
     */
    var skiplist_filter = function(items) {
      var skiplist_store = 'skiplist';
      var skiplist = {};
      var storage = $.localStorage;
      var out = [];
      // get providerBlacklist or start one if none
      var doSkiplist = false;
      if (storage.isSet(skiplist_store)) {
        skiplist = storage.get(skiplist_store);
        if (skiplist.data.length > 0)
          doSkiplist = true;
      }

      if (doSkiplist === true) {
        for (var i = 0, z = items.length; i < z; i++) {
          var item = items[i];
          if (skiplist.data.indexOf(item.dataProvider[0]) > -1) {
            out.push(item);
            console.log(item.dataProvider[0]);
          } else {
            console.log("skipping " + item.dataProvider[0])
          }
        }
      } else {
        out = items;
      }
      return out;
    };

    /**
     * @memberOf europeana_widget.doEuRelated
     */
    var getSearchMode = function() {
      return $.localStorage('search-mode');
    };

    /**
     * @memberOf europeana_widget.doEuRelated
     */
    var set_keywords_display = function(qs) {
      $("#keywords-display").html(qs);
    };

    /**
     * @memberOf europeana_widget.doEuRelated display the query
     */
    var set_query_display = function(qs) {
      $("#query-display").html(qs);
    };

    /**
     * @memberOf europeana_widget.doEuRelated control pagination display based
     *           on state of pagination data
     */

    // --- update_pagination
    String.prototype.hexEncode = function() {
      var hex, i;

      var result = "";
      for (i = 0, z = this.length; i < z; i++) {
        hex = this.charCodeAt(i).toString(16);
        result += ("000" + hex).slice(-4);
      }

      return result
    }
    String.prototype.hexDecode = function() {
      var j;
      var hexes = this.match(/.{1,4}/g) || [];
      var back = "";
      for (j = 0; j < hexes.length; j++) {
        back += String.fromCharCode(parseInt(hexes[j], 16));
      }

      return back;
    }

    var grid_hash = {}
    /**
     * @memberOf europeana_widget.doEuRelated
     * 
     * stash the grid return the id
     */

    var stash_grid = function(gridSel, url) {
      console.log("stashing grid for " + url)
      var stashId = 'eu-stash';
      var stashSel = "#" + stashId;

      // id of this grid
      var gridId = url.hexEncode();
      if ((gridId in grid_hash))
        // return without stashing
        return gridId;
      // create the stash if it doesn't exist;
      if ($(stashSel).length < 1) {
        var stash_el = $('<div></div>')
        $(stash_el).css({
          display : 'none'
        })
        $(stash_el).attr('id', stashId);
        $('body').append(stash_el);

      }
      // clone the grid
      var el = $(gridSel).clone();
      // create an element for the grid
      var wrapper = $('<div></div>').attr('id', gridId);
      wrapper.append(el);
      $(stashSel).append(wrapper);
      grid_hash[gridId] = 1;
      return gridId;

    }; // stash_grid
    // TODO -- need to keep a list of stashed grid in localstorage.
    // for testing well just keep it in the DOM
    /**
     * @memberOf europeana_widget.doEuRelated
     * 
     * return the stashed grid if found, else return null;
     */

    var get_grid = function(url) {
      console.log("getting grid for " + url);
      var gridId = url.hexEncode(url);
      // if (!(gridId in grid_hash))
      // console.log("no grid!!!");return null;
      var out;
      var stashId = 'eu-stash';
      var stashSel = "#" + stashId;
      var gridId = url.hexEncode();
      out = $("#" + gridId);
      if (out.length < 1) {
        console.log("no grid 2 !!!");
        console.log(out);
        return null;// throw "cant find grid for " + url;

      }
      console.log("FOUND A GRID");
      return out;

    }; // get_grid
    /**
     * @memberOf europeana_widget.doEuRelated
     * 
     * Fill the grid, either from cache or from data
     */
    var doFillGrid = function(gridSel, query_url, items, width, height, displayInfobox) {

      var euWidgetSel = "#europeanaWidget"; // idselector of europeanaWidget
      /**
       * grid cache is the cache object set? is data.query_url in cache? Yes:
       * get grid from cache and put in the gridSel No: serialise and store grid
       * in cache -or- move the grid to a DOM stash.
       */

      /** clear the grid */
      $(gridSel).html("");

      /**
       * populate the grid with items Check cache first.
       */
      var grid = get_grid(query_url);
      if (grid !== null) {
        $("#europeanaWidget").attr('data-didStash', 1);
        $(gridSel).html($(grid).html());
      } else {
        console.log("Filling grid from data...!");
        fillGrid(items, width, height, displayInfobox);
      }

      /** stash the new grid */

      stash_grid($(gridSel).html(), query_url);

    }; // doFillGrid
    /**
     * @memberOf europeana_widget.doEuRelated
     * 
     * callback to run on data returned by query. calls UI functions defined
     * above as closures.
     */

    var success = function(data) {

      var width, height, displayInfobox, items;
      width = data.width;
      height = data.height;
      displayInfobox = data.displayInfobox;
      if (data && 'info' in data && 'items' in data.info)
        try {
          items = data.info.items;

        } catch (e) {
          items = [];
          alert("can't load eu items!");
        }

      /** alert success: message to display in flash message box */
      alert("found " + data.info.totalResults + " europeana items");

      /** set the query display */
      set_keywords_display(data.keywords.join(' '));
      set_query_display(data.query_string);

      /** clear the grid */
      // $(gridSel).html("");
      // TODO exception no data
      /** update the pagination */

      update_pagination(incrementCursor, data.info.itemsCount, data.info.totalResults);

      /** filter out items on dataprovider skiplist */
      // if mode = skiplist
      if (getSearchMode === 'skiplist')
        items = skiplist_filter(items);
      /** fill the grid */
      doFillGrid(gridSel, data.query_url, items, width, height, displayInfobox);
      /** make controls */

      makeProviderlist(providerlist);

      /** run callbacks */
      completed_callback.call(this);
      /** run more callbacks */
      // we could also do this with a queue
      // might lead to circle refs
      
      if ('ure_eu_oncompleted' in window) {
        for (cb in window.ure_eu_oncompleted) {
          window.ure_eu_oncompleted[cb](this);
          delete window.ure_eu_oncompleted[cb]
          
        }
      }

      /** send done signal */
      var signal = "doEuRelated_complete";
      var e = $.Event(signal);
      $(window).trigger(e, {
        id : "finished doEuRelated"
      });
    }; // success

    /**
     * 
     * refactor the callback to run on query data. add step to rerun query if no
     * items found by query. no rerun if retaokeOnZero is false..
     * 
     * @memberOf europeana_widget.doEuRelated
     * 
     */

    var success_new = function(query_url, query_string) {
      var min_items = 1;
      return function(info) {

        console.log('success_new');
        // quit function and rerun query with safe keywords if items.length ===
        // 0
        console.log("found " + info.items.length + "items");

        // redo search with default keywords if page keywords fail.
        if (retakeOnZero === true && info.items.length < min_items && retake_count < retake_count_max) {
          doEuRelated_retake(default_keywords);
          return 1;
        }
        var data = {};
        // re-jig data to fit old model.
        data.info = info; // the return object from EU
        data.width = "100px";
        data.height = "100px";
        data.displayInfoboxOnHover = false;
        data.keywords = doEuRelated_keywords;
        data.query_url = query_url;
        data.query_string = query_string;
        return success(data);

      };
    };
    /**
     * @memberOf europeana_widget.doEuRelated
     * 
     */

    var timeout_handler = function(xhr) {
      console.log("timeout_handler");
      alert("Europeana is not available at this time.");
    };
    /**
     * @memberOf europeana_widget.doEuRelated
     * 
     * call if we get this far...
     */

    var default_handler = function(xhr) {

      alert("a problem has occurred with your Europeana search");
    };
    /**
     * @memberOf europeana_widget.doEuRelated
     * 
     */

    var ajax_new = function() {

      var keywords = JSON.parse(data).keywords;
      var startrec = JSON.parse(data).startrec;
      // TODO quick fix
      if (startrec === 0) {
        startrec = 1
      }

      var fail = function(xhr, status, err) {
        console.log("fail: " + err);
        console.log(xhr);
        switch (status) {
        case "timeout":
          timeout_handler(xhr);
          break;
        default:
          default_handler(xhr);
        }

      }; // fail

      var complete = function() {
        console.log("complete!");
      };
      // joins the keywords w/ and
      var get_query = function(kw) {
        // return kw.join("+AND+");
        return kw.join("+");
      };
      var extras = "";
      extras = get_search_extras();

      // make query from keywords
      var qs = get_query(keywords);
      // TODO -- fix fails if there isn't a thumbnail
      var query = 'wskey=' + uredb_wskey + '&query=' + qs + '&thumbnail=true&rows=100&start=' + startrec
          + '&profile=standard' + extras;
      var url_base = 'https://www.europeana.eu/api/v2/search.json?';
      var url_new = url_base + query;
      // add data to success and get new callback.
      var done = success_new(url_new, qs);

      // set up query caching
      var useQueryCache = true; // TODO move to top
      var eucache = {};
      var storage = $.localStorage;
      var eu_querycache_store = 'eu_querycache';
      if (storage.isSet(eu_querycache_store)) {
        eucache = storage.get(eu_querycache_store)
      } else {
        storage.set(eu_querycache_store, {});
      }

      // TODO parametrize
      // cache switch goes here.
      var cachehandler = function() {

        // cache switch goes here.
        if (url_new in eucache && useQueryCache === true) {
          console.log("found a query cache!!")
          console.log(eucache[url_new])
          done(eucache[url_new]);
        } else {
          var newdone = function(data) {
            console.log("NO CACHE!!")
            console.log(url_new);
            eucache[url_new] = data;
            storage.set(eu_querycache_store, eucache);
            done(data);
          };

          $.ajax({
            url : url_new,
            dataType : "json",
            type : "GET"
          }).done(newdone).fail(fail).always(complete);

        }

      }; // cachehandler

      cachehandler();
    };

    ajax_new();

  }; // END doEuRelated

  window.europeanaWidget_doEuRelated = doEuRelated;

  /**
   * @memberOf europeana_widget
   */

  var format_freewall = function(gridid, options) {
    console.log("format_freewall " + gridid)
    var wall = new Freewall(gridid);
    wall.reset({
      selector : '.cell',
      delay : 5,
      animate : true,
      cellW : options.width,
      cellH : options.height,
      onResize : function() {
        wall.refresh();
      }
    });
    wall.fitWidth(options.wallWidth);
    window.wall = wall;

  };
  /**
   * @memberOf europeana_widget
   */

  var format_bootstrap = function(gridid, options) {
    console.log("format_bootstrap " + gridid);
    var cols_default = 9;
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
  /**
   * @memberOf europeana_widget
   */

  var formatGrid = function(gridid, options) {
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

  /**
   * @memberOf europeana_widget
   * 
   * Prepare items for the grid
   */
  var makeGrid = function(gridid, width, height, displayInfobox, wallWidth, accnum) {
    console.log("makeGrid ");
    var storage, cellSelector, blacklist_store, providerBlacklist, providerBlacklistThreshold, providerBlacklist_store;

    blacklist_store = "vote";
    providerBlacklist_store = "providerBlacklist";
    providerBlacklistThreshold = 1;
    cellSelector = gridid + " .cell";
    storage = $.localStorage;

    // get providerBlacklist or start one if none
    if (storage.isSet(providerBlacklist_store)) {
      providerBlacklist = storage.get(providerBlacklist_store);
    } else {
      providerBlacklist = storage.set(providerBlacklist_store, {});
    }
    // TODO should this be here?
    // Remove blacklisted items in "vote" localstorage
    if (storage.isSet(blacklist_store)) {
      var vote = storage.get(blacklist_store);
      $(cellSelector).each(function(k, v) {
        var id = $(this).attr('data-ure-image-url');
        var provider = $(this).attr('data-eu-provider');
        // if the id is in the blacklist (=vote), remove it from the grid

        if (accnum in vote && id in vote[accnum]) {
          $(this).remove();
        }

        // remove items from blacklisted providers.
        if (provider in providerBlacklist && providerBlacklist[provider] > providerBlacklistThreshold) {
          // remove item
          // $(this).remove();
          // remove filter in provider checklist
          // console.log($('[data-eu-provider-list="' + provider + '"]'));
          // console.log(provider);
          // $('[data-eu-provider-list="' + provider + '"]').remove();

        }

      });
    } // if

    // Create a freewall grid from the cells

    var gridtype = "bootstrap";
    // var gridtype = "freewall";
    var formatGrid_options = {
      type : gridtype,
      width : width,
      height : height,
      wallWidth : wallWidth
    };
    // need a better way of doing this!
    if (window.matchMedia("(max-width: 488px)").matches === true) {
      formatGrid_options.cols = 2;
    }
    formatGrid(gridid, formatGrid_options);

    // for scroll bar appear;
    $(window).trigger("resize");

    $(gridid).delay(300).show();

    // show the infobox on hover

    if (displayInfobox === true) {
      $(cellSelector).hover(function() {
        $(this).find(".image-infobox").toggleClass("hide-infodiv");
      });
    }
    $(cellSelector).css("cursor", "pointer");

    /**
     * @memberOf europeana_widget.makeGrid
     */
    // click on image pops to overlay
    var overlayHandler = function() {
      var url = $(this).attr("data-eu-link");
      $("#externalsite-iframe").attr('src', url);

      $("#iframeOverlay").slideDown(1000);
      $("#externalsite-iframe").load(function() {
        $("#externalsite-iframe").fadeIn(1000);
      });
      // add data to the add-item button
      var eu_link = $(this).attr("data-eu-link");
      var thumb = $(this).attr("data-ure-image-url");
      var guid = $(this).attr("data-eu-guid");
      var eu_item = {
        link : eu_link,
        thumb : thumb,
        ure_accnum : $(document).ure_accnum,
        guid : guid
      };
      // add data about this object to the add-item button in the overlay

      $("#add-item").data('eu_item', eu_item);
    };
    $(cellSelector).bind('click', overlayHandler);

    window.overlayHandler = overlayHandler;
    // END makeGrid
  };

  window.europeanaWidget_makeGrid = makeGrid;

  /**
   * @memberOf europeana_widget relevance voting
   * 
   * voteSetup
   * 
   * put a vote button on each -- when pressed , disappears problem: need to
   * turn off overlay click. problem: image selection is currently done on
   * server! server needs to send pure json
   */

  var voteSetup = function(itemSelector, toggleSelector, accnum) {
    console.log('voteSetup');
    var voteHandler;

    storage = $.localStorage;
    // create vote object if not present
    if (!(storage.isSet('vote'))) {
      console.log("setting vote...");
      storage.set('vote', {});
    }
    if (!(storage.isSet('providerBlacklist'))) {
      console.log("setting providerBlacklist...");
      storage.set('providerBlacklist', {});
    }

    /**
     * @memberOf europeana_widget.voteSetup
     */
    var vote = function(divs) {
      var votebutton = '<button class="voterbtn btn btn-sm btn-success">&#10004;</button>';
      // overlay a click button
      $(divs).each(function(k, v) {
        $(v).append(votebutton);
      });

      // remove the overlay click function
      $(itemSelector).unbind('click', window.overlayHandler);

      /**
       * Vote handler
       * 
       * @memberOf europeana_widget.voteSetup.vote
       * 
       * Handle an item voted irrelevant. When a vote is cast for irrelevant. --
       * add item provider to blacklist
       * 
       * when a vote is undone -- remove provider from blacklist
       * 
       * when tagging is finished, rerun query.
       * 
       */
      voteHandler = function() {
        var item, provider, v, providerBlacklist, providerBlacklist_store, vote_store;
        providerBlacklist_store = 'providerBlacklist';
        vote_store = 'vote';

        // show red on vote
        $(this).toggleClass('btn-success').toggleClass('btn-danger');
        v = storage.get(vote_store);

        providerBlacklist = storage.get(providerBlacklist_store);
        item = $(this).parent().attr('data-ure-image-url');
        provider = $(this).parent().attr('data-eu-provider');

        if ($(this).hasClass('btn-danger')) {
          // change to x
          $(this).html("x");

          // add to blacklist
          if (!(accnum in v))
            v[accnum] = {};

          v[accnum][item] = "";

          // add to provider blacklist
          providerBlacklist[provider] = provider in providerBlacklist ? providerBlacklist[provider] + 1 : 1;
          // provider in providerBlacklist ? providerBlacklist[provider] += 1 :
          // providerBlacklist[provider] = 1

        }

        else {
          // change to check
          $(this).html("&#10004;");
          // remove from blacklist
          if (accnum in v && item in v[accnum]) {
            delete v[accnum][item];
          }

          if (provider in providerBlacklist) {

            if (providerBlacklist[provider] > 1) {
              providerBlacklist[provider] -= 1;
            } else {
              delete providerBlacklist[provider];

            }
          }
        }

        // save the results
        storage.set('vote', v);
        storage.set('providerBlacklist', providerBlacklist);
        window.eu_test_vote = v;
      };

      $(document).on('click', '.voterbtn', voteHandler);
      // END vote
    }; // vote = function(divs)

    /** Toggle irrelevance voting */
    // remove all previous handlers so we don't bounce.
    $(document).off('click', toggleSelector);

    $(document).on('click', toggleSelector, function() {
      var startText = "tag as not relevant";
      var sw = $(this).attr('data-relevance-toggle');
      if (sw === 'off') {
        vote(itemSelector);
        $(this).attr('data-relevance-toggle', 'on');
        $(this).html($(this).data('relevance-finish'));
      } else {
        // we're done
        $(itemSelector).unbind('click', voteHandler);
        $('.voterbtn').remove();
        $(itemSelector).bind('click', window.overlayHandler);
        $(this).attr('data-relevance-toggle', 'off');
        $(this).html(startText);

        // send done signal -- pick up in _europeanaWidget
        var signal = "relevance_tag_complete";

        var e = $.Event(signal);
        $(window).trigger(e, {
          id : signal
        });

      }

    });
  }; // voteSetup
  window.europeanaWidget_voteSetup = voteSetup;
})();

/** START init */

!function() {

  /**
   * Set up data for input into europeana widget -make_keywords
   * -make_eu_query_data -makeEuRelatedItems
   * 
   * 
   * @memberOf europeana_widget
   */

  var init_euRelated = function(accnum, gridid, width, height, displayInfobox) {

    /**
     * @memberOf europeana_widget.init_euRelated
     * 
     * get keywords from ure item
     * 
     */
    var make_keywords = function(ure_item) {
      // TODO needs to be configureable!!!
      var kw = [];
      var title = ure_item.title;
      var artist = ure_item.artist;
      var shape = ure_item.shape;
      var fabric = ure_item.fabric;
      var title_kw = title.replace(/[^a-zA-Z\s]/g, "").replace(/\s+/g, " ").replace(/^\s+/g, "").replace(/\s$/g, "")
          .split(" ");

      if (title.match(/red figure/)) {
        // kw.push('where:(red+figure)');
        kw.push('red')
        kw.push('figure')
      }
      if (title.match(/black figure/)) {
        kw.push('where:(black+AND+figure)');
      }
      if (fabric !== "") {
        var fabric_kw = fabric.replace(/[^a-zA-Z\s]/g, "").replace(/\s+/g, " ").replace(/^\s+/g, "")
            .replace(/\s$/g, "").split(" ")
        kw = kw.concat(fabric_kw);
      }

      // make a canonical form of the shape the kw if something in the list
      // matches.
      var get_shape_kw = function(shape, use_shapes) {

        var out = [];
        // can't use indexOf since it's sometimes just part of a string.
        use_shapes.forEach(function(item) {
          if (shape.toLowerCase().match(new RegExp(item))) {
            out = [ item ];
          }

        });
        return out;
      };

      var canonical_shapes = [ 'lekythos', 'aryballos', 'skyphos', 'oinochoe', 'kylix', 'amphora', 'krater', 'pyxis',
          'lekanis' ];

      kw = get_shape_kw(shape, canonical_shapes);

      // var keywords is the default qstring
      // var keywords = [ 'where(greece)+AND+black+AND+figure' ];
      var keywords = [ 'greece', 'black', 'figure' ];
      // if kw has content use that
      if (kw.length > 0) {
        keywords = kw;
      } else {
        // if not, then if title has content, use that.
        if (title_kw.length > 1) {

          keywords = title_kw;
        }
        // otherwise use the default.
      }

      return keywords;
    };

    /**
     * @memberOf europeana_widget.init_euRelated
     * 
     * get the query data from the page.
     */
    var make_eu_query_data = function() {
      /**
       * @memberOf europeana_widget.init_euRelated.make_eu_query_data
       */
      var get_startrec = function() {
        var out = 1;
        if ('eu_cursor' in window) {
          out = window.eu_cursor;

        }

        return out;
      }; // get_startrec

      /**
       * @memberOf europeana_widget.init_euRelated.make_eu_query_data
       */
      var startrec = get_startrec();

      var title = $('.ure-title').text();
      var fabric = $('.ure-fabric').text();
      var shape = $('.ure-shape').text();
      var artist = $('.ure-artist').text();
      /**
       * @memberOf europeana_widget.init_euRelated.make_eu_query_data
       */

      var kw_json = make_keywords({
        title : title,
        fabric : fabric,
        shape : shape,
        artist : artist
      });

      /**
       * @memberOf europeana_widget.init_euRelated.make_eu_query_data
       */
      // make data for eu related ajax call
      var data = {
        accnum : accnum,
        keywords : kw_json,
        gridid : "euwidget",
        klass : "euwidget",
        displayInfobox : "true",
        height : "100px",
        width : "100px",
        startrec : startrec
      };
      return data;
    }; // make_eu_query_data

    /**
     * @memberOf europeana_widget.init_euRelated
     */
    var makeEuRelatedItems = function(incrementCursor) {

      var templateSel = "#gridTemplate";
      var gridSel = "#" + gridid; // input parameter

      var data = make_eu_query_data();
      // use keywords if we're paginating or running a user query
      // set at keyword input
      // TODO -- this should be an object with a state flag!
      if ('europeanaWidget_keywords' in window) {
        data.keywords = window.europeanaWidget_keywords;
      }

      // set up grid and some other stuff
      // TODO has to be called at end of eu ajax, so we'll pass it in as a
      // callback

      var eu_makegrid = function() {
        europeanaWidget_makeGrid("#" + gridid, width, height, displayInfobox, 1100, accnum);
        // HACK
        var cb = 'ure_content_widget_wrapper_cb'
        if (cb in window) {
            window[cb]();
        }
      };

      // invoke the widget, with the callback eu_makegrid
      europeanaWidget_doEuRelated(templateSel, gridSel, data, incrementCursor, eu_makegrid);

      // set up the voting.
      europeanaWidget_voteSetup("#" + gridid + " .cell", '#relevance-vote', accnum);
    }; // makeEuRelatedItems
    
    window.ure_makeEuRelatedItems = makeEuRelatedItems;

    // call the the setup when the window is ready.
    $(document).ready(function() {
      makeEuRelatedItems(false);
    });

    /**
     * @memberOf europeana_widget.init_euRelated redo the query on a signal.
     */

    var signal = "relevance_tag_complete";
    $(window).on(signal, function(e, data) {

      makeEuRelatedItems(false);
    });

    /**
     * @memberOf europeana_widget.init_euRelated Set up prev/next buttons. Get
     *           more eu items
     */
    var set_next_page_button = function() {
      $(document).on('click', '.pagination-widget .eumore', function() {
        // get the next batch incrementing the cursor..
        makeEuRelatedItems(true);

      });
    };
    set_next_page_button();
    /**
     * @memberOf europeana_widget.init_euRelated Set up prev/next buttons. Get
     *           more eu items
     */
    var set_prev_page_button = function() {
      $(document).on('click', '.pagination-widget .euless', function() {
        // get the last batch incrementing the cursor..
        window.europeanaWidget_decrementCursor = true;
        makeEuRelatedItems();

      });
    };
    set_prev_page_button();
    /**
     * Museum filter pane toggle
     */
    $(document).on('click', '.cb-eu', function() {
      console.log(this);
      console.log($(this).val());
      var mus = $(this).val();
      $('[data-eu-provider="' + mus + '"]').toggle();
      $(window).trigger("resize");

    });
  };
  /**
   * @memberOf europeana_widget.init_euRelated init the eu_related grid if
   *           params are present.
   */

  var init_euRelated_listener = function() {
    $(document).ready(function() {
      var eumeta = $("#eu-widget-meta");
      var accnum = $(eumeta).data('ure-accnum')
      var gridid = $(eumeta).data('grid-id')
      var width = $(eumeta).data('grid-width')
      var height = $(eumeta).data('grid-height');
      var display_infobox = $(eumeta).data('display-infobox');
      // if (! $("#europeanaWidget").attr('data-didStash'))
      init_euRelated(accnum, gridid, width, height, display_infobox);
    });

  }
  init_euRelated_listener();
  window.init_euRelated = init_euRelated;
}();

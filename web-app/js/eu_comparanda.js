/**
 * EU COMPARANDA functions for the projects strip and dnd of search items
 * into/out of the strip
 * 
 * exports are: window.EuComparanda = EuComparanda; window.comparanda_getEUdata =
 * getEUdata;
 * 
 */
window.ure_eu_comparanda = {}

!function() {

  /**
   * @memberOf eu_comparanda load / save /collect europeana items for $accnum
   * 
   * called in record.js, when signal doEuRelated_complete is received. 
   * This signal is sent at the end of doEuRelated.success, after contant has been loaded. 
   * 
   */

  var EuComparanda = function(accnum) {

    var storage, eu_items, this_accnum, projects, config;
    projects = {};
    storage = $.localStorage;
    eu_items = 'eu_items'
    this_accnum = accnum; // from params
    var myprojects = window.ure_projects; // projects DAO

    config = {
      msg_json_broken : "can't read comparanda file...",
      eu_draggable_sel : "#euwidget .cell",
      viewCompsSelector : "#view-comps",
      saveCompsAsHtmlSelector : "#save-comps-as-html",
      saveCompsAsJsonSelector : "#save-comps-as-json",
      loadCompsSelector : "#load-comps",
      clearCompsSelector : "#clear-comps",
      manageCompsSelector : "#manage-related",
      manageRelatedUrl: "/manage/related"
    }

    function onSignedIn(cb) {
      var signal = 'ure_gapi_signed_in'
      $(window).on(signal, function(e, d) {
        cb();
      });

    }

    /***************************************************************************
     * 
     * @memberOf eu_comparanda.EuComparanda
     * 
     */

    var init_comp_buttons = function() {
      /**
       * bind functions to mini-dashboard
       */
      $(config.viewCompsSelector).click(function() {
        var proj = myprojects.current();
        var extra = ""
        if (proj !== 'undefined')
          extra = "?project=" + proj;
        window.location.href = "/comparanda" + extra;

      });

      $(config.saveCompsAsHtmlSelector).click(function() {
        save_comparanda_as_html();
      });

      $(config.saveCompsAsJsonSelector).click(function() {
        save_comparanda_as_json();
      });

      $(config.loadCompsSelector).click(function() {

        $("#comps-file").toggle();
        $("#comps-file").show();

        document.getElementById('comps-file').addEventListener('change', load_comparanda_from_json, false);

      });

      $(config.clearCompsSelector).click(function() {
        var eu = getEUdata_new();
        eu.remove_accnum(this_accnum);
        // delete eu[this_accnum]; // eu-data 1

        $("#comparanda-thumbs").html("");
        $("#comparanda-thumbs").data('thumbs', "");

      });

      $(config.manageCompsSelector).click(function() {
        window.location.href = config.manageRelatedUrl;

      });

    }
    window.ure_init_comp_buttons = init_comp_buttons;
    /***************************************************************************
     * 
     * @memberOf eu_comparanda.EuComparanda
     * 
     */
    var init_iframe = function() {
      var ifr = $("#iframeOverlay").remove();
      $('body').append(ifr);

    }
    /***************************************************************************
     * 
     * @memberOf eu_comparanda.EuComparanda
     * 
     */
    var init_tooltips = function() {
      // TODO add a class to cell and use that
      $("#euwidget .cell").each(function(v) {
        $(this).attr("title", "drag me to comparanda to save!");
        $(this).attr("data-toggle", "tooltip");

      });

      $('#euwidget .cell [data-toggle="tooltip"]').tooltip()

      $("#euwidget .cell").hover(function() {
        $(this).tooltip("show");
        $("#comparanda").tooltip('show');
      })

    }
    /***************************************************************************
     * 
     * @memberOf eu_comparanda.EuComparanda
     * 
     */
    var init_data = function() {
      var eu = getEUdata_new().get_all(); // eu-data
      if (eu !== null) {
        load_comparanda(eu)
      }

    }
    /***************************************************************************
     * 
     * @memberOf eu_comparanda.EuComparanda
     * 
     */
    var init = function() {
      
      $(document).ready(function() {
      
        // docready
        // init the strip UI
        init_comp_buttons();

        // attach iframeoverlay to body
        init_iframe();

        // load the items
        init_data();

        // tooltips on draggable objects
        init_tooltips();
        
        setComparandaDraggable();
        setComparandaDroppable();
      });

    }// init
    // init only on new data
    var init_new_data = function() {
      $(document).ready(function() {
        console.log("init_new_data");
        setComparandaDraggable({unset:true});
      });
      
    }
    /**
     * INIT switch
     *    
     *    - 
     */
    // run the init routine if the google data has been read.
    // TODO or continue with local if anon user or timeout.
    var signal = 'ure_gapi_read_complete';
    $(window).on(signal, function(e, d) {
      if (d.file === 'eu_items.js') {
        init();
      }
    });
    // init if new batch-- no need to re-init controls
    var signal2 = 'ure_eu_new_batch';
    $(window).on(signal2, function(e, d) {
      
     init_new_data()
      
    });
    if (window.ure_is_new_batch === true) {
      init_new_data();
//        init_tooltips();
//        setComparandaDraggable();
//    //    setComparandaDroppable();
      window.ure_is_new_batch  = false;
    }

    /**
     * 
     * @memberOf eu_comparanda.EuComparanda
     * @private
     */
    function moveImage(e) {

      var url = $(this).attr('data-ure-image-url');
      // var style = "background-image: url('" + url + "')";
      // add a helper class and hide the text.
      var out = $(this).clone().addClass("image-drag-helper");

      var a = out.find(".image-infobox");
      a.hide();
      // out = "<div>hi there</div>"
      // out = '<img class="image-drag-helper" src="'+url+'"/>"'
      // console.log(out)
      return out;
    };
    /**
     * 
     * @memberOf eu_comparanda.EuComparanda
     * @private
     */
    function setComparandaDraggable(opts) {
      // unset draggable first. 
   //   if ('unset' in opts && opts.unset === true)
       // $(config.eu_draggable_sel).draggable( "destroy" )
      $(config.eu_draggable_sel).draggable({
        snap : "#comparanda",
        // show target tooltip on start hide on finish
        // start: function() {
        //                   
        // $("#comparanda").tooltip('show')},
        // stop: function() { $("#comparanda").tooltip('hide')},
        cursor : "hand",
        snapTolerance : 1000,
        scope : "comparanda",
        helper : moveImage
      });
    }
    ; // setComparandaDraggable

    /***************************************************************************
     * @memberOf eu_comparanda.EuComparanda
     * @private addToComparanda
     * 
     * Add a drop target and action for a related item
     * 
     * takes droppable event params
     */
    var addToComparanda = function(e, ui) {

      var d = ui.draggable;

      var eu_link = $(d).attr("data-eu-link");
      var thumb = $(d).attr("data-ure-image-url");
      var guid = $(d).attr("data-eu-guid");
      var provider = $(d).attr("data-eu-provider");
      var eu_item = {
        link : eu_link,
        thumb : thumb,
        ure_accnum : accnum,
        provider : provider,
        guid : guid
      }
      addcomp(accnum, eu_item)

    }
    /***************************************************************************
     * @memberOf eu_comparanda.EuComparanda
     */

    function setComparandaDroppable() {
      
      $("#comparanda").droppable({
        drop : addToComparanda,
        scope : "comparanda",
        create : function(event, ui) {
          // auto-init


        }
      });
    };

   

    var removeImage; // for testing
    /***************************************************************************
     * 
     * @memberOf eu_comparanda.EuComparanda
     * 
     * 
     * @param {string}
     *          selector
     * 
     * setRemoveDragComparanda
     * 
     * make an item in comparanda draggable for removal.
     * 
     * call after comparanda load AND after each new item is added.
     */
    function setRemoveDragComparanda(sel) {
      var removeImageHelper = function(e) {
        var url = $(this).attr('src');
        var style = "background-image: url('" + url + "')";
        // add a helper class and hide the text.
        var out = $(this).clone().addClass("image-drag-helper");

        // out = "<div>hi there</div>"
        // out = '<img class="image-drag-helper" src="'+url+'"/>"'
        // console.log(out)
        return out;
      }; // removeImageHelper
      removeImage = removeImageHelper;

      $(sel).draggable({
        cursor : "pointer",
        // snapTolerance : 1000,
        scope : "rm-comparanda",
        helper : removeImageHelper,
        // remove the item and the data
        stop : function(e, ui) {
          var url = $(this).attr('src')
          $(this).remove();
          // TODO prototype this to jquery!
          removecomp(url)

        }
      });
    } // setRemoveDragComparanda

    /***************************************************************************
     * @memberOf eu_comparanda.EuComparanda addcomp
     * @param {string}
     *          this_accnum // the accnum
     * @param {Object}
     *          eu_item
     * 
     * add eu item to comparanda div via json object add item to localstorage
     * and save.
     * 
     */

    // duplicates another function in _iframeOverlay.gsp
    function addcomp(this_accnum, eu_item, addToCompBar) {

      // add the thumb to the thumb strip
      addToCompBar = addToCompBar || true;

      var thumb = eu_item.thumb;
      // NOTE this makes the addcomp function dependant on
      // document.ready

      // get the url for the thumb
      var this_thumb = $($("#record-images .cell")[0]).attr('data-ure-image-url');
      // save to document
      var items = $(document).data('eu-items') || {}
      items[thumb] = eu_item;


      // var eu_items_ls = json;

      var eu_items_ls = ure_eu_items.get_all();

      // start an array for this accnum if none

      if (!(this_accnum in eu_items_ls)) { // eu-data 3a
        eu_items_ls[this_accnum] = {};
        eu_items_ls[this_accnum]['thumb'] = this_thumb

      }

      // add this eu item to the accnum array
      if (!eu_items_ls[this_accnum][thumb]) { // eu-data 4
        eu_items_ls[this_accnum][thumb] = eu_item;
        // store it

        ure_eu_items.put(this_accnum, thumb, eu_item);

        // eu-data 4.1
      }
      // update ure projects
      // TODO this should be set as a signal -- watch
      alert("updating projects...")
      ure_projects.put(ure_projects.current(), this_accnum, eu_item.thumb);
      add_to_comp_bar(thumb);

    } // function addcomp

    /***************************************************************************
     * @memberOf eu_comparanda.EuComparanda
     * 
     * 
     */

    function add_to_comp_bar(thumb) {

      var thumbs = $("#comparanda-thumbs").data('thumbs');
      // init if !
      if (!thumbs) {
        // need at least one key
        thumbs = {
          '---' : 0
        };
      }
      var addToComp = true;
      // add to images if this image isn't already there and
      if (!(thumb in thumbs && addToComp === true)) {

        $("#comparanda-thumbs").append('<img src="' + thumb + '"/>');
        thumbs[thumb] = "";
        $("#comparanda-thumbs").data('thumbs', thumbs);
        setRemoveDragComparanda("#comparanda-thumbs img[src='" + thumb + "']")
      }

    }

    /***************************************************************************
     * @memberOf eu_comparanda.EuComparanda removecomp
     * 
     */
    function removecomp(thumb) {
      console.log("removecomp ")
      // add the thumb to the thumb strip

      // get the url for the thumb

      // // save to document
      // var items = $(document).data('eu-items');
      // items[thumb] = eu_item;


      var eu_items_ls = ure_eu_items.get_all();
      // // start an array for this accnum if none
      //
      // if ((accnum in eu_items_ls)) {
      // eu_items_ls[accnum] = {};
      // eu_items_ls[accnum]['thumb'] = this_thumb
      //
      // }

      // add this eu item to the accnum array
      // delete eu_items_ls[accnum][thumb]; // eu-data 6
      ure_eu_items.remove(accnum, thumb)
      // store it
      // 

      var thumbs = $("#comparanda-thumbs").data('thumbs');
      if (!thumbs) {
        // need at least one key
        thumbs = {
          '---' : 0
        };
      }

      // add to images if this image isn't already there
      if ((thumb in thumbs)) {

        delete thumbs[thumb];
        $("#comparanda-thumbs").data('thumbs', thumbs);
      }

    } // function removecomp

    /**
     * @memberOf eu_comparanda.EuComparanda * load_comparanda
     * @param {Object}
     *          eu -- the eu_items hash from localstorage
     * 
     * load existing comparanda into DOM
     * @param eu --
     *          the eu items object parsed from file. Called: -- on init, --on
     *          load_comparanda_from_json
     */
    function load_comparanda(eu) {

      var eu_items = getEUdata_new(); // eu-data 5.
      var old_comp = eu_items.get_all_eu_items();

      for ( var acc in eu) {
        // add the acc

        for ( var thumb in eu[acc]) {
          // skip the thumb of the ure object
          if (thumb === "thumb") {
            continue;
          }
          // if the comparand is not in the current localstore, add it
          // and also to the bar
          if (!(acc in old_comp) || !(thumb in old_comp[acc])) {
            var eu_item = eu[acc][thumb];

            addcomp(acc, eu_item);

          }
          if ((this_accnum in old_comp) && (thumb in old_comp[this_accnum])) {
            add_to_comp_bar(thumb)
          }

        }

      }
      // save old_comp
      // docready
      setRemoveDragComparanda("#comparanda-thumbs img");
    }

    /***************************************************************************
     * @memberOf eu_comparanda.EuComparanda load_comparanda_from_json
     * @param e
     *          event from file selector
     * 
     * 
     */
    function load_comparanda_from_json(e) {

      var eu;
      var file = e.target.files[0];

      console.log("load_comparanda_from_json");
      var reader = new FileReader();

      console.log("loading eu from file");
      reader.onload = function(f) {
        try {
          // TODO json fails to parse
          var json = JSON.parse(f.target.result)
          load_comparanda(json);
          console.log("adding to comparanda from file...");
        } catch (e) {
          if (e.message.match(/JSON/)) {
            pop_msg(config.msg_json_broken, 'alert-danger');
          } else {
            pop_msg(e, 'alert-danger');
          }

        }

        $("#comps-file").hide({
          complete : function() {
            console.log("hide comps-file");
          }
        });
        console.log("done loading comparanda from file");
      };
      reader.readAsText(file);

    }
    /***************************************************************************
     * @memberOf eu_comparanda.EuComparanda export comparanda to json
     */

    function save_comparanda_as_json() {
      var eu = getEUdata_new(); // eu-data
      var json = JSON.stringify(eu);
      var blob = new Blob([ json ], {
        type : "text/plain;charset=utf-8"
      });
      var millis = new Date().getTime();
      saveAs(blob, "myUre_comparanda_" + millis + ".txt");

    }

    /***************************************************************************
     * @memberOf eu_comparanda.EuComparanda
     * 
     * make html from the comparanda
     * 
     * 
     */

    function save_comparanda_as_html() {

      var style = '<style>'
          + ' #wrap {margin: 0px 0 0 40px; }'
          + ' body { background: #990033 !important; }'
          + '#info {background:#000;color: silver;height:50px;padding:20px 0 0 20px;font-family:sans-serif}'
          + ' .lighttable-item {min-height: 50px; border-top: 3px solid silver;border-bottom: 1px solid gray; color: white;}'
          + ' .lighttable-item:hover {background: white;color: black;}' + ' .at1 { color:  #990033 }'
          + ' .lt-item-left { display:inline; float: left;width: 20%;}'
          + ' .lt-item-right { display:inline; width: 80%;}' + '#left { width: 20%; float: left; }'
          + '.lt-save-thumb { height: 30px; margin-right: 40px; }' + '.eu-thumb { height: 30px; margin-right: 2px; }'
          + ' .eu-item{ display:inline; float: left;}' + '#left { background: #990033;}'
          + '#show { height: 100%; width: 100%; position: fixed; background: white; min-height: 1000px;}' + '</style>'

      // get the lighttable as html.-- for later
      // get the list
      var eu = getEUdata_new(); // eu-data
      var divs = [];
      var domain = document.domain;
      var html = document.implementation.createHTMLDocument();
      var startrec = "http://" + document.domain + "/record/" + Object.keys(eu)[0];
      var info = 'myUre comparanda <span class="at1">@</span> ' + new Date();
      $(html).find("body").append(
          '<div id="wrap">' + '<div id="info">' + info + '</div>'
              + '<div id="left" class="inner container"></div><div id="right" class="inner">'
              + '<iframe id="show" name="show" src="' + startrec + '"></iframe></div>');
      // image with link -> iframe
      // one per record

      /*************************************************************************
       * {accnum:[e1:{},e2:{},e3:{}]}
       * 
       * 
       */
      // for each accnum
      for ( var accnum in eu) {
        var url = "http://" + document.domain + "/record/" + accnum + "?s=noleftnav";
        var compHTML = getComparanda(eu[accnum]);
        // console.log(compHTML);
        var id = accnum
        var thumb = eu[accnum]['thumb'];
        divs.push('<div class="accnum-reference row">' + '<a target="show" href="' + url + '">'
            + '<div class="lighttable-item">' + '<div class="lt-item-left">' + '<img class="lt-save-thumb" src="'
            + thumb + '"/>' + '</div>' + '<div class="lt-item-right">' + '<span class="lt-meta">' + id + '</span>'
            + '</div>' + '</div>' + '</a>' + ' <div style="clear:both"></div>' + compHTML
            + ' <div style="clear:both"></div>' + '</div>');

      }
      var bootstrap_css = '<link href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet">';
      $(html).find("#left").append(divs.join(""));
      $(html).find("head").append(style);
      $(html).find("head").append(bootstrap_css);
      // console.log(html)
      var doc = new XMLSerializer().serializeToString(html);

      var blob = new Blob([ doc ], {
        type : "text/html;charset=utf-8"
      });
      var millis = new Date().getTime();
      saveAs(blob, "myUre_comparanda_" + millis + ".html");

    }
    /**
     * @memberOf eu_comparanda.EuComparanda structure: { t1:{},t2:{}} needed:
     *           <div>
     * 
     * </div>
     */
    function getComparanda(comp) {
      var out = [];
      for ( var t in comp) {
        // skip the record thumb
        if (t === "thumb") {
          continue;
        }
        var thumb = t;
        var url = comp[t]['link'];

        var h = '<a target="show" href="' + url + '">' + '<div class="eu-item">' + "\n\t"
            + '<div class="eu-thumb-item">' + "\n\t\t" + '<img class="eu-thumb" src="' + thumb + '"/>' + "\n\t"
            + '</div>' + "\n" + '</div>' + '</a>' + "\n";
        out.push(h);

      }

      return '<div class="eu-items">' + out.join("") + '</div>';
    }

    /***************************************************************************
     * @memberOf eu_comparanda.EuComparanda
     * 
     * get object containing collected items
     * 
     */

    function getEUdata_new() {
      return ure_eu_items;


    }

    window.comparanda_getEUdata = getEUdata_new;

    var export_methods = {
      onSignedIn : onSignedIn,
      addToComparanda : addToComparanda,
      moveImage : moveImage,
      removecomp : removecomp,
      removeImage : removeImage,
      load_comparanda : load_comparanda,
      load_comparanda_from_json : load_comparanda_from_json,
      save_comparanda_as_json : save_comparanda_as_json,
      save_comparanda_as_html : save_comparanda_as_html,
      getEUdata_new : getEUdata_new
    }

    for ( var i in export_methods) {

      window.ure_eu_comparanda[i] = export_methods[i];
    }

  }; // EuComparanda

  /**
   * load / save /collect europeana items for $accnum
   */
  EuComparanda_call = function(accnum) {
    // wait for logged in signal
    // TODO -- add timeout + local switch.
    EuComparanda(accnum);

  }

  window.EuComparanda = EuComparanda_call;

}();

/** guick nav for comparanda */

!function() {
  /*****************************************************************************
   * @memberOf eu_comparanda.EuComparanda set up the navigation strip
   * 
   */

  var my_eu_items = window.ure_eu_items;

  var setup_compNavList = function(listsel, observesel) {

    var eu_items_store = "eu_items";
    var storage = $.localStorage;
    /***************************************************************************
     * @memberOf eu_comparanda.EuComparanda.setup_compNavList
     * 
     * 
     */

    /***************************************************************************
     * @memberOf eu_comparanda.EuComparanda.setup_compNavList
     * 
     * 
     */
    var make_list = function(listsel, items) {
      $(listsel).html("");
      var ul = document.createElement("ul");
      $(ul).addClass("comp-nav-list-group");

      for ( var rec in items) {
        var thumb = items[rec].thumb;
        var img = '<img style="height: 20px" src="' + thumb + '"/>';
        var url = "/record/" + rec;
        var link = '<div class="comp-nav-record"><a href="' + url + '">' + rec + "&nbsp;" + img + '</a></div>';
        var comps = [];
        for ( var i in items[rec]) {
          if (i === "thumb")
            continue;
          var c = '<img src="' + i + '" class="comp-nav-img"/>';
          comps.push(c);
        }
        var comps_div = '<div class="comp-nav-comps">' + comps.join("") + '</div>';
        var content = $('<div class="comp-nav-img-container"></div>').html(comps_div);
        $(ul).append('<li>' + link + $(content).html() + '</li>');
      }

      $(listsel).html(ul);
    };
    /***************************************************************************
     * @memberOf eu_comparanda.EuComparanda.setup_compNavList
     * 
     * 
     */
    var makeMutationObserver = function(target) {
      // var MutationObserver = MutationObserver || WebKitMutationObserver ||
      // MozMutationObserver;
      var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          // could just do:
          // if (mutation.type === 'childList')
          if (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0)
            make_list(listsel, my_eu_items.get_all());

        });
      });

      var config = {
        childList : true
      };

      observer.observe(target, config);
    };

    $(document).ready(function() {
      make_list(listsel, my_eu_items.get_all());
      // remake list when a comp is added or removed.
      makeMutationObserver($(observesel)[0]);

    });
  }; // setup_compNavList
  /*****************************************************************************
   * @memberOf eu_comparanda.EuComparanda
   * 
   * 
   */
  var init_comNavList = function() {
  };
  var listSelector = "#comparanda-nav-list";
  var observeSelector = "#comparanda-thumbs";

  $(document).ready(function() {

    setup_compNavList(listSelector, observeSelector);
  });

  var eu_comparanda = {
    setup_compNavList : setup_compNavList,
    listSelector : listSelector,
    observeSelector : observeSelector

  }

  for ( var i in eu_comparanda) {

    window.ure_eu_comparanda[i] = eu_comparanda[i];
  }

}();

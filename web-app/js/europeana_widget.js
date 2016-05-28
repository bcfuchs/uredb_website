/**
 * This module exports three functions makeGrid() -- make a grid of europeana
 * thumbnails -exclude blacklisted items doEuRelated() --fetch data from
 * europeana queries voterSetup() -- set up relevance voting
 * 
 * 
 */
!function() {
  /**
   * @memberOf europeana_widget doEuRelated
   */
  var doEuRelated = function(templateSel, gridSel, data) {
  
    data = JSON.stringify(data)
    var endpoint_url = "/api/related"
    var template = $($(templateSel + " .gridlist-cell")[0]).clone();

    // make style for each element.
    var makeStyle = function(w, h, thumburl) {
      return 'width:' + w + '; height:' + h + '; background-image: url(' + thumburl + ')';
    }
    var getDate = function(item) {

      var out = "";
      if ('edmTimespanLabel' in item && item.edmTimespanLabel !== "")
        out += item.edmTimespanLabel[0].def + " ";
      if ('edmTimespanBroaderTerm' in item && item.edmTimespanBroaderTerm)
        out += item.edmTimespanBroaderTerm;
      return out;
    }

    var makeProviderlist = function(provs) {
     console.log('makeng provider list... ');
     var providers = Object.keys(provs)
     console.log(providers.length)
      
      for (var i = 0; i < providers.length; i++) {
        var t = $($("#provider-label-template label")[0]).clone();
        console.log(t)
        var provider = providers[i]
        $(t).attr('data-eu-provider-list', provider);
       
        $(t).find('input').val(provider)
        $(t).append('<span>'+provider+'</span>')
       
        $("#provider-filter").append(t)
      }
    }

    var success = function(data) {
      var items = data.info.items;
      var width = data.width;
      var height = data.height;
      var providers = {};
      var displayInfobox = data.displayInfobox;
      var hideInfodiv = displayInfobox ? "hide-infodiv" : "showtheinfobox";
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var provider = item.dataProvider;
        if (!(provider in providers))
           providers[provider] = provider
        var t = $(template).clone();
        item.thumb = item.edmPreview;

        var style = makeStyle(width, height, item.thumb);
        $(t).attr('data-ure-uri', item.edmPreview)
        $(t).attr('data-eu-provider', item.dataProvider);
        $(t).attr('data-eu-id', item.id);
        $(t).attr('data-eu-guid', item.guid)
        $(t).attr('data-eu-link', item.edmIsShownAt);
        $(t).attr('data-ure-image-url', item.edmPreview);
        if ("dcSubjectLangAware" in item)
          $(t).attr('data-ure-dcSubject', item.dcSubjectLangAware.def);
        $(t).attr('style', style);
        $(t).find(".short_title").html(item.title);
        $(t).find(".caption").html(item.dataProvider);

        $(t).find(".date").html(getDate(item));

        $(t).addClass(hideInfodiv)

        $(gridSel).append(t);
      }
//TODO move to complete
      
      makeProviderlist(providers);
      var signal = "fire_EuComparanda"

      $(window).trigger("resize");
      
      var e = $.Event(signal);
      $(window).trigger(e, {
        id : "finished doEuRelated"
      });

    } // success
    var successa = function(d) {
      console.log("success!")
      console.log(d)
    }
    $.ajax({
      contentType : "application/json; charset=utf-8",
      url : endpoint_url,
      dataType : "json",
      type : "POST",
      data : data,
    }).done(success).fail(function(j, t, e) {
      alert(e);
    }).always(function() {
      alert("complete");
    });

  }
  window.europeanaWidget_doEuRelated = doEuRelated;
  /**
   * @memberOf europeana_widget
   */
  var makeGrid = function(gridid, width, height, displayInfobox, wallWidth, accnum) {

    var storage, cellSelector, blacklist_store, providerBlacklist, providerBlacklistThreshold, providerBlacklist_store;

    blacklist_store = "vote"
    providerBlacklist_store = "providerBlacklist"
    providerBlacklistThreshold = 1;
    cellSelector = gridid + " .cell";
    storage = $.localStorage;

    // get providerBlacklist or start one if none
    if (storage.isSet(providerBlacklist_store)) {
      providerBlacklist = storage.get(providerBlacklist_store);
    } else {
      providerBlacklist = storage.set(providerBlacklist_store, {});
    }

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
          $(this).remove();
          // remove filter in provider checklist
          // console.log($('[data-eu-provider-list="' + provider + '"]'));
          // console.log(provider);
          $('[data-eu-provider-list="' + provider + '"]').remove();

        }

      })
    }

    // build the grid.
    var wall = new Freewall(gridid);
    wall.reset({
      selector : '.cell',
      delay : 25,
      animate : true,
      cellW : width,
      cellH : height,
      onResize : function() {
        wall.refresh();
      }
    });
    wall.fitWidth(wallWidth);
    // for scroll bar appear;
    $(window).trigger("resize");

    $(gridid).delay(3000).show();

    // show the infobox on hover

    if (displayInfobox === true) {
      $(cellSelector).hover(function() {
        $(this).find(".image-infobox").toggleClass("hide-infodiv")
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
      }
      // add data about this object to the add-item button in the overlay

      $("#add-item").data('eu_item', eu_item);
    }
    $(cellSelector).bind('click', overlayHandler);
    window.wall = wall
    window.overlayHandler = overlayHandler
    // END
  }

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
    console.log('voteSetup')
    var voteHandler, store;

    storage = $.localStorage;
    // create vote object if not present
    if (!(storage.isSet('vote'))) {
      console.log("setting vote...")
      storage.set('vote', {})
    }
    if (!(storage.isSet('providerBlacklist'))) {
      console.log("setting providerBlacklist...")
      storage.set('providerBlacklist', {})
    }
    /**
     * @memberOf europeana_widget.voteSetup
     */
    var vote = function(divs) {
      var votebutton = '<button class="voterbtn btn btn-sm btn-success">x</button>'
      // overlay a click button
      $(divs).each(function(k, v) {
        $(v).append(votebutton)
      })

      // remove the overlay click function
      $(itemSelector).unbind('click', window.overlayHandler)

      /**
       * Vote handler
       * 
       * @memberOf europeana_widget.voteSetup.vote
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

          // add to blacklist
          if (!(accnum in v))
            v[accnum] = {};

          v[accnum][item] = "";

          // add to provider blacklist
          provider in providerBlacklist ? providerBlacklist[provider] += 1 : providerBlacklist[provider] = 1

        }

        else {
          // remove from blacklist
          if (accnum in v && item in v[accnum]) {
            delete v[accnum][item];
          }

          if (provider in providerBlacklist) {
            providerBlacklist[provider] > 1 ? providerBlacklist[provider] -= 1 : delete providerBlacklist[provider]
          }

        }

        // save the results
        storage.set('vote', v);
        storage.set('providerBlacklist', providerBlacklist);
        window.testV = v;
      }

      $(document).on('click', '.voterbtn', voteHandler)
      // END vote
    } // vote = function(divs)

    // link to voting toggle

    $(document).on('click', toggleSelector, function() {
      var startText = "tag as not relevant"
      var sw = $(this).attr('data-relevance-toggle');
      if (sw === 'off') {
        vote(itemSelector);
        $(this).attr('data-relevance-toggle', 'on');
        $(this).html($(this).data('relevance-finish'))
      } else {
        $(itemSelector).unbind('click', voteHandler)
        $('.voterbtn').remove();
        $(itemSelector).bind('click', window.overlayHandler)
        $(this).attr('data-relevance-toggle', 'off');
        $(this).html(startText);

      }

    })
  } // voteSetup
  window.europeanaWidget_voteSetup = voteSetup
}()

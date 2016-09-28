(function() {
  window.eu_cursor = 0;
  window.eu_current_items = []

  var signal = "eu_fetch_complete"
  var keywords = [ 'black', 'figure' ]
  var gridSel = '#euwidget';
  var templateSel = "#gridTemplate";
  $(window).unbind(signal);

  var titleWordLength = 10;

  var template = $($(templateSel + " .gridlist-cell")[0]).clone();

  /**
   * @memberOf eu_ajax.doEuRelated
   */
  // make style for each element.
  var makeStyle = function(w, h, thumburl) {
    return 'width:' + w + '; height:' + h + '; background-image: url(' + thumburl + ')';
  };

  /**
   * @memberOf eu_ajax.doEuRelated
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

    for (var i = 0; i < providers.length; i++) {
      var t = $($("#provider-label-template label")[0]).clone();

      var provider = providers[i]
      $(t).attr('data-eu-provider-list', provider);

      $(t).find('input').val(provider)
      $(t).append('<span class="provider">' + provider + '</span>')

      $("#provider-filter").append(t)
    }
  };
  /**
   * @memberOf europeana_widget.doEuRelated
   */
  
  // XXX START
  var success = function(items_in) {
    // HACK HACK HACK
    var data = {};
    data.width = "100px"
    data.height = "100px"
    data.displayInfoboxOnHover = false;
    data.info = items_ins;
    // clear the grid
    // TODO save items in grid to a hidden div..or serialize and save to
    // localstorage
    $(gridSel).html("");
    // TODO exception no data
    var items = data.info.items;
    // TODO HACK!

    if ('eu_cursor' in window) {
      window.eu_cursor += data.info.itemsCount;
    } else {
      window.eu_cursor = data.info.itemsCount;
    }
    var width = data.width;
    var height = data.height;
    var providers = {};
    var displayInfoboxOnHover = data.displayInfoboxOnHover;

    var hideInfodiv = displayInfoboxOnHover ? "hide-infodiv" : "showtheinfobox";
    for (var i = 0; i < items.length; i++) {
      // console.log(item)
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
      console.log(item.edmPreview)
      if ("dcSubjectLangAware" in item)
        $(t).attr('data-ure-dcSubject', item.dcSubjectLangAware.def);
      $(t).attr('style', style);
      $(t).find(".short_title").html(item.title);
      $(t).find(".caption").html(item.dataProvider);

      $(t).find(".date").html(getDate(item));

      $(t).addClass(hideInfodiv)

      $(gridSel).append(t);
    }
    // TODO move to complete--or not
    $("#itemsCount").html(window.eu_cursor)
    makeProviderlist(providers);
    $("#total-results").html(data.info.totalResults)

    $(window).trigger("resize");
    var signal = "fire_EuComparanda"
    var e = $.Event(signal);
    $(window).trigger(e, {
      id : "finished doEuRelated"
    });
    console.log("end of success")
  } // success

  var get_query = function(kw) {

    return kw.join("+AND+");
  }

  var doQuery = function(keywords, startrec, done) {
    console.log('doQuery')

    var qs = get_query(keywords);
    // TODO -- fix fails if there isn't a thumbnail
    var query = 'wskey=api2demo&query=' + qs + '&thumbnail=true&rows=100&start=' + startrec + '&profile=standard'
    var url_base = 'https://www.europeana.eu/api/v2/search.json?'
    var url = url_base + query;

    var successa = function(d) {
      console.log(d.itemsCount + " : " + d.totalResults)
      var cursor;
      window.eu_totalResults = d.totalResults
      if ('eu_cursor' in window) {
        window.eu_cursor = eu_cursor + d.itemsCount;
      } else {
        window.eu_cursor = d.itemsCount;

      }

      var e = $.Event(signal);
      $(window).trigger(e, {
        id : "finished eu_complete",
        totalResults : d.totalResults,
        items : d.items,
        cursor : window.eu_cursor,
        itemsCount : d.itemsCount,
        item : d.items[0].guid

      });
    }
    var complete = function() {
      console.log("complete!");
    }
    var fail = function(e) {
      console.log(e);
    }
    console.log(url)
    $.ajax({
      url : url,
      dataType : "json",
      type : "GET"

    }).done(done).fail(fail).complete(complete)

  }
  window.eu_doQuery = doQuery
// XXX END
  
 // doQuery(keywords, 1);

  $(window).on('signal', function(e, data) {
    if (window.eu_totalResults > window.eu_cursor && window.eu_cursor < 200) {
      doQuery(keywords, data.cursor);
      console.log(data)
      console.log('doing query...');
      console.log(keywords)
      console.log(window.eu_totalResults)

      console.log(window.eu_current_items)
    } else {
      window.eu_current_items.concat([ 2, 3 ])
      console.log("total items: " + window.eu_current_items.length)
    }

  });
})();

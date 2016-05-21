!function() {

  /**
   * list blacklisted items in various ways - by provider - by query - by object
   * let user choose to blacklist by provider let user create a whitelist
   */
  var blacklist_setup = function() {
    console.log("blacklist_setup");

    // init
    var storage, vate, blacklist, providerBlacklist, eu_items, providerBlacklist_store, blacklist_store, eu_items_store, providerBlacklist_sel, providerWhitelist_sel;
    // functions
    // var addCheckbox, listProvidersSkipped, listProvidersSearched

    storage = $.localStorage;
    providerBlacklist_sel = "#provider-filter"
    providerWhitelist_sel = "#provider-filter-white"
    eu_items_store = "eu_items"
    blacklist_store = "vote"
    providerBlacklist_store = "providerBlacklist"

    // get the storage.
    if (storage.isSet(blacklist_store)) {
      blacklist = storage.get(blacklist_store);

    }
    if (storage.isSet(providerBlacklist_store)) {
      providerBlacklist = storage.get(providerBlacklist_store);

    }
    if (storage.isSet(eu_items_store)) {
      eu_items = storage.get(eu_items_store);

    }
    /** add a checkbox for each item */
    
    var addCheckbox = function(sel, template_sel, labeltext, value, id, checked, klass) {
      var label = $(template_sel).find("label").first().clone();
      var input = $(template_sel).find("input").first().clone();
      // TODO
      if (klass !== undefined) {
        $(input).addClass(klass);
      }
      $(label).attr("for", id);
      $(label).html(labeltext)
      $(input).attr("id", id)
      $(input).val(value)
      $(input).prop('checked', checked)
      $(sel).append(input);
      $(sel).append(label);
      $(sel).append("<br/>");
    }
    
    /** Make checkbox list of providers to skip */
    var listProvidersSkipped = function(sel, template_sel) {
      var id = "prov_1_"

      var pv = []
      for ( var a in providerBlacklist) {
        pv.push({
          key : a,
          val : providerBlacklist[a]
        })
      }

      var pv_sorted = pv.sort(function(a, b) {
        console.log(a.val)
        return b.val - a.val;
        // return a.val.toString().localeCompare( b.val.toString() );
      });
      var i = 0;
      var checked = true;
      var checkedMin = 3;
      var klass = "provskip"
      for ( var a in pv_sorted) {
        i += 1;
        var item = pv_sorted[a]
        var title = item.key;
        var hits = item.val
        var labeltext = hits + ": " + title

        checked = hits < checkedMin ? false : true;
        // sel, template_sel, labeltext,input_value, id,Boolean
        // isChecked,klass
        addCheckbox(sel, template_sel, labeltext, title, id + i, checked, klass);
      }

      $(sel).show();
    } // listProvidersSkipped END
    /**
     * Provider whitelist checkboxes
     * 
     * The list is constructed from comparanda files collected by the user. 
     */
    
    var listProvidersSearched = function(sel, template_sel) {
      var id = "provsearch_1_"
      var provs = {}
      for ( var accnum in eu_items) {
        for ( var itemkey in eu_items[accnum]) {
          var provider = eu_items[accnum][itemkey]['provider']

          if (provider in provs) {
            provs[provider] += 1
          } else {
            if (provider !== undefined) {
              provs[provider] = 1
            }
          }
        }

      }

      var pv = []
      for ( var a in provs) {
        pv.push({
          key : a,
          val : provs[a]
        })
      }

      var pv_sorted = pv.sort(function(a, b) {
       
        return b.val - a.val;
        // return a.val.toString().localeCompare( b.val.toString() );
      });
    

      var i = 0;
      var checked = false;
      var checkedMin = 0; 
      var klass = "provwhite"
      for ( var a in pv_sorted) {
        i += 1;
        var item = pv_sorted[a]
        var title = item.key;
        var hits = item.val
        var labeltext = hits + ": " + title
    //    checked = hits < checkedMin ? false : true;
        // sel, template_sel, labeltext,input_value, id,Boolean isChecked, klass
        addCheckbox(sel, template_sel, labeltext, title, id + i, checked, klass);
      }

      $(sel).show();
    } // listProvidersSearched END

    listProvidersSkipped(providerBlacklist_sel, "#provider-list-template");
    listProvidersSearched(providerWhitelist_sel, "#provider-list-template");

  }
  // blacklist_setup END

  var save_lists = function() {
    var skiplist = $(".cb-eu.provskip");
    var whitelist = $(".cb-eu.provwhite");
    var storage = $.localStorage;
    storage.set('skiplist',{});
    var skiplist_ar = [];
    skiplist.each(function(k,v){
      if ($(v).is(':checked')) {
          var val = $(v).val();
          skiplist_ar.push(val);
      }
      
    })
    storage.set('skiplist',{'data':skiplist_ar})
    
    storage.set('whitelist',{});
    var whitelist_ar = [];
    whitelist.each(function(k,v){
      if ($(v).is(':checked')) {
          var val = $(v).val();
          whitelist_ar.push(val);
      }
      
    })
    storage.set('whitelist',{data:whitelist_ar})
    
    console.log(skiplist);
    console.log(whitelist);
  }

  var done_setup = function() {
    $("#manage-related-done").click(function() {
      var res;
      save_lists();
      $(this).html("Saved!")

      setTimeout(function() {
        // window.location.href="/options";
      }, 1000);
    })
  }
  // END done_setup
  
  $(document).ready(function() {
    blacklist_setup();
    done_setup();
  })

}()
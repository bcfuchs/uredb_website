/**
 * Client-side Data Objects for uredb
 */
!function() {
  'use strict';
  /*****************************************************************************
   * 
   * @memberOf ure_data.gapi
   * 
   * Google appdata interface
   * 
   */

  var ure_gapi = function(filename) {
    var config, appData, app_id;
    config = {
        isAnonUser:false
    };
    // set to no gplus if this option is selected
    // default is to assume we want to continue towards log in
    if ('ure' in window && 'isAnonUser' in window.ure && window.ure.isAnonUser === true) 
      config.isAnonUser = true;
    
     app_id = window.gapi_client_id;
   
    if (typeof gdad !== 'undefined' && config.isAnonUser === false) {
      appData = gdad(filename, app_id); 
    }
    else {
      // noops for anon users
      appData = {
          save:function(){},
          read:function(){ return new Promise(function(res,rej){});}
      };
    }
    
    /*****************************************************************************
     * 
     * @memberOf ure_data.gapi
     * 
     */
    function on_read_complete(cb,file) {
      var signal = 'ure_gapi_read_complete';
      $(window).on(signal, function(e, d) {
        // only for this file
        if (d.file === filename) {
          cb();
        }
      });
    }
    /*****************************************************************************
     * 
     * @memberOf ure_data.gapi
     * 
     */
    function _read_complete_event(file) {
      var e = $.Event('ure_gapi_read_complete');
      $(window).trigger(e, {
        file : file
      });
    }
    /*****************************************************************************
     * 
     * @memberOf ure_data.gapi
     * 
     */
    function save(d) {
      appData.save(d);
    }
    /*****************************************************************************
     * 
     * @memberOf ure_data.gapi
     * 
     */
    function on_sign_in(cb) {
      var signal = 'ure_gapi_signed_in'
      $(window).on(signal, function(e, d) {
        
        cb();
      });

    }
    /*****************************************************************************
     * 
     * @memberOf ure_data.gapi
     * 
     */
    function read(success, error) {
  
      appData.read().then(function(data) {
        
        success(data);
        _read_complete_event(filename);
      }, function(err) {
        error(err);
      });
    }

    return {
      save : save,
      read : read,
      onSignIn : on_sign_in,
      onReadComplete:on_read_complete,
      config:config
    };
  };

  window.ure_gapi = ure_gapi;
  // refactor localStorage

  var locstorage = function() {
    var s = localStorage;
    // is there a storage item with key $key?
    function isSet(key) {
      return s.getItem(key) ? true : false;
    }
    function isEmpty(key) {
      var d = s.getItem(key);
      return d === null || d.length === 0 ? true : false;
    }
    function set(k, v) {
      return s.setItem(k, v);
    }

    function get(k) {

      var item = s.getItem(k);
      if (item !== null) {
        try {
          return JSON.parse(item);
        } catch (e) {

          throw (e)
        }
      }
      return null;

    }
    return {
      set : set, // function(k,v) {s.getItem(k,v)},
      get : get,
      isSet : isSet,
      remove : function(k) {
        return s.removeItem(k)
      },
      length : function() {
        return s.length
      },
      key : function(k) {
        return s.key(k)
      },
      clear : function(k) {
        return s.clear(k)
      },
      isEmpty : isEmpty

    };
  };
  var storage = locstorage();
  window.ure_storage = locstorage()
  window.ure_t = localStorage;

  /*****************************************************************************
   * 
   * @memberOf ure_data.projects
   * 
   */
  var myprojects = (function() {
    var domain, domain_store, config, gapi;

    config = {
      domain_store : 'projects',
      gapi_file : 'projects.js'
    }
    domain_store = config.domain_store;
    domain = {};

    // class functions
    function domainObj() {
    }
    /***************************************************************************
     * @memberOf ure_data.projects
     */
    domainObj.prototype.clone = function() {
      return JSON.parse(JSON.stringify(domain['data']));
    };

    /***************************************************************************
     * @memberOf ure_data.projects
     */

      var init = function() {

	  domain = new domainObj();
	  domain['data'] = {}; // add project data
	  gapi = ure_gapi(config.gapi_file);
	  
      // initialize storage
      if (!(storage.isSet(domain_store))) {
        domain['data']['projects'] = {};
        domain['data']['meta'] = {};
        domain['data']['undo'] = {};
        domain['data']['project_archive'] = [];

        storage.set(domain_store, JSON.stringify(domain['data']));
        // load from storage -- only domain['data'] is stored
      }
      // TODO -- online/offline syncing gapi <--> localstorage.
      // TODO -- only load after authorisation.
      // for now, assume gapi is right; read only on init, save on every save.
      var read_success = function(data) {
        domain['data'] = data;
        storage.set(domain_store, JSON.stringify(domain['data']));
      }
      var read_fail = function(err) {
        console.log(err);

      }
     // if user signs in, sync with google plus
	  gapi.onSignIn(function() {  
	    gapi.read(read_success, read_fail);
	  });
      var data = storage.get(domain_store);
      domain['data'] = data;

    };
    init();
    /***************************************************************************
     * 
     * @memberOf ure_data.projects
     * 
     * 
     */
    function reset() {
      domain = null;
      storage.remove(domain_store);
      init();
    }

    /***************************************************************************
     * 
     * @memberOf ure_data.projects
     * 
     * 
     */
    function save() {
      storage.set(domain_store, JSON.stringify(domain['data']));
      gapi.save(domain['data']);

    }
    ;
    // create an empty project
    // exception: proj name already exists
    // called only from admin?
    /***************************************************************************
     * 
     * @memberOf ure_data.projects
     * 
     * 
     */
    function create(proj) {
      var type = typeof (proj);
      proj = encodeURIComponent(proj);

      if (proj === '' || type === 'undefined') {
        throw "no project specified";
      }
      if (!(proj in domain['data']['projects'])) {
        domain['data']['projects'][proj] = {};
        save();
        // return the name of the created project
        return proj;
      } else {
        throw new Error('project already exists');
      }

    }
    // add a new item to a project
    // tagging the item creates the project
    /***************************************************************************
     * @memberOf ure_data.projects
     */
    function put(proj, accnum, item) {
      proj = encodeURIComponent(proj);
      if (!(proj in domain.data.projects)) {
        domain.data.projects[proj] = {};
      }
      if (!(accnum in domain.data.projects[proj])) {
        domain.data.projects[proj][accnum] = {};
      }
      if (!(item in domain.data.projects[proj][accnum])) {
        domain.data.projects[proj][accnum][item] = 1;
      }

      // sync to storage
      save();

    }
    ;
    // get all the items for this accnum
    /***************************************************************************
     * @memberOf ure_data.projects
     */
    function get_by_accnum(proj, accnum) {
      proj = encodeURIComponent(proj);
      if (proj in domain.data.projects && accnum in domain.data.projects[proj]) {

        return domain.data.projects[proj][accnum];
      }

      return null;
    }
    ;
    /***************************************************************************
     * @memberOf ure_data.projects
     */
    function get(proj) {
      proj = encodeURIComponent(proj);
      if (proj in domain['data']['projects']) {
        return domain['data']['projects'][proj];
      } else {
        return null;
      }
    }
    /***************************************************************************
     * @memberOf ure_data.projects return a list of project names, minus the
     *           archive
     */
    function list() {

      var projs = domain['data']['projects'];
      var out = [];
      for ( var name in projs) {
        out.push(decodeURIComponent(name));
      }
      return out;

    }
    /***************************************************************************
     * @memberOf ure_data.projects get /set current project
     * 
     * set and return project if project is defined if project is not defined,
     * return project in current_project, if neither return null
     */
    function current(proj) {

      if (typeof proj === 'string') {
        var project = encodeURIComponent(proj);
        domain.data.current_project = project;
        storage.set('current_project', project);
        save();

        return proj;
      } else {

        if ('current_project' in domain.data) {
          if (typeof proj === 'undefined') {
            var proj = domain.data.current_project;
            return decodeURIComponent(proj);
          }
          if (proj === null) {
            delete domain.data.current_project;
          }
        }
      }
      // for everything else return null;
      return null;

    }

    /***************************************************************************
     * @memberOf ure_data.projects
     */
    function get_accnums(proj) {
      proj = encodeURIComponent(proj);
      if (proj in domain.data.projects) {
        return Object.keys(domain.data.projects[proj]);
      }
      return null;
    }

      /***************************************************************************
     * @memberOf ure_data.projects
     */
      function get_all() {
	  
	
	return domain.clone();
    }
    ;
    // delete a project 
    
    /***************************************************************************
     * @memberOf ure_data.projects
     */
    function delete_project(proj) {
      proj = encodeURIComponent(proj);
      if (proj in domain.data.projects) {
        var old_project = JSON.stringify(domain.data.projects[proj]);
        domain.data.project_archive.push(old_project);
        delete domain.data.projects[proj];

      }
      save();

    }
    ;
    function delete_all() {

	var projects = list();
      for ( var i in projects) {
        delete_project(projects[i])
      }
      current(null); // remove current project
    }

    return {
      create : create,
      get_all : get_all,
      list : list,
      get : get,
      get_accnums : get_accnums,
      get_by_accnum : get_by_accnum,
      put : put,
      'delete' : delete_project,
      remove : delete_project,
      delete_all : delete_all,
      proj : domain,
      current : current,
      reset : reset,
      config : config,
      init : init

    };
  })();

  window.ure_projects = myprojects;
  /*****************************************************************************
   * 
   * @memberOf ure_data.eu_items
   * 
   */
  var my_eu_items = (function() {

    var domain, domain_store, meta_store, pic_index, config, gapi;
    config = {
      domain_store : 'eu_items',
      meta_store : 'eu_items_meta',
      gapi_file : 'eu_items.js'
    }

    domain_store = "eu_items";
    meta_store = "eu_items_meta";
    storage.remove(meta_store);
    domain = {};

    function domainObj() {
    }
    // TODO inherit this from a general data object!
    domainObj.prototype.clone = function() {
      return JSON.parse(JSON.stringify(domain['data']));
    };
    domainObj.prototype.list = function() {
      return Object.keys(domain.data.eu_items);
    };

    domainObj.prototype.random = function() {
      var t = Object.keys(domain.data.eu_items);
      var n = Math.floor(Math.random() * t.length);
      return domain.data.eu_items[t[n]];
    };

    /***************************************************************************
     * @memberOf ure_data.eu_items
     */
    var init = function() {
      pic_index = {}; // index eu_pic_id->[accnums] // update on each save.
      domain = new domainObj();
      domain['data'] = {}; // data
      gapi = ure_gapi(config.gapi_file);

      if (!storage.isSet(domain_store)) {
        domain.data.eu_items = {};
        storage.set(domain_store, JSON.stringify({}));

      }
      if (!(storage.isSet(meta_store))) {

        domain['data']['meta'] = {};
        domain['data']['meta']['undo'] = {};
        domain['data']['meta']['archive'] = {};
        storage.set(meta_store, JSON.stringify(domain.data.meta));

      }
      var read_success = function(data) {

        if (typeof data !== 'object')
          data = JSON.parse(data);

        domain.data.eu_items = data;
        make_pic_index();
        storage.set(domain_store, JSON.stringify(domain.data.eu_items));
      }
      var read_fail = function(err) {
        console.log(err);
      }
      gapi.onSignIn(function() {
        gapi.read(read_success, read_fail);
      });
      // get the local items if any--but replace them on gapi sign-in      
      var data = storage.get(domain_store);
      domain.data.eu_items = data;
      var meta = storage.get(meta_store);
      domain['data']['meta'] = meta;

      make_pic_index();

    };
    init();

    /***************************************************************************
     * 
     * @memberOf ure_data.eu_items
     */
    function reset() {
      domain = null;

      storage.remove(domain_store);
      init();

    }
    /***************************************************************************
     * 
     * @memberOf ure_data.eu_items
     */
    function save() {
      // save to localstorage
      storage.set(domain_store, JSON.stringify(domain.data.eu_items));

      // save to gdrive -- will stringify

      gapi.save(domain.data.eu_items);

      make_pic_index();
    }
    ;
    /***************************************************************************
     * 
     * @memberOf ure_data.eu_items
     */
    function get(item) {
      if (item in domain.data.eu_items) {
        return domain.data.eu_items[item];
      } else {
        return null;
      }
    }
    /***************************************************************************
     * 
     * @memberOf ure_data.eu_items
     */

    function create(accnum, thumburl) {
      if (!(accnum in domain.data.eu_items)) {
        domain.data.eu_items[accnum] = {};
        domain.data.eu_items[accnum]['thumb'] = thumburl;
        save();
        return true;
      }
      return false;
    }
    /***************************************************************************
     * 
     * @memberOf ure_data.eu_items @
     */
    function put(accnum, eu_id, eu_meta) {
      // iss this accnum already there?continue:false
      if (typeof eu_id === 'undefined' || typeof accnum === 'undefined') {
        throw new Error("missing parameters")
      }
      if (typeof eu_id !== 'string') {
        throw new TypeError('eu_id must be string')
      }
      ;
      if (typeof eu_meta !== 'object') {
        throw new TypeError('eu_meta must be object')
      }
      ;
      // todo check eu_meta

      if (accnum in domain.data.eu_items) {
        domain.data.eu_items[accnum][eu_id] = eu_meta;
        save();
        return true;
      }

      return false;
    }
    /***************************************************************************
     * 
     * @memberOf ure_data.eu_items
     */
    function remove_accnum(accnum) {
      if ( typeof accnum === 'undefined') {
        throw new Error("missing parameters")
      }
   
      if (accnum in domain.data.eu_items) {
        delete domain.data.eu_items[accnum];
        save();
        return true;
      }

      return false;

    }
    /***************************************************************************
     * 
     * @memberOf ure_data.eu_items
     */
    function remove(accnum, eu_id) {
      if (typeof eu_id === 'undefined' || typeof accnum === 'undefined') {
        throw new Error("missing parameters")
      }
      if (typeof eu_id !== 'string') {
        throw new TypeError('eu_id must be string')
      }
      if (accnum in domain.data.eu_items && eu_id in domain.data.eu_items[accnum]) {
        delete domain.data.eu_items[accnum][eu_id];
        save();
        return true;
      }

      return false;

    }
    /***************************************************************************
     * 
     * @memberOf ure_data.eu_items
     * 
     */
    function get_thumb_for_accnum(accnum) {
      if (accnum in domain.data.eu_items) {
        return domain.data.eu_items[accnum]['thumb'];
      }
      return null;

    }
    /***************************************************************************
     * 
     * @memberOf ure_data.eu_items
     * @private
     */
    function make_pic_index() {
      var items = domain.data.eu_items;

      for ( var accnum in items) {
        var eupix = items[accnum];
        for ( var pic in eupix) {
          if (pic === 'thumb')
            continue;
          if (!(pic in pic_index)) {
            pic_index[pic] = [];
          }
          pic_index[pic].push(accnum);
        }
        ;

      }

    }

    /***************************************************************************
     * 
     * @memberOf ure_data.eu_items return a list of accnums
     */
    function list() {
      return domain.list();
    }
    /***************************************************************************
     * 
     * @memberOf ure_data.eu_items
     */
    function get_all() {
    
      return domain.data.eu_items;
    }
    /***************************************************************************
     * 
     * @memberOf ure_data.eu_items
     */
    function get_all_eu_items() {

      return domain.data.eu_items;
    }
    /***************************************************************************
     * 
     * @memberOf ure_data.eu_items
     */

    function get_accnums_for_eupic(pic_id) {

      return (pic_id in pic_index) ? pic_index[pic_id] : null;

    }
    /***************************************************************************
     * 
     * @memberOf ure_data.eu_items
     */
    function random() {
      return domain.random();
    }
    /***************************************************************************
     * 
     * @memberOf ure_data.eu_items get all the data
     */
    function data() {
      return domain.clone();

    }
    return {
      reset : reset,
      save : save,
      get : get,
      get_all : get_all,
      get_all_eu_items: get_all_eu_items,
      create : create,
      put : put,
      remove : remove,
      remove_accnum: remove_accnum,
      list : list,
      get_accnums_for_eupic : get_accnums_for_eupic,
      pic_index : pic_index,
      get_thumb_for_accnum : get_thumb_for_accnum,
      random : random,
      data : data

    };
  })();

  window.ure_eu_items = my_eu_items;

  /*****************************************************************************
   * @memberOf ure_data.jquery_extras some jquery extras
   */
  var jquery_qs = function() {
  };
  $.extend({
    qs : function(key) {
	key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&"); // escape RegEx meta
	var match = location.search.match(new RegExp("[?&]" + key + "=([^&]+)(&|$)"));
	return match && decodeURIComponent(match[1].replace(/\+/g, " "));
    }
  });

  /*****************************************************************************
   * some document extras.
   */

  /*****************************************************************************
   * @memberOf ure_data.document_extras
   * 
   * declare class 'keypress' and a selector in data-keypress-target to get
   * submit on return with buttons.
   */
  var enable_submit_on_keypress = function() {
    $(document).ready(function() {
      $(".keypress").each(function() {
        $(this).keypress(function(e) {
          if (e && e.keyCode == 13) {
            var target = $(this).data('keypress-target');
            $(target).click();

          }

        });
      });
    });
  }
  enable_submit_on_keypress();

}();

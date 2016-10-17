/** EU COMPARANDA */

!function() {

  /**
   * @memberOf eu_comparanda load / save /collect europeana items for $accnum
   */
  var EuComparanda = function(accnum) {
    var msg_json_broken = "can't read comparanda file...";
    console.log("EuComparanda");

    $(document)
        .ready(
            function() {

              var storage, eu_items, this_accnum, eu_draggable_sel, projects;
              storage = $.localStorage;
              eu_draggable_sel = "#euwidget .cell"
              eu_items = 'eu_items'
              this_accnum = accnum;
              /*****************************************************************
               * 
               * @memberOf eu_comparanda.EuComparanda
               * 
               * class for handling project tags.
               */
              var myprojects = (function() {
                var init, get_all, get, projects,create, put,save,project_store;
                project_store = 'projects';

                // class functions
                function projectObj() {}
                
                projectObj.prototype.clone = function() {
                  return JSON.parse(JSON.stringify(projects['projs']));
                }
                init = function() {
                  projects = new projectObj();
                  projects['projs'] = {} // add project data 
                
  
         
                  // initialize storage
                  if (!storage.isSet(project_store))
                    storage.set(project_store, JSON.stringify(projects['projs']));
                    // load from storage -- only projects['projs'] is stored
                   var data = storage.get(project_store)
                   projects['projs'] = data;
                }
                init();
          
                reset = function() {
                  projects = null;
                  storage.remove(project_store);
                  init();
                }
                
                // save projects['projs'] to localstorage 
                save = function(){
                  storage.set(project_store,JSON.stringify(projects['projs']));
                };
                // create an empty project
                // exception: proj name already exists
                // called only from admin? 
                create = function(proj) {
                console.log('roject.create ' + proj)
                  out = null;
                  if (proj === '' || proj === undefined) {
                    throw "no project specified";
                  }
                  if (!(proj in  projects['projs'])) {
                    projects['projs'][proj] = {};
                    console.log("creating..."+proj)
                     console.log(projects['projs'])
                    return proj;
                  }
                  else {
                    throw 'project already exists';
                  }
                  save();
                }
                // add a new item to a project
                // tagging the item creates the project
                put = function(proj, accnum, item) {
                  
                  if (!(proj in  projects['projs'])) {
                    projects['projs'][proj] = {};

                  }
                  if (!(accnum in  projects['projs'][proj])) {
                    projects['projs'][proj][accnum] = {};
                  }
                  if (!(item in  projects['projs'][proj][accnum])) {
                    projects['projs'][proj][accnum][item] = 1;
                  }
                  
                  
                  // sync to storage
                  save();
                  
                };
                // get all the items for this accnum
                get_by_accnum = function(proj, accnum) {

                  if (proj in projects['projs'] && accnum in projects['projs'][proj]) {
                    return projects['projs'][proj][accnum];
                  }
                  return null;
                };
                get_by_project = function(proj) {
                 if (proj in projects['projs']) {
                  return projects['projs'][proj]
                 }
                 else {
                  return null;
                 }
                } 
                get_all = function() {
                 return projects.clone();
                };
                // delete a project put it in _old
                delete_project = function(proj) {
                  if (proj in projects['projs']) {
                    if (!('_old' in projects['projs'])) {
                      projects['projs']['_old'] = []
                    }
                    var old = {};
                    old[proj]  = projects['projs'][proj];
                    projects['projs']['_old'].push(JSON.stringify(old));
                    delete projects['projs'][proj];
                    old = null;
                  }
                  save();
                  
                };
                
                return {
                  create: create,
                  get_all: get_all,
                  get: get_by_project,
                  get_by_accnum: get_by_accnum,
                  put: put,
                  'delete':delete_project,
                  proj:projects,
                  reset:reset
                  
                 
                };
              })();
              
    window.ure_projects = myprojects;
    
            
              /*****************************************************************
               * 
               * @memberOf eu_comparanda.EuComparanda
               * 
               */
              var init = function() {
                /**
                 * bind functions to mini-dashboard
                 */
                $("#view-comps").click(function() {
                  window.location.href = "/comparanda"

                });

                $("#save-comps-as-html").click(function() {
                  save_comparanda_as_html();
                });

                $("#save-comps-as-json").click(function() {
                  save_comparanda_as_json();
                });

                $("#load-comps").click(function() {
                  $("#comps-file").toggle();
                  document.getElementById('comps-file').addEventListener('change', load_comparanda_from_json, false);

                });

                $("#clear-comps").click(function() {
                  var eu = getEUdata();
                  delete eu[this_accnum];
                  storage.set(eu_items, eu)
                  $("#comparanda-thumbs").html("");
                  $("#comparanda-thumbs").data('thumbs', "");

                });

                $("#manage-related").click(function() {
                  window.location.href = "/manage/related"

                });

                /**
                 * init load of data from storage
                 */
                // prevent freewall from showing image strip vertically.
                $("#europeana-section").delay(200).slideDown(1000);
                // attach iframeoverlay to body
                var ifr = $("#iframeOverlay").remove();
                $('body').append(ifr);
                var eu = getEUdata();
                if (eu !== null) {
                  load_comparanda(eu)
                }

                /***************************************************************
                 * 
                 * make the images draggable show tooltip on target when drag
                 * starts
                 */
                $("#euwidget .cell").each(function(v) {
                  $(this).attr("title", "drag me to comparanda to save!");
                  $(this).attr("data-toggle", "tooltip");

                });
                $('#euwidget .cell [data-toggle="tooltip"]').tooltip()

                $("#euwidget .cell").hover(function() {
                  $(this).tooltip("show");
                  $("#comparanda").tooltip('show');
                })
              }// init

              init();

              /**
               * 
               * @memberOf eu_comparanda.EuComparanda
               * @private
               */
              var moveImage = function(e) {
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
              }

              console.log("set draggable");
              $(eu_draggable_sel).draggable({
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

              /*****************************************************************
               * @memberOf eu_comparanda.EuComparanda
               * @private addToComparanda
               * 
               * Add a drop target and action for a related item
               * 
               * takes droppable event params
               */
              var addToComparanda = function(e, ui) {
                console.log("addToComparanda");
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

              $("#comparanda").droppable({
                drop : addToComparanda,
                scope : "comparanda",

                create : function(event, ui) {

                  if (!storage.isSet(eu_items))
                    storage.set(eu_items, '{}');

                }
              });
              /*****************************************************************
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
                  console.log("removeImage");

                  var url = $(this).attr('src');
                  var style = "background-image: url('" + url + "')";
                  // add a helper class and hide the text.
                  var out = $(this).clone().addClass("image-drag-helper");

                  // out = "<div>hi there</div>"
                  // out = '<img class="image-drag-helper" src="'+url+'"/>"'
                  // console.log(out)
                  return out;
                }; // removeImageHelper

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

              /*****************************************************************
               * @memberOf eu_comparanda.EuComparanda addcomp
               * @param {string}
               *          this_accnum // the accnum
               * @param {Object}
               *          eu_item
               * 
               * add eu item to comparanda div via json object add item to
               * localstorage and save.
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
                var items = $(document).data('eu-items');
                items[thumb] = eu_item;

                // save it to localstorage as well
                var json = storage.get(eu_items);
                var eu_items_ls = json;

                // start an array for this accnum if none

                if (!(this_accnum in eu_items_ls)) {
                  eu_items_ls[this_accnum] = {};
                  eu_items_ls[this_accnum]['thumb'] = this_thumb

                }

                // add this eu item to the accnum array
                if (!eu_items_ls[this_accnum][thumb]) {
                  eu_items_ls[this_accnum][thumb] = eu_item;
                  // store it
                  storage.set(eu_items, JSON.stringify(eu_items_ls));
                }
                add_to_comp_bar(thumb);

              } // function addcomp

              /*****************************************************************
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

              /*****************************************************************
               * @memberOf eu_comparanda.EuComparanda removecomp
               * 
               */
              function removecomp(thumb) {
                console.log("removecomp " + thumb)
                // add the thumb to the thumb strip

                // get the url for the thumb

                // // save to document
                // var items = $(document).data('eu-items');
                // items[thumb] = eu_item;

                // remove it from localstorage as well
                var json = storage.get(eu_items);
                var eu_items_ls = json;

                // // start an array for this accnum if none
                //
                // if ((accnum in eu_items_ls)) {
                // eu_items_ls[accnum] = {};
                // eu_items_ls[accnum]['thumb'] = this_thumb
                //
                // }

                // add this eu item to the accnum array
                delete eu_items_ls[accnum][thumb];
                // store it
                storage.set(eu_items, JSON.stringify(eu_items_ls));

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
               * @memberOf eu_comparanda.EuComparanda
               * 
               * load_comparanda_old
               * @param {Object}
               *          eu -- the eu_items hash from localstorage
               * 
               * load existing comparanda into comp div
               * 
               * 
               */
              function load_comparanda_old(eu) {

                if (accnum in eu) {
                  for ( var thumb in eu[accnum]) {
                    // skip the record thumb
                    if (thumb === "thumb") {
                      continue;
                    }
                    var eu_item = eu[accnum][thumb]

                    addcomp(accnum, eu_item);
                  }
                }
                setRemoveDragComparanda("#comparanda-thumbs img");
              }

              /**
               * @memberOf eu_comparanda.EuComparanda
               * 
               * load_comparanda
               * @param {Object}
               *          eu -- the eu_items hash from localstorage
               * 
               * load existing comparanda into DOM
               * 
               * 
               */
              function load_comparanda(eu) {

                // if (accnum in eu) {
                // for ( var thumb in eu[accnum]) {
                // // skip the record thumb
                // if (thumb === "thumb") {
                // continue;
                // }
                // var eu_item = eu[this_accnum][thumb]
                //
                // addcomp(accnum, eu_item);
                // }
                // }
                // get current comparanda
                var old_comp = getEUdata();

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
                setRemoveDragComparanda("#comparanda-thumbs img");
              }

              /*****************************************************************
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
                      pop_msg(msg_json_broken, 'alert-danger');
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
              /*****************************************************************
               * @memberOf eu_comparanda.EuComparanda export comparanda to json
               */

              function save_comparanda_as_json() {
                var eu = getEUdata();
                var json = JSON.stringify(eu);
                var blob = new Blob([ json ], {
                  type : "text/plain;charset=utf-8"
                });
                var millis = new Date().getTime();
                saveAs(blob, "myUre_comparanda_" + millis + ".txt");

              }

              /*****************************************************************
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
                    + ' .lighttable-item:hover {background: white;color: black;}'
                    + ' .at1 { color:  #990033 }'
                    + ' .lt-item-left { display:inline; float: left;width: 20%;}'
                    + ' .lt-item-right { display:inline; width: 80%;}' + '#left { width: 20%; float: left; }'
                    + '.lt-save-thumb { height: 30px; margin-right: 40px; }'
                    + '.eu-thumb { height: 30px; margin-right: 2px; }'
                    + ' .eu-item{ display:inline; float: left;}'
                    +   '#left { background: #990033;}'
                    + '#show { height: 100%; width: 100%; position: fixed; background: white; min-height: 1000px;}'
                    + '</style>'

                // get the lighttable as html.-- for later
                // get the list
                var eu = getEUdata();
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

                /***************************************************************
                 * {accnum:[e1:{},e2:{},e3:{}]}
                 * 
                 * 
                 */
                // for each accnum
                for ( var accnum in eu) {
                  var url = "http://" + document.domain + "/record/" + accnum + "?s=noleftnav";
                  var compHTML = getComparanda(eu[accnum]);
                  console.log(compHTML);
                  var id = accnum
                  var thumb = eu[accnum]['thumb'];
                  divs.push('<div class="accnum-reference row">' + '<a target="show" href="' + url + '">'
                      + '<div class="lighttable-item">' + '<div class="lt-item-left">'
                      + '<img class="lt-save-thumb" src="' + thumb + '"/>' + '</div>' + '<div class="lt-item-right">'
                      + '<span class="lt-meta">' + id + '</span>' + '</div>' + '</div>' + '</a>'
                      + ' <div style="clear:both"></div>' + compHTML + ' <div style="clear:both"></div>' + '</div>');

                }
                var bootstrap_css = '<link href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet">';
                $(html).find("#left").append(divs.join(""));
                $(html).find("head").append(style);
                $(html).find("head").append(bootstrap_css);
                console.log(html)
                var doc = new XMLSerializer().serializeToString(html);

                var blob = new Blob([ doc ], {
                  type : "text/html;charset=utf-8"
                });
                var millis = new Date().getTime();
                saveAs(blob, "myUre_comparanda_" + millis + ".html");

              }
              /**
               * @memberOf eu_comparanda.EuComparanda structure: { t1:{},t2:{}}
               *           needed: <div>
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
                      + '<div class="eu-thumb-item">' + "\n\t\t" + '<img class="eu-thumb" src="' + thumb + '"/>'
                      + "\n\t" + '</div>' + "\n" + '</div>' + '</a>' + "\n";
                  out.push(h);

                }

                return '<div class="eu-items">' + out.join("") + '</div>';
              }
              /*****************************************************************
               * @memberOf eu_comparanda.EuComparanda 
               * 
               * get object containing collected items
               * 
               */

              function getEUdata() {

                return storage.get(eu_items);

              }
              window.comparanda_getEUdata = getEUdata;

            }); // $(document).ready()

  }; // EuComparanda

  /**
   * load / save /collect europeana items for $accnum
   */

  window.EuComparanda = EuComparanda;

}();

/** guick nav for comparanda */

!function() {
  /*****************************************************************
   * @memberOf eu_comparanda.EuComparanda 
   * set up the navigation strip
   * 
   */
  var setup_compNavList = function(listsel, observesel) {

    var eu_items_store = "eu_items";
    var storage = $.localStorage;
    /*****************************************************************
     * @memberOf eu_comparanda.EuComparanda.setup_compNavList 
     * 
     * 
     */
    var get_comp_list = function() {
      var items = storage.get(eu_items_store);
      // console.log(items);
      return items;
    };
    /*****************************************************************
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
    /*****************************************************************
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
            make_list(listsel, get_comp_list());

        });
      });

      var config = {
        childList : true
      };

      observer.observe(target, config);
    };

    $(document).ready(function() {
      make_list(listsel, get_comp_list());
      // remake list when a comp is added or removed.
      makeMutationObserver($(observesel)[0]);

    });
  }; // setup_compNavList
  /*****************************************************************
   * @memberOf eu_comparanda.EuComparanda
   * 
   * 
   */
  var init_comNavList = function(){};
  
 $(document).ready(function(){
  var listSelector = "#comparanda-nav-list";
  var observeSelector = "#comparanda-thumbs";
  setup_compNavList(listSelector, observeSelector);
})

}();

/*** 
 * Tests
 */

// don't evaluate except by calling from cli
var project_tests = function() {
  console.log("loading tests");
  var tests = [];  
  var project = window.ure_projects;
  console.log(project);
// add lots of projects
  tests.push({"add projects then delete":
    function(){
      var projects = [];
      for (var i = 1; i < 10; i++) {
        var name = 'project_'+i;
        projects.push(name);
        for (var j = 1; j < 10; j++) {
          var accnum = "A_"+j;
          for (var k = 1; k < 10; k++) {
            project.put(name,accnum,'pic'+k);
          }
        }
      }
      console.log(JSON.stringify(project.get_all));
      projects.forEach(function(proj){
        project['delete'](proj);
        
      });
      console.log(JSON.stringify(project.get_all()  ));
    }
  });
  tests.push({"create empty projects then delete":
    function(){
    var projects = [];
    for (var i = 1; i < 10; i++) {
      var name = 'project_'+i;
      projects.push(name);
      project.create(name);
    }
    console.log(JSON.stringify(project.get_all()  ));
    projects.forEach(function(proj){
      project['delete'](proj);
      
    });
    console.log(JSON.stringify(project.get_all()  ));
    
  }
  });

  
  return {
    tests:tests
  };
} ;


window.project_tests = project_tests;



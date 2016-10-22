/**
 * Client-side Data Objects for uredb
 */
! function(){
  'use strict';
    var storage = $.localStorage;
  /*****************************************************************
   * 
   * @memberOf ure_data.projects
   * 
   */
  var myprojects = (function() {
    var  domain, domain_store;
    domain_store = 'projects';
    domain = {};

    // class functions
    function domainObj() {}
    /***************************************************************** 
     * @memberOf ure_data.projects
     */
    domainObj.prototype.clone = function() {
      return JSON.parse(JSON.stringify(domain['data']));
    };
    /***************************************************************** 
     * @memberOf ure_data.projects
     */
    var init  = function  () {
      domain = new domainObj();
      domain['data'] = {}; // add project data 
      

      // initialize storage
      if (!storage.isSet(domain_store)) {
        domain['data']['projects'] = {};
        domain['data']['meta'] = {};
        domain['data']['undo'] = {};
        domain['data']['project_archive'] = {};
      
        storage.set(domain_store, JSON.stringify(domain['data']));
        // load from storage -- only domain['data'] is stored
      }
       var data = storage.get(domain_store);
       domain['data'] = data;
    };
    init();
    /*****************************************************************
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

    /*****************************************************************
     * 
     * @memberOf ure_data.projects
     * 
     * 
     */
   function save(){
      storage.set(domain_store,JSON.stringify(domain['data']));
    };
    // create an empty project
    // exception: proj name already exists
    // called only from admin? 
    /*****************************************************************
     * 
     * @memberOf ure_data.projects
     * 
     * 
     */
  function create(proj) {
      
      
      if (proj === '' || proj === undefined) {
        throw "no project specified";
      }
      if (!(proj in  domain['data']['projects'])) {
        domain['data']['projects'][proj] = {};
        save();
        // return the name of the created project
        return proj;
      }
      else {
        throw 'project already exists';
      }
    
    }
    // add a new item to a project
    // tagging the item creates the project
  /***************************************************************** 
   * @memberOf ure_data.projects
   */
  function put(proj, accnum, item) {
      
      if (!(proj in  domain['data']['projects'])) {
        domain['data']['projects'][proj] = {};

      }
      if (!(accnum in  domain['data']['projects'][proj])) {
        domain['data']['projects'][proj][accnum] = {};
      }
      if (!(item in  domain['data']['projects'][proj][accnum])) {
        domain['data']['projects'][proj][accnum][item] = 1;
      }
      
      
      // sync to storage
      save();
      
    };
    // get all the items for this accnum
    /***************************************************************** 
     * @memberOf ure_data.projects
     */
     function get_by_accnum(proj, accnum) {

      if (proj in domain['data']['projects'] && accnum in domain['data']['projects'][proj]) {
        return domain['data']['projects'][proj][accnum];
      }
      return null;
    };
    /***************************************************************** 
     * @memberOf ure_data.projects
     */
    function get(proj) {
     if (proj in domain['data']['projects']) {
      return domain['data']['projects'][proj];
     }
     else {
      return null;
     }
    } 
    /***************************************************************** 
     * @memberOf ure_data.projects
     * return a list of project names, minus the archive
     */
    function list() {
     
     var projs = domain['data']['projects'];
      
      return Object.keys(projs) || [];
   
    } 
    /***************************************************************** 
     * @memberOf ure_data.projects
     * get /set current project
     * 
     * set and return project if project is defined
     * if project is not defined, return project in current_project, 
     * if neither return null
     */
    function current(project) {
      
      if (project != undefined) {
        domain['data']['current_project'] = project;
        storage.set('current_project',project);
        save();
        return project; 
      }
      
      if ( 'current_project' in domain['data']) {
        return domain['data']['current_project'];
      }
      return null;
      
    }
    
    /***************************************************************** 
     * @memberOf ure_data.projects
     */
    function get_accnums(proj) {
      if (proj in domain['data']['projects']) {
        return Object.keys(domain['data']['projects'][proj]);
      }
      return null;
    }
    /***************************************************************** 
     * @memberOf ure_data.projects
     */
   function get_all() {
     return domain.clone();
    };
    // delete a project put it in _old
    /***************************************************************** 
     * @memberOf ure_data.projects
     */
   function delete_project(proj) {
      if (proj in domain['data']['projects']) { 
        var old_project  = JSON.stringify(domain['data']['projects'][proj]);
        domain['data']['project_archive'].push(old_project);
        delete domain['data']['projects'][proj];
        old = null;
      }
      save();
      
    };
    
    return {
      create: create,
      get_all: get_all,
      list: list,
      get: get,
      get_accnums: get_accnums,
      get_by_accnum: get_by_accnum,
      put: put,
      'delete':delete_project,
      proj:domain,
      current:current,
      reset:reset
      
     
    };
  })();
  
window.ure_projects = myprojects; 
/*****************************************************************
 * 
 * @memberOf ure_data.ure_eu_items
 * 
 */
var my_eu_items = (function(){

  var domain, domain_store,pic_index;
  pic_index = {}; // index eu_pic_id->[accnums] // update on each save.
  domain_store = "eu_items";
  domain  = {};
  function domainObj() {}
  //TODO inherit this from a general data object!
  domainObj.prototype.clone = function() {
    return JSON.parse(JSON.stringify(domain['data']));
  };
  domainObj.prototype.list = function() {
    return Object.keys(domain['data']);
  };
  domainObj.prototype.random = function(){
    var t =  Object.keys(domain['data']['eu_items']);
    var n = Math.floor(Math.random()*t.length);
    return domain['data']['eu_items'][t[n]];
  };
  
  var init = function() {
    domain = new domainObj();
    domain['data'] = {}; // data

    // initialize storage
    if (!storage.isSet(domain_store)) {
      domain['data']['eu_items'] = {};
      domain['data']['meta'] = {};
      domain['data']['undo'] = {};
      domain['data']['archive'] = {};
      storage.set(domain_store, JSON.stringify(domain['data']));
    }
     var data = storage.get(domain_store);
     domain['data'] = data;
     make_pic_index();
  };
  init();
  
  /*****************************************************************
   * 
   * @memberOf ure_data.eu_items
   */
 function reset() {
    domain = null;
    storage.remove(domain_store);
    init();
    
  }
 /*****************************************************************
  * 
  * @memberOf ure_data.eu_items
  */
 function save(){
   storage.set(domain_store,JSON.stringify(domain['data']));
   make_pic_index();
 };
 /*****************************************************************
  * 
  * @memberOf ure_data.eu_items
  */
 function get(item){
   if (item in domain['data']['eu_items']) {
     return domain['data']['eu_items'][item];
   }
   else {
     return null;
   }
 }
 /*****************************************************************
  * 
  * @memberOf ure_data.eu_items
  */
 function create(accnum,thumburl) {
   if (!(accnum in domain['data']['eu_items'])) {
     domain['data']['eu_items'][accnum] = {};
     domain['data']['eu_items'][accnum]['thumb'] = thumburl;
     save();
     return true;
   }
   return false;
 }
 /*****************************************************************
  * 
  * @memberOf ure_data.eu_items
  *@
  */
 function put(accnum,eu_id,eu_meta) {
   // note if there's no thumb we need to get one.
 }
 /*****************************************************************
  * 
  * @memberOf ure_data.eu_items
  * 
  */
  function get_thumb_for_accnum(accnum) {
    if ( accnum  in domain['data']['eu_items']) {
      return domain['data']['eu_items'][accnum]['thumb'];
    }
    return null;
    
  }
 /*****************************************************************
  * 
  * @memberOf ure_data.eu_items
  * @private
  */
 function make_pic_index() {
   console.log("pic_index")
   var items = domain['data']['eu_items'];
  
  
   for (var accnum in items) {
     var eupix = items[accnum];
     for (var pic in eupix) {
       console.log(pic);
       if (! (pic in pic_index) ) {
         pic_index[pic] = [];
       }
       pic_index[pic].push(accnum);
     };
     
   }

 }
 /*****************************************************************
  * 
  * @memberOf ure_data.eu_items
  */
 function list() {
   return domain.list();
 }
 /*****************************************************************
  * 
  * @memberOf ure_data.eu_items
  */
 function get_accnums_for_eupic(pic_id) {
   if (pic_id in pic_index) {
     return pic_index[pic_id];
   }
   return null;
 }
 /*****************************************************************
  * 
  * @memberOf ure_data.eu_items
  */ 
 function random() {
   return domain.random();
 }
 
 return {
   reset:reset,
   save:save,
   get:get,
   create: create,
   put: put,
   list:list,
   get_accnums_for_eupic:get_accnums_for_eupic,
   pic_index:pic_index,
   get_thumb_for_accnum:get_thumb_for_accnum,
   random:random 
   
 } ;
})();

window.ure_eu_items= my_eu_items;




}();
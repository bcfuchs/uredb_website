!function() {

  EuComparanda(); // import from eu_comparanda.js loads the comparanda
  // --necessary? Yes

  var make_comparanda_page = function() {
    $("#comparanda").hide();
    var eu = comparanda_getEUdata(); // exported from eu_comparanda.js

    for ( var k in eu) {
      var div = document.createElement('div')
      $(div).addClass("comparanda-target-container")
      $(div).append("<div style='clear:both;'></div><hr></hr>")
      $(div).append('<a href="/record/' + k + '">' + "<h2>" + k + "</h2></a>")
      $(div).append('<img src="' + eu[k]['thumb'] + '"/><br/>');

      for ( var i in eu[k]) {
        if (i === 'thumb') {
          continue;
        }
        var link = eu[k][i]['link'];
        var provider = eu[k][i]['provider'];
        console.log(eu[k][i])
        var item = '<div class="row"><img src="' + i + '"/></div>';
        var title = '<div class="row"><a href="' + link + '"><span>' + provider + '</span></a></div>'
        var container = '<div class="container comparanda-container">' + item + title + '</div>'
        $(div).append(container);

      }
      $("#comparanda-list").append(div)
     
    }
    
    var make_projects_list = function(){
      var myprojects = window.ure_projects;
      var projects = myprojects.list();
      console.log(projects)
       $("#projects-list").html("");
     for (var i = 0; i < projects.length; i++) {
       var project = projects[i];
        console.log(projects[i])
        var link = "#"
          var div = '<div class="row"><a href="' + link + '"><span>' + project+ '</span></a></div>';
        $("#projects-list").append(div);
        var accs = myprojects.get(project);
        console.log(accs);
        for (acc in accs) {
          var accdiv = '<div class="row"><a href="/record/' + acc + '"><span>' + acc+ '</span></a></div>';
          $("#projects-list").append(accdiv);
          var pix = myprojects.get_by_accnum(project, acc)
          for (var pic in pix) {
            var picdiv = '<div class="row"><a href="/record/' + acc + '"><span>' + pic+ '</span></a></div>';
            $("#projects-list").append(picdiv);
          }
        }
       
        
      }
      
    }
    
    make_projects_list();
    window.make_projects_list = make_projects_list;
    
    /**
     * outline eu_items object for data.js
     * 
     */
    var my_eu_items = (function(){
      var storage = $.localStorage
      var domain, domain_store,pic_index;
      pic_index = {} // index eu_pic_id->[accnums] // update on each save.
      domain_store = "eu_items";
      
      function domainObj() {}
      //TODO inherit this from a general data object!
      domainObj.prototype.clone = function() {
        return JSON.parse(JSON.stringify(domain['data']));
      };
      domainObj.prototype.list = function() {
        return Object.keys(domain['data'])
      }
      domainObj.prototype.random = function(){
        var t =  Object.keys(domain['data']);
        var n = Math.floor(Math.random()*t.length);
        return domain['data'][t[n]]
      }
      
      function init() {
        domain = new domainObj();
        domain['data'] = {}; // data

        // initialize storage
        if (!storage.isSet(domain_store))
          storage.set(domain_store, JSON.stringify(domain['data']));
         
         var data = storage.get(domain_store);
         domain['data'] = data;
         make_pic_index();
      }
      init();
      
      /*****************************************************************
       * 
       * @memberOf comparanda_page.eu_items 
       */
     function reset() {
        domain = null;
        storage.remove(domain_store);
        init();
        
      }
     /*****************************************************************
      * 
      * @memberOf comparanda_page.eu_items 
      */
     function save(){
       storage.set(domain_store,JSON.stringify(domain['data']));
       make_pic_index();
     };
     /*****************************************************************
      * 
      * @memberOf comparanda_page.eu_items 
      */
     function get(item){
       if (item in domain['data']) {
         return domain['data'][item];
       }
       else {
         return null;
       }
     }
     /*****************************************************************
      * 
      * @memberOf comparanda_page.eu_items 
      */
     function create(accnum,thumburl) {
       if (!(accnum in domain['data'])) {
         domain['data'][accnum] = {}
         domain['data'][accnum]['thumb'] = thumburl;
         save();
         return true;
       }
       return false;
     }
     /*****************************************************************
      * 
      * @memberOf comparanda_page.eu_items 
      *@
      */
     function put(accnum,eu_id,eu_meta) {
       // note if there's no thumb we need to get one.
     }
     /*****************************************************************
      * 
      * @memberOf comparanda_page.eu_items 
      * @private
      */
     function make_pic_index() {
       console.log("pic_index")
       var items = domain['data'];
      
      
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
       console.log("pic_index DONE")
     }
     /*****************************************************************
      * 
      * @memberOf comparanda_page.eu_items 
      */
     function list() {
       return domain.list();
     }
     /*****************************************************************
      * 
      * @memberOf comparanda_page.eu_items 
      */
     function get_accnums_for_eupic(pic_id) {
       if (pic_id in pic_index) {
         return pic_index[pic_id];
       }
       return null;
     }
     /*****************************************************************
      * 
      * @memberOf comparanda_page.eu_items 
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
       random:random 
       
     } ;
    })();
    
    window.ure_eu_items= my_eu_items;
    
    var make_dummy_projects = function() {
      var pr = window.ure_projects;
      pr.reset();
      pr.put('Dionysus','13.10.25','pic2');
      pr.put('Dionysus','13.10.22','pic2');
      pr.put('skyphos','13.10.25','pic2');
      pr.put('skyphos','13.10.24','pic2');
      pr.put('skyphos','13.10.25','pic2');
      pr.put('skyphos','13.10.25','pic2');
    }
    window. make_dummy_projects =  make_dummy_projects
    
    var make_dummy_projects2 = function() {
      var  pr = window.ure_projects;
      pr.reset();
      var items = $.localStorage.get("eu_items");
      var proj = ['Dionysus','Skyphos','Mythology'];
      
      for (var item in items) {
   
        var p = proj[Math.floor(Math.random() * 3)];
   
        for (eupic in items[item]) {
         // console.log(eupic);
          if (eupic !== 'thumb') {
           pr.put(p,item,eupic);
          console.log(p + ":" + ":" + item + " : " + eupic);
          }
        };
      }
         
      
    
    };
    window. make_dummy_projects2 =  make_dummy_projects2;
  };

  
  $(document).ready(function() {
    make_comparanda_page();
  });

}();
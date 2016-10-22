!function() {

  EuComparanda(); // import from eu_comparanda.js loads the comparanda
  // --necessary? Yes
  
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
    * 
    */
    function get_thumb_for_accnum(accnum) {
      if ( accnum  in domain['data']) {
        return domain['data'][accnum]['thumb'];
      }
      return null;
      
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
     get_thumb_for_accnum:get_thumb_for_accnum,
     random:random 
     
   } ;
  })();
  
  window.ure_eu_items= my_eu_items;
  /*****************************************************************
   * 
   * @memberOf comparanda_page 
   */
  var make_comparanda_page = function() {
    $("#comparanda").hide();
    var eu = comparanda_getEUdata(); // exported from eu_comparanda.js

    for ( var k in eu) {
      var div = document.createElement('div')
      $(div).addClass("comparanda-target-container")
      $(div).attr("data-ure-accnum",k);
      $(div).append("<div style='clear:both;'></div><hr></hr>");
      $(div).append('<a href="/record/' + k + '">' + "<h2>" + k + "</h2></a>");
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
        var container = '<div class="container comparanda-container">' + item + title + '</div>';
        $(div).append(container);

      }
      
      $("#comparanda-list").append(div);
     
    }
    /*****************************************************************
     * 
     * @memberOf comparanda_page
     */ 
    var make_projects_list = function(){
      
      var myprojects = window.ure_projects;
      var projects = myprojects.list();
      
      $("#projects-list").html("");
      
     for (var i = 0,z = projects.length;i < z; i++) {
       var project = projects[i];
      
       var link = "#"
       var div = '<div class="row"><a href="' + link + '"><span>' + project+ '</span></a></div>';
       $("#projects-list").append(div);
       
       // accession numbers
       var accs = myprojects.get(project);
        for (acc in accs) {
          var accdiv = '<div class="row"><a href="/record/' + acc + '"><span>' + acc+ '</span></a></div>';
          $("#projects-list").append(accdiv);
          var pix = myprojects.get_by_accnum(project, acc)
          // eu refs
          for (var pic in pix) {
            var picdiv = '<div class="row"><a href="'+pic+ '"><span>' + pic+ '</span></a></div>';
            $("#projects-list").append(picdiv);
          }
        }
       
        
      }
      
    }
    
    
    make_projects_list();
    window.make_projects_list = make_projects_list;
    /*****************************************************************
     * 
     * @memberOf comparanda_page 
     */
    var make_projects_strip = function(){
      console.log("making projects strip ");
      
      var myprojects = window.ure_projects;
      var projects = myprojects.list();
      
      $("#projects-list").html("");
     
     for (var i = 0,z = projects.length;i < z; i++) {
       var box = $("#project-box").clone().attr('id','');
       var project = projects[i];
       $(box).attr('data-ure-project',project)
       $(box).find(".project-box-title").html(project);
       console.log(project)
       
       // accession numbers
       var accs = myprojects.get(project);
        for (acc in accs) {
          var itembox = $("#project-box-item").clone().attr('id','');
          
          var thumburl = my_eu_items.get_thumb_for_accnum(acc)
          $(itembox).find(".project-box-item-caption").html(acc)
          $(itembox).find(".project-box-item-image-container img").attr("src",thumburl)
          $(box).find(".project-box-items").append(itembox);
          
          
        
         
        }
       
        $("#project-strip").append(box);
      }
     
      
    }
    
    make_projects_strip();
    window.make_projects_strip = make_projects_strip;
   
    /*****************************************************************
     * 
     * @memberOf comparanda_page 
     */
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
    /*****************************************************************
     * 
     * @memberOf comparanda_page
     */
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
    
    /*****************************************************************
     * 
     * @memberOf comparanda_page
     * 
     * String project
     * Object pr -- window.ure_projects
     */
    
    var show_project_items = function(project,pr) {
      // store as the selected project
      pr.current(project);
      // get all the accnums for this project. 
      var accnums = pr.get_accnums(project);
      $(".comparanda-target-container").show();
      if (project === "--all--") 
        return 0;
      $(".comparanda-target-container").each(function(){
        var accnum = $(this).data('ure-accnum');
        if (accnums.indexOf(accnum) < 0 ) {
          $(this).hide();
        }
        
      })
      
    } 
    /*****************************************************************
     * 
     * @memberOf comparanda_page
     */
    var make_project_toggle_impl = function(sel) {
      var  prs = window.ure_projects;
      console.log("making project toggle...");
      var projects = prs.list();
      projects.forEach(function(project){
        $(sel).append('<option value="'+project+'">'+project+"</option>");
      
      });
     
      
      $(sel).change(function(){
        var project = $(this).val();
         show_project_items(project,prs);
         
      })
    };
    /*****************************************************************
     * 
     * @memberOf comparanda_page
     */
    var make_project_toggle = function(sel) {
      $(document).ready(function(){
        make_project_toggle_impl(sel);
      })
      }
    make_project_toggle("#project-selector")
    /*****************************************************************
     * 
     * @memberOf comparanda_page
     */
    var setup_project_strip = function(){
      var  pr = window.ure_projects;
      $(document).ready(function(){
      $(".project-box").click(function() {
       $(".project-box").removeClass("project-box-selected")
        $(this).addClass("project-box-selected");
       var project = $(this).data('ure-project')
       show_project_items(project,pr)
       $(".project-selected-title").html(project)
       $(".project-selected-before").html("Project: ")
       // show only this project. 
       
      });
      });
      
    }
    setup_project_strip();
  };
  
  
  $(document).ready(function() {
    make_comparanda_page();
  });

}();
    /** EU COMPARANDA */
      ! function(){ 
        /**
         * load / save /collect europeana items for $accnum
         */
         var EuComparanda = function(accnum,type) { 
           
          
            $(document).ready(function(){
    
              var storage,eu_items,this_accnum;
              storage = $.localStorage;
              eu_items = 'eu_items'
              this_accnum = accnum;
              
              
              /**
              * INIT
              * 
              */
             
          
              
             /**
              * bind functions to mini-dashboard
              */
              $("#view-comps").click(function(){
                window.location.href = "/comparanda"
              
              });
              
              $("#save-comps-as-html").click(function(){
                save_comparanda_as_html();
              })
              
               $("#save-comps-as-json").click(function(){
                save_comparanda_as_json();
              });
              
              $("#load-comps").click(function(){
                $("#comps-file").toggle();
                document.getElementById('comps-file').addEventListener('change', load_comparanda_from_json,false);
    
              });
              
              $("#clear-comps").click(function(){
                var eu = getEUdata(); 
                storage.set(eu_items,{})
                $("#comparanda-thumbs").html("")
                $("#comparanda-thumbs").data('thumbs',"");
                
              });
                  
              /**
               * init load of data from storage
               */    
             //prevent freewall from showing image strip vertically.
                $("#europeana-section").delay(200).slideDown(1000);
                // attach iframeoverlay to body
               var ifr = $("#iframeOverlay").remove();
               $('body').append(ifr);
               var eu = getEUdata();
               if (eu !== null) {
                load_comparanda(eu)
               }
        
        
              /**************************
              * 
              * make the images draggable
              * show tooltip on target when drag starts
              */
               $("#euwidget .cell").each(function(v){
                 $(this).attr("title","drag me to comparanda to save!");
                 $(this).attr("data-toggle","tooltip");
                 
               });
               $('#euwidget .cell [data-toggle="tooltip"]').tooltip()
               
               $("#euwidget .cell").hover(function(){
                 $(this).tooltip("show");
                 $("#comparanda").tooltip('show');
               })
               
              var moveImage = function(e) {
              var url = $(this).attr('data-ure-image-url');
              var style = "background-image: url('"+url+"')";
              // add a helper class and hide the text. 
              var out = $(this).clone().addClass("image-drag-helper");
              var a = out.find(".image-infobox");
              a.hide();
            //  out = "<div>hi there</div>"
            //    out = '<img class="image-drag-helper" src="'+url+'"/>"'
            //    console.log(out)
               return out;
             }
               
              $("#euwidget .cell").draggable({
                  snap:"#comparanda",
                  // show target tooltip on start hide on finish
//                  start: function() { 
//                   
//                    $("#comparanda").tooltip('show')},
 //                 stop: function() { $("#comparanda").tooltip('hide')},
                  cursor: "hand",
                  snapTolerance:1000,
                  scope: "comparanda",
                  helper: moveImage
                  });
              
          /************************
          * 
          * Add a drop target. 
          * 
          */
          var addToComparanda = function(e,ui) {
            console.log("addToComparanda");
              var d = ui.draggable; 
             var eu_link= $(d).attr("data-eu-link");
               var thumb= $(d).attr("data-ure-image-url");
               var guid= $(d).attr("data-eu-guid");
               var provider =  $(d).attr("data-eu-provider");
               var eu_item = {
                link:eu_link,
                thumb:thumb,
                ure_accnum:accnum,
                provider:provider, 
                guid:guid
               }
            addcomp(eu_item)
            
          }
              
          
              $("#comparanda").droppable({
                 drop:addToComparanda,
                 scope: "comparanda",
               
                 create: function( event, ui ) { 
                   console.log("created a drop ")
      
              
                  
                 if (! storage.isSet(eu_items))
                    storage.set(eu_items,'{}');
                  
                   }
                });
              
              
            
              /******************************
              * 
              *   add eu item to comparanda div via json object
              *
              */
              
              // duplicates another function in _iframeOverlay.gsp
              function addcomp(eu_item){
                
                // add the thumb to the thumb strip
                
                var thumb = eu_item.thumb;
              // NOTE this makes the addcomp function dependant on document.ready

                // get the url for the thumb
                var this_thumb = $($("#record-images .cell")[0]).attr('data-ure-image-url');
                // save to document
                var items = $(document).data('eu-items');
                items[thumb] = eu_item;

                // save it to localstorage as well 
                var json = storage.get(eu_items);
                  var eu_items_ls = json;
                  

                // start an array for this accnum if none
                
                if (!(accnum in eu_items_ls)) {
                  eu_items_ls[accnum] = {}; 
                  eu_items_ls[accnum]['thumb'] = this_thumb
                  
                }
            
            // add this eu item to the accnum array
                eu_items_ls[accnum][thumb] = eu_item
            // store it
                storage.set(eu_items,JSON.stringify(eu_items_ls));
                
                
                var thumbs = $("#comparanda-thumbs").data('thumbs');
                if (! thumbs) {
                  // need at least one key
                  thumbs = {'---':0};
                }
                console.log(thumb)
                // add to images if this image isn't already there
                if (! (thumb in thumbs)) {
                  $("#comparanda-thumbs").append('<img src="'+thumb+'"/>');
                  thumbs[thumb] = "";
                  $("#comparanda-thumbs").data('thumbs',thumbs);
                }
                
              }  // function addcomp
              
              /**
               *  load existing comparanda into comp div
               *
               *
               */
               function load_comparanda(eu){
                 
                 if (this_accnum in eu) {
                   for (var thumb in eu[this_accnum]) {
                      // skip the record thumb
                         if ( thumb === "thumb") { continue;}
                         var eu_item = eu[this_accnum][thumb]
                        
                       
                           addcomp(eu_item);
                     }
                   }

                 }
               function load_comparanda_from_json(e) {
                 
                 var eu; 
                 var file = e.target.files[0];
                 
                 console.log("load_comparanda_from_json");
                 var reader = new FileReader();
                 
                 console.log("loading eu from file");
                 reader.onload = function(f) {
                   
                       var json = JSON.parse(f.target.result)
                       console.log("adding to comparanda from file...");
                       load_comparanda(json);
                      
                       $("#comps-file").hide({complete:function(){"hid comps-file"}});
                       console.log("done loading comparanda from file");
                 }
                 reader.readAsText(file);
               
                
                 
               }
              /*******
               * export comparanda to json
               */
              
              function save_comparanda_as_json() {
                var eu = getEUdata();
                var json  = JSON.stringify(eu);
                var blob = new Blob([ json ], {
                  type : "text/plain;charset=utf-8"
                });
                var millis = new Date().getTime();
                saveAs(blob, "myUre_comparanda_" + millis + ".txt");
                
                
              }
              
              /************
              *
              * make html from the comparanda
              *
              * 
              */

              function save_comparanda_as_html() {
                
                var style = '<style>'
                  +' #wrap {margin: 0px 0 0 40px; }'
                  + ' body { background: #990033; }'
                  + '#info {background:#000;color:#990033;height:50px;padding:20px 0 0 20px;font-family:sans-serif}'
                  +' .lighttable-item {min-height: 50px; border-top: 3px solid silver;border-bottom: 1px solid gray; color: white;}'
                  +' .lighttable-item:hover {background: white;color: black;}'

                  +' .lt-item-left { display:inline; float: left;width: 20%;}'
                  +' .lt-item-right { display:inline; width: 80%;}'
                +'#left { width: 20%; float: left; }'
                +'.lt-save-thumb { height: 30px; margin-right: 40px; }'
                +'.eu-thumb { height: 30px; margin-right: 40px; }'
                +' .eu-item{ display:inline; float: left;width: 20%;}'
                +'#show { height: 100%; width: 100%; position: fixed; background: white; min-height: 1000px;}'
                +'</style>'
                 
                // get the lighttable as html.-- for later
                // get the list
                var eu = getEUdata()
                var divs = [];
                var domain = document.domain;
                var html = document.implementation.createHTMLDocument()
                var startrec = "http://"+document.domain + "/record/" +Object.keys(eu)[0];
                var info = "myUre comparanda @ " + new Date();
                $(html).find("body").append('<div id="wrap">'
                   +'<div id="info">'
                   + info
                   +'</div>'
                    +'<div id="left" class="inner"></div><div id="right" class="inner">'
                +'<iframe id="show" name="show" src="'
                +startrec
                + '"></iframe></div>');
                // image with link -> iframe
                // one per record
               
                /****
                  {accnum:[e1:{},e2:{},e3:{}]}
                *
                *
                */
                // for each accnum
                for (var accnum in eu) {
                  var url = "http://"+document.domain + "/record/" + accnum + "?s=noleftnav";
                  var compHTML = getComparanda(eu[accnum]);
                  console.log(compHTML);
                  var id = accnum
                  var thumb = eu[accnum]['thumb'];
                  divs.push(
                      '<div class="accnum-reference">'
                      +'<a target="show" href="'
                      +url
                      +'">'
                      +'<div class="lighttable-item">'
                      +'<div class="lt-item-left">'
                         +'<img class="lt-save-thumb" src="'
                        +thumb
                        + '"/>'
                      +'</div>'
                      +'<div class="lt-item-right">'
                      +'<span class="lt-meta">'
                      +id
                      + '</span>'
                      +'</div>'
                      +'</div>'
                      +'</a>'
                      +' <div style="clear:both"></div>'
                      + compHTML
                      +' <div style="clear:both"></div>'
                      +'</div>');
                  
                  
                }
                $(html).find("#left").append(divs.join(""));
                $(html).find("head").append(style);
                console.log(html)
                var doc = new XMLSerializer().serializeToString(html);
                
                var blob = new Blob([ doc ], {
                  type : "text/html;charset=utf-8"
                });
                var millis = new Date().getTime();
                saveAs(blob, "myUre_comparanda_" + millis + ".html");

              }
          /**
          structure: 
            { t1:{},t2:{}}
            needed: 
              <div>
              
              </div> 
          */
              function getComparanda(comp) {
              var out = [];
               for (var t in comp) {
                 // skip the record thumb
                if ( t === "thumb") { continue;}
                var thumb = t;
                var url = comp[t]['link'];
                console.log(comp[t])
            var h =  '<a target="show" href="'
                      +url
                      +'">'
                +'<div class="eu-item">'
                  +"\n\t"
                + '<div class="eu-thumb-item">'
                +"\n\t\t"
                + '<img class="eu-thumb" src="'
                + thumb
                + '"/>'
                +"\n\t"
                +'</div>'
                +"\n"
                +'</div>'
                +'</a>'
                +"\n"
            out.push(h);
              
                 }
            
            return '<div class="eu-items">'+ out.join("")+ '</div>';
                }
              /********
              *
              *  return a hash of form 

              *   assume for now we have more than one comparand.
              
          */
              
          function getEUdata() {
              console.log("getEUdata")
                return storage.get(eu_items);
            
            }
          window.comparanda_getEUdata = getEUdata;
         

              }); // $(document).ready()
      
         } // EuComparanda
         
       
         /**
          * load / save /collect europeana items for $accnum
          */
        
        window.EuComparanda = EuComparanda
      
      }()
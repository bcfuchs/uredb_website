/**
 * Ure DB Lighttable
 * 
 * Camanjs http://camanjs.com/ for image manipulation
 * 
 * A hack for storing data in localStore or cookie if ls not avail
 * 
 * called via template tag /ure/lighttable_widget in quickstart2.gsp
 * @param $
 */

! function($) {
  $(document).ready(
      function() {
        // class vars
        var selectedImageClass = 'img-selected';
        // set the storage type here...
        
        
        var init = function() {
          setToLocalstore();

          loadLighttableThumbs();
          
          /** init droppable *.
           * 
           */
          $("#lighttable-links").droppable({
           drop:addToLighttableDrag,
           scope:"record-images",
          
      
           create: function( event, ui ) { 
             console.log("created a drop ")
      //       console.log(this)
             },
 /**
             accept: function(event,ui) {  
            //  $(this).addClass("flash_1").delay(3000).removeClass("flash_1")
              $(this).fadeOut(1000).delay(100).fadeIn(1000)
              console.log("accepting drops");
     
            }
  */   
            }); 
          
          /** 
           * assign clearLighttable to a button 
           * 
           */ 
          $("#clear-lighttable").click(function() {
            clearLighttable()
          });
          
          /** 
           * 
           * add everything in the lighttable-link div to the lighttable 
           */
          
          $('.lighttable-link').each(
              function(i, v) {

                $(v).click(function(e) {

                      addToLighttable($(v).attr('data-lighttable-filename'), $(v).attr('data-lighttable-base'), $(v)
                          .attr('data-lighttable-accession_number'), $(v).attr('data-lighttable-recordid'));

                    });
              });
        }
        init();
        
        /**
         * 
         * add thumbs to lighttable. 
         */
        
        function loadLighttableThumbs() {
          var lt = getProp('lighttable');
          var lt_thumb_div_selector = "#lighttable-thumbs";
          $(lt_thumb_div_selector).html("");
          if (lt && lt.length > 0) {
          $.each(lt,
              function(i, v) {
                var thumb = v.thumb;
                $(lt_thumb_div_selector).append(
                    '<img crossorigin="anonymous" class="lt-thumb" src="' + thumb + '" alt />');
              });
          }
          $("#view-lighttable").click(function() {
            var images_json = getProp('lighttable');
            //TODO -- warn if there are no images
            showLighttable(images_json);
            
          });
          $("#close-lighttable").click(function() {
            hideLighttable()
          });
          $("#save-lighttable").click(function() {
            saveLighttable()
          });
          $("#save-lighttable-as-html").click(function() {
            saveLighttable_as_html()
          });
          $("#load-lighttable").click(function() {
            $("#lt-file").toggle();
            document.getElementById('lt-file').addEventListener('change', loadLighttable,false);
          });
        }

        /** hide the lighttable */
        function hideLighttable() {

          // send the state back to the server.

          $('#lighttable-container').hide();
          $('#lighttable-overlay').hide();
        }
        /**
         * load lighttable from json file 
         */ 
        
        function loadLighttable(e) {
          var file = e.target.files[0];
          console.log("loadLaighttable");
          var reader = new FileReader();
          console.log("loading lt from file");
          reader.onload = function(f) {
            
                var json = JSON.parse(f.target.result)
                console.log("adding to lighttable...");
                console.log(json);
                addToLighttableFromJson(json);
          }
          reader.readAsText(file);
          $("#lt-file").hide();
          
          // 
          
        }
        
        /** 
         * export / download lighttable to a jsonfile
         */
        
        function saveLighttable() {
          // get the lighttable state.-- for later
          // get the list
          var json = getJson();
          var blob = new Blob([ json ], {
            type : "text/plain;charset=utf-8"
          });
          var millis = new Date().getTime();
          saveAs(blob, "ure_lighttable_" + millis + ".txt");

        }
        /**
         * 
         * json
   {
  "images": [
    {
      "recid": "33",
      "accnum": "11.10.2",
      "sm": "http://uredb.reading.ac.uk/ure/pixdir/2003.12/sm/2003.12.0006.jpg",
      "large": "http://uredb.reading.ac.uk/ure/pixdir/2003.12/xlarge/2003.12.0006.jpg",
      "thumb": "http://uredb.reading.ac.uk/ure/pixdir/2003.12/thumb/2003.12.0006.jpg",
      "base": "http://uredb.reading.ac.uk/ure/pixdir/2003.12",
      "url": "2003.12.0006.jpg"
    },
    {
      "recid": "33",
      "accnum": "11.10.2",
      "sm": "http://uredb.reading.ac.uk/ure/pixdir/2003.97e/sm/2003.97.0445.jpg",
      "large": "http://uredb.reading.ac.uk/ure/pixdir/2003.97e/xlarge/2003.97.0445.jpg",
      "thumb": "http://uredb.reading.ac.uk/ure/pixdir/2003.97e/thumb/2003.97.0445.jpg",
      "base": "http://uredb.reading.ac.uk/ure/pixdir/2003.97e",
      "url": "2003.97.0445.jpg"
    }
  ],
  "info": {
    "datetime": "2015-07-30T20:18:21.766Z"
  }
}

         */
        
        function saveLighttable_as_html() {
          
          var style = '<style>'
            +' #wrap {margin: 0px 0 0 40px; }'
            + ' body { background: #990033; }'
            + '#info {background:#000;color:#990033;height:50px;padding:20px 0 0 20px;font-family:sans-serif}'
            +' .lighttable-item {height: 50px; border-top: 1px solid silver; color: white;}'
            +' .lighttable-item:hover {background: white;color: black;}'
            +' .lt-item-left { display:inline; float: left;width: 20%;}'
            +' .lt-item-right { display:inline; width: 80%;}'
          +'#left { width: 20%; float: left; }'
          +'.lt-save-thumb { height: 30px; margin-right: 40px; }'
          +'#show { height: 100%; width: 100%; position: fixed; }'
          +'</style>'
           
          // get the lighttable as html.-- for later
          // get the list
          var json = getJsonObject();
          var divs = [];
          var domain = document.domain;
          var html = document.implementation.createHTMLDocument()
          var startrec = "http://"+document.domain + "/record/" +json.images[0].accnum;
          var info = "Ure lighttable @ " + new Date(json.info.datetime);
          $(html).find("body").append('<div id="wrap">'
             +'<div id="info">'
             + info
             +'</div>'
              +'<div id="left" class="inner"></div><div id="right" class="inner">'
          +'<iframe id="show" name="show" src="'
          +startrec
          + '"></iframe></div>');
          
          for (var i = 0; i < json.images.length; i++) {
            var url = "http://"+document.domain + "/record/" + json.images[i].accnum + "?s=noleftnav";
            var id = json.images[i].accnum;
            var thumb = json.images[i].thumb;
            divs.push('<a target="show" href="'
                +url
                +'"><div class="lighttable-item">'
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
                +' <div style="clear:both"></div></div></a>');
            
            
          }
          $(html).find("#left").append(divs.join(""));
          $(html).find("head").append(style);
          var doc = new XMLSerializer().serializeToString(html);
          var blob = new Blob([ doc ], {
            type : "text/html;charset=utf-8"
          });
          var millis = new Date().getTime();
          saveAs(blob, "ure_lighttable_" + millis + ".html");

        }

        /**
         * get the lighttable objects as json. info -- the metadata images: [
         * img-id: img-url: object-id: record-url: accnum: record: ...url to
         * json version of record. ]
         */
        function getJson() {
          var out = {};
          var lt = getProp('lighttable');
          var info = {
            datetime : new Date()
          }
          out = {
            info : info,
            images : lt

          }
          var json = JSON.stringify(out);
          return json;
        }
        
        function getJsonObject() {
          var out = {};
          var lt = getProp('lighttable');
          var info = {
            datetime : new Date()
          }
          out = {
            info : info,
            images : lt

          }
        
          return out;
        }

        /**
         * load images into lighttable
         * 
         */

      
      /**
       * load images into lighttable from json
       */  
        function putImagesInLighttable(lt) {
          var lt_thumb_div_selector = "#lighttable-thumbs";
          $('#lighttable-container-inner').html("");

          $.each(lt, function(i, v) {
            var sm = v.sm;
            var large = v.large;
            var accnum = v.accnum;
            var div = document.createElement('div');
            $(div).addClass('ure-image-container');

            $(div).append(
                '<img crossorigin="anonymous" data-ure-large="' + sm + '" data-lighttable-accession_number="' + accnum
                    + '" class="lt-large" src="' + sm + '" alt />');

            $('#lighttable-container-inner').append(div);

          });
          
        }
        
        function showLighttable(images_json) {
       
          putImagesInLighttable(images_json);

          $('.ure-image-container').mousedown(function() {

            $("." + selectedImageClass).removeClass(selectedImageClass);
            $(this).addClass(selectedImageClass);

          });

          $('.ure-image-container').draggable({
            start : function(event, ui) {
              $(this).addClass('noclick');
              // remove other selected images.
              // TODO use browser select to select images
              $("." + selectedImageClass).removeClass(selectedImageClass);
              $(this).addClass(selectedImageClass);
              console.log('dragging...');

              // console.log($(this));
            }
          });
          // http://stackoverflow.com/questions/1771627/preventing-click-event-with-jquery-drag-and-drop
          $('.ure-image-container img').each(function(i, v) {
            console.log($(this));
            $(v).click(function(e) {

              if ($(this).hasClass('noclick')) {
                $(this).removeClass('noclick');
              } else {

                console.log("ok 2 " + i);

                $(this).toggleClass('lighttable-ui-small');
                console.log(this);
              }
            });
          });

          $('.ure-image-container img').addClass('lighttable-ui-small');
          $('#lighttable-container').fadeIn();
          $('#lighttable-container').css({
            'z-index' : 998999
          });
          
          $('#lighttable-overlay').show();
          // set up controls
          initTools();

        }
        
        function initTools() {
          // invert selected image
          $('#invert').click(function(e) {
            // get the selected image(s) from localstorage or css class
            console.log("hi from invert");
            console.log($("." + selectedImageClass + " img"));
            // Need to set this for images not on the server
            // Caman.remoteProxy = "/proxies/proxy.php";

            console.log($(camanimg));

            var camanimg = "." + selectedImageClass + " canvas";

            Caman(camanimg, function() {
              this.invert().render();

            });

            camanimg = "." + selectedImageClass + " img";

            Caman(camanimg, function() {
              this.invert().render();

            });

          });
          // greyscale selected image
          $('#greyscale').click(function(e) {
            // get the selected image(s) from localstorage or css class
            console.log("hi from greyscale");

            // Need to set this for images not on the server
            // Caman.remoteProxy = "/proxies/proxy.php";

            var camanimg = "." + selectedImageClass + " canvas";

            Caman(camanimg, function() {
              this.greyscale().render();

            });

            camanimg = "." + selectedImageClass + " img";

            Caman(camanimg, function() {
              this.greyscale().render();

            });

          });
          $('#trash-image').click(function(e) {

            var removed = $("." + selectedImageClass).remove();
            $(removed).removeClass("." + selectedImageClass);
            $("#lighttable-trash").append(removed);

          });
          // reset lighttable
          $('#reset').click(function(e) {
            // get the selected image(s) from localstorage or css class
            console.log("hi from reset");

            // Need to set this for images not on the server
            // Caman.remoteProxy = "/proxies/proxy.php";

            var camanimg = "." + selectedImageClass + " canvas";

            Caman(camanimg, function() {
              // //this.greyscale().render();
              this.revert();

            });

            camanimg = "." + selectedImageClass + " img";

            Caman(camanimg, function() {
              // this.greyscale().render();
              this.revert();

            });

          });

        }
        function clearLighttable() {
          setProp('lighttable', []);
          var lt_thumb_div_selector = "#lighttable-thumbs"; // TODO now set in
                                                            // two
          // places !!!
          $(lt_thumb_div_selector).html("");

        }
        /**
         * add an image to the list of images to be displayed in the lighttable.
         * 
         */
        function addToLighttable(d, b, accnum, recid) {
          console.log("addToLighttable");
          console.log(d + " "+ b + " "+ accnum + " "+ recid);
          var thumb = b + "/thumb/" + d;
          var sm = b + "/sm/" + d;
          var large = b + "/xlarge/" + d;
          addToLighttableByUrl(thumb, sm, large, accnum, recid);
        }
     /**
      * receive drag events in the lighttable thumb area
      *   inited in init
      */
        
        function addToLighttableDrag(e,ui) {
          console.log("addToLighttableDrag");
          var d = ui.draggable;
          var sm = $(d).attr('data-ure-image-url');
          var thumb= sm.replace("/sm/","/thumb/")
          var large= sm.replace("/sm/","/large/")
          var accnum =  $(d).attr('data-ure-accnum');
          var recid =  $(d).attr('data-ure-record');
          
       
          addToLighttableByUrl(thumb,sm,large,accnum,recid);
        }
        
        function addToLighttableByUrl(thumb, sm, large, accnum, recid) {
          var lt_thumb_div_selector = "#lighttable-thumbs";
          $(lt_thumb_div_selector).append(
              '<img crossorigin="anonymous" class="lt-thumb" src="' + thumb + '" data-lighttable-accession_number="'
                  + accnum + '" data-lighttable-recid="' + recid + '" alt />');
          var lt = [];
          try {
            lt = getProp('lighttable');
            if (lt === "" || lt === undefined) {
              lt = []
            }
          } catch (e) {
            console.log(e);
          }
          // add to existing list
          lt.push({
          //  url : d,
          //  base : b,
            thumb : thumb,
            large : large,
            sm : sm,
            accnum : accnum,
            recid : recid
          });

          // store the information
          setProp('lighttable', lt);

        }

        // import json data into lighttable
        function addToLighttableFromJson(json) {
          console.log("addToLighttableFromJson");
          
          json.images.forEach(function(v, i, a) {
            addToLighttableByUrl(v.thumb, v.sm, v.large, v.accnum, v.recid);

          })

        }

        // get a property from the cookie or localstore */
        // TODO use a non-hack

        function getProp(key) {
          return dataF(key);
        }

        function setProp(key, val) {
          console.log("setProp key:"+key+" val:"+val)
          dataF(key, val);
        }
        // TODO -- store in cookie or localStorage

        function dataF(key, val) {

          console.log('dataF ' + key + ' ' + val);
          if (val === null) {
            return $(document).data('property-' + key);
          } else {
            $(document).data('property-' + key, val);
          }
        }

        function setToLocalstore() {

          console.log("--->setting to localStore...")

          // override dataF function
          dataF = function(key, val) {
            key = "uredb-property-" + key;
            // there is no val
            if (val === null || val === undefined) {
              if (localStorage[key] && localStorage[key] !== null) {
             //   var str = localStorage[key]['val'];

                var out =  JSON.parse(localStorage[key])['val'];
                return out;
              } 
              else {
                return "";
              }
              
            } 
            // if there is a val, store it
            else {
              console.log('in localstore key:"' + key + '" val:"' + val+ '"');
              console.log(val);
              localStorage[key] = JSON.stringify({
                'val' : val
              });
            }
          }

        }

      });
}(jQuery);